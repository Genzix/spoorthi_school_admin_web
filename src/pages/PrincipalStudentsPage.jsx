import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FiSearch, FiCheck, FiX, FiRefreshCw, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useStudents } from '../context/StudentsContext';
import { useAcademicYear } from '../context/AcademicYearContext';
import { useStudentListQuery } from '../hooks/useStudentListQuery';
import StudentListPagination from '../components/StudentListPagination';
import { getSearchPlaceholder } from '../utils/searchConfig';
import SEO from '../components/SEO';
import searchIcon from '../assets/Search.svg';
import arrowIcon from '../assets/arrow.svg';

const STATUS_CHOICES = [
  { value: 'reservation', label: 'Reservation' },
  { value: 'admission', label: 'Admission' },
];

// Modern color palette
const colors = {
  primary: 'var(--color-primary-light)',
  secondary: 'var(--color-primary-light)',
  accent: '#f725FF846885',
  light: '#EFEFEF',
  dark: '#212529',
  success: '#CCFFC7',
  warning: '#FF8468',
  danger: '#FF8468',
  info: '#4895ef'
};

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); max-height: 0; }
  to { opacity: 1; transform: translateY(0); max-height: 500px; }
`;

// Styled components
const Container = styled.div`
  padding: 2rem;
  background-color: ${colors.light};
  min-height: 100vh;
  width: 94vw;
  margin-left: ${props => props.hiddenClassmobile ? '0.9vw' : '1vw' };

  @media (max-width: 768px) {
    padding: 1rem;
    width: 100% !important;
    margin-left: 0;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    margin-top: -1rem;
    margin-bottom: 1rem;
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    margin-top: -0.5rem;
    margin-bottom: 0.75rem;
    gap: 0.5rem;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: ${colors.dark};
  margin: 0;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0.5rem 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.6rem;
    border-radius: 30px;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  background: transparent;
`;

const FilterContainer = styled.div`
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: all 0.2s;
  position: relative;

  &:hover {
    background: #f1f1f1;
  }

  ${props => props.active && `
    background: ${colors.primary};
    color: ${colors.dark};
  `}

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.9rem;
    font-size: 0.85rem;
    border-radius: 30px;
  }
`;

const FilterBadge = styled.span`
  background: ${colors.danger};
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  position: absolute;
  top: -5px;
  right: -5px;
`;

const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  padding: 1.5rem;
  min-width: 300px;
  z-index: 1000;
  animation: ${slideDown} 0.3s ease-out;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 400px;
    box-sizing: border-box;
  }
`;

const FilterDropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const FilterDropdownTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: ${colors.dark};
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  color: #666;
  width: 32px;
  height: 32px;

  &:hover {
    background-color: #f5f5f5;
    color: #333;
    transform: rotate(90deg);
  }

  &:active {
    transform: rotate(90deg) scale(0.95);
  }

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const FilterSection = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterSectionTitle = styled.h4`
  margin: 0 0 0.8rem 0;
  font-size: 0.9rem;
  color: ${colors.dark};
  font-weight: 600;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterOption = styled.button`
  padding: 0.4rem 0.8rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  ${props => props.active && `
    background: ${colors.primary};
    border-color: ${colors.primary};
    color: ${colors.dark};
    font-weight: 500;
  `}
`;

const FilterActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;

  ${props => props.primary ? `
    background: ${colors.primary};
    color: ${colors.dark};
    &:hover {
      background: #e6d4a3;
    }
  ` : `
    background: #f5f5f5;
    color: #666;
    &:hover {
      background: #e5e5e5;
    }
  `}
`;

const FilterSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: ${colors.primary};
  border-radius: 8px;
  font-size: 0.9rem;
  color: ${colors.dark};
