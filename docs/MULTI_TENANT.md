# Multi-tenant School Product

One SPA build serves many schools. Branding, API host, and modules come from
[`src/schools/registry.js`](src/schools/registry.js). Flutter’s `SchoolPalette`
is mirrored in [`src/schools/palettes.js`](src/schools/palettes.js).

## How the active school is chosen

Resolution order ([`resolveSchool.js`](src/schools/resolveSchool.js)):

1. **Subdomain** — `spoorthi.yourproduct.com` → slug `spoorthi`
2. **Custom host** — entries in each school’s `hosts` array
3. **Query** — `?school=gencampus` (local / preview)
4. **Env** — `VITE_DEFAULT_SCHOOL`
5. **Storage** — `localStorage.schoolSlug`
6. **Fallback** — `spoorthi`

Unknown slugs render [`SchoolNotFound`](src/components/SchoolNotFound.jsx).

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
shares storage — log out when switching schools locally.

## Production DNS

Point a wildcard (or each school subdomain) at the same Vercel/Netlify SPA:

| Host | School |
|------|--------|
| `spoorthi.yourproduct.com` | Spoorthi |
| `gencampus.yourproduct.com` | GenCampus |
| `admin.gencampus.edu` | add to `hosts` on the GenCampus registry entry |

SPA rewrites must still send all paths to `index.html` (existing `vercel.json`).

## Adding a school

1. Add a palette in `src/schools/palettes.js` (or reuse colors).
2. Add a frozen config object in `SCHOOLS` inside `src/schools/registry.js`:
   - `slug`, `displayName`, `legalName`, `apiBaseUrl`
   - `logo`, `palette`, `receipt`, `seo`, `modules`
   - `legacyEmailRoles` only if that school still uses hardcoded emails
3. Deploy the same build; DNS the subdomain.

Do **not** fork the repo per school.

## Theming

`ThemeProvider` writes CSS variables on `:root`:

- `--color-primary`, `--color-primary-light`, `--color-secondary`, `--color-accent`
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
