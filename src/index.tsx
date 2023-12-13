import React, { useState } from 'react';
import './App.css'; // 假设您的样式文件叫App.css

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const IndexPage = () => {
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [hashes, setHashes] = useState('');
  const [output, setOutput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 验证密码
  const handlePasswordSubmit = () => {
    if (password === process.env.REACT_APP_ACCESS_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  // 更新API Key
  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  // 更新哈希输入
  const handleHashesChange = (e) => {
    setHashes(e.target.value);
  };

  // 发送请求到VirusShare API
  const fetchHashInfo = async (hash) => {
    const response = await fetch(`https://virusshare.com/apiv2/file?apikey=${apiKey}&hash=${hash}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  // 处理查询
  const handleQuery = async () => {
    const hashList = hashes.split('\n').filter(h => h);
    const results = [];
    setIsLoading(true);

    for (const hash of hashList) {
      try {
        const result = await fetchHashInfo(hash);
        results.push(result);
      } catch (error) {
        console.error('Error querying hash:', error);
        results.push({ hash, error: error.message });
      }
      await delay(25000); // 等待25秒
    }

    setIsLoading(false);
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
      <div className="login-container">
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
    <div className="query-container">
      <div className="api-key-container">
        <input
          type="text"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Virus Share API Key"
        />
      </div>
      <div className="hash-input-container">
        <textarea
          value={hashes}
          onChange={handleHashesChange}
          placeholder="Enter MD5/Hashes (one per line)"
        />
      </div>
      <div className="output-container">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <pre className="output">{output}</pre> // 这里可以使用第三方库来实现JSON的代码高亮
        )}
      </div>
      <div className="query-footer">
        <button onClick={handleQuery} disabled={isLoading}>Query Hashes</button>
        <button onClick={handleDownload}>Download Results</button>
      </div>
    </div>
  );
};

export default IndexPage;
