import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import mainLogo from '../../assets/main-logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (login(username, password)) {
        navigate('/dashboard');
      } else {
        setError('Invalid username or password. Try Admin / Password123');
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <img src={mainLogo} alt="Periyanayaki Kitchen Engineering" className="login-logo" />
          <p>Inventory Management System</p>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleLogin} className="form">
          <div className="form-group">
            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} autoFocus />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword((s) => !s)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading || !username || !password}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <span>Demo Credentials:</span>
          <p>Username: <strong>Admin</strong></p>
          <p>Password: <strong>Password123</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
