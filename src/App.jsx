import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { InventoryProvider } from './context/InventoryContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import AppRoutes from './routes/AppRoutes';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <AppRoutes />;
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <Navbar />
      <main className="main-content">
        <AppRoutes />
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <InventoryProvider>
            <AppContent />
          </InventoryProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
