import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShowerHead, UtensilsCrossed, Shirt, Trophy, PlusCircle, CheckCircle2, Droplet } from 'lucide-react';
import { getEcoTip } from '../services/gemini.ts';
import { Screen } from '../types.ts';

interface HomeProps {
  onNavigate?: (screen: Screen) => void;
  totalLogged: number;
  onAddWater: (ml: number) => void;
}

export default function Home({ onNavigate, totalLogged, onAddWater }: HomeProps) {
  const [tip, setTip] = useState('Susamış hissediyorum, biraz tasarruf edelim mi?');
  const [showWaterOptions, setShowWaterOptions] = useState(false);
  const [activeTracking, setActiveTracking] = useState<string | null>(null);

  useEffect(() => {
    getEcoTip().then(setTip);
  }, []);

  const waterOptions = [
    { label: 'Bardak (200ml)', icon: '🥛', color: 'bg-blue-100', value: 200 },
    { label: 'Şişe (500ml)', icon: '🍼', color: 'bg-blue-200', value: 500 },
    { label: 'Sürahi (1.5L)', icon: '🏺', color: 'bg-blue-300', value: 1500 },
  ];

  const handleAddWater = (value: number) => {
    onAddWater(value);
    setShowWaterOptions(false);
  };

  const progress = Math.min((totalLogged / 2500) * 100, 100);
  const strokeDashoffset = 175.9 - (175.9 * progress) / 100;

  const handleTrackAction = (label: string) => {
    if (label === 'Günlük Görevler' && onNavigate) {
      onNavigate('PLANT_JOURNEY');
      return;
    }
    
    setActiveTracking(label);
    setTimeout(() => setActiveTracking(null), 2500);
  };

  return (
    <div className="px-5 space-y-6">
      {/* Tracking Notification */}
      <AnimatePresence>
        {activeTracking && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-20 left-1/2 z-50 bg-primary text-on-primary px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 border-b-4 border-on-primary-fixed-variant"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{activeTracking} Kaydedildi!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Virtual Plant Section */}
      <section className="flex flex-col items-center py-4 relative">
        {/* Mood Bubble */}
        <motion.div 
          key={tip}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative bg-surface-container-lowest border-2 border-surface-container p-6 rounded-2xl shadow-lg mb-6 max-w-[280px] self-start ml-4"
        >
          <p className="font-medium text-on-surface">{tip}</p>
          <div className="absolute -bottom-2 left-6 w-4 h-4 bg-surface-container-lowest border-r-2 border-b-2 border-surface-container rotate-45"></div>
        </motion.div>

        {/* Character Area */}
        <div className="w-56 h-56 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-secondary-container opacity-20 rounded-full blur-3xl scale-90"></div>
          <motion.img 
             animate={{ 
               y: [0, -10, 0],
             }}
             transition={{ 
               duration: 4,
               repeat: Infinity,
               ease: "easeInOut"
             }}
            alt="Virtual Plant" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0BFtOfBsm5mZMpWeBdUkDymyOf1JTpNi2rv7yBpJE2j6fy5MezC4ALqdDC61mZNQfupHKFszB_sqiQb2-CfLAn9NZVSlxVzpgRubTP8SAyJu2jfb14Y-UZK-LP2TUV5qfxJh3JrudnBHLqq5BA66MJQkF7ZR9zv9VoHr7pq20LuDfR-T4Ec-dIlX1K4PzkN_CqDEf4i8uV0NA0x0JEn2Vt54fOioKK61rTOh3sf2TAcMJC9m621ji5wBDaUt_X1gA1Mfk848sdYs"
            className="w-48 h-48 object-contain z-10"
          />
        </div>

        {/* Daily Progress Card */}
        <div className="w-full bg-surface-container-low p-6 rounded-2xl border-2 border-surface-container shadow-md mt-4 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-display text-xl font-bold text-primary">Günlük Hedef</h2>
            <p className="text-sm font-medium text-on-surface-variant">{Math.round(progress)}% tamamlandı - {totalLogged}ml</p>
          </div>
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle className="text-surface-container-highest" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="6"></circle>
              <motion.circle 
                initial={{ strokeDashoffset: 175.9 }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-primary rounded-full transition-all duration-500" 
                cx="32" 
                cy="32" 
                fill="transparent" 
                r="28" 
                stroke="currentColor" 
                strokeDasharray="175.9" 
                strokeWidth="6"
              ></motion.circle>
            </svg>
            <span className="absolute text-[10px] font-bold text-primary">{Math.round(progress)}%</span>
          </div>
        </div>
      </section>

      {/* Interactive 2x2 Grid */}
      <section className="grid grid-cols-2 gap-4">
        {[
          { label: 'Duş Takibi', icon: ShowerHead, color: 'bg-primary-fixed-dim', iconColor: 'text-primary' },
          { label: 'Bulaşık Takibi', icon: UtensilsCrossed, color: 'bg-secondary-fixed-dim', iconColor: 'text-secondary' },
          { label: 'Çamaşır Takibi', icon: Shirt, color: 'bg-tertiary-fixed-dim', iconColor: 'text-tertiary' },
          { label: 'Günlük Görevler', icon: Trophy, color: 'bg-error-container', iconColor: 'text-error' },
        ].map((btn, i) => (
          <button 
            key={i}
            onClick={() => handleTrackAction(btn.label)}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl border-2 border-surface-container shadow-md active:translate-y-1 active:shadow-none transition-all"
          >
            <div className={`w-12 h-12 ${btn.color} rounded-full flex items-center justify-center mb-3`}>
              <btn.icon className={`${btn.iconColor} w-6 h-6`} />
            </div>
            <span className="text-sm font-bold text-on-surface">{btn.label}</span>
          </button>
        ))}
      </section>

      {/* FAB with Options */}
      <div className="fixed bottom-24 right-5 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {showWaterOptions && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="flex flex-col gap-2 mb-2"
            >
              {waterOptions.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => handleAddWater(opt.value)}
                  className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-xl border-2 border-primary-container tactile-shadow active:translate-y-0.5 transition-all whitespace-nowrap"
                >
                  <span className="text-xl">{opt.icon}</span>
                  <span className="text-xs font-bold text-on-surface">{opt.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setShowWaterOptions(!showWaterOptions)}
          className="flex items-center gap-2 bg-primary-container text-on-primary-container pl-6 pr-8 py-4 rounded-3xl tactile-button-primary active:scale-95 transition-all shadow-2xl"
        >
          <PlusCircle className={`w-6 h-6 transition-transform duration-300 ${showWaterOptions ? 'rotate-45' : ''}`} />
          <span className="font-display font-bold text-lg">Su Ekle</span>
        </button>
      </div>
    </div>
  );
}
