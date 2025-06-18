import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getDigitCounts } from '../core/matrixUtils.js';
import meanings from '../data/matrixMeanings.json';
import LinesBlock from './LinesBlock.jsx';

/* ─────────── карты подписей ─────────── */
const labelMap = {
  1: 'Характер',
  2: 'Энергия',
  3: 'Интерес',
  4: 'Здоровье',
  5: 'Логика',
  6: 'Труд',
  7: 'Удача',
  8: 'Долг',
  9: 'Память'
};

export default function MatrixScreen({ birth, onBack }) {
  /* ---------- базовые расчёты ---------- */
  const counts = getDigitCounts(birth);
  const repeatLabel = (d) =>
    counts[d] > 0 ? d.toString().repeat(counts[d]) : `${d}×0`;

  /* ---------- платный блок линий ---------- */
  const devUnlock = import.meta.env.VITE_DEV_UNLOCK === '1';
  const [linesUnlocked, setLinesUnlocked] = useState(
    devUnlock || localStorage.getItem('lines_unlocked') === '1'
  );

  const handleBuyLines = () => {
    if (devUnlock) {
      setLinesUnlocked(true);
      return;
    }
    import('@vkontakte/vk-bridge').then(({ default: bridge }) => {
      bridge
        .send('VKWebAppShowOrderBox', { type: 'item', item: 'lines_pack_5' })
        .then(() => {
          localStorage.setItem('lines_unlocked', '1');
          setLinesUnlocked(true);
        })
        .catch((e) => console.log('Payment cancelled', e));
    });
  };

  /* ---------- helpers для ячеек и трактовок ---------- */
  const Cell = ({ n }) => (
    <div className="flex flex-col items-center justify-center bg-white/10 rounded-lg p-2 aspect-square">
      <span className="text-lg font-semibold leading-none">{repeatLabel(n)}</span>
      <span className="text-[10px] mt-0.5 opacity-70">{labelMap[n]}</span>
    </div>
  );

  const Interpretation = ({ digit }) => {
    const repeat = counts[digit];
    const raw = meanings[digit][repeat] || meanings[digit]['0'];
    const [title, ...rest] = raw.split('. ');
    const body = rest.join('. ').trim();

    return (
      <div className="bg-white/5 p-3 rounded-lg leading-relaxed whitespace-pre-line text-sm">
        <p className="text-amber-300 font-semibold mb-1">{repeatLabel(digit)}</p>
        <p className="font-semibold mb-1">{title.trim()}.</p>
        <p>{body}</p>
      </div>
    );
  };

  /* ---------- UI ---------- */
  return (
    <motion.div
      key="matrix"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg"
    >
      {/* header */}
      <button
        onClick={onBack}
        className="mb-4 text-sm text-amber-400 hover:underline"
      >
        ← назад
      </button>
      <h2 className="text-2xl font-bold mb-4">Матрица Пифагора</h2>

      {/* 3×3 grid */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {[1, 4, 7, 2, 5, 8, 3, 6, 9].map((n) => (
          <Cell key={n} n={n} />
        ))}
      </div>

      {/* трактовки ячеек */}
      <div className="space-y-3">
        {Object.keys(meanings).map((d) => (
          <Interpretation key={d} digit={d} />
        ))}
      </div>

      {/* --- Линии и диагонали --- */}
      {linesUnlocked ? (
        <LinesBlock counts={counts} />
      ) : (
        <button
          onClick={handleBuyLines}
          className="mt-6 w-full py-3 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-300"
        >
          Открыть линии и диагонали — 5 голосов
        </button>
      )}
    </motion.div>
  );
}
