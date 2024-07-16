import axios from 'axios';

const BASE_URL = 'https://api.apilayer.com/fixer';
// const BASE_URL = 'https://api.apilayer.com/exchangerates_data';

export const fetchCodes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/symbols`, {
      headers: {
        apikey: import.meta.env.VITE_API_KEY,
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
        apikey: import.meta.env.VITE_API_KEY,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Unable to load data');
  }
};
