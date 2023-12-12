import React, { useState } from 'react';
import HashList from './HashList';

// 定义HomePage组件
const HomePage: React.FC = () => {
  // 使用React的useState钩子来管理密码和登录状态
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 定义处理密码输入变化的函数
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 更新密码状态
    setPassword(event.target.value);
  };

  // 定义处理登录的函数
  const handleLogin = () => {
    // 从环境变量中获取正确的密码
    const correctPassword = process.env.Virus_PASSWORD;
    // 检查输入的密码是否与正确的密码匹配
    if (password === correctPassword) {
      // 如果密码匹配，更新登录状态为已登录
      setIsLoggedIn(true);
    } else {
      // 如果密码不匹配，弹出警告消息
      alert('密码错误');
    }
  };

  // 渲染组件
  return (
    <div>
      {/* 如果用户未登录，显示登录表单 */}
      {!isLoggedIn ? (
        <div>
          <h2>请输入密码</h2>
          <input type="password" value={password} onChange={handlePasswordChange} />
          <button onClick={handleLogin}>登录</button>
        </div>
      ) : (
        // 如果用户已登录，显示欢迎信息和查询页面链接或组件
        <div>
          <h2>欢迎访问查询页面</h2>
          {/* 在这里放置查询页面的链接或组件 */}
        </div>
      )}
    </div>
  );
};
class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <HashList />
      </div>
    );
  }
}

// 导出HomePage组件
export default HomePage;