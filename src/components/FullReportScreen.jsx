
import React from 'react';
import { motion } from 'framer-motion';
import { destinyNumber } from '../core/calendarUtils.js';
import texts from '../data/fullReportTexts.js';

// Компонент-секция для каждого раздела отчёта
function Section({ title, text }) {
  return (
    <div className="bg-white/10 rounded-xl px-4 py-3 shadow-sm space-y-1">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm opacity-90 leading-snug whitespace-pre-line">{text}</p>
    </div>
  );
}

export default function FullReportScreen({ birth, onBack }) {
  const destiny = destinyNumber(birth);
  const T = texts[destiny];

  // Просто вызываем окно печати браузера — PDF получится с встроенным системным шрифтом
  const handlePrint = () => window.print();

  return (
    <motion.div
      key="fullReport"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative w-full flex justify-center p-4"
    >
      <div
        className="w-full max-w-[600px] mx-auto bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg space-y-5 print:bg-white print:text-black print:shadow-none"
      >
        <button
          onClick={onBack}
          className="text-sm text-amber-400 hover:underline print:hidden"
        >
          ← назад
        </button>

        <h2 className="text-2xl font-bold mb-2">Полный отчёт • Число {destiny}</h2>

        <Section title="Введение" text={T.intro} />
        <Section title="О вашем числе судьбы" text={T.calc} />
        <Section title="Характеристика личности" text={T.personality} />
        <Section title="Жизненное предназначение" text={T.destiny} />
        <Section title="Испытания и вызовы" text={T.challenges} />
        <Section title="Совместимость" text={T.compatibility} />
        <Section title="Кармические уроки" text={T.yearly} />
        <Section title="Практические советы" text={T.tips} />
        <Section title="Рекомендуемые сферы деятельности" text={T.conclusion} />

        <button
          onClick={handlePrint}
          className="mt-4 w-full py-3 bg-amber-400 text-black rounded-xl font-semibold hover:bg-amber-300 print:hidden"
        >
          Печать в PDF
        </button>
      
        {/* Вторичная кнопка назад внизу */}
        <button
          onClick={onBack}
          className="mt-2 w-full py-2 text-sm text-amber-400 hover:underline print:hidden"
        >
          ← назад
        </button>
      </div>
    </motion.div>
  );
}
