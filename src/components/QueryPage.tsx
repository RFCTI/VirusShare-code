import React, { useState } from 'react';
import { fetchData } from '../utils/api';

const QueryPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleQuery = async () => {
    if (inputValue) {
      setIsLoading(true);

      try {
        const response = await fetchData(inputValue); // 调用发送API请求的工具函数
        setOutputValue(JSON.stringify(response, null, 2)); // 将响应数据转换为格式化的JSON字符串
      } catch (error) {
        console.error('查询失败:', error);
        setOutputValue('查询失败，请重试');
      }

      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    // 下载当前查询结果的逻辑
    // ...
  };

  return (
    <div>
      <h2>查询页面</h2>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleQuery} disabled={isLoading}>
          查询
        </button>
      </div>
      {isLoading ? (
        <div>正在查询，请稍候...</div>
      ) : (
        <div>
          <pre>{outputValue}</pre>
          <button onClick={handleDownload}>下载结果</button>
        </div>
      )}
    </div>
  );
};

export default QueryPage;
