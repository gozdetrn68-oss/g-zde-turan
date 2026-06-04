import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, MapPin, AlertTriangle, Droplet, Leaf, TrendingUp, ChevronRight, PlusCircle } from 'lucide-react';
import { getEcoTip } from '../services/gemini.ts';
import { Screen } from '../types.ts';

interface AnalysisProps {
  onNavigate?: (screen: Screen) => void;
  totalLogged: number;
  onAddWater: (ml: number) => void;
}

export default function Analysis({ onNavigate, totalLogged, onAddWater }: AnalysisProps) {
  const [tip, setTip] = useState('Baraj seviyeleri kritik, bugün mutfakta tasarruf yapmaya ne dersin?');
  const [selectedCity, setSelectedCity] = useState("İstanbul");
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"];

  useEffect(() => {
    getEcoTip(selectedCity).then(setTip);
  }, [selectedCity]);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowCityPicker(false);
  };

  const handleAddWaterAction = () => {
    onAddWater(500); // Add 500ml for demo
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="px-5 py-6 space-y-6 max-w-2xl mx-auto">
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-secondary text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2"
          >
            <Droplet className="w-5 h-5 fill-white" />
            500ml Eklendi!
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Eco Assistant Bubble */}
      <section className="relative bg-primary-fixed text-on-primary-fixed p-5 rounded-3xl border-b-4 border-primary-container flex gap-4 items-start shadow-md">
        <div className="w-12 h-12 bg-white rounded-full flex-shrink-0 flex items-center justify-center shadow-inner">
          <Bot className="text-primary w-8 h-8 fill-primary/10" />
        </div>
        <div className="space-y-1">
          <h3 className="font-display text-lg font-bold leading-tight">Eco Asistan</h3>
          <p className="text-sm">{tip}</p>
        </div>
        <div className="absolute -bottom-2 left-10 w-4 h-4 bg-primary-fixed rotate-45 border-r-4 border-b-4 border-primary-container"></div>
      </section>

      {/* Şehir Su Durumu Card */}
      <section className="bg-surface-container-lowest rounded-3xl p-6 shadow-md border-b-4 border-surface-container-highest">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl font-bold text-on-surface">Şehir Su Durumu</h2>
          <button 
            onClick={() => setShowCityPicker(!showCityPicker)}
            className="flex items-center gap-1 text-primary bg-primary-container/20 px-3 py-1.5 rounded-full border-2 border-primary/20 tactile-shadow active:translate-y-0.5 transition-all"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-bold">{selectedCity}</span>
          </button>
        </div>

        {showCityPicker && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mb-6 grid grid-cols-3 gap-2"
          >
            {cities.map(city => (
              <button 
                key={city}
                onClick={() => handleCitySelect(city)}
                className={`py-2 px-1 rounded-xl text-[10px] font-bold border-2 transition-all ${
                  selectedCity === city 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-surface-container-low text-outline border-transparent hover:border-outline-variant'
                }`}
              >
                {city}
              </button>
            ))}
          </motion.div>
        )}

        <div className="relative h-48 flex items-end justify-around gap-2 mb-4 bg-surface-container-low rounded-2xl p-4 overflow-hidden">
          {/* Water Fill Background */}
          <div className="absolute bottom-0 left-0 w-full bg-primary/5 h-[38%] border-t border-primary/20"></div>
          
          {/* Chart Bars */}
          <div className="flex flex-col items-center gap-2 z-10 w-full">
            <div className="flex items-end justify-between w-full h-32 gap-3">
              {[25, 45, 38, 60, 30].map((h, i) => (
                <div key={i} className={`w-full rounded-t-lg relative group transition-all duration-300 ${i === 2 ? 'bg-primary-container shadow-md' : 'bg-surface-container-highest'}`} style={{ height: `${h}%` }}>
                  {i === 2 && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap">BUGÜN</div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between w-full px-1">
              {['PZT', 'SAL', 'ÇAR', 'PER', 'CUM'].map((day, i) => (
                <span key={i} className={`text-[10px] font-bold ${i === 2 ? 'text-primary' : 'text-outline'}`}>{day}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-error-container/30 p-4 rounded-2xl border-l-4 border-error">
          <AlertTriangle className="text-error w-8 h-8 flex-shrink-0" />
          <div>
            <p className="font-display font-bold text-on-error-container">{selectedCity} Baraj Doluluk: %38</p>
            <p className="text-xs text-on-error-container opacity-80">Geçen yıla göre %12 daha düşük seviye.</p>
          </div>
        </div>
      </section>

      {/* Haftalık Rapor Grid */}
      <h2 className="font-display text-xl font-bold text-on-surface pt-4">Haftalık Rapor</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Consumption Card */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl border-b-4 border-surface-container-highest shadow-md flex flex-col justify-between h-40">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Droplet className="text-primary w-5 h-5 fill-primary/10" />
          </div>
          <div>
            <h4 className="text-outline text-xs font-bold uppercase tracking-wider">HARCANDI</h4>
            <p className="font-display text-3xl font-bold text-on-surface">850L</p>
          </div>
        </div>

        {/* Savings Card */}
        <div className="bg-secondary-container/20 p-6 rounded-3xl border-b-4 border-secondary/20 shadow-md flex flex-col justify-between h-40">
          <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
            <Leaf className="text-secondary w-5 h-5 fill-secondary/10" />
          </div>
          <div>
            <h4 className="text-on-secondary-container text-xs font-bold uppercase tracking-wider">TASARRUF</h4>
            <p className="font-display text-3xl font-bold text-secondary">%12</p>
          </div>
        </div>

        {/* Analysis Insight */}
        <button 
          onClick={() => onNavigate && onNavigate('LEADERBOARD')}
          className="col-span-2 bg-surface-container-lowest p-6 rounded-3xl border-b-4 border-surface-container-highest shadow-md flex items-center justify-between active:translate-y-1 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-tertiary-container/20 rounded-2xl flex items-center justify-center">
              <TrendingUp className="text-tertiary w-8 h-8" />
            </div>
            <div>
              <p className="font-display font-bold text-on-surface">En İyi Gün: Salı</p>
              <p className="text-xs text-outline font-semibold">Ortalamanın 40L altındasın.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-bold text-primary bg-primary-container/20 px-2 py-1 rounded-full">LİG GÖR</span>
             <ChevronRight className="text-outline w-6 h-6" />
          </div>
        </button>
      </div>

      {/* CTA */}
      <button 
        onClick={handleAddWaterAction}
        className="w-full bg-primary text-white py-5 rounded-2xl font-display text-lg font-bold tactile-button-primary transition-all flex items-center justify-center gap-3 mt-4"
      >
        <PlusCircle className="w-6 h-6" />
        Su Tüketimi Ekle
      </button>
    </div>
  );
}
