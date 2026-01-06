export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    if (ms <= 0) {
      resolve();
    } else {
      setTimeout(resolve, ms);
    }
  });
}
