import axios from 'axios';
import { API_BASE_URL } from '../../../services/githubServices';

export const fetchRepos = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No access token found');

  const response = await axios.get(`${API_BASE_URL}/github/repos/fetchLatest`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.repositories;
};
