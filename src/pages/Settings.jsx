import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import {
  FiDownload,
  FiUpload,
  FiFileText,
  FiUsers,
  FiAward,
  FiX,
  FiInfo,
} from 'react-icons/fi';
import SEO from '../components/SEO';
import {
  BULK_UPLOAD_ENDPOINTS,
  EXCEL_ACCEPT,
  STUDENT_BULK_TEMPLATE,
  TEST_MARKS_BULK_TEMPLATE,
  downloadBulkTemplate,
  formatFileSize,
  getApiErrorMessage,
  validateExcelFile,
} from '../utils/bulkUploadUtils';

const MOBILE_BREAKPOINT = '768px';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-12px); }
`;

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

const UploadArea = styled.div`
  border: 2px dashed ${props => (props.$isDragOver ? '#FFB942' : '#ddd')};
  background: ${props => (props.$isDragOver ? '#FFF8EB' : '#fafafa')};
  border-radius: 0.8vw;
  padding: 2vh 1vw;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #FFB942;
    background: #FFF8EB;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    border-radius: 10px;
    padding: 18px 12px;
  }
`;

const UploadIcon = styled.div`
  font-size: 1.4vw;
  color: #FFB942;
  margin-bottom: 0.8vh;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 24px;
    margin-bottom: 8px;
  }
`;

const UploadText = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 0.72vw;
  color: #626060;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 13px;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: #f8f9fa;
  border: 1px solid #ececec;
  border-radius: 0.8vw;
  padding: 1.2vh 1vw;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    border-radius: 10px;
    padding: 12px;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

const FileName = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 0.75vw;
  font-weight: 500;
  color: #212529;
  word-break: break-word;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
  }
`;

const FileSize = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 0.65vw;
  color: #777;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 12px;
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

const UploadSubmitButton = styled(ActionButton)`
  background: #212529;
  color: #ffffff;
  width: 100%;

  &:hover:not(:disabled) {
    background: #343a40;
  }
`;

const ErrorMessage = styled.div`
  color: #e53935;
  font-family: 'Roboto', sans-serif;
  font-size: 0.7vw;
  white-space: pre-line;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 12px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #ececec;
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.$progress || 0}%;
  background: #FFB942;
  transition: width 0.2s ease;
`;

const ButtonSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const Toast = styled.div`
  position: fixed;
  top: 2vh;
  right: 2vw;
  background: ${props => (props.$isError ? '#e53935' : '#4CAF50')};
  color: #ffffff;
  padding: 1.4vh 1.6vw;
  border-radius: 0.8vw;
  font-family: 'Roboto', sans-serif;
  font-size: 0.85vw;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  z-index: 1200;
  animation: ${props => (props.$show ? fadeIn : fadeOut)} 0.25s ease;
  display: ${props => (props.$show ? 'flex' : 'none')};
  align-items: center;
  gap: 8px;
  max-width: min(90vw, 420px);
  word-break: break-word;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    top: 12px;
    right: 12px;
    left: 12px;
    font-size: 14px;
    padding: 12px 16px;
    border-radius: 10px;
    max-width: none;
  }
`;

const useBulkUpload = (uploadUrl, successMessage) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const resetFile = () => {
    setSelectedFile(null);
    setUploadError('');
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const selectFile = (file) => {
    setUploadError('');
    const validationError = validateExcelFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = async (onSuccess) => {
    if (!selectedFile) {
      setUploadError('Please select a file to upload');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setUploadError('Authentication required. Please log in again.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(uploadUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (event) => {
          if (event.total) {
            setUploadProgress(Math.round((event.loaded * 100) / event.total));
          }
        },
      });

      const message =
        typeof response.data?.message === 'string' && response.data.message.trim()
          ? response.data.message
          : successMessage;

      resetFile();
      onSuccess(message);
    } catch (error) {
      setUploadError(getApiErrorMessage(error, 'Failed to upload file. Please try again.'));
    } finally {
      setIsUploading(false);
    }
  };

  return {
    fileInputRef,
    selectedFile,
    uploadError,
    uploadProgress,
    isUploading,
    isDragOver,
    setIsDragOver,
    selectFile,
    resetFile,
    handleUpload,
  };
};

