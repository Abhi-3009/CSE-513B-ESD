import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LoginContainer from './components/containers/LoginContainer';
import CoursesContainer from './components/containers/CoursesContainer';
import SpecialisationsContainer from './components/containers/SpecialisationsContainer';

type Page = 'courses' | 'specialisations';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('courses');

  if (!isAuthenticated()) {
    return <LoginContainer />;
  }

  if (currentPage === 'specialisations') {
    return <SpecialisationsContainer onNavigateToCourses={() => setCurrentPage('courses')} />;
  }

  return <CoursesContainer onNavigateToSpecialisations={() => setCurrentPage('specialisations')} />;
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
