import { apikey } from './apikey';

// const apiURL = 'https://api.apilayer.com/fixer';
const BASE_URL = 'https://api.apilayer.com/exchangerates_data';

export const fetchCodes = async () => {
  const response = await fetch(`${BASE_URL}/symbols`, {
    headers: {
      apikey: apikey,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Unable to load currency codes');
  }
  return response.json();
};

export const fetchRatio = async (base: string) => {
  const response = await fetch(`${BASE_URL}/latest?base=${base}`, {
    headers: {
      apikey: apikey,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Unable to load data');
  }
  return response.json();
};
