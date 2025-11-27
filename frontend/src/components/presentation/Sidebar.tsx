import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
    currentPage: 'courses' | 'specialisations';
    onNavigate: (page: 'courses' | 'specialisations') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
    const { logout, token } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();

    const handleLogout = async () => {
        if (token) {
            await logout();
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <span>🎓</span> Academic ERP
            </div>

            <nav className="sidebar-nav">
                <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onNavigate('courses'); }}
                    className={`sidebar-nav-item ${currentPage === 'courses' ? 'active' : ''}`}
                >
                    <span>📚</span> Courses
                </a>

                <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onNavigate('specialisations'); }}
                    className={`sidebar-nav-item ${currentPage === 'specialisations' ? 'active' : ''}`}
                >
                    <span>⭐</span> Specialisations
                </a>
            </nav>

            <div className="sidebar-footer">
                <button
                    onClick={toggleDarkMode}
                    className="btn-icon"
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {darkMode ? '☀️' : '🌙'}
                </button>

                <button
                    onClick={handleLogout}
                    className="btn-icon"
                    style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
                    title="Logout"
                >
                    🚪
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
