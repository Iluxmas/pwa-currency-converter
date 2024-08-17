import { symbols } from './mockData';

export const mockFetchCodes = async () => {
  return new Promise((resolve, reject) => {
    const shouldThrowError = Math.random() < 0.01;
    console.log('🟢 mock api call 🟢');

    setTimeout(() => {
      if (shouldThrowError) {
        reject('Unable to load currency codes');
      } else {
        resolve({
          success: true,
          symbols
        });
      }
    }, 1000); // Simulate network delay
  });
};


export const mockFetchRatio = async (base: string) => {
  return new Promise((resolve, reject) => {
    const shouldThrowError = Math.random() < 0.01;
    console.log('🟢 mock api call 🟢');

    setTimeout(() => {
      if (shouldThrowError) {
        reject('Unable to load data');
      } else {
        const rates = Object.keys(symbols).reduce((acc: Record<string, number>, c) => {
          acc[c] = Math.random() * 100
          return acc
        }, {} as Record<string, number>)

        resolve({
          rates,
          success: true,
          timestamp: 1519296206,
          base: base,
          date: new Date().toISOString(),
        });
      }
    }, 1000); // Simulate network delay
  });
};