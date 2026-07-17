import React from 'react';
import styled from 'styled-components';
import {
  FiDownload,
  FiUsers,
  FiAward,
  FiInfo,
} from 'react-icons/fi';
import SEO from '../components/SEO';
import {
  STUDENT_BULK_TEMPLATE,
  TEST_MARKS_BULK_TEMPLATE,
  downloadBulkTemplate,
} from '../utils/bulkUploadUtils';

const MOBILE_BREAKPOINT = '768px';

const PageContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const PageHeader = styled.div`
  margin-bottom: 2vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-bottom: 16px;
  }
`;

const PageTitle = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 1.6vw;
  font-weight: 600;
  color: #212529;
  margin: 0 0 0.6vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 22px;
    margin-bottom: 6px;
  }
`;

const PageSubtitle = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.85vw;
  color: #626060;
  margin: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const TemplateCard = styled.section`
  background: #ffffff;
  border-radius: 1.2vw;
  padding: 2.4vh 1.8vw;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.6vh;
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    border-radius: 14px;
    padding: 16px;
    gap: 14px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 12px;
  }
`;

const CardIcon = styled.div`
  width: 3.2vw;
  height: 3.2vw;
  min-width: 3.2vw;
  border-radius: 0.8vw;
  background: #FFEAC7;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 44px;
    height: 44px;
    min-width: 44px;
    border-radius: 12px;
    font-size: 20px;
  }
`;

const CardHeading = styled.div`
  flex: 1;
  min-width: 0;
`;

const CardTitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 1vw;
  font-weight: 600;
  color: #212529;
  margin: 0 0 0.4vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 18px;
    margin-bottom: 4px;
  }
`;

const CardDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 0.75vw;
  color: #626060;
  margin: 0;
  line-height: 1.5;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 13px;
  }
`;

const ColumnPreview = styled.div`
  background: #f8f9fa;
  border: 1px solid #ececec;
  border-radius: 0.8vw;
  padding: 1.2vh 1vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    border-radius: 10px;
    padding: 12px;
  }
`;

const ColumnPreviewTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.72vw;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.8vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 13px;
    gap: 6px;
    margin-bottom: 8px;
  }
`;

const ColumnTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 6px;
  }
`;

const ColumnTag = styled.span`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 999px;
  padding: 0.35vh 0.7vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.65vw;
  color: #444;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 11px;
    padding: 4px 10px;
  }
`;

const CardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 10px;
  }
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
  padding: 1vh 1.2vw;
  border-radius: 999px;
  border: none;
  font-family: 'Roboto', sans-serif;
  font-size: 0.75vw;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex: 1;
    min-height: 44px;
    font-size: 14px;
    gap: 8px;
    border-radius: 12px;
  }
`;

const DownloadButton = styled(ActionButton)`
  background: #FFB942;
  color: #000000;

  &:hover:not(:disabled) {
    background: #FFAC1E;
  }
`;

const BulkTemplateCard = ({
  icon,
  title,
  description,
  templateConfig,
}) => (
  <TemplateCard>
    <CardHeader>
      <CardIcon>{icon}</CardIcon>
      <CardHeading>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeading>
    </CardHeader>

    <ColumnPreview>
      <ColumnPreviewTitle>
        <FiInfo />
        Template columns
      </ColumnPreviewTitle>
      <ColumnTags>
        {templateConfig.columns.map((column) => (
          <ColumnTag key={column}>{column}</ColumnTag>
        ))}
      </ColumnTags>
    </ColumnPreview>

    <CardActions>
      <DownloadButton
        type="button"
        onClick={() => downloadBulkTemplate(templateConfig)}
      >
        <FiDownload />
        Download Template
      </DownloadButton>
    </CardActions>
  </TemplateCard>
);

const Settings = () => (
  <PageContainer>
    <SEO
      title="Settings"
      description="Download Excel templates for bulk student and test marks data entry."
    />

    <PageHeader>
      <PageTitle>Settings</PageTitle>
      <PageSubtitle>
        Download Excel templates to prepare student or test marks data offline.
      </PageSubtitle>
    </PageHeader>

    <CardsGrid>
      <BulkTemplateCard
        icon={<FiUsers />}
        title="Bulk Students Template"
        description="Download the standard Excel template for preparing multiple student records."
        templateConfig={STUDENT_BULK_TEMPLATE}
      />

      <BulkTemplateCard
        icon={<FiAward />}
        title="Bulk Test Marks Template"
        description="Download the marks Excel template for unit tests or exams."
        templateConfig={TEST_MARKS_BULK_TEMPLATE}
      />
    </CardsGrid>
  </PageContainer>
);

export default Settings;
