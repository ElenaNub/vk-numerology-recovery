// src/components/CompanyFortuneScreen.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sumDigits, reduceToOneDigit } from '../core/numUtils.js';

// Описания для каждого однозначного числа
const companyFateMap = {
  1: '★★★★★ Единица — это число идеально для компаний, стремящихся к лидерству на рынке. Оно обеспечит постепенный, но устойчивый рост бизнеса, без существенных кризисов.',
  2: '★★ Двойка — неоднозначное число для компании. Успех или неудача компании во многом зависят от качества руководства и принятия решений.  Такой бизнес требует постоянного контроля, недопустимо пускать дела на самотек.',
  3: '★★★★ Тройка — эта вибрация благоприятна для креативных индустрий и инноваций. Для успешного функционирования необходимо привлекать квалифицированных специалистов, внедрять новые технологии, не допускать застоя.',
  4: '★★★★ Четвёрка — это число стабильности. Идеально для традиционных отраслей (производство, строительство), где систематический подход и надежность ценятся выше всего. Однако рост может быть ограничен или существенно замедлиться без внедрения новых методов.',
  5: '★ Пятёрка — высокий уровень риска, где возможны как значительный прорыв, так и полный провал. Подходит для стартапов или компаний, где риск оправдан инновациями. Успех зависит от умения адаптироваться и минимизировать убытки (например, через диверсификацию). Нужна сильная стратегия управления рисками.',
  6: '★★★★ Шестёрка — хороший вариант для стабильного дохода, хотя прибыль, скорее всего, не будет головокружительной. Подходит для семейного бизнеса.',
  7: '★★★ Семёрка —  благоприятное для бизнеса число, не смотря на то, что компания может испытывать временные спады продаж. Активное продвижение и реклама сможет это компенсировать.',
  8: '★★ Восьмёрка — идеально для финансов, недвижимости или крупных корпораций, где амбиции и власть играют роль. Периоды успеха чередются с вызовами, требующими стратегического управления.',
  9: '★★ Девятка — оптимальный баланс прибыли достигается через значительные вложения в развитие и рекламу, где больше вложений — больше отдачи.  Успех приходит через щедрость и долгосрочные инвестиции.',
};

export default function CompanyFortuneScreen({ onBack }) {
  const [foundationDate, setFoundationDate] = useState('');
  const [companyNumber, setCompanyNumber] = useState(null);
  const [description, setDescription] = useState('');

  const calculateFate = () => {
    if (!foundationDate) return;
    // dateStr: 'YYYY-MM-DD'
    const digits = foundationDate.replace(/-/g, '').split('').map(Number);
    const initialSum = sumDigits(digits);
    const reduced = reduceToOneDigit(initialSum);
    setCompanyNumber(reduced);
    setDescription(companyFateMap[reduced] || 'Информация отсутствует.');
  };

  return (
    <motion.div
      key="company"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="
        relative
        w-full max-w-md
        bg-black/30 backdrop-blur-lg
        rounded-2xl p-6 shadow-lg
        space-y-4
      "
    >
      {/* Кнопка «назад» */}
      <button
        onClick={onBack}
        className="text-sm text-amber-400 hover:underline"
      >
        ← назад
      </button>

      <h2 className="text-2xl font-bold">Судьба компании</h2>

      <p className="text-sm opacity-80">
        Введите дату основания компании — после этого мы рассчитаем её число и выведем описание.
      </p>

      <input
        type="date"
        value={foundationDate}
        onChange={(e) => setFoundationDate(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-white text-black"
      />

      <button
        onClick={calculateFate}
        className="w-full py-2 bg-amber-400 text-black rounded-md font-semibold hover:bg-amber-300"
      >
        Рассчитать
      </button>

      {companyNumber !== null && (
        <div className="bg-white/10 rounded-xl p-4 space-y-2">
          <h3 className="text-lg font-semibold">
            Число основания: {companyNumber}
          </h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      )}
    </motion.div>
  );
}