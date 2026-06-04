import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Trophy, Shield, Leaf, ChevronRight, Lock, PlusCircle } from 'lucide-react';

interface PlantJourneyProps {
  totalLogged: number;
  onAddWater: (ml: number) => void;
}

const growthStages = [
  // Pot 0: Terra Kotta
  {
    potName: 'Terra Kotta',
    stages: [
      { name: 'Tohum', emoji: '🌱', desc: 'Yeni ekilmiş bir tohum, su bekliyor!' },
      { name: 'Filiz', emoji: '🌿', desc: 'İlk küçük filizler güneşe uzanıyor!' },
      { name: 'Gelişmiş Yaprak', emoji: '🍀', desc: 'Bitki bolca sulandı ve canlandı!' },
      { name: 'Görkemli Ev Bitkisi', emoji: '🪴', desc: 'Saksıda muhteşem görkemli bir ev bitkisi!' }
    ]
  },
  // Pot 1: Okyanus Esintisi
  {
    potName: 'Okyanus Esintisi',
    stages: [
      { name: 'Mavi Tohum', emoji: '🌱', desc: 'Okyanus esintisiyle taze bir başlangıç!' },
      { name: 'Tomurcuk', emoji: '🌷', desc: 'Güzel bir çiçeğin tomurcuğu beliriyor!' },
      { name: 'Çiçek Açış', emoji: '🌸', desc: 'Çiçekler taç yapraklarını yavaşça açıyor...' },
      { name: 'Nadir Nilüfer', emoji: '🌺', desc: 'Tüm zarafetiyle açmış büyüleyici bir çiçek!' }
    ]
  },
  // Pot 2: Gökkuşağı Saksı
  {
    potName: 'Gökkuşağı Saksı',
    stages: [
      { name: 'Renkli Tohum', emoji: '🌱', desc: 'Gökkuşağının altında parlayan tohum.' },
      { name: 'Sihirli Sürgün', emoji: '🌿', desc: 'Işıl ışıl parıldayan sihirli bir fide.' },
      { name: 'Altın Dal', emoji: '🌾', desc: 'Renk değiştiren efsanevi yapraklar.' },
      { name: 'Gökkuşağı Ağacı', emoji: '🌳', desc: 'Zirveye ulaşmış ulu gökkuşağı ağacı!' }
    ]
  }
];