const BulkTemplateCard = ({
  icon,
  title,
  description,
  templateConfig,
  uploadUrl,
  uploadSuccessMessage,
  inputId,
  onToast,
}) => {
  const upload = useBulkUpload(uploadUrl, uploadSuccessMessage);

  const openFilePicker = () => {
    upload.fileInputRef.current?.click();
  };

  return (
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

      {!upload.selectedFile ? (
        <UploadArea
          $isDragOver={upload.isDragOver}
          onDragOver={(event) => {
            event.preventDefault();
            upload.setIsDragOver(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            upload.setIsDragOver(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            upload.setIsDragOver(false);
            const file = event.dataTransfer.files?.[0];
            if (file) upload.selectFile(file);
          }}
          onClick={openFilePicker}
        >
          <UploadIcon>
            <FiUpload />
          </UploadIcon>
          <UploadText>Drag & drop filled Excel file here or click to browse</UploadText>
          <HiddenFileInput
            ref={upload.fileInputRef}
            id={inputId}
            type="file"
            accept={EXCEL_ACCEPT}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) upload.selectFile(file);
            }}
          />
        </UploadArea>
      ) : (
        <FilePreview>
          <FileInfo>
            <FiFileText style={{ color: '#FFB942', flexShrink: 0 }} size={20} />
            <div>
              <FileName>{upload.selectedFile.name}</FileName>
              <FileSize>{formatFileSize(upload.selectedFile.size)}</FileSize>
            </div>
          </FileInfo>
          <RemoveButton type="button" onClick={upload.resetFile} aria-label="Remove file">
            <FiX size={18} />
          </RemoveButton>
        </FilePreview>
      )}

      {upload.uploadError && <ErrorMessage>{upload.uploadError}</ErrorMessage>}

      {upload.uploadProgress > 0 && upload.uploadProgress < 100 && (
        <ProgressBar>
          <ProgressFill $progress={upload.uploadProgress} />
        </ProgressBar>
      )}

      <UploadSubmitButton
        type="button"
        disabled={!upload.selectedFile || upload.isUploading}
        onClick={() => upload.handleUpload(onToast)}
      >
        {upload.isUploading ? (
          <>
            <ButtonSpinner />
            Uploading... {upload.uploadProgress}%
          </>
        ) : (
          <>
            <FiUpload />
            Upload Excel
          </>
        )}
      </UploadSubmitButton>
    </TemplateCard>
  );
};

const Settings = () => {
  const [toast, setToast] = useState({ show: false, message: '', isError: false });

  const showToast = (message, isError = false) => {
    setToast({ show: true, message, isError });
    window.setTimeout(() => {
      setToast((current) => ({ ...current, show: false }));
    }, 3500);
  };

  return (
    <PageContainer>
      <SEO title="Settings" description="Download bulk upload templates and import student or test marks data." />

      <Toast $show={toast.show} $isError={toast.isError}>
        {toast.isError ? '✕' : '✓'} {toast.message}
      </Toast>

      <PageHeader>
        <PageTitle>Settings</PageTitle>
        <PageSubtitle>
          Download Excel templates, fill in your data, and upload students or test marks in bulk.
        </PageSubtitle>
      </PageHeader>

      <CardsGrid>
        <BulkTemplateCard
          icon={<FiUsers />}
          title="Bulk Upload Students"
          description="Import multiple student records at once using the standard Excel template."
          templateConfig={STUDENT_BULK_TEMPLATE}
          uploadUrl={BULK_UPLOAD_ENDPOINTS.students}
          uploadSuccessMessage="Students uploaded successfully!"
          inputId="student-bulk-file-input"
          onToast={(message) => showToast(message)}
        />

        <BulkTemplateCard
          icon={<FiAward />}
          title="Bulk Upload Test Marks"
          description="Upload unit test or exam marks for many students using the marks Excel template."
          templateConfig={TEST_MARKS_BULK_TEMPLATE}
          uploadUrl={BULK_UPLOAD_ENDPOINTS.testMarks}
          uploadSuccessMessage="Test marks uploaded successfully!"
          inputId="marks-bulk-file-input"
          onToast={(message) => showToast(message)}
        />
      </CardsGrid>
    </PageContainer>
  );
};

export default Settings;
