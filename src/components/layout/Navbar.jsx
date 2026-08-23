import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, LogOut, Settings as SettingsIcon, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const handleSettings = () => {
    navigate('/settings');
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-title">Inventory Management System</div>
      <div className="navbar-actions">
        <button className="icon-btn" title="Notifications">
          <Bell size={19} />
        </button>
        <div className="navbar-user" ref={menuRef}>
          <button className="navbar-user-btn" onClick={() => setMenuOpen((o) => !o)}>
            <span className="avatar">{user?.fullName?.charAt(0) || 'A'}</span>
            <span className="navbar-user-name">{user?.fullName || 'User'}</span>
            <ChevronDown size={16} />
          </button>
          {menuOpen && (
            <div className="navbar-menu">
              <div className="navbar-menu-header">
                <div className="navbar-menu-name">{user?.fullName}</div>
                <div className="navbar-menu-email">{user?.email}</div>
              </div>
              <div className="navbar-menu-divider" />
              <button className="navbar-menu-item" onClick={handleSettings}>
                <SettingsIcon size={16} /> Settings
              </button>
              <button className="navbar-menu-item danger" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
