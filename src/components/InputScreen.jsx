import React, { useState } from 'react';

export default function InputScreen({ onSubmit }) {
  const [date, setDate] = useState('');

  const handleClick = () => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      onSubmit(date);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-semibold mb-2">Нумерология PRO</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="rounded-xl px-4 py-2 text-black"
      />
      <button
        onClick={handleClick}
        className="bg-amber-400 hover:bg-amber-300 text-black font-bold py-2 px-6 rounded-xl"
      >
        Далее
      </button>
    </div>
  );
}
