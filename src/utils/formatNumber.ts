export function formatLargeNumber(value: number): string {
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`; // Trillion
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`; // Billion
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`; // Million
  }
  return value.toLocaleString(); // Regular number with commas
}
