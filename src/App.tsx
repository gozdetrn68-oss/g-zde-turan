/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Screen } from './types.ts';
import Login from './screens/Login.tsx';
import Onboarding from './screens/Onboarding.tsx';
import Home from './screens/Home.tsx';
import Analysis from './screens/Analysis.tsx';
import PlantJourney from './screens/PlantJourney.tsx';
import Leaderboard from './screens/Leaderboard.tsx';
import Profile from './screens/Profile.tsx';
import BottomNav from './components/layout/BottomNav.tsx';
import Header from './components/layout/Header.tsx';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('LOGIN');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [totalLogged, setTotalLogged] = useState(1200);

  const handleAddWater = (ml: number) => {
    setTotalLogged(prev => prev + ml);
  };

  // Simple state management for demo
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('ONBOARDING');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('HOME');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'LOGIN': return <Login onLogin={handleLogin} />;
      case 'ONBOARDING': return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'HOME': return <Home onNavigate={setCurrentScreen} totalLogged={totalLogged} onAddWater={handleAddWater} />;
      case 'ANALYSIS': return <Analysis onNavigate={setCurrentScreen} totalLogged={totalLogged} onAddWater={handleAddWater} />;
      case 'PLANT_JOURNEY': return <PlantJourney totalLogged={totalLogged} onAddWater={handleAddWater} />;
      case 'LEADERBOARD': return <Leaderboard />;
      case 'PROFILE': return <Profile onLogout={() => { setIsLoggedIn(false); setCurrentScreen('LOGIN'); }} totalLogged={totalLogged} setTotalLogged={setTotalLogged} />;
      default: return <Home onNavigate={setCurrentScreen} totalLogged={totalLogged} onAddWater={handleAddWater} />;
    }
  };

  const showNav = isLoggedIn && currentScreen !== 'ONBOARDING';
  const showHeader = isLoggedIn && currentScreen !== 'ONBOARDING';

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans overflow-x-hidden">
      {showHeader && <Header />}
      
      <main className={`flex-grow ${showNav ? 'pb-24' : ''} ${showHeader ? 'pt-16' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {showNav && (
        <BottomNav 
          currentScreen={currentScreen} 
          onNavigate={setCurrentScreen} 
        />
      )}
    </div>
  );
}

