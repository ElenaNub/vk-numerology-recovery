import React from 'react';
import { motion } from 'framer-motion';
import { destinyNumber } from '../core/calendarUtils.js';
import { businessSectors } from '../core/businessUtils.js';

export default function BusinessMenu({ birth, onBack, openCalc }) {
  const destiny = destinyNumber(birth);
  const sectors = businessSectors(destiny);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg space-y-4"
    >
      <button onClick={onBack} className="text-sm text-amber-400 hover:underline">
        ← назад
      </button>

      <h2 className="text-2xl font-bold">Бизнес‑нумерология</h2>

      {/* рекомендованные сферы */}
      <div className="bg-white/10 rounded-xl p-4 text-sm leading-relaxed">
        <p className="font-semibold mb-2">
          Ваше число судьбы {destiny}. Рекомендуемые сферы бизнеса:
        </p>
        <ul className="list-disc list-inside space-y-1">
          {sectors.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="mt-2 opacity-70 text-xs">
          Конечно, это не ограничивает вас только этими направлениями —
          но стартовать в них будет легче.
        </p>
      </div>

      {/* платные инструменты */}
      {[
        { id: 'company', label: 'Расчёт судьбы компании' },
        { id: 'deal',    label: 'Удачный день сделки'   },
        { id: 'partner', label: 'Совместимость партнёров'        },
        { id: 'staff',   label: 'Подбор специальности'      }
      ].map((btn) => (
        <button
          key={btn.id}
          onClick={() => openCalc(btn.id)}
          className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black rounded-xl"
        >
          {btn.label} • 5 голосов
        </button>
      ))}
    </motion.div>
  );
}
