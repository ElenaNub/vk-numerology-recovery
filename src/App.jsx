import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import WelcomeOverlay from './components/WelcomeOverlay.jsx';
import InputScreen from './components/InputScreen.jsx';
import DashboardMenu from './components/DashboardMenu.jsx';
import PassportScreen from './components/PassportScreen.jsx';
import MatrixScreen from './components/MatrixScreen.jsx';
import CalendarScreen from './components/CalendarScreen.jsx';
import CompatibilityScreen from './components/CompatibilityScreen.jsx';
import { destinyNumber } from './core/calendarUtils.js';
import FullReportScreen    from './components/FullReportScreen.jsx';
import BusinessMenu         from './components/BusinessMenu.jsx';
import CompanyFortuneScreen  from './components/CompanyFortuneScreen.jsx';
import DealDateScreen        from './components/DealDateScreen.jsx';
import PartnerMatchScreen    from './components/PartnerMatchScreen.jsx';
import StaffFitScreen        from './components/StaffFitScreen.jsx';
import BackgroundAnimation from './components/BackgroundAnimation.jsx';

export default function App() {
  const [birth, setBirth] = useState(localStorage.getItem('np_birth') || '');
  const [showWelcome, setShowWelcome] = useState(!localStorage.getItem('np_seen_welcome'));
  const [screen, setScreen] = useState('menu');

  /* ---------- handlers ---------- */
  const handleBirthSubmit = (date) => {
    setBirth(date);
    localStorage.setItem('np_birth', date);
  };

  const handleResetBirth = () => {
    localStorage.removeItem('np_birth');
    setBirth('');
    setScreen('menu');
  };

  const handleCloseWelcome = () => {
    localStorage.setItem('np_seen_welcome', '1');
    setShowWelcome(false);
  };

  const handleSelectSection = (sectionId) => setScreen(sectionId);
  const handleBackToMenu    = () => setScreen('menu');

  /* ---------- render ---------- */
  return (
    <div className="min-h-screen flex items-center justify-center text-white p-4 relative overflow-hidden">
           {/* 🔮 анимация‑фон */}
      <BackgroundAnimation />
      <AnimatePresence>{showWelcome && <WelcomeOverlay onClose={handleCloseWelcome} />}</AnimatePresence>

      {!birth && <InputScreen onSubmit={handleBirthSubmit} />}

      {birth && screen === 'menu' && (
        <DashboardMenu
          birth={birth}
          destiny={destinyNumber(birth)}
          onSelect={handleSelectSection}
          onChangeBirth={handleResetBirth}
        />
      )}

        {birth && screen === 'passport' && (
        <PassportScreen
          birth={birth}
         onBack={handleBackToMenu}
         onBuy={() => setScreen('fullReport')}
       />
      )}

      {birth && screen === 'fullReport' && (
        <FullReportScreen
          birth={birth}
          onBack={() => setScreen('passport')}
        />
      )}
      {birth && screen === 'matrix'   && <MatrixScreen   birth={birth} onBack={handleBackToMenu} />}
      {birth && screen === 'calendar' && <CalendarScreen birth={birth} onBack={handleBackToMenu} />}
      {birth && screen === 'compat'   && <CompatibilityScreen birth={birth} onBack={handleBackToMenu} />}
      {/* меню «Бизнес‑нумерология» */}
{birth && screen === 'business' && (
  <BusinessMenu
    birth={birth}
    onBack={handleBackToMenu}          // ← возвращаемся к главному меню
    openCalc={(id) => setScreen(id)}   // id = 'company' | 'deal' | 'partner' | 'staff'
  />
)}

{/* четыре платных расчёта */}
{screen === 'company' && (
  <CompanyFortuneScreen onBack={() => setScreen('business')} />
)}
{screen === 'deal' && (
  <DealDateScreen onBack={() => setScreen('business')} />
)}
{screen === 'partner' && (
  <PartnerMatchScreen onBack={() => setScreen('business')} />
)}
{screen === 'staff' && (
  <StaffFitScreen onBack={() => setScreen('business')} />
)}
    </div>
  );
}