`;

const ClearFiltersButton = styled.button`
  background: none;
  border: none;
  color: ${colors.danger};
  cursor: pointer;
  font-size: 0.8rem;
  text-decoration: underline;
  margin-left: auto;

  &:hover {
    color: #d00000;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const StudentCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
  min-width: 0;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  }

  @media (max-width: 768px) {
    border-radius: 8px;
    
    &:hover {
      transform: none;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
`;

const CardHeader = styled.div`
  position: relative;
  height: 120px;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  display: flex;
  align-items: flex-end;
  padding: 1rem;

  @media (max-width: 768px) {
    height: 100px;
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    height: 90px;
    padding: 0.5rem;
  }
`;

const StudentAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: white;
  position: absolute;
  bottom: -40px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: ${colors.primary};
  border: 4px solid white;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    bottom: -35px;
    left: 16px;
    font-size: 1.5rem;
    border: 3px solid white;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    bottom: -30px;
    left: 12px;
    font-size: 1.2rem;
    border: 3px solid white;
  }
`;

const CardBody = styled.div`
  padding: 3rem 1.5rem 1.5rem;

  @media (max-width: 768px) {
    padding: 2.5rem 1rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 0.75rem 0.75rem;
  }
`;

const StudentName = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  color: ${colors.dark};
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const StudentInfo = styled.p`
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  strong {
    color: ${colors.dark};
    font-weight: 500;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin: 0.4rem 0;
    gap: 0.4rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin: 0.3rem 0;
    gap: 0.3rem;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 1rem 0;

  @media (max-width: 768px) {
    margin: 0.75rem 0;
  }

  @media (max-width: 480px) {
    margin: 0.5rem 0;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => 
    props.status === 'admission' ? colors.success : colors.danger};
  color: black;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.7rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
`;

const MaterialsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 0.6rem;
    margin-top: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const MaterialItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 50px;
  background: ${props => props.given ? colors.success : colors.danger};
  color: black;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    gap: 0.25rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
    gap: 0.2rem;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f9f9f9;
  border-top: 1px solid #eee;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.75rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 1rem;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(67, 97, 238, 0.2);
  border-radius: 50%;
  border-top-color: ${colors.primary};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const LoadingText = styled.p`
  font-size: 1rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  padding: 2rem;
  background: rgba(239, 35, 60, 0.1);
  border-radius: 8px;
  color: ${colors.danger};
  text-align: center;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const RetryButton = styled.button`
  padding: 0.5rem 1.5rem;
  background: ${colors.danger};
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: #d00000;
  }
`;

const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  margin: 2rem 0;

  h3 {
    color: ${colors.dark};
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const PrincipalStudentsPage = () => {
  const navigate = useNavigate();
  const { 
    loading: contextLoading, 
    error: contextError, 
    isRefreshing, 
    refreshStudents, 
  } = useStudents();

  const {
    academicYears,
    selectedAcademicYear,
    setSelectedAcademicYear
  } = useAcademicYear();

  const {
    searchTerm,
    setSearchTerm,
    filters: cascadeFilters,
    setFilter,
    clearFilters,
    options: filterOptions,
    students: searchedStudents,
    count,
    page,
    setPage,
    pageSize,
    loading: searchLoading,
    error: searchError,
    refresh: refreshSearch,
    searchHint,
    isBelowMinLength,
  } = useStudentListQuery({
    academicYearId: selectedAcademicYear?.id || '',
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [hiddenClassmobile, setHiddenClassmobile] = useState('');
  
  // Optional client-side post-filters (not part of server cascade)
  const [localFilters, setLocalFilters] = useState({
    hasPendingFees: false,
    materials: {
      books: null,
      uniform: null,
      bag: null
    }
  });

  const loading = searchLoading || contextLoading;
  const error = searchError || contextError;
  
  useEffect(() => {
    const handleResize = () => {
      setHiddenClassmobile(window.innerWidth < 767 ? 'hidden' : '');
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilters && !event.target.closest('.filter-container')) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilters]);

  const handleRefresh = () => {
    refreshStudents();
    refreshSearch();
  };

  const toggleCascadeFilter = (key, value) => {
    setFilter(key, cascadeFilters[key] === value ? '' : value);
  };

  const handleMaterialFilter = (material, value) => {
    setLocalFilters(prev => ({
      ...prev,
      materials: {
        ...prev.materials,
        [material]: prev.materials[material] === value ? null : value
      }
    }));
  };

  const clearAllFilters = () => {
    clearFilters();
    setLocalFilters({
      hasPendingFees: false,
      materials: {
        books: null,
        uniform: null,
        bag: null
      }
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (cascadeFilters.batchId) count++;
    if (cascadeFilters.classNameId) count++;
    if (cascadeFilters.groupId) count++;
    if (cascadeFilters.sectionId) count++;
    if (cascadeFilters.status) count++;
    if (localFilters.hasPendingFees) count++;
    if (localFilters.materials.books !== null) count++;
    if (localFilters.materials.uniform !== null) count++;
    if (localFilters.materials.bag !== null) count++;
    return count;
  };

  let filteredStudents = searchedStudents;
  if (localFilters.hasPendingFees) {
    filteredStudents = filteredStudents.filter(
      (student) => (student.overall_pending_fees ?? student.pending_fees) > 0
    );
  }
  if (localFilters.materials.books !== null) {
    filteredStudents = filteredStudents.filter(
      (student) => Boolean(student.is_bookes_given) === localFilters.materials.books
    );
  }
  if (localFilters.materials.uniform !== null) {
    filteredStudents = filteredStudents.filter(
      (student) => Boolean(student.is_uniform_given) === localFilters.materials.uniform
    );
  }
  if (localFilters.materials.bag !== null) {
    filteredStudents = filteredStudents.filter(
      (student) => Boolean(student.is_bag_given) === localFilters.materials.bag
    );
  }

  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  const handleStudentClick = (studentId) => {
    navigate(`/principal/students/${studentId}`);
  };

  if (error) {
    return (
      <Container hiddenClassmobile={hiddenClassmobile}>
        <Header>
          <Title>Students</Title>
        </Header>
        <ErrorMessage>
          <FiX size={24} />
          {error}
          <RetryButton onClick={handleRefresh}>
            <FiRefreshCw size={16} />
            Retry
          </RetryButton>
        </ErrorMessage>
      </Container>
    );
  }

  if (loading && !isRefreshing) {
    return (
      <Container hiddenClassmobile={hiddenClassmobile}>
        <Header>
          <Title>Students</Title>
          <SearchBar>
            <FiSearch />
            <SearchInput placeholder={getSearchPlaceholder('Search students')} disabled />
          </SearchBar>
          <FilterButton disabled>
            <FiFilter />
            Filter
          </FilterButton>
        </Header>
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Loading students...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <>
      <SEO 
        title="Principal - Students Management"
        description="Principal view for comprehensive student management. View, search, and manage student records, attendance, and academic information."
        keywords="principal, student management, student records, student search, academic records"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Principal - Students Management",
          "description": "Principal view for managing student records and attendance.",
          "url": "https://spoorthi-crm.netlify.app/principal/students"
        }}
      />
      <Container hiddenClassmobile={hiddenClassmobile}>
        <Header>
          <Title>Students</Title>
          <SearchBar>
            <FiSearch />
            <SearchInput 
              type="text" 
              placeholder={getSearchPlaceholder('Search students')} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          
          <FilterContainer className="filter-container">
            <FilterButton 
              onClick={() => setShowFilters(!showFilters)}
              active={showFilters}
            >
              <FiFilter />
              Filter
              {getActiveFiltersCount() > 0 && (
                <FilterBadge>{getActiveFiltersCount()}</FilterBadge>
              )}
              {showFilters ? <FiChevronUp /> : <FiChevronDown />}
            </FilterButton>

            {showFilters && (
              <FilterDropdown>
                <FilterDropdownHeader>
                  <FilterDropdownTitle>Filters</FilterDropdownTitle>
                  <CloseButton onClick={() => setShowFilters(false)}>
                    <FiX />
                  </CloseButton>
                </FilterDropdownHeader>
                
                <FilterSection>
                  <FilterSectionTitle>Academic Year</FilterSectionTitle>
                  <FilterOptions>
                    {academicYears.map(ay => (
                      <FilterOption
                        key={ay.id}
                        active={selectedAcademicYear?.id === ay.id}
                        onClick={() => setSelectedAcademicYear(ay.id)}
                      >
                        {ay.name}
                      </FilterOption>
                    ))}
                  </FilterOptions>
                </FilterSection>

                <FilterSection>
                  <FilterSectionTitle>Batch</FilterSectionTitle>
                  <FilterOptions>
                    {filterOptions.batches.map(batch => (
                      <FilterOption
                        key={batch.id}
                        active={cascadeFilters.batchId === String(batch.id)}
                        onClick={() => toggleCascadeFilter('batchId', String(batch.id))}
                      >
                        {batch.name}
                      </FilterOption>
                    ))}
                  </FilterOptions>
                </FilterSection>

                <FilterSection>
                  <FilterSectionTitle>Class</FilterSectionTitle>
                  <FilterOptions>
                    {filterOptions.classes.map(cls => (
                      <FilterOption
                        key={cls.id}
                        active={cascadeFilters.classNameId === String(cls.id)}
                        onClick={() => toggleCascadeFilter('classNameId', String(cls.id))}
                        disabled={!cascadeFilters.batchId}
                      >
                        {cls.name}
                      </FilterOption>
                    ))}
                  </FilterOptions>
                </FilterSection>

                <FilterSection>
                  <FilterSectionTitle>Group</FilterSectionTitle>
                  <FilterOptions>
                    {filterOptions.groups.map(group => (
                      <FilterOption
                        key={group.id}
                        active={cascadeFilters.groupId === String(group.id)}
                        onClick={() => toggleCascadeFilter('groupId', String(group.id))}
                        disabled={!cascadeFilters.classNameId}
                      >
                        {group.name}
                      </FilterOption>
                    ))}
                  </FilterOptions>
                </FilterSection>

                <FilterSection>
                  <FilterSectionTitle>Section</FilterSectionTitle>
                  <FilterOptions>
                    {filterOptions.sections.map(section => (
                      <FilterOption
                        key={section.id}
                        active={cascadeFilters.sectionId === String(section.id)}
                        onClick={() => toggleCascadeFilter('sectionId', String(section.id))}
                        disabled={!cascadeFilters.groupId}
                      >
                        {section.name}
                      </FilterOption>
                    ))}
                  </FilterOptions>
                </FilterSection>

                <FilterSection>
                  <FilterSectionTitle>Status</FilterSectionTitle>
                  <FilterOptions>
                    {STATUS_CHOICES.map(status => (
                      <FilterOption
                        key={status.value}
                        active={cascadeFilters.status === status.value}
                        onClick={() => toggleCascadeFilter('status', status.value)}
                      >
                        {status.label}
                      </FilterOption>
                    ))}
                  </FilterOptions>
                </FilterSection>

                <FilterSection>
                  <FilterSectionTitle>Materials</FilterSectionTitle>
                  <FilterOptions>
                    <FilterOption
                      active={localFilters.materials.books === true}
                      onClick={() => handleMaterialFilter('books', true)}
                    >
                      Books Given
                    </FilterOption>
                    <FilterOption
                      active={localFilters.materials.books === false}
                      onClick={() => handleMaterialFilter('books', false)}
                    >
                      Books Not Given
                    </FilterOption>
                    <FilterOption
                      active={localFilters.materials.uniform === true}
                      onClick={() => handleMaterialFilter('uniform', true)}
                    >
                      Uniform Given
                    </FilterOption>
                    <FilterOption
                      active={localFilters.materials.uniform === false}
                      onClick={() => handleMaterialFilter('uniform', false)}
                    >
                      Uniform Not Given
                    </FilterOption>
                    <FilterOption
                      active={localFilters.materials.bag === true}
                      onClick={() => handleMaterialFilter('bag', true)}
                    >
                      Bag Given
                    </FilterOption>
                    <FilterOption
                      active={localFilters.materials.bag === false}
                      onClick={() => handleMaterialFilter('bag', false)}
                    >
                      Bag Not Given
                    </FilterOption>
                  </FilterOptions>
                </FilterSection>

                <FilterActions>
                  <ActionButton onClick={clearAllFilters}>
                    Clear All
                  </ActionButton>
                  <ActionButton primary onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </ActionButton>
                </FilterActions>
              </FilterDropdown>
            )}
          </FilterContainer>
        </Header>

        {getActiveFiltersCount() > 0 && (
          <FilterSummary>
            <span>Active filters: {getActiveFiltersCount()}</span>
            <ClearFiltersButton onClick={clearAllFilters}>
              Clear all
            </ClearFiltersButton>
          </FilterSummary>
        )}

        {isRefreshing ? (
          <LoadingContainer>
            <LoadingSpinner />
            <LoadingText>Refreshing data...</LoadingText>
          </LoadingContainer>
        ) : filteredStudents.length === 0 ? (
          <EmptyState>
            <h3>{isBelowMinLength ? 'Keep typing to search' : 'No students found'}</h3>
            <p>{isBelowMinLength ? searchHint : 'Try adjusting your search or filters.'}</p>
          </EmptyState>
        ) : (
          <CardsContainer>
            {filteredStudents.map(student => (
              <StudentCard key={student.id} onClick={() => handleStudentClick(student.id)}>
                <CardHeader>
                  <StudentAvatar>
                    {student.photo ? (
                      <img src={student.photo} alt={student.name} />
                    ) : (
                      getInitials(student.name)
                    )}
                  </StudentAvatar>
                </CardHeader>
                <CardBody>
                  <StudentName>{student.name}</StudentName>
                  <StudentInfo>
                    <strong>Admission No:</strong> {student.admission_no}
                  </StudentInfo>
                  <StudentInfo>
                    <strong>Father:</strong> {student.father_name || 'N/A'}
                  </StudentInfo>
                  <StudentInfo>
                    <strong>Phone:</strong> {Array.isArray(student.phone_numbers) ? student.phone_numbers.join(', ') : (student.phone_numbers || 'N/A')}
                  </StudentInfo>
                  
                  <Divider />
                  
                  <StudentInfo>
                    <strong>Class:</strong> {student.class_name?.name || 'N/A'} ({student.batch})
                  </StudentInfo>
                  <StudentInfo>
                    <strong>Group:</strong> {student.group || 'N/A'}
                  </StudentInfo>
                  
                  <MaterialsList>
                    <MaterialItem given={student.is_bookes_given}>
                      {student.is_bookes_given ? <FiCheck /> : <FiX />}
                      Books
                    </MaterialItem>
                    <MaterialItem given={student.is_uniform_given}>
                      {student.is_uniform_given ? <FiCheck /> : <FiX />}
                      Uniform
                    </MaterialItem>
                    <MaterialItem given={student.is_bag_given}>
                      {student.is_bag_given ? <FiCheck /> : <FiX />}
                      Bag
                    </MaterialItem>
                  </MaterialsList>
                </CardBody>
                
                <CardFooter>
                  <StatusBadge status={student.status}>
                    {student.status}
                  </StatusBadge>
                </CardFooter>
              </StudentCard>
            ))}
          </CardsContainer>
        )}

        <StudentListPagination
          page={page}
          pageSize={pageSize}
          count={count}
          loading={loading}
          onPageChange={setPage}
        />
      </Container>
    </>
  );
};

export default PrincipalStudentsPage;

