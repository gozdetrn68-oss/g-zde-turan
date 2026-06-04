import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Droplets, ShowerHead, Bath, UtensilsCrossed, Waves, Shirt, Wind, LucideIcon } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

interface Option {
  id: string;
  title: string;
  sub: string;
  icon: LucideIcon;
  color: string;
}

const steps = [
  {
    id: 'SHOWER',
    title: 'Günde ortalama kaç dakika duş alıyorsun?',
    options: [
      { id: 's1', title: '5 dakikadan az', sub: 'Hızlı ve çevreci', icon: Timer, color: 'bg-primary-fixed-dim' },
      { id: 's2', title: '5-10 dakika', sub: 'Ortalama süre', icon: Droplets, color: 'bg-primary' },
      { id: 's3', title: '10-15 dakika', sub: 'Rahatlama modu', icon: ShowerHead, color: 'bg-secondary-container' },
      { id: 's4', title: '15+ dakika', sub: 'Uzun keyif', icon: Bath, color: 'bg-tertiary-fixed' },
    ]
  },
  {
    id: 'DISHES',
    title: 'Bulaşıkları genelde nasıl yıkarsın?',
    options: [
      { id: 'd1', title: 'Tam dolu makine', sub: 'En verimli yöntem', icon: UtensilsCrossed, color: 'bg-primary-fixed-dim' },
      { id: 'd2', title: 'Yarı dolu makine', sub: 'Biraz su israfı', icon: UtensilsCrossed, color: 'bg-primary' },
      { id: 'd3', title: 'Elde yıkama', sub: 'Yüksek tüketim', icon: Waves, color: 'bg-secondary-container' },
      { id: 'd4', title: 'Sürekli su açık', sub: 'Çok yüksek israf', icon: Waves, color: 'bg-error-container' },
    ]
  },
  {
    id: 'LAUNDRY',
    title: 'Haftada kaç kez çamaşır yıkarsın?',
    options: [
      { id: 'l1', title: '1-2 kez', sub: 'Verimli kullanım', icon: Shirt, color: 'bg-primary-fixed-dim' },
      { id: 'l2', title: '3-4 kez', sub: 'Ortalama kullanım', icon: Shirt, color: 'bg-primary' },
      { id: 'l3', title: '5+ kez', sub: 'Yüksek kapasite', icon: Waves, color: 'bg-secondary-container' },
      { id: 'l4', title: 'Her gün', sub: 'Aşırı tüketim', icon: Wind, color: 'bg-tertiary-fixed' },
    ]
  }
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const handleSelect = (optionId: string) => {
    setSelections({ ...selections, [steps[currentStep].id]: optionId });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentSelections = selections[steps[currentStep].id];

  return (
    <div className="flex flex-col px-5 py-8 max-w-md mx-auto h-full">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-outline">ADIM {currentStep + 1} / {steps.length}</span>
          <span className="text-sm font-bold text-primary">
            {currentStep === 0 ? 'Başlıyoruz!' : currentStep === 1 ? 'Devam ediyoruz' : 'Neredeyse bitti'}
          </span>
        </div>
        <div className="w-full bg-surface-container-highest h-4 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-primary h-full rounded-full flex justify-end items-center pr-1 transition-all"
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-grow"
        >
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-on-background mb-4">{steps[currentStep].title}</h2>
            <p className="font-medium text-on-surface-variant">Bu bilgi, su ayak izinizi hesaplamamıza yardımcı olacak.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-12">
            {steps[currentStep].options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`flex items-center gap-4 p-6 rounded-2xl text-left transition-all border-2 active:scale-95 ${
                  currentSelections === opt.id 
                    ? 'border-primary bg-primary-container/20 shadow-[0_4px_0_0_#00629d]' 
                    : 'border-surface-container-highest bg-surface-container-lowest shadow-[0_4px_0_0_#e0e3e5]'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${opt.color} ${currentSelections === opt.id ? 'text-white' : 'text-on-surface'}`}>
                  <opt.icon className="w-8 h-8" />
                </div>
                <div>
                  <span className={`block font-display text-lg font-bold ${currentSelections === opt.id ? 'text-primary' : 'text-on-surface'}`}>{opt.title}</span>
                  <span className="block text-xs font-semibold text-outline">{opt.sub}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-auto pt-4">
        <button 
          disabled={!currentSelections}
          onClick={nextStep}
          className={`w-full h-16 bg-primary text-on-primary font-display text-xl rounded-2xl tactile-button-primary flex items-center justify-center gap-2 transition-all ${!currentSelections ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:brightness-110'}`}
        >
          {currentStep === steps.length - 1 ? 'Tamamla' : 'Devam Et'}
        </button>
        <p className="text-center text-xs font-semibold text-outline mt-4">
          İstediğin zaman bu bilgileri profilinden değiştirebilirsin.
        </p>
      </div>
    </div>
  );
}
