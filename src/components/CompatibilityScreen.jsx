import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { destinyNumber } from '../core/calendarUtils.js';

/* Краткие характеристики каждого числа судьбы */
const charMap = {
  1: 'Лидер, новатор, стремится к независимости.',
  2: 'Дипломат, миротворец, ценит партнёрство.',
  3: 'Творческая, общительная, любит самовыражение.',
  4: 'Практик, системный, надёжен и трудолюбив.',
  5: 'Свободолюбивый авантюрист, ищет перемены.',
  6: 'Ответственный, заботливый, ориентирован на семью.',
  7: 'Интроспективный исследователь, ищет смысл.',
  8: 'Амбициозный управленец, стремится к материальному успеху.',
  9: 'Альтруист, гуманист, мыслит глобально.',
  11: 'Интуитивный вдохновитель, духовный учитель.',
  22: 'Мастер‑созидатель, умеет воплотить большие мечты.',
  33: 'Учитель‑целитель, служит человечеству безусловно.',
};

/* Синергия конкретных пар (можно расширять) */
const synergyMap = {
  
  '1-1': 'Оба лидера, амбициозны и независимы. Сильная пара, если научатся уважать индивидуальность друг друга. Возможны конфликты из-за борьбы за контроль. Успех в партнерстве достигается через равенство и общие цели.',
  '1-2': 'Лидер (1) и дипломат (2) дополняют друг друга. Двойка смягчает напористость единицы, создавая баланс. Единице нужно избегать эгоизма, а двойке — чрезмерной уступчивости. Хорошая совместимость при взаимном уважении.',
  '1-3': 'Энергичная и творческая пара. Единица задает направление, тройка добавляет оптимизм и креативность. Возможны разногласия, если единица слишком доминирует, а тройка избегает ответственности. Отличная динамика для совместных проектов.',
  '1-4': 'Единица вдохновляет, четверка обеспечивает стабильность. Хороший союз для достижения целей, но единице может не хватать терпения к практичности четверки, а четверке — динамики единицы. Успех через компромисс.',
  '1-5': 'Искры и приключения! Оба любят свободу, но единица стремится к лидерству, а пятерка — к независимости. Возможны конфликты из-за эгоизма. Совместимость высокая, если оба уважают свободу друг друга.',
  '1-6': 'Единица ищет цели, шестерка — гармонию и заботу. Хороший баланс, если единица ценит заботу шестерки, а шестерка уважает амбиции единицы. Возможны разногласия, если шестерка слишком опекает.',
  '1-7': 'Единица — деятель, семерка — мыслитель. Сложная, но интересная комбинация. Единице нужно уважать потребность семерки в уединении, а семерке — активность единицы. Успех возможен при взаимном принятии.',
  '1-8': 'Мощный союз двух сильных личностей. Оба амбициозны, но борьба за власть может разрушить отношения. Совместимость высокая, если они работают как команда, разделяя цели и уважая друг друга.',
  '1-9': 'Единица — лидер, девятка — идеалист. Хорошая пара, если единица поддерживает гуманистические идеи девятки, а девятка уважает инициативу единицы. Возможны конфликты из-за разных приоритетов.',
  '1-11': 'Единица — лидер, 11 — визионер с высокой интуицией. Хорошая пара, если единица уважает чувствительность 11, а 11 поддерживает амбиции единицы. Возможны конфликты, если единица слишком доминирует, а 11 уходит в себя. Успех через баланс действия и вдохновения.',
  '1-22': 'Единица задает направление, 22 воплощает идеи в реальность. Мощный союз для достижения целей, но единице нужно терпение к методичности 22, а 22 должно ценить инициативу единицы. Высокая совместимость при общих целях.',
  '2-2': 'Оба чувствительны и дипломатичны. Очень гармоничная пара, где царит взаимопонимание. Проблемы могут возникнуть из-за нерешительности или чрезмерной зависимости друг от друга. Успех в равновесии.',
  '2-3': 'Двойка приносит заботу, тройка — радость и энергию. Хорошая совместимость, если двойка не чувствует себя подавленной энтузиазмом тройки. Отличная пара для творческих и эмоциональных отношений.',
  '2-4': 'Стабильная и надежная комбинация. Двойка вносит мягкость, четверка — структуру. Возможны разногласия, если двойка слишком эмоциональна, а четверка — слишком практична. Успех через взаимную поддержку.',
  '2-5': 'Двойка ищет стабильность, пятерка — перемены. Сложная пара, но возможна гармония, если двойка принимает спонтанность пятерки, а пятерка ценит заботу двойки. Требуется терпение.',  
  '2-6': 'Идеальная пара для семейных отношений. Оба заботливы, ценят гармонию. Проблемы могут возникнуть, если оба становятся слишком зависимыми. Успех через открытое общение.',
  '2-7': 'Двойка эмоциональна, семерка интроспективна. Сложная комбинация, так как двойке нужна близость, а семерке — уединение. Успех возможен, если оба уважают потребности друг друга.',
  '2-8': 'Двойка смягчает амбициозность восьмерки, а восьмерка дает двойке уверенность. Хорошая совместимость, если двойка не чувствует себя подавленной, а восьмерка ценит поддержку.',  
  '2-9': 'Оба чувствительны и заботливы. Хорошая пара для духовного и эмоционального роста. Возможны проблемы, если девятка слишком идеалистична, а двойка — слишком зависима.',
  '2-11': 'Оба чувствительны, но двойка более эмоциональна, а 11 — духовна. Идеальная пара для глубоких отношений, если двойка не слишком цепляется, а 11 не уходит в изоляцию. Успех через эмоциональную связь.',
  '2-22': 'Двойка вносит мягкость, 22 — структуру. Хорошая совместимость, если двойка принимает практичность 22, а 22 ценит заботу двойки. Возможны разногласия из-за разного темпа жизни.',  
  '3-3': 'Взрыв креативности и радости! Оба любят веселье и общение. Проблемы могут возникнуть из-за легкомыслия или отсутствия дисциплины. Успех через совместные творческие цели.',
  '3-4': 'Тройка привносит энергию, четверка — стабильность. Хороший баланс, но тройке может быть скучно с практичностью четверки, а четверке — сложно с хаотичностью тройки. Компромисс важен.',
  '3-5': 'Искры летят! Оба любят приключения и свободу. Отличная совместимость, но нужна дисциплина, чтобы избежать хаоса. Успех через совместные интересы.', 
  '3-6': 'Тройка приносит радость, шестерка — заботу. Хорошая пара для семейной жизни, если тройка не избегает ответственности, а шестерка не слишком опекает.',
  '3-7': 'Тройка общительна, семерка замкнута. Сложная комбинация, но возможна, если тройка уважает потребность семерки в уединении, а семерка ценит энергию тройки.',
  '3-8': 'Тройка добавляет легкость, восьмерка — амбиции. Хорошая пара, если восьмерка не подавляет тройку, а тройка поддерживает цели восьмерки. Успех через баланс.', 
  '3-9': 'Оба идеалистичны и креативны. Отличная совместимость для духовного роста и творчества. Проблемы могут возникнуть из-за непрактичности. Успех через общие мечты.',
  '3-11': 'Тройка привносит креативность, 11 — духовное видение. Отличная пара для творческих и вдохновляющих отношений. Проблемы могут быть, если тройка слишком легкомысленна, а 11 — слишком серьезен.',
  '3-22': 'Тройка добавляет радость, 22 — дисциплину. Сложная комбинация, так как тройке может не хватать структуры, а 22 может казаться слишком строгим. Успех через компромисс.', 
  '4-4': 'Очень стабильная и надежная пара. Оба ценят порядок и труд. Проблемы могут быть из-за недостатка спонтанности. Успех через добавление разнообразия.',
  '4-5': 'Сложная комбинация. Четверка любит стабильность, пятерка — перемены. Успех возможен, если четверка принимает спонтанность пятерки, а пятерка уважает надежность четверки.',
  '4-6': 'Идеальная пара для создания семьи. Оба ценят стабильность и заботу. Проблемы могут возникнуть из-за излишней серьезности. Успех через эмоциональную открытость.', 
  '4-7': 'Четверка практична, семерка духовна. Сложная пара, но возможна гармония, если четверка уважает внутренний мир семерки, а семерка ценит надежность четверки.',
  '4-8': 'Отличная комбинация для достижения целей. Оба трудолюбивы. 4 и 8 — мощный союз, если они разделяют общие планы. Возможны конфликты из-за упрямства.',
  '4-9': 'Четверка практична, девятка идеалистична. Сложная пара, но возможна гармония, если они уважают разные подходы к жизни. Успех через компромисс.', 
  '4-11': 'Четверка практична, 11 — мечтатель. Сложная пара, но возможна гармония, если четверка уважает интуицию 11, а 11 ценит стабильность четверки. Требуется терпение.',
  '4-22': 'Оба любят порядок и труд. Очень высокая совместимость, так как 22 усиливает качества четверки. Проблемы могут быть из-за излишней серьезности. Успех через совместные проекты.',
  '5-5': 'Свобода и приключения! Оба любят перемены, что делает пару динамичной. Проблемы могут возникнуть из-за отсутствия стабильности. Успех через взаимное доверие.', 
  '5-6': 'Пятерка ищет свободу, шестерка — стабильность. Сложная комбинация, но возможна, если пятерка ценит заботу шестерки, а шестерка принимает спонтанность пятерки.',
  '5-7': 'Оба ценят независимость, но пятерка активна, а семерка интроспективна. Успех возможен при уважении личного пространства друг друга.',
  '5-8': 'Динамичная и амбициозная пара. Пятерка добавляет гибкость, восьмерка — структуру. Возможны конфликты из-за борьбы за контроль. Успех через сотрудничество.', 
  '5-9': 'Оба любят свободу и идеалы. Хорошая совместимость, если они разделяют общие ценности. Проблемы могут быть из-за непрактичности.',
  '5-22': 'Сложная комбинация. Пятерка ищет перемены, 22 — стабильность. Успех возможен, если пятерка принимает структуру 22, а 22 терпит хаотичность пятерки.',
  '6-6': 'Идеальная пара для гармонии и семьи. Оба заботливы и преданы. Проблемы могут возникнуть из-за излишней опеки. Успех через независимость.', 
  '6-7': 'Сложная комбинация. Шестерка ищет близость, семерка — уединение. Успех возможен при взаимном уважении потребностей.',
  '6-8': 'Шестерка приносит заботу, восьмерка — амбиции. Хорошая пара, если шестерка не чувствует себя подавленной, а восьмерка ценит поддержку.',
  '6-9': 'Оба заботливы и идеалистичны. Отличная совместимость для духовных и семейных отношений. Успех через общие ценности.', 
  '6-11': 'Шестерка заботлива, 11 — вдохновляющий. Хорошая пара для семейных или духовных отношений, если шестерка не слишком опекает, а 11 не уходит в себя.',
  '6-22': 'Идеальная комбинация для создания семьи. Шестерка приносит тепло, 22 — надежность. Проблемы могут быть из-за излишней требовательности 22.',
  '7-7': 'Оба ценят уединение и глубину. Гармоничная пара, но может быть слишком замкнутой. Успех через открытость.',
  '7-8': 'Семерка духовна, восьмерка материалистична. Сложная комбинация, но возможна при взаимном уважении. Успех через баланс.',
  '7-9': 'Оба духовны и идеалистичны. Отличная совместимость для интеллектуальных и духовных отношений. Проблемы могут быть из-за непрактичности.',
  '8-8': 'Мощный союз двух лидеров. Высокая совместимость, если нет борьбы за власть. Успех через сотрудничество и общие цели.',
  '8-9': 'Восьмерка практична, девятка идеалистична. Хорошая пара, если они уважают разные подходы. Успех через компромисс.',
  '9-9': 'Идеалистичный и духовный союз. Оба стремятся к высшим целям. Проблемы могут быть из-за непрактичности. Успех через совместные мечты.',
  '7-11': 'Оба духовны и интроспективны. Очень высокая совместимость для интеллектуальных и духовных отношений. Проблемы могут быть из-за излишней замкнутости. Успех через открытость.',
  '7-22': 'Семерка ищет глубину, 22 — практическую реализацию. Сложная пара, но возможна, если семерка уважает труд 22, а 22 ценит внутренний мир семерки.',
  '8-11': 'Восьмерка амбициозна, 11 — идеалистична. Хорошая пара, если восьмерка не подавляет 11, а 11 поддерживает цели восьмерки. Успех через баланс.',
  '8-22': 'Мощный союз двух созидателей. Оба ориентированы на успех, что делает их отличной командой. Проблемы могут быть из-за борьбы за контроль.',  
  '9-11': 'Оба идеалистичны и духовны. Прекрасная совместимость для глубоких, гуманистических отношений. Проблемы могут быть из-за непрактичности.',
  '9-22': 'Девятка мечтает, 22 строит. Хорошая пара, если девятка уважает практичность 22, а 22 поддерживает идеалы девятки. Успех через общие ценности.',
  '11-11': 'Два визионера с высокой интуицией. Очень духовная и вдохновляющая пара, но может быть нестабильной из-за эмоциональной чувствительности. Успех через взаимную поддержку.',
  '11-22': '11 вдохновляет, 22 реализует. Отличная комбинация для достижения больших целей, если 11 не теряется в мечтах, а 22 не становится слишком строгим.',
  '1-33': 'Единица ориентирована на себя, 33 — на служение. Сложная пара: единице может не хватать эмпатии, а 33 — практичности. Успех, если единица вдохновляется идеалами 33, а 33 уважает лидерство.',  
  '22-22': 'Два мастера-строителя. Мощный союз для создания чего-то великого, но возможны конфликты из-за упрямства или высоких ожиданий. Успех через сотрудничество.',
  '2-33': 'Оба заботливы и чувствительны. Идеальная пара для эмоциональной и духовной гармонии. Проблемы из-за чрезмерной жертвенности. Успех через равновесие.',  
  '3-33': 'Тройка привносит оптимизм, 33 — сострадание. Хорошая пара, если тройка поддерживает идеалы 33, а 33 ценит энергию тройки. Возможна непрактичность.',
  '4-33': 'Четверка любит структуру, 33 — служение. Сложно, если четверка слишком прагматична, а 33 — идеалистична. Успех через общие ценности.',  
  '5-33': 'Пятерка любит приключения, 33 — служение. Сложная пара: пятерке может не хватать глубины, а 33 — гибкости. Успех, если пятерка вдохновляется 33.',
  '6-33': 'Оба заботливы и ориентированы на гармонию. Прекрасная совместимость для глубоких отношений. Проблемы из-за жертвенности. Успех через баланс.',
  '7-33': 'Семерка аналитична, 33 сострадательна. Хорошая пара для духовного роста, если семерка принимает эмоции 33, а 33 — уединение семерки.',
  '8-33': 'Восьмерка ориентирована на материальное, 33 — на духовное. Сложно, если восьмерка не ценит идеалы 33. Успех, если 33 вдохновляет восьмерку.',  
  '9-33': 'Оба гуманистичны. Идеальная пара для служения высоким целям. Проблемы из-за непрактичности. Успех через единство.',
  '11-33': 'Оба духовны и чувствительны. Прекрасная совместимость для высших идеалов, но возможна непрактичность. Успех через эмоциональную связь.',  
  '22-33': '22 практичен, 33 идеалистична. Хорошая пара, если 22 ценит сострадание 33, а 33 уважает труд 22. Успех через общие проекты.',
  '33-33': 'Два мастера-учителя. Редкий и мощный союз, полный любви и служения. Проблемы из-за чрезмерной жертвенности или непрактичности. Успех через баланс и заземление.',  
  '5-11': 'Пятерка любит свободу, 11 — духовность. Динамичная пара, но пятерке нужно уважать чувствительность 11, а 11 — принимать спонтанность пятерки. Успех через взаимную свободу.',
  // … добавляйте по мере необходимости
};

