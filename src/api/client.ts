export async function simulateApiCall<T>(data: T, delay: number = 500): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}

export async function simulateApiCallWithError<T>(
  data: T,
  delay: number = 500,
  errorRate: number = 0
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < errorRate) {
        reject(new Error('Network error: Failed to fetch data'));
      }
      resolve(data);
    }, delay);
  });
}
