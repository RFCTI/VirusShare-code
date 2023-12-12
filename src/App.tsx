import React, { useState, useEffect } from 'react';
import VirusAPI from './api'; // 导入我们之前创建的 Virus Share API 封装

function App() {
  const [virusInfo, setVirusInfo] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const apiKey = 'YOUR_API_KEY'; // 替换为你的 Virus Share API 密钥

  useEffect(() => {
    // 获取病毒信息示例
    const fetchVirusInfo = async () => {
      try {
        const hash = 'VIRUS_HASH'; // 替换为实际的病毒哈希值
        const response = await VirusAPI.getVirusInfo(apiKey, hash);
        setVirusInfo(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVirusInfo();
  }, []);

  const handleSearch = async (query: string) => {
    try {
      const response = await VirusAPI.searchViruses(apiKey, query);
      setSearchResults(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Virus Information</h1>
      {virusInfo ? (
        <div>
          <h2>{virusInfo.name}</h2>
          <p>{virusInfo.description}</p>
          <p>Category: {virusInfo.category}</p>
          <p>Severity: {virusInfo.severity}</p>
        </div>
      ) : (
        <p>Loading virus information...</p>
      )}

      <h1>Search Viruses</h1>
      <input
        type="text"
        placeholder="Enter a virus name"
        onChange={(e) => handleSearch(e.target.value)}
      />

      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.hash}>{result.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
