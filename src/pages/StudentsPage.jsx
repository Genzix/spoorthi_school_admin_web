import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiSend, FiCheck, FiX, FiRefreshCw, FiSearch, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useStudents } from '../context/StudentsContext';
import { useAcademicYear } from '../context/AcademicYearContext';
import SEO from '../components/SEO';

// Modern color palette
const colors = {
  primary: '#FFE5B9',
  secondary: '#FFE5B9',
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
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: ${colors.dark};
  margin: 0;
  font-weight: 600;
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
    width: 90vw;
    max-width: 400px;
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
  }
`;

const StudentCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
`;

const CardHeader = styled.div`
  position: relative;
  height: 120px;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  display: flex;
  align-items: flex-end;
  padding: 1rem;
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
`;

const CardBody = styled.div`
  padding: 3rem 1.5rem 1.5rem;
`;

const StudentName = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  color: ${colors.dark};
  font-weight: 600;
`;

const StudentInfo = styled.p`
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  strong {
    color: ${colors.dark};
    font-weight: 500;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 1rem 0;
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
`;

const MaterialsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
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
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f9f9f9;
  border-top: 1px solid #eee;
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

const StudentsPage = () => {
  const { 
    students, 
    loading, 
    error, 
    isRefreshing, 
    refreshStudents, 
    getFilteredStudents,
    getUniqueValues
  } = useStudents();

  const {
    academicYears,
    selectedAcademicYear,
    setSelectedAcademicYear
  } = useAcademicYear();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [hiddenClassmobile, setHiddenClassmobile] = useState('');
  
  // Filter states
  const [filters, setFilters] = useState({
    batch: '',
    class: '',
    group: '',
    section: '',
    status: '',
    hasPendingFees: false,
    materials: {
      books: null,
      uniform: null,
      bag: null
    }
  });

  // Get unique values for filter options
  const batches = getUniqueValues('batch');
  const classes = getUniqueValues('class');
  const groups = getUniqueValues('group');
  const sections = getUniqueValues('section');
  const statuses = getUniqueValues('status');
  
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
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value
    }));
  };

  const handleMaterialFilter = (material, value) => {
    setFilters(prev => ({
      ...prev,
      materials: {
        ...prev.materials,
        [material]: prev.materials[material] === value ? null : value
      }
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      batch: '',
      class: '',
      group: '',
      section: '',
      status: '',
      hasPendingFees: false,
      materials: {
        books: null,
        uniform: null,
        bag: null
      }
    });
    setSearchTerm('');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (filters.batch) count++;
    if (filters.class) count++;
    if (filters.group) count++;
    if (filters.section) count++;
    if (filters.status) count++;
    if (filters.hasPendingFees) count++;
    if (filters.materials.books !== null) count++;
    if (filters.materials.uniform !== null) count++;
    if (filters.materials.bag !== null) count++;
    return count;
  };

  const filteredStudents = getFilteredStudents({
    searchTerm,
    ...filters
  });

  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
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
            <SearchInput placeholder="Search students..." disabled />
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
        title="Students Management"
        description="Comprehensive student management system. View, search, and manage student records, attendance, and academic information."
        keywords="student management, student records, student search, academic records, school students"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Students Management",
          "description": "Comprehensive student management system for viewing and managing student records.",
          "url": "https://spoorthi-crm.netlify.app/Students",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Students List",
            "description": "List of all students in the school"
          }
        }}
      />
      <Container hiddenClassmobile={hiddenClassmobile}>
        <Header>
          <SearchBar>
            <FiSearch />
            <SearchInput 
              type="text" 
              placeholder="Search students..." 
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
                    {batches.map(batch => (
                      <FilterOption
                        key={batch}
                        active={filters.batch === batch}
                        onClick={() => handleFilterChange('batch', batch)}
                      >
                        {batch}
                      </FilterOption>
                    ))}
                  </FilterOptions>
                </FilterSection>

                <FilterSection>
                  <FilterSectionTitle>Class</FilterSectionTitle>
                  <FilterOptions>
                    {classes.map(cls => (
                      <FilterOption
                        key={cls}
                        active={filters.class === cls}
                        onClick={() => handleFilterChange('class', cls)}
                      >
                        {cls}
                      </FilterOption>
                    ))}
                  </FilterOptions>
                </FilterSection>

                <FilterSection>
                  <FilterSectionTitle>Group</FilterSectionTitle>
                  <FilterOptions>
                    {groups.map(group => (
                      <FilterOption
                        key={group}
                        active={filters.group === group}
                        onClick={() => handleFilterChange('group', group)}
                      >
                        {group}
                      </FilterOption>
                    ))}
                  </FilterOptions>
                </FilterSection>

                <FilterSection>
                  <FilterSectionTitle>Section</FilterSectionTitle>
                  <FilterOptions>
                    {sections.map(section => (
                      <FilterOption
                        key={section}
                        active={filters.section === section}
                        onClick={() => handleFilterChange('section', section)}
                      >
                        {section}
                      </FilterOption>
                    ))}
                  </FilterOptions>
                </FilterSection>

                <FilterSection>
                  <FilterSectionTitle>Status</FilterSectionTitle>
                  <FilterOptions>
                    {statuses.map(status => (
                      <FilterOption
                        key={status}
                        active={filters.status === status}
                        onClick={() => handleFilterChange('status', status)}
                      >
                        {status}
                      </FilterOption>
                    ))}
                  </FilterOptions>
                </FilterSection>

                <FilterSection>
                  <FilterSectionTitle>Materials</FilterSectionTitle>
                  <FilterOptions>
                    <FilterOption
                      active={filters.materials.books === true}
                      onClick={() => handleMaterialFilter('books', true)}
                    >
                      Books Given
                    </FilterOption>
                    <FilterOption
                      active={filters.materials.books === false}
                      onClick={() => handleMaterialFilter('books', false)}
                    >
                      Books Not Given
                    </FilterOption>
                    <FilterOption
                      active={filters.materials.uniform === true}
                      onClick={() => handleMaterialFilter('uniform', true)}
                    >
                      Uniform Given
                    </FilterOption>
                    <FilterOption
                      active={filters.materials.uniform === false}
                      onClick={() => handleMaterialFilter('uniform', false)}
                    >
                      Uniform Not Given
                    </FilterOption>
                    <FilterOption
                      active={filters.materials.bag === true}
                      onClick={() => handleMaterialFilter('bag', true)}
                    >
                      Bag Given
                    </FilterOption>
                    <FilterOption
                      active={filters.materials.bag === false}
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
            <h3>No students found</h3>
            <p>Try adjusting your search or filters.</p>
          </EmptyState>
        ) : (
          <CardsContainer>
            {filteredStudents.map(student => (
              <StudentCard key={student.id}>
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
                    <strong>Phone:</strong> {student.phone_numbers.join(', ') || 'N/A'}
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
      </Container>
    </>
  );
};

export default StudentsPage;