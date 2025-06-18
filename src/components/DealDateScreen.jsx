// src/components/DealDateScreen.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'

/** Утилиты для свода к однозначному числу */
function sumDigits(arr) {
  return arr.reduce((sum, n) => sum + n, 0)
}
function reduceToOneDigit(n) {
  const m = Math.abs(Math.floor(n))
  if (m < 10) return m
  const digits = String(m).split('').map(Number)
  return reduceToOneDigit(sumDigits(digits))
}

/** Описания для чисел 1–9 */
const DESCRIPTIONS = {
  1: `Эта дата благоприятна для подписания соглашений, контрактов и партнерств, особенно если они требуют инициативы. Ключевое условие — доверие к контрагенту, так как успех зависит от взаимопонимания.

Дополнение: Подходит для запуска новых проектов или сделок, требующих лидерства. Рекомендуется тщательно проверять условия, чтобы избежать недоразумений.`,
  2: `Подписание договоров в этот день может столкнуться с непредсказуемыми препятствиями, такими как изменения в законодательстве или экономические колебания. Однако мистическая природа двойки способна принести неожиданные выгодные повороты.

Дополнение: Удача возможна при тщательной подготовке и гибкости. Идеально для переговоров, где компромисс играет роль, но избегайте спешки.`,
  3: `Перед заключением сделки тщательно взвесьте все аспекты. Если возникают сомнения, лучше перенести подписание на более благоприятный день, чтобы минимизировать риски.

Дополнение: Подходит для творческих или неформальных соглашений, но требует четкого плана, чтобы избежать хаоса. Интуиция может быть полезным ориентиром.`,
  4: `Эта дата гарантирует качественное и своевременное выполнение обязательств по договору. Однако, если цель — финансовая выгода, возможны срывы или неожиданные осложнения.

Дополнение: Идеальна для контрактов на услуги или строительство. Для прибыльных сделок добавьте резервный план, чтобы компенсировать потенциальные потери.`,
  5: `День не оптимален для стандартных сделок или покупок-продаж, но подходит для договоров, связанных с перемещением, например, логистикой или туризмом.

Дополнение: Удача возможна при высокой адаптивности и минимальных обязательствах. Избегайте долгосрочных обязательств из-за нестабильной природы 5.`,
  6: `Этот день несет финансовую удачу и процветание для заключенных соглашений, при условии полной прозрачности и честности всех сторон.

Дополнение: Отлично для семейного бизнеса или сделок, где важна репутация. Укрепляйте доверие через открытость условий.`,
  7: `Сделка будет успешной только при детальной проработке всех деталей и исключении авантюрных решений.

Дополнение: Подходит для интеллектуальных или исследовательских контрактов. Успех зависит от анализа и избежания импульсивности.`,
  8: `Отличный день для подписания финансовых и бизнес-договоров, а также для инвестиций в обучение или развитие навыков.

Дополнение: Благоприятна для крупных сделок или расширения бизнеса. Укрепите позиции, избегая жадности или чрезмерного контроля.`,
  9: `Эта дата несет энергетику завершения, которая может подорвать стабильность даже прочных договоренностей. Однако для творческих проектов или инициатив успех практически гарантирован.

Дополнение: Подходит для культурных или благотворительных сделок. Для других сфер минимизируйте обязательства и сосредоточьтесь на долгосрочных целях.`,
}

export default function DealDateScreen({ onBack }) {
  const [dealDate, setDealDate] = useState('')
  const [companyDate, setCompanyDate] = useState('')
  const [dayNumber, setDayNumber] = useState(null)
  const [synergyNumber, setSynergyNumber] = useState(null)

  const handleCalculate = () => {
    if (!dealDate) return
    // Число дня
    const dd = dealDate.replace(/-/g, '').split('').map(Number)
    const dSum = sumDigits(dd)
    const dNum = reduceToOneDigit(dSum)
    setDayNumber(dNum)

    // Число синергии (если задана вторая дата)
    if (companyDate) {
      const cd = companyDate.replace(/-/g, '').split('').map(Number)
      const cSum = sumDigits(cd)
      const cNum = reduceToOneDigit(cSum)
      setSynergyNumber(reduceToOneDigit(dNum + cNum))
    } else {
      setSynergyNumber(null)
    }
  }

  return (
    <motion.div
      key="deal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg space-y-4"
    >
      <button
        onClick={onBack}
        className="text-sm text-amber-400 hover:underline"
      >
        ← назад
      </button>

      <h2 className="text-2xl font-bold">Расчёт дня сделки</h2>
      <p className="text-sm opacity-80 mb-4">
        Введите предполагаемую дату сделки и (опционально) дату основания
        компании. Нажмите «Рассчитать».
      </p>

      <div className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Дата сделки</label>
          <input
            type="date"
            className="w-full px-3 py-2 rounded bg-white text-black"
            value={dealDate}
            onChange={(e) => setDealDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Дата основания компании</label>
          <input
            type="date"
            className="w-full px-3 py-2 rounded bg-white text-black"
            value={companyDate}
            onChange={(e) => setCompanyDate(e.target.value)}
          />
        </div>
        <button
          onClick={handleCalculate}
          className="w-full py-2 bg-amber-400 text-black rounded font-semibold"
        >
          Рассчитать
        </button>
      </div>

      {dayNumber !== null && (
        <div className="bg-white/10 rounded-xl p-4 space-y-2">
          <h3 className="text-lg font-semibold">
            Число дня: {dayNumber}
          </h3>
          <p className="text-sm leading-relaxed whitespace-pre-line text-white/90">
            {DESCRIPTIONS[dayNumber]}
          </p>
        </div>
      )}

      {synergyNumber !== null && (
        <div className="bg-white/10 rounded-xl p-4 space-y-2">
          <h3 className="text-lg font-semibold">
            Число синергии: {synergyNumber}
          </h3>
          <p className="text-sm leading-relaxed whitespace-pre-line text-white/90">
            {DESCRIPTIONS[synergyNumber]}
          </p>
        </div>
      )}

      {/* Приписка внизу мелким шрифтом */}
      <p className="text-xs opacity-70 leading-relaxed">
        В традиционной нумерологии для оценки рисков совершаемой сделки
        обычно используется только Число Дня. Однако мы рекомендуем дополнить
        анализ с помощью Числа Синергии — числа, получаемого путем сложения
        числа основания компании и числа даты сделки. Это позволяет учитывать,
        как энергия конкретной даты взаимодействует с внутренней энергией
        компании. Если Вы планируете совершить сделку, как частное лицо, то в поле даты
        основания компании внесите дату вашего рождения.
      </p>
    </motion.div>
  )
}