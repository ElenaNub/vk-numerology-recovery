import React from 'react';
import { motion } from 'framer-motion';

export default function WelcomeOverlay({ onClose }) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md p-6 z-20"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { delay: 0.1 } }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="text-center max-w-sm bg-gradient-to-br from-purple-700/80 via-fuchsia-600/80 to-amber-500/80 rounded-3xl p-6 shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Добро пожаловать!</h2>
        <p className="mb-6 leading-relaxed">
          Узнайте своё Число Судьбы и откройте тайны нумерологии.
        </p>
        <button
          onClick={onClose}
          className="bg-amber-400 hover:bg-amber-300 text-black font-bold py-2 px-6 rounded-xl"
        >
          Начать
        </button>
      </motion.div>
    </motion.div>
  );
}
