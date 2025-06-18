// ================= components/PassportScreen.jsx =================
import React from 'react';
import { motion } from 'framer-motion';
import { destinyNumber } from '../core/calendarUtils.js';
import { getMeaning }   from '../core/numUtils.js';

export default function PassportScreen({ birth, onBack, onBuy }) {
  const destiny = destinyNumber(birth);     // сохраняет 11 / 22 / 33
  const meaning = getMeaning(destiny);

  return (
    <motion.div
      key="passport"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg"
    >
      <button onClick={onBack} className="mb-4 text-sm text-amber-400 hover:underline">
        ← назад
      </button>

      <h2 className="text-2xl font-bold mb-4">Паспорт души</h2>

      <p className="mb-2 text-sm opacity-80">
        Дата рождения: {birth.split('-').reverse().join('.')}
      </p>

      <div className="bg-white/10 rounded-xl p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Число судьбы: {destiny}</h3>
        <p>{meaning}</p>
      </div>

      {/* кнопка покупки полного отчёта */}
      <button
        onClick={() => onBuy(destiny)}
        className="w-full py-2 bg-amber-400 text-black rounded-md mb-4 hover:bg-amber-300 active:bg-amber-500"
      >
        Полный отчёт — 50 ₽ / 3 голоса
      </button>

      <p className="text-xs opacity-60">
        *Это базовая версия паспорта. Полный отчёт с кармическими хвостами и советами
        по годам — скоро!*
      </p>
    </motion.div>
  );
}
// ================= end PassportScreen =================
