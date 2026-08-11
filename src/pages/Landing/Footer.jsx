import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { schoolAwarePath } from '@/schools/resolveSchool';
import { Container } from './styles';

const Foot = styled.footer`
  background: color-mix(in srgb, var(--lp-navy) 96%, #000);
  color: color-mix(in srgb, #fff 82%, transparent);
  padding: 2.25rem 0 1.75rem;
`;

const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.25rem;
  padding-bottom: 1.35rem;
  border-bottom: 1px solid color-mix(in srgb, #fff 12%, transparent);
`;

const Brand = styled.div`
  max-width: 36ch;

  strong {
    display: block;
    font-family: var(--lp-font-display);
    font-size: 1.15rem;
    color: #fff;
    margin-bottom: 0.35rem;
  }

  p {
    font-family: var(--lp-font-body);
    font-size: 0.92rem;
    line-height: 1.55;
    margin: 0;
    opacity: 0.82;
  }
`;

const Links = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1.1rem;
  align-items: flex-start;

  a {
    font-family: var(--lp-font-body);
    font-size: 0.9rem;
    font-weight: 600;
    color: inherit;
    text-decoration: none;

    &:hover {
      color: var(--lp-gold);
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 1.15rem;
  font-family: var(--lp-font-body);
  font-size: 0.82rem;
  opacity: 0.72;
`;

const Footer = ({ brand, nav, footer }) => (
  <Foot>
    <Container>
      <Top>
        <Brand>
          <strong>{brand.title}</strong>
          <p>{footer.tagline}</p>
        </Brand>
        <Links aria-label="Footer">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
          <Link to={schoolAwarePath('/login')}>Staff Login</Link>
        </Links>
      </Top>
      <Bottom>
        <span>{footer.copyright}</span>
        <span>Admissions · Campus · Community</span>
      </Bottom>
    </Container>
  </Foot>
);

export default Footer;
