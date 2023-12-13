import React, { useState } from 'react';
import { queryHash } from './api'; // 假设我们已经有了api.ts文件

const App = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_VIRUS_SHARE_API_KEY || '');
  const [hashInput, setHashInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 验证密码
  const handlePasswordSubmit = () => {
    if (password === process.env.REACT_APP_ACCESS_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  // 处理API Key的变更
  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  // 处理哈希输入的变更
  const handleHashInputChange = (event) => {
    setHashInput(event.target.value);
  };

  // 发送查询请求
  const handleSubmit = async () => {
    const hashes = hashInput.split('\n').filter(Boolean);
    let results = [];

    for (const hash of hashes) {
      setIsLoading(true);
      try {
        const result = await queryHash(hash);
        results.push(result);
      } catch (error) {
        console.error('Error querying hash:', error);
        results.push({ hash, error: error.message });
      }
      setIsLoading(false);
    }

    setOutput(JSON.stringify(results, null, 2));
  };

  // 下载结果
  const handleDownload = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'hash-results.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Access Password"
        />
        <button onClick={handlePasswordSubmit}>Submit</button>
      </div>
    );
  }

  return (
    <div className="query-page">
      <div className="api-key-container">
        <input
          type="text"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Enter Virus Share API Key"
        />
      </div>
      <div className="query-container">
        <div className="query-input">
          <textarea
            value={hashInput}
            onChange={handleHashInputChange}
            placeholder="Enter MD5/Hashes (one per line)"
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className="query-output">
          {isLoading ? (
            <div className="loading-indicator">Loading...</div>
          ) : (
            <pre>{output}</pre> // 这里可以使用第三方库来实现JSON的代码高亮
          )}
        </div>
      </div>
      <div className="download-button">
        <button onClick={handleDownload}>Download Results</button>
      </div>
    </div>
  );
};

export default App;
