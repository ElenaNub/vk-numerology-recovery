const oneDigitMaster = (n) => {
  if ([11, 22, 33].includes(n)) return n;        // 11/22/33 остаются
  return n > 9 ? oneDigitMaster([...String(n)].reduce((s, d) => s + +d, 0)) : n;
};

/** ► полное свёртывание до 1‑9 без исключений (для календаря) */
const oneDigitStrict = (n) => (n > 9 ? oneDigitStrict([...String(n)].reduce((s, d) => s + +d, 0)) : n);

/** число судьбы для отображения (может быть 11/22/33) */
export const destinyNumber = (iso) => oneDigitMaster(
  [...iso.replace(/[^0-9]/g, '')].reduce((s, d) => s + +d, 0)
);

/** "ядро" числа судьбы — всегда 1‑9, нужно для сравнений */
export const destinyDigit = (iso) => oneDigitStrict(
  [...iso.replace(/[^0-9]/g, '')].reduce((s, d) => s + +d, 0)
);

/** число‑дня: сумма всех цифр DD‑MM‑YYYY → 1‑9 */
export const dayNumber = (d /* native Date */) => {
  const digits = `${d.getDate().toString().padStart(2, '0')}${(d.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${d.getFullYear()}`;
  return oneDigitStrict([...digits].reduce((s, n) => s + +n, 0));
};

const daysInMonth = (y, m0) => new Date(y, m0 + 1, 0).getDate();

/** вернуть Set удачных дат (1‑31) по "ядру" судьбы */
export const getLuckyDaysInMonth = (birthISO, year, month0) => {
  const core = destinyDigit(birthISO);   // 1‑9
  const lucky = new Set();

  for (let d = 1, total = daysInMonth(year, month0); d <= total; d++) {
    if (dayNumber(new Date(year, month0, d)) === core) lucky.add(d);
  }
  return lucky;
};