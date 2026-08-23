import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Warehouse, Users, Truck, Settings as SettingsIcon, LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import minimalLogo from '../../assets/minimal-logo.png';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Products', icon: Package, path: '/products' },
  { label: 'Inventory', icon: Warehouse, path: '/inventory' },
  { label: 'Buyers', icon: Users, path: '/buyers' },
  { label: 'Dispatch', icon: Truck, path: '/dispatch' },
  { label: 'Settings', icon: SettingsIcon, path: '/settings' },
  { label: 'Catalog', icon: BookOpen, path: '/catalog' },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img src={minimalLogo} alt="Periyanayaki Kitchen Engineering" className="sidebar-brand-logo" />
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
          >
            <item.icon size={19} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        <LogOut size={19} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
