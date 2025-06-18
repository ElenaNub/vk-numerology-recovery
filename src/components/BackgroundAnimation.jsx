import React from 'react';
import Lottie from 'lottie-react';          //  ← default‑экспорт
import fon2 from '../assets/fon2.json';     // путь, где лежит ваша анимация

export default function BackgroundAnimation() {
  return (
    <Lottie
      animationData={fon2}
      loop
      autoplay
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
      // opacity задаём через style / tailwind:
      style={{ opacity: 0.25 }}
    />
  );
}