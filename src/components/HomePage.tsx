import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  // 假设您已经在Vercel中配置了环境变量REACT_APP_ACCESS_PASSWORD
  const accessPassword = process.env.REACT_APP_ACCESS_PASSWORD;

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 这里简单地将输入的密码与环境变量中的密码进行比较
    if (password === accessPassword) {
      // 密码正确，跳转到查询页面
      history.push('/query');
    } else {
      // 密码错误，显示错误信息
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="home-page">
      <form onSubmit={handlePasswordSubmit}>
        <label htmlFor="password">Enter Access Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default HomePage;
