import axios from 'axios';

const API_BASE_URL = 'https://virusshare.com/apiv2';

export async function getVirusInfo(apiKey: string, hash: string): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/virus-info?apikey=${apiKey}&hash=${hash}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch virus information');
  }
}

export async function searchViruses(apiKey: string, query: string): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/search-viruses?apikey=${apiKey}&query=${query}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to search viruses');
  }
}

export default {
  getVirusInfo,
  searchViruses,
};
