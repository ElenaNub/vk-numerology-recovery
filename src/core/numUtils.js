import meanings from '../data/meanings.json';

export function sumDigits(arr) {
  return arr.reduce((sum, n) => sum + n, 0);
}

/** Рекурсивно сводит число к однозначному (мастер‑чисел НЕ оставляем) */
export function reduceToOneDigit(n) {
  const m = Math.abs(Math.floor(n));
  if (m < 10) return m;
  const digits = String(m).split('').map(Number);
  const s = sumDigits(digits);
  return reduceToOneDigit(s);
}

export function calcDestinyNumber(dateStr) {
  // dateStr: YYYY-MM-DD
  const digits = dateStr.replace(/-/g, '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (![11, 22, 33].includes(sum) && sum > 9) {
    sum = sum
      .toString()
      .split('')
      .reduce((a, b) => a + +b, 0);
  }
  return sum;
}

export function getMeaning(num) {
  return meanings[num] ?? 'Описание отсутствует';
}