function buildSynergy(a, b) {
  const key = `${Math.min(a, b)}-${Math.max(a, b)}`; // порядок не важен
  return synergyMap[key] || 'Пара создаёт уникальную динамику: важен открытый диалог и уважение различий.';
}

export default function CompatibilityScreen({ birth, onBack }) {
  const [partner, setPartner] = useState('');
  const [info, setInfo] = useState(null);

  const calc = () => {
    if (!partner) return;

    const yours  = destinyNumber(birth);   // может быть 11/22/33
    const theirs = destinyNumber(partner);

    const description = buildSynergy(yours, theirs);

    setInfo({ yours, theirs, description });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg text-center"
    >
      <button onClick={onBack} className="mb-3 text-amber-300 text-sm">← назад</button>

      <h2 className="text-lg font-semibold mb-4">Совместимость по числу судьбы</h2>

      <input
        type="date"
        value={partner}
        onChange={(e) => setPartner(e.target.value)}
        className="w-full mb-3 p-2 rounded-md text-black"
      />

      <button
        onClick={calc}
        className="w-full py-2 bg-amber-400 text-black rounded-md mb-4"
        disabled={!partner}
      >
        Рассчитать
      </button>

      {info && (
        <div className="bg-white/10 p-4 rounded-lg text-sm space-y-2 text-left">
          <p><span className="font-semibold">Ваше число:</span> {info.yours}</p>
          <p><span className="font-semibold">Характеристика:</span> {charMap[info.yours]}</p>
          <hr className="opacity-20" />
          <p><span className="font-semibold">Число партнёра:</span> {info.theirs}</p>
          <p><span className="font-semibold">Характеристика:</span> {charMap[info.theirs]}</p>
          <hr className="opacity-20" />
          <p>{info.description}</p>
        </div>
      )}
    </motion.div>
  );
}
// ================= end CompatibilityScreen =================
