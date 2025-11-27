import React, { useState, useEffect } from 'react';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const LoginContainer: React.FC = () => {
  const { login } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '1040059054332-afht62pg4j3n8kruupeabp6ldtjgh1j5.apps.googleusercontent.com',
          callback: handleGoogleResponse
        });
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          {
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: 'continue_with'
          }
        );
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleGoogleResponse = async (response: any): Promise<void> => {
    setLoading(true);
    setError(null);
    const res = await API.googleLogin(response.credential);
    setLoading(false);
    if ('token' in res) {
      login(res.token, res.role);
    } else if ('error' in res) {
      setError(res.error || 'Google login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Side - Visual */}
        <div className="login-visual">
          <div className="login-visual-content">
            <div className="login-logo-large">
              🎓
            </div>
            <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
            <p className="text-blue-100 text-center">
              Where Knowledge Meets Innovation. Your gateway to a smarter academic future.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-form-section">
          <button
            onClick={toggleDarkMode}
            className="btn-icon"
            style={{ position: 'absolute', top: '1rem', right: '1rem', border: 'none' }}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <div className="mb-6">
            <h1 className="login-title text-center">Sign In</h1>
            <p className="login-subtitle text-center">Access your dashboard</p>
          </div>

          {error && (
            <div className="alert alert-danger mb-4">
              ⚠️ {error}
            </div>
          )}

          <div className="mb-6 text-center text-gray-500">
            Please sign in with your Google account to continue.
          </div>

          <div id="googleSignInButton" className="w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
