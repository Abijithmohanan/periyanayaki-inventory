import React from 'react';
import { Moon, Sun, User, Mail, Shield } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Settings = () => {
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your account and application preferences" />

      <div className="panel">
        <h3 className="panel-title">Account Information</h3>
        <div className="settings-info-grid">
          <div className="settings-info-item">
            <User size={18} />
            <div>
              <div className="settings-info-label">Full Name</div>
              <div className="settings-info-value">{user?.fullName}</div>
            </div>
          </div>
          <div className="settings-info-item">
            <Mail size={18} />
            <div>
              <div className="settings-info-label">Email</div>
              <div className="settings-info-value">{user?.email}</div>
            </div>
          </div>
          <div className="settings-info-item">
            <Shield size={18} />
            <div>
              <div className="settings-info-label">Role</div>
              <div className="settings-info-value">{user?.role}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h3 className="panel-title">Appearance</h3>
        <div className="settings-toggle-row">
          <div className="settings-toggle-label">
            {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <button
            type="button"
            className={`toggle-switch ${darkMode ? 'on' : ''}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="toggle-knob" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
