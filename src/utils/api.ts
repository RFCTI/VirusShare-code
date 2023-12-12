import axios from 'axios';

const API_BASE_URL = 'https://virusshare.com/apiv2';

export async function getVirusInfo(hash: string): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/virus-info?apikey=${process.env.VIRUS_API_KEY}&hash=${hash}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch virus information');
  }
}

export async function searchViruses(query: string): Promise<any> {
  try {
    const response = await axios.get(`${API_BASE_URL}/search-viruses?apikey=${process.env.VIRUS_API_KEY}&query=${query}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to search viruses');
  }
}

export default {
  getVirusInfo,
  searchViruses,
};