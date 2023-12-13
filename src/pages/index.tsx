import React, { useState } from 'react';
import QueryPage from './QueryPage';

const IndexPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    const accessPassword = process.env.REACT_APP_ACCESS_PASSWORD;
    if (password === accessPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (isAuthenticated) {
    return <QueryPage />;
  }

  return (
    <div className="login-page">
      <input
        type="password"
        placeholder="Enter Access Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default IndexPage;