export default function PlantJourney({ totalLogged, onAddWater }: PlantJourneyProps) {
  const [showInventory, setShowInventory] = useState(false);
  const [activePot, setActivePot] = useState(0);
  const [showGrowEffect, setShowGrowEffect] = useState(false);

  const inventoryItems = [
    { title: 'Terra Kotta', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkt9jTMwtfhH_aEqQ4gIRt4QZ6hOy6kPbBPoG5lMToDKFtKR3vpW6uF4FxuKncqbxcnoRTU4pXjHlEnk4G2FNC-jUPuFv4CV0DRMII3pLGZo2LbVn-oncuAtLBCh8b_8e1PhrervW1lme61AnExx3TedyYDWADxE-cDjATShiXIOwTKzl8KDEoGw3S6K9dNpqbhHEROBn-DDey9ffmGJ3IYrM1Bwrc_rA5hnoBCqh2PbyGzVvcxHZtJNsjqiwCB8uKvRHpap6-oq8', level: 1 },
    { title: 'Okyanus Esintisi', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAU0t4o-3RKOi9Rh5jjCU1JgGpPvLwgwchaIhM8M1t0gOWe-OJyaHy0bh32MtQ4rGf8xd2RY6awD78DLgcw3EdBkGImEEhDrY-iH1kHoGR_dNRYxJ21pNMXz1z1KsdxLh4yZ7PY26QZ38OjxsLEAtjE3wo95b6EiPh2UNc2TAWLrXk_kvoeEXQfCwZGUomojCypahOiaZ6hJsF1NrBngmCXew3mjlv_g5tyE9k3JJhYf4U4EGUOkHoOKXjSAhlPpHZ-N-x0WaeJirE', level: 5 },
    { title: 'Gökkuşağı Saksı', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0BFtOfBsm5mZMpWeBdUkDymyOf1JTpNi2rv7yBpJE2j6fy5MezC4ALqdDC61mZNQfupHKFszB_sqiQb2-CfLAn9NZVSlxVzpgRubTP8SAyJu2jfb14Y-UZK-LP2TUV5qfxJh3JrudnBHLqq5BA66MJQkF7ZR9zv9VoHr7pq20LuDfR-T4Ec-dIlX1K4PzkN_CqDEf4i8uV0NA0x0JEn2Vt54fOioKK61rTOh3sf2TAcMJC9m621ji5wBDaUt_X1gA1Mfk848sdYs', level: 12 },
  ];

  const handleGrow = () => {
    onAddWater(250); // Add 250ml
    setShowGrowEffect(true);
    setTimeout(() => setShowGrowEffect(false), 2000);
  };

  const growthProgress = Math.min((totalLogged / 5000) * 100, 100);

  // Growth Stage evaluation (Tohum, Filiz, Gelişmiş, Büyük)
  const currentStageIndex = 
    growthProgress < 25 ? 0 :
    growthProgress < 50 ? 1 :
    growthProgress < 75 ? 2 : 3;

  const activePotData = growthStages[activePot] || growthStages[0];
  const currentStage = activePotData.stages[currentStageIndex];

  return (
    <div className="px-5 py-8 space-y-8 max-w-2xl mx-auto pb-32">
      {/* Grow Effect Overlay */}
      <AnimatePresence>
        {showGrowEffect && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 z-[110] pointer-events-none flex items-center justify-center"
          >
            <div className="bg-secondary/20 backdrop-blur-sm rounded-full p-20 animate-pulse">
              <Sprout className="w-32 h-32 text-secondary fill-secondary/20" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section: Current Plant */}
      <section className="relative bg-surface-container-lowest rounded-3xl p-6 border-b-4 border-surface-container-highest flex flex-col items-center overflow-hidden shadow-md">
        <h1 className="font-display text-2xl font-bold text-primary mb-1">Bitkimin Yolculuğu</h1>
        <p className="text-on-surface-variant text-center font-medium mb-3">Sen su içtikçe dostun filizleniyor!</p>
        
        {/* Dynamic Stage Description Bubble */}
        <div className="bg-secondary/10 px-4 py-1.5 rounded-2xl mb-6 shadow-inner border border-secondary/5">
          <p className="text-xs font-bold text-secondary text-center">
            🌱 {currentStage.desc}
          </p>
        </div>
        
        {/* Plant Illustration Area */}
        <div className="relative w-48 h-48 mb-8 flex items-center justify-center bg-gradient-to-b from-blue-50 to-green-50 rounded-full border-4 border-dashed border-primary-container/30 overflow-hidden">
           <AnimatePresence mode="wait">
            <motion.div 
              key={`${activePot}-${currentStageIndex}`}
              initial={{ scale: 0.4, opacity: 0, y: 30, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.4, opacity: 0, y: -30, rotate: 15 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="z-10 text-8xl select-none flex flex-col items-center justify-center filter drop-shadow-lg"
            >
              {currentStage.emoji}
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-4 w-32 h-16 bg-secondary/10 rounded-[50%] blur-xl"></div>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-3">
          <div className="flex justify-between items-end">
            <span className="font-display text-xl font-bold text-secondary">
              {currentStage.name} ({currentStageIndex + 1}/4)
            </span>
            <span className="text-sm font-bold text-on-surface-variant">Gelişime %{Math.round(100 - growthProgress)} Kaldı</span>
          </div>
          <div className="h-6 w-full bg-surface-container rounded-full overflow-hidden p-1 shadow-inner">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${growthProgress}%` }}
               className="h-full bg-gradient-to-r from-secondary to-secondary-container rounded-full relative flex items-center justify-end pr-1 transition-all"
            >
              <Sprout className="text-white w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Evolution Stages */}
      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold text-on-surface px-2">Evrim Aşamaları</h2>
        <div className="relative flex justify-between items-center px-4 py-4">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-surface-container-highest -translate-y-1/2 -z-10"></div>
          
          {activePotData.stages.map((stage, i) => {
            const isActive = currentStageIndex === i;
            const isCompleted = currentStageIndex > i;
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md border-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-secondary-container border-secondary scale-125 ring-4 ring-secondary-container/30' 
                    : isCompleted
                      ? 'bg-primary-container border-primary scale-100 ring-2 ring-primary-container/20 grayscale-0 opacity-100 animate-pulse'
                      : 'bg-surface-container border-outline-variant grayscale opacity-40'
                }`}>
                  {stage.emoji}
                </div>
                <span className={`text-[10px] font-bold ${isActive ? 'text-secondary font-extrabold' : isCompleted ? 'text-primary' : 'text-outline'}`}>
                  {stage.name}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Inventory */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className="font-display text-lg font-bold text-on-surface">Envanter</h2>
          <button 
            onClick={() => setShowInventory(true)}
            className="text-primary text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
          >
            Hepsini Gör
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {inventoryItems.slice(0, 2).map((item, i) => (
            <div 
              key={i}
              onClick={() => setActivePot(i)}
              className={`bg-surface-container-lowest rounded-2xl border-2 p-3 flex gap-3 items-center group cursor-pointer transition-all shadow-md active:scale-95 ${
                activePot === i ? 'border-primary bg-primary-container/10' : 'border-surface-container-highest'
              }`}
            >
              <div className="w-16 h-16 bg-surface-container flex items-center justify-center rounded-xl overflow-hidden shrink-0">
                 <img src={item.img} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-xs font-bold text-on-surface truncate">{item.title}</p>
                <p className={`text-[8px] font-bold px-2 py-0.5 rounded-full w-fit mt-1 ${activePot === i ? 'bg-primary text-white' : 'bg-surface-container text-outline'}`}>
                  {activePot === i ? 'KULLANILIYOR' : 'SEÇ'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inventory Choice Modal */}
      <AnimatePresence>
        {showInventory && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInventory(false)}
              className="absolute inset-0 bg-on-background/40 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-md bg-surface rounded-t-[3rem] p-8 shadow-2xl space-y-6"
            >
              <div className="w-12 h-1.5 bg-surface-container-highest rounded-full mx-auto mb-4"></div>
              <h3 className="font-display text-2xl font-bold text-on-surface">Tüm Koleksiyonun</h3>
              <div className="grid grid-cols-1 gap-4 max-h-[50vh] overflow-y-auto pr-2">
                {inventoryItems.map((item, i) => (
                  <button 
                    key={i}
                    onClick={() => { setActivePot(i); setShowInventory(false); }}
                    className={`flex items-center gap-4 p-4 rounded-3xl border-2 transition-all ${
                      activePot === i ? 'border-primary bg-primary-container/10 shadow-lg' : 'border-surface-container-highest bg-surface-container-lowest'
                    }`}
                  >
                    <div className="w-16 h-16 bg-surface-container rounded-2xl overflow-hidden">
                      <img src={item.img} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-on-surface">{item.title}</p>
                      <p className="text-xs text-outline font-semibold">Seviye {item.level} Ödülü</p>
                    </div>
                    {activePot === i && <PlusCircle className="ml-auto text-primary rotate-45" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <div className="fixed bottom-24 left-0 w-full px-5 pointer-events-none">
        <button 
          onClick={handleGrow}
          className="w-full h-16 bg-primary text-on-primary font-display text-xl font-bold tactile-button-primary rounded-2xl flex items-center justify-center gap-2 shadow-2xl pointer-events-auto active:scale-95 transition-all"
        >
          <PlusCircle className="w-6 h-6" />
          Su İç ve Büyüt
        </button>
      </div>
    </div>
  );
}
