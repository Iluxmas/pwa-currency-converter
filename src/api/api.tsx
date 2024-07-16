import axios from 'axios';
import { apikey } from './apikey';

const BASE_URL = 'https://api.apilayer.com/fixer';
// const BASE_URL = 'https://api.apilayer.com/exchangerates_data';

export const fetchCodes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/symbols`, {
      headers: {
        apikey: apikey,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Unable to load currency codes');
  }
};

export const fetchRatio = async (base: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/latest`, {
      params: { base },
      headers: {
        apikey: apikey,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Unable to load data');
  }
};
