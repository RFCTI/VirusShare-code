const API_BASE_URL = 'https://virusshare.com/apiv2';
const API_KEY = process.env.VIRUS_SHARE_API_KEY; // 从环境变量获取Virus share API的Key

/**
 * 延迟执行的Promise函数
 * @param {number} ms 毫秒数
 * @returns Promise
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 查询哈希值
 * @param {string} hashString MD5或哈希字符串
 * @returns Promise
 */
async function queryHash(hashString: string): Promise<any> {
  // 构建请求URL
  const url = `${API_BASE_URL}/<request>?apikey=${API_KEY}&hash=${hashString}`;

  try {
    // 发送请求前等待25秒
    await delay(25000);

    // 发送请求
    const response = await fetch(url, {
      method: 'GET',
    });

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 解析JSON响应
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error querying hash:', error);
    throw error;
  }
}

export { queryHash };
