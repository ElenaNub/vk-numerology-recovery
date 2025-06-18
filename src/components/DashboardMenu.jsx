import React from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'passport', label: 'Паспорт души' },
  { id: 'matrix', label: 'Матрица Пифагора' },
  { id: 'calendar', label: 'Календарь удачи' },
  { id: 'compat', label: 'Совместимость' },
  { id: 'business', label: 'Бизнес‑нумерология' },
];

export default function DashboardMenu({ birth, destiny, onSelect, onChangeBirth }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md flex flex-col items-center gap-6"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold mb-1">Ваше число судьбы: {destiny}</h2>
        <p className="text-sm opacity-80">Дата рождения: {birth.split('-').reverse().join('.')}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 w-full">
        {sections.map((s) => (
          <button
            key={s.id}
            className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-lg shadow-md"
            onClick={() => onSelect(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <button onClick={onChangeBirth} className="mt-4 text-xs text-amber-300 underline hover:text-amber-200">
        Ввести другую дату
      </button>
    </motion.div>
  );
}
