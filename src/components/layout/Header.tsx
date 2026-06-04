import { Droplet, Flame } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-surface border-b-4 border-surface-container-highest flex justify-between items-center w-full px-5 py-2 h-16 fixed top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-primary-container p-2 rounded-lg tactile-shadow border-b-2 border-primary">
          <Droplet className="text-on-primary-container w-5 h-5 fill-current" />
        </div>
        <h1 className="font-display text-2xl font-bold text-primary">Flowly</h1>
      </div>
      
      <div className="flex items-center gap-2 bg-surface-container-low px-4 py-1.5 rounded-full border-2 border-surface-container-highest cursor-pointer active:translate-y-0.5 transition-all">
        <Flame className="text-tertiary-container w-5 h-5 fill-current" />
        <span className="font-display font-bold text-primary">5 Seri</span>
      </div>
    </header>
  );
}
