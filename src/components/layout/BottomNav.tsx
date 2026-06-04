import { Home, ClipboardList, BarChart3, User } from 'lucide-react';
import { Screen } from '../../types.ts';
import { motion } from 'motion/react';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const navItems = [
  { id: 'HOME' as Screen, label: 'Ana Sayfa', icon: Home },
  { id: 'PLANT_JOURNEY' as Screen, label: 'Görevler', icon: ClipboardList },
  { id: 'ANALYSIS' as Screen, label: 'Analiz', icon: BarChart3 },
  { id: 'PROFILE' as Screen, label: 'Profil', icon: User },
];

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface border-t-4 border-surface-container-highest shadow-xl flex justify-around items-center px-4 pb-6 pt-3">
      {navItems.map((item) => {
        const isActive = currentScreen === item.id || (item.id === 'PLANT_JOURNEY' && currentScreen === 'LEADERBOARD');
        
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`relative flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all duration-200 active:scale-90 ${
              isActive 
                ? 'bg-primary-container text-on-primary-container border-b-4 border-primary' 
                : 'text-outline hover:bg-surface-container-low'
            }`}
          >
            <item.icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
            <span className="text-xs font-bold mt-1">{item.label}</span>
            {isActive && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 bg-primary-container -z-10 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
