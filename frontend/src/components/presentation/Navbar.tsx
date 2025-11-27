import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  currentPage: 'courses' | 'specialisations';
  onNavigate: (page: 'courses' | 'specialisations') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { logout, token } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleLogout = async () => {
    if (token) {
      await logout();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="text-2xl mr-2">🎓</span>
          <span className="font-bold text-xl">Academic ERP</span>
        </div>

        <div className="navbar-links">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('courses'); }}
            className={`navbar-link ${currentPage === 'courses' ? 'active' : ''}`}
          >
            Courses
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('specialisations'); }}
            className={`navbar-link ${currentPage === 'specialisations' ? 'active' : ''}`}
          >
            Specialisations
          </a>
        </div>

        <div className="navbar-actions">
          {token && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600 border border-blue-200 shadow-sm mr-3 lowercase">
              {useAuth().role || 'user'}
            </span>
          )}
          <button
            onClick={toggleDarkMode}
            className="btn-icon"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <button
            onClick={handleLogout}
            className="btn-icon text-danger"
            title="Logout"
            style={{ borderColor: 'var(--color-danger)' }}
          >
            🚪
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
