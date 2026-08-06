import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { createGlobalStyle } from 'styled-components';
import Login from './components/Login';
import SchoolNotFound from './components/SchoolNotFound';
import { StudentsProvider } from './context/StudentsContext';
import { EmployeesProvider } from './context/EmployeesContext';
import { AcademicYearProvider } from './context/AcademicYearContext';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { ThemeProvider } from './theme/ThemeProvider';
import LazyLoader from './components/LazyLoader';
import { isModuleEnabled } from './config/modules';
import { hasRole, resolveRole, ROLES } from './auth/roles';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Users = lazy(() => import('./pages/Users'));
const Settings = lazy(() => import('./pages/Settings'));
const Employees = lazy(() => import('./pages/Employees'));
const StudentDetails = lazy(() => import('./pages/StudentDetails'));
const Expenses = lazy(() => import('./pages/Expenses'));
const Fee = lazy(() => import('./pages/Fee'));
const StoreInventory = lazy(() => import('./pages/StoreInventory'));
const StudentsPage = lazy(() => import('./pages/StudentsPage'));
const EmployeeDetails = lazy(() => import('./pages/EmployeeDetails'));
const Miscellaneous = lazy(() => import('./pages/Miscellaneous'));
const Attendance = lazy(() => import('./pages/Attendance'));
const EmployeeAttendance = lazy(() => import('./pages/EmployeeAttendance'));
const BulkMessages = lazy(() => import('./pages/BulkMessages'));
const UpcomingExams = lazy(() => import('./pages/UpcomingExams'));
const PrincipalStudentsPage = lazy(() => import('./pages/PrincipalStudentsPage'));
const PrincipalStudentDetails = lazy(() => import('./pages/PrincipalStudentDetails'));

const ModuleRoute = ({ moduleId, children }) => {
  const { school } = useSchool();
  return isModuleEnabled(moduleId, school?.modules) ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #A7A7A7;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
`;

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const InchargeRoute = ({ children }) =>
  hasRole(ROLES.INCHARGE, ROLES.ADMIN) ? (
    children
  ) : (
    <Navigate to="/attendance" replace />
  );

const PrincipalRoute = ({ children }) =>
  hasRole(ROLES.PRINCIPAL, ROLES.ADMIN) ? children : <Navigate to="/" replace />;

function AppRoutes() {
  const { known, slug } = useSchool();
  const [role, setRole] = useState(() => resolveRole());

  useEffect(() => {
    const syncRole = () => setRole(resolveRole());
    window.addEventListener('storage', syncRole);
    window.addEventListener('focus', syncRole);
    return () => {
      window.removeEventListener('storage', syncRole);
      window.removeEventListener('focus', syncRole);
    };
  }, []);

  if (!known) {
    return <SchoolNotFound slug={slug} />;
  }

  const getDefaultComponent = () => {
    const currentRole = resolveRole() || role;

    if (currentRole === ROLES.EMPLOYEE) {
      return (
        <LazyLoader>
          <StudentsPage />
        </LazyLoader>
      );
    }

    if (currentRole === ROLES.INCHARGE) {
      return (
        <LazyLoader>
          <Attendance />
        </LazyLoader>
      );
    }

    if (currentRole === ROLES.PRINCIPAL) {
      return (
        <LazyLoader>
          <PrincipalStudentsPage />
        </LazyLoader>
      );
    }

    return (
      <LazyLoader>
        <Dashboard />
      </LazyLoader>
    );
  };

  return (
    <AcademicYearProvider>
      <StudentsProvider>
        <EmployeesProvider>
          <Router>
            <GlobalStyle />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Routes>
                        <Route path="/" element={getDefaultComponent()} />
                        <Route
                          path="/Students"
                          element={
                            <InchargeRoute>
                              <LazyLoader>
                                <Users />
                              </LazyLoader>
                            </InchargeRoute>
                          }
                        />
                        <Route
                          path="/students/:id"
                          element={
                            <InchargeRoute>
                              <LazyLoader>
                                <StudentDetails />
                              </LazyLoader>
                            </InchargeRoute>
                          }
                        />
                        <Route
                          path="/employees/:id"
                          element={
                            <InchargeRoute>
                              <LazyLoader>
                                <EmployeeDetails />
                              </LazyLoader>
                            </InchargeRoute>
                          }
                        />
                        <Route
                          path="/employees"
                          element={
                            <InchargeRoute>
                              <LazyLoader>
                                <Employees />
                              </LazyLoader>
                            </InchargeRoute>
                          }
                        />
                        <Route
                          path="/fee"
                          element={
                            <InchargeRoute>
                              <LazyLoader>
                                <Fee />
                              </LazyLoader>
                            </InchargeRoute>
                          }
                        />
                        <Route
                          path="/miscellaneous"
                          element={
                            <InchargeRoute>
                              <LazyLoader>
                                <Miscellaneous />
                              </LazyLoader>
                            </InchargeRoute>
                          }
                        />
                        <Route
                          path="/store"
                          element={
                            <InchargeRoute>
                              <LazyLoader>
                                <StoreInventory />
                              </LazyLoader>
                            </InchargeRoute>
                          }
                        />
                        <Route
                          path="/expenses"
                          element={
                            <InchargeRoute>
                              <LazyLoader>
                                <Expenses />
                              </LazyLoader>
                            </InchargeRoute>
                          }
                        />
                        <Route
                          path="/settings"
                          element={
                            <InchargeRoute>
                              <LazyLoader>
                                <Settings />
                              </LazyLoader>
                            </InchargeRoute>
                          }
                        />
                        <Route
                          path="/attendance"
                          element={
                            <LazyLoader>
                              <Attendance />
                            </LazyLoader>
                          }
                        />
                        <Route
                          path="/employee-attendance"
                          element={
                            <LazyLoader>
                              <EmployeeAttendance />
                            </LazyLoader>
                          }
                        />
                        <Route
                          path="/bulk-messages"
                          element={
                            <InchargeRoute>
                              <LazyLoader>
                                <BulkMessages />
                              </LazyLoader>
                            </InchargeRoute>
                          }
                        />
                        <Route
                          path="/upcoming-exams"
                          element={
                            <ModuleRoute moduleId="upcomingExams">
                              <InchargeRoute>
                                <LazyLoader>
                                  <UpcomingExams />
                                </LazyLoader>
                              </InchargeRoute>
                            </ModuleRoute>
                          }
                        />
                        <Route
                          path="/principal/students"
                          element={
                            <PrincipalRoute>
                              <LazyLoader>
                                <PrincipalStudentsPage />
                              </LazyLoader>
                            </PrincipalRoute>
                          }
                        />
                        <Route
                          path="/principal/students/:id"
                          element={
                            <PrincipalRoute>
                              <LazyLoader>
                                <PrincipalStudentDetails />
                              </LazyLoader>
                            </PrincipalRoute>
                          }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </Layout>
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </EmployeesProvider>
      </StudentsProvider>
    </AcademicYearProvider>
  );
}

function App() {
  return (
    <SchoolProvider>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </SchoolProvider>
  );
}

export default App;
