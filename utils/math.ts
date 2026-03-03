/**
 * Get a random integer between min and max (inclusive)
 * Used for: generating random numbers in question parameters
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get a random element from an array
 * Used for: selecting random values, shuffling answer choices
 */
export function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Shuffle an array (Fisher-Yates algorithm)
 * Used for: randomizing option order, creating varied question sets
 * Returns a new array (doesn't mutate original)
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate a random ID (useful for question IDs if needed)
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

/**
 * Round to a specific number of decimal places
 * Used for: cleaning up floating point numbers in answers
 */
export function round(num: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

/**
 * Check if a number is a perfect square
 * Used for: generating nice radicals, factoring problems
 */
export function isPerfectSquare(n: number): boolean {
  if (n < 0) return false;
  const root = Math.sqrt(n);
  return Number.isInteger(root);
}

/**
 * Get factors of a number
 * Used for: factoring problems, GCF/LCM questions
 */
export function getFactors(n: number): number[] {
  const factors: number[] = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i !== n / i) factors.push(n / i);
    }
  }
  return factors.sort((a, b) => a - b);
}