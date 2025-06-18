// ========== src/core/matrixUtils.js ==========
/**
 * Классическая психоматрица «по Пифагору».
 * Добавляем к исходным цифрам даты ещё четыре расчётных числа:
 *   S1  = сумма всех цифр даты
 *   S2  = сумма цифр S1
 *   S3  = S1 − 2 × (первая цифра дня)
 *   S4  = сумма цифр S3
 * Затем считаем, сколько раз каждая цифра (1‑9) встретилась.
 */
export function getDigitCounts(dateStr) {
  // превращаем YYYY‑MM‑DD → массив чисел
  const digits = dateStr.split('').filter((c) => /\d/.test(c)).map(Number);

  // helper: разложить число на ненулевые цифры и положить в массив
  const pushDigits = (arr, num) =>
    num
      .toString()
      .split('')
      .map(Number)
      .filter((d) => d !== 0)
      .forEach((d) => arr.push(d));

  const bucket = [];

  /* 1) исходные цифры даты (без нулей) */
  pushDigits(bucket, Number(digits.join('')));

  /* 2) S1 */
  const s1 = digits.reduce((a, b) => a + b, 0);
  pushDigits(bucket, s1);

  /* 3) S2 */
  const s2 = s1
    .toString()
    .split('')
    .map(Number)
    .reduce((a, b) => a + b, 0);
  pushDigits(bucket, s2);

  /* 4) S3 */
  const dayFirstDigit = Number(dateStr.slice(8, 9)); // первая цифра «дня»
  const s3 = s1 - 2 * dayFirstDigit;
  pushDigits(bucket, s3);

  /* 5) S4 */
  const s4 = s3
    .toString()
    .split('')
    .map(Number)
    .reduce((a, b) => a + b, 0);
  pushDigits(bucket, s4);

  /* финальный счёт 1…9 */
  const counts = Object.fromEntries(Array.from({ length: 9 }, (_, i) => [i + 1, 0]));
  bucket.forEach((d) => (counts[d] += 1));
  return counts;
}
export function getMatrixStrings(dateStr) {
  // убираем дефисы, разбиваем на цифры
  const digits = dateStr.replace(/-/g, '').split('').map(Number);

  // считаем вхождения 1–9
  const counts = {};
  digits.forEach((d) => {
    if (d >= 1 && d <= 9) {
      counts[d] = (counts[d] || 0) + 1;
    }
  });

  // для каждого числа от 1 до 9, если оно встречается, пушим строку вида "DDD…"
  const result = [];
  for (let d = 1; d <= 9; d++) {
    if (counts[d]) {
      result.push(String(d).repeat(counts[d]));
    }
  }

  return result;
}