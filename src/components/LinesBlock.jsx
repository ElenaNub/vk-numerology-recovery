import React from 'react';
import lineMeanings from '../data/lineMeanings.json';
import { calcLines } from '../core/linesUtils.js';

export default function LinesBlock({ counts }) {
  const lines = calcLines(counts);
  const view = [
    { id: 'h123', label: 'Самооценка' },
    { id: 'h456', label: 'Материальный успех' },
    { id: 'h789', label: 'Талант и творчество' },

    { id: 'v147', label: 'Трудолюбие' },
    { id: 'v258', label: 'Семейность и эмоциональность' },
    { id: 'v369', label: 'Стабильность и материальность' },

    { id: 'd159', label: 'Духовность' },
    { id: 'd357', label: 'Темперамент и страсть' }
  ];

  const getMeaning = (id, value) => {
    if (!lineMeanings[id]) return '';
    const tiers = lineMeanings[id];
    if (value <= 3) return tiers[0];
    if (value <= 6) return tiers[1];
    return tiers[2];
  };

  return (
    <div className="mt-6 space-y-3">
      {view.map((l) => (
        <div key={l.id} className="bg-white/5 p-3 rounded-lg text-sm">
          <p className="font-semibold mb-1 text-amber-300">
            {l.label}: {lines[l.id]}
          </p>
          <p>{getMeaning(l.id, lines[l.id])}</p>
        </div>
      ))}
    </div>
  );
}