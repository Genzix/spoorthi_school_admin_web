import React from 'react';
import styled from 'styled-components';

const MOBILE_BREAKPOINT = '768px';

const PaginationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0 4px;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
`;

const PaginationMeta = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  color: #666;
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PageButton = styled.button`
  padding: 8px 14px;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  background: ${(props) => (props.$primary ? '#ffeac7' : '#fff')};
  color: #000;
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    background: ${(props) => (props.$primary ? 'var(--color-primary)' : '#f8f8f8')};
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 10px 12px;
    min-height: 40px;
  }
`;

const PageIndicator = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  color: #333;
  min-width: 90px;
  text-align: center;
`;

const StudentListPagination = ({
  page = 1,
  pageSize = 20,
  count = 0,
  onPageChange,
  loading = false,
}) => {
  const totalPages = Math.max(1, Math.ceil(count / pageSize) || 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = count === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, count);

  if (count === 0) {
    return null;
  }

  return (
    <PaginationBar>
      <PaginationMeta>
        Showing {start}–{end} of {count}
      </PaginationMeta>
      <PaginationControls>
        <PageButton
          type="button"
          disabled={safePage <= 1 || loading}
          onClick={() => onPageChange(safePage - 1)}
        >
          Previous
        </PageButton>
        <PageIndicator>
          Page {safePage} of {totalPages}
        </PageIndicator>
        <PageButton
          type="button"
          $primary
          disabled={safePage >= totalPages || loading}
          onClick={() => onPageChange(safePage + 1)}
        >
          Next
        </PageButton>
      </PaginationControls>
    </PaginationBar>
  );
};

export default StudentListPagination;
