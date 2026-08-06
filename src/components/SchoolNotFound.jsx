import React from 'react';
import styled from 'styled-components';
import { listSchoolSlugs } from '@/schools/registry';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #f5f7fb;
  font-family: 'Roboto', sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'Comfortaa', sans-serif;
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
  color: #1a1a1a;
`;

const Message = styled.p`
  color: #555;
  max-width: 420px;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const Code = styled.code`
  background: #e8ecf2;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const Chip = styled.a`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #fff;
  border: 1px solid #d0d7e2;
  border-radius: 999px;
  color: #1a1a1a;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    border-color: #999;
  }
`;

/**
 * Shown when the resolved slug is not in the schools registry.
 */
const SchoolNotFound = ({ slug }) => {
  const known = listSchoolSlugs();

  return (
    <Page>
      <Title>School not found</Title>
      <Message>
        We could not find a school for <Code>{slug || 'unknown'}</Code>.
        Check the subdomain or use <Code>?school=slug</Code> locally.
      </Message>
      <List>
        {known.map((s) => (
          <li key={s}>
            <Chip href={`?school=${s}`}>{s}</Chip>
          </li>
        ))}
      </List>
    </Page>
  );
};

export default SchoolNotFound;
