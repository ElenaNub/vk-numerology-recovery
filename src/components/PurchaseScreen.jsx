// src/components/PurchaseScreen.jsx
import React from 'react';
import { motion } from 'framer-motion';
import bridge from '@vkontakte/vk-bridge';

export default function PurchaseScreen({ onBack, onSuccess }) {
  // 1) Репост — даём 1 день доступа
  const handleShare = async () => {
    try {
      await bridge.send('VKWebAppShare', {
        link: window.location.href,
      });
      onSuccess(1);
    } catch (e) {
      console.warn('Ошибка при шаринге:', e);
    }
  };

  // 2) Покупка одного голоса — даём 1 день доступа
  const handleBuyVoice = async () => {
    try {
      const data = await bridge.send('VKWebAppShowOrderBox', {
        type: 'item',         // всегда 'item'
        item: 'sale_item_id_1', // ваш идентификатор товара в настройках VK
      });

      if (data.success) {
        onSuccess(1);
      }
    } catch (e) {
      console.warn('Ошибка покупки голоса:', e);
    }
  };

  return (
    <motion.div
      key="purchase"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg"
    >
      <button
        onClick={onBack}
        className="text-sm text-amber-400 hover:underline mb-4"
      >
        ← назад
      </button>

      <h2 className="text-2xl font-bold mb-6">Разблокировать доступ</h2>

      <button
        onClick={handleShare}
        className="w-full py-2 mb-4 bg-blue-600 text-white rounded"
      >
        Поделиться — получить 1 день
      </button>

      <button
        onClick={handleBuyVoice}
        className="w-full py-2 mb-2 bg-green-600 text-white rounded"
      >
        Купить голос
      </button>

      <p className="text-xs opacity-70">
        1 голос даёт +1 день доступа
      </p>
    </motion.div>
  );
}
