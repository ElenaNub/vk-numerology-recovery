import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { destinyNumber, getLuckyDaysInMonth } from '../core/calendarUtils.js';

export default function CalendarScreen({ birth, onBack }) {
  /* ——— состояние ——— */
  const [cursor, setCursor] = useState(new Date()); // показываемый месяц

  const year   = cursor.getFullYear();
  const month0 = cursor.getMonth();                // 0‑index

  const lucky = useMemo(() => getLuckyDaysInMonth(birth, year, month0), [birth, year, month0]);

  /* ——— helpers ——— */
  const monthLabel = cursor.toLocaleString('ru-RU', { month: 'long' });
  const daysTotal  = new Date(year, month0 + 1, 0).getDate();

  // сдвиг: JS Sunday=0, Monday‑first ➜ (getDay()+6)%7
  const shift = ((new Date(year, month0, 1).getDay() + 6) % 7);
  const gridCells = [...Array(shift).fill(null), ...Array(daysTotal).keys()].map((v, i) => (v === null ? null : v + 1));

  const listText = [...lucky]
    .sort((a, b) => a - b)
    .map(d => `${String(d).padStart(2, '0')}.${String(month0 + 1).padStart(2, '0')}.${year}`)
    .join(', ');

  /* ——— рендер ——— */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg text-center"
    >
      <button onClick={onBack} className="mb-3 text-amber-300 text-sm">← назад</button>

      {/* навигация по месяцам */}
      <div className="flex justify-between items-center mb-2 select-none">
        <button onClick={() => setCursor(new Date(year, month0 - 1, 1))}>◀</button>
        <span className="font-semibold capitalize">{monthLabel} {year}</span>
        <button onClick={() => setCursor(new Date(year, month0 + 1, 1))}>▶</button>
      </div>

      {/* заголовок дней недели */}
      <div className="grid grid-cols-7 gap-1 text-xs opacity-70 mb-1">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(d => <div key={d}>{d}</div>)}
      </div>

      {/* сетка дат */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {gridCells.map((day, idx) => (
          day === null ? (
            <div key={idx} />
          ) : (
            <div
              key={day}
              className={`py-2 rounded-md text-sm ${lucky.has(day) ? 'bg-amber-400 text-black' : 'bg-white/10'}`}
            >{day}</div>
          )
        ))}
      </div>

      <h3 className="text-sm font-semibold mb-1">Удачные дни этого месяца</h3>
      <p className="text-xs opacity-90 min-h-[2rem]">
        {lucky.size ? listText : 'Нет дат, совпадающих с числом судьбы.'}
      </p>

      <p className="text-xs mt-4 opacity-50">Судьба: {destinyNumber(birth)}</p>
    </motion.div>
  );
}