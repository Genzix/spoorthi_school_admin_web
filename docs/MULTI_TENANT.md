# Multi-tenant School Product

One SPA build serves many schools. Branding, API host, and modules come from
[`src/schools/registry.js`](src/schools/registry.js). Flutter’s `SchoolPalette`
is mirrored in [`src/schools/palettes.js`](src/schools/palettes.js).

## How the active school is chosen

Resolution order ([`resolveSchool.js`](src/schools/resolveSchool.js)):

1. **Locked hostname** — custom `hosts` map, or exact tenant subdomain on a real
   domain (`gencampus.yourproduct.com`). Authoritative in production.
2. **Query** — `?school=gencampus` (local / preview override; wins over soft host)
3. **Soft hostname** — platform project names that embed a slug
   (`spoorthi-school-admin-web.vercel.app` → `spoorthi`)
4. **Sticky storage** — `localStorage.schoolSlug` (survives reload after query is gone)
5. **Env** — `VITE_DEFAULT_SCHOOL` (cold-start default only)
6. **Fallback** — `spoorthi`

On localhost / shared hosts the app also **writes `?school=` into the URL**
(`history.replaceState`) and preserves `schoolSlug` across cache clears so a
GenCampus session does not flip back to Spoorthi on reload.

Platform project hosts (`*.vercel.app`, `*.netlify.app`, …) are not treated as
locked tenant subdomains — use `?school=` or sticky storage to pick the school.

Unknown explicit `?school=foo` renders [`SchoolNotFound`](src/components/SchoolNotFound.jsx).

## Local development

```bash
npm run dev
# Spoorthi (default)
open http://localhost:5173/

# GenCampus without DNS
open http://localhost:5173/?school=gencampus
```

Optional `.env`:

```env
VITE_DEFAULT_SCHOOL=spoorthi
VITE_API_BASE_URL=https://spoorthischool.genzix.space
VITE_GENCAMPUS_API_BASE_URL=https://school-dev.genzix.space
```

GenCampus defaults to `https://school-dev.genzix.space` in the registry when that env is unset.

Subdomains isolate `localStorage` by host. Query-based switching on localhost
shares storage — the app keeps `?school=` in the URL and restores `schoolSlug`
after cache clears / logout so the tenant stays sticky across reloads.

## Production DNS

Point a wildcard (or each school subdomain) at the same Vercel/Netlify SPA:

| Host | School |
|------|--------|
| `spoorthi.yourproduct.com` | Spoorthi |
| `gencampus.yourproduct.com` | GenCampus |
| `admin.gencampus.edu` | add to `hosts` on the GenCampus registry entry |

SPA rewrites must still send all paths to `index.html` (existing `vercel.json`).

## Adding a school

1. Add brand assets under `src/assets/` (logo, etc.).
2. Add a palette in `src/schools/palettes.js` via `createSchoolPalette({ primary, accent })`
   so light/secondary/parent shades derive automatically. Keep Spoorthi’s explicit
   hexes unchanged unless that brand is redesigned.
3. Add a frozen config object in `SCHOOLS` inside `src/schools/registry.js`:
   - `slug`, `displayName`, `legalName`, `apiBaseUrl`
   - `logo` (school-specific mark / favicon / receipt), `palette`, `receipt`, `seo`, `modules`
   - `legacyEmailRoles` only if that school still uses hardcoded emails
4. Deploy the same build; DNS the subdomain.

Do **not** fork the repo per school.

## Theming

`ThemeProvider` writes CSS variables on `:root`:

- `--color-primary`, `--color-primary-light`, `--color-secondary`, `--color-accent`
- `--color-on-primary` — auto contrast (white on dark brands, dark on light)
- `--gradient-primary`, `--gradient-card`, …

Use `var(--color-primary)` in styled-components, or `useSchool()` / `props.theme`.

Semantic colors (error, present/absent) stay shared and are not school-specific.

## Auth & roles

[`src/auth/roles.js`](src/auth/roles.js):

- Prefer `localStorage.role` / `user.role` from the login API
- Spoorthi-only: `legacyEmailRoles` maps old Gmail accounts → roles
- Route guards use `hasRole(...)` — not raw email strings
- If the API returns `school_slug`, login rejects a mismatch with the resolved tenant

## API client

[`src/api/client.js`](src/api/client.js) — axios instance with:

- `baseURL` from the active school (`setApiBaseUrl`)
- Bearer token interceptor
- 401 → clear session → `/login`

New code should prefer `apiClient` over ad-hoc `axios` + `API_BASE_URL`.

## Remote branding (optional)

Set `VITE_FETCH_SCHOOL_BRANDING=true` to deep-merge:

`GET {apiBaseUrl}/public/schools/{slug}/`

onto the static registry ([`remoteBranding.js`](src/schools/remoteBranding.js)).
Static config remains the offline default when the endpoint is missing.
