import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Bell, Settings, LogOut, Droplet, Trees, Verified, ChevronRight, Leaf, X, Cloud } from 'lucide-react';
import GoogleDriveBackup from '../components/profile/GoogleDriveBackup.tsx';

interface ProfileProps {
  onLogout: () => void;
  totalLogged: number;
  setTotalLogged: (ml: number) => void;
}

export default function Profile({ onLogout, totalLogged, setTotalLogged }: ProfileProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleModalClose = () => setActiveModal(null);

  return (
    <div className="px-5 pb-8 space-y-8 max-w-2xl mx-auto overflow-x-hidden">
      {/* Profile Hero */}
      <section className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-primary p-1 bg-surface-container shadow-xl overflow-hidden">
            <img 
              alt="User" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEbxk36sHzSF59SKGpuos_mBlujZ2Bgn7aIHedGN1MrKwWE-AMD_wjNOjqz8hn-0fvxb07p_wLYE2ry16zox7qFkA-FtgR2Jn43EeGesUFZu6acXHbmJwhiD9jTtP_Yoh1N3OluZu3tPMyiEbwISuIVkLTic-i40OecYLqZt_sh90dPmxJVFOrzd835oT34CZ4JFd64UjmIPjAHHjJNP-yZyR5EcHGgjDicONPRz3HpEKjYI8gI46SrUOkGWq7o1xqjVLTAWp3QCg"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary px-4 py-1.5 rounded-full border-b-4 border-on-secondary-fixed-variant flex items-center gap-1 shadow-lg"
          >
            <Verified className="w-4 h-4 fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">Su Koruyucu</span>
          </motion.div>
        </div>

        <div className="pt-4">
          <h1 className="font-display text-3xl font-bold text-on-surface">Görkem Yıldırım</h1>
          <p className="text-on-surface-variant font-medium">Doğa Dostu Kaşif</p>
        </div>

        {/* XP Bar */}
        <div className="w-full space-y-2 bg-surface-container-low p-5 rounded-2xl border-b-4 border-surface-container-highest shadow-inner">
          <div className="flex justify-between items-center mb-1 px-1">
            <span className="text-sm font-bold text-primary">Seviye 12</span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">2.450 / 3.000 XP</span>
          </div>
          <div className="h-5 w-full bg-surface-container rounded-full overflow-hidden relative border border-white/20">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '82%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full"
            ></motion.div>
            <div className="absolute right-[18%] -top-0.5">
              <Leaf className="text-secondary w-5 h-5 fill-current" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-primary-fixed text-on-primary-fixed p-6 rounded-3xl border-b-4 border-primary/20 flex flex-col items-center justify-center text-center space-y-2 shadow-md">
          <Droplet className="w-8 h-8 text-primary fill-primary/10" />
          <div>
            <div className="font-display text-2xl font-bold">1.250L</div>
            <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Toplam Tasarruf</div>
          </div>
        </div>
        <div className="bg-secondary-container text-on-secondary-container p-6 rounded-3xl border-b-4 border-secondary/20 flex flex-col items-center justify-center text-center space-y-2 shadow-md">
          <Trees className="w-8 h-8 text-secondary fill-secondary/10" />
          <div>
            <div className="font-display text-2xl font-bold">3</div>
            <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Kurtarılan Ağaç</div>
          </div>
        </div>
      </section>

      {/* Menu List */}
      <section className="space-y-2">
        <h2 className="font-display text-lg font-bold px-2 py-2 text-outline uppercase tracking-wider">Ayarlar</h2>
        <div className="space-y-4">
          {[
            { id: 'ACCOUNT', label: 'Hesap Bilgileri', icon: User, color: 'text-primary' },
            { id: 'GOOGLE_DRIVE', label: 'Google Drive Yedekleme', icon: Cloud, color: 'text-secondary font-bold' },
            { id: 'NOTIF', label: 'Bildirimler', icon: Bell, color: 'text-primary' },
            { id: 'SETTINGS', label: 'Uygulama Ayarları', icon: Settings, color: 'text-primary' },
          ].map((item, i) => (
            <button 
              key={i}
              onClick={() => setActiveModal(item.id)}
              className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border-b-4 border-surface-container-highest hover:bg-surface-container-low active:translate-y-0.5 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className="font-display font-bold text-on-surface">{item.label}</span>
              </div>
              <ChevronRight className="text-outline w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border-b-4 border-error/20 hover:bg-error-container/20 active:translate-y-0.5 transition-all group shadow-sm mt-4"
          >
            <div className="flex items-center gap-4 text-error">
              <div className="w-10 h-10 rounded-full bg-error-container/30 flex items-center justify-center">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-display font-bold">Çıkış Yap</span>
            </div>
          </button>
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleModalClose}
              className="absolute inset-0 bg-on-background/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative w-full ${activeModal === 'GOOGLE_DRIVE' ? 'max-w-md' : 'max-w-sm'} bg-surface rounded-[2rem] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-display text-2xl font-bold text-on-surface">
                  {activeModal === 'ACCOUNT' ? 'Hesap Bilgileri' : activeModal === 'NOTIF' ? 'Bildirimler' : activeModal === 'SETTINGS' ? 'Ayarlar' : 'Google Drive Yedekleme'}
                </h3>
                <button onClick={handleModalClose} className="p-2 hover:bg-surface-container rounded-full transition-colors">
                  <X className="w-6 h-6 text-outline" />
                </button>
              </div>

              <div className="space-y-4">
                {activeModal === 'ACCOUNT' ? (
                  <div className="space-y-2">
                    <div className="p-4 bg-surface-container-low rounded-2xl">
                      <p className="text-xs font-bold text-outline mb-1">E-posta</p>
                      <p className="font-medium text-on-surface">gorkem.yildirim@flowly.app</p>
                    </div>
                    <div className="p-4 bg-surface-container-low rounded-2xl">
                      <p className="text-xs font-bold text-outline mb-1">Katılım Tarihi</p>
                      <p className="font-medium text-on-surface">12 Ocak 2024</p>
                    </div>
                    <div className="p-4 bg-surface-container-low rounded-2xl">
                      <p className="text-xs font-bold text-outline mb-1">Hesap Tipi</p>
                      <p className="font-medium text-primary">Premium Üye</p>
                    </div>
                  </div>
                ) : activeModal === 'NOTIF' ? (
                  <div className="space-y-4">
                    {[
                      { l: 'Su İçme Hatırlatıcı', s: true },
                      { l: 'Tasarruf Hedefleri', s: true },
                      { l: 'Haftalık Raporlar', s: false },
                      { l: 'Arkadaş Aktivitesi', s: true },
                    ].map((n, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                        <span className="font-medium text-on-surface">{n.l}</span>
                        <div className={`w-12 h-6 rounded-full transition-colors relative ${n.s ? 'bg-primary' : 'bg-outline'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${n.s ? 'left-7' : 'left-1'}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : activeModal === 'SETTINGS' ? (
                  <div className="space-y-4">
                    {[
                      { l: 'Koyu Tema', s: false },
                      { l: 'Veri Tasarrufu', s: true },
                      { l: 'Dil', v: 'Türkçe' },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                        <span className="font-medium text-on-surface">{s.l}</span>
                        {s.v ? (
                          <span className="text-primary font-bold">{s.v}</span>
                        ) : (
                          <div className={`w-12 h-6 rounded-full transition-colors relative ${s.s ? 'bg-primary' : 'bg-outline'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${s.s ? 'left-7' : 'left-1'}`}></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : activeModal === 'GOOGLE_DRIVE' ? (
                  <GoogleDriveBackup 
                    totalLogged={totalLogged} 
                    setTotalLogged={setTotalLogged} 
                    onClose={handleModalClose} 
                  />
                ) : (
                   <p className="text-on-surface-variant font-medium">Lütfen yapmak istediğiniz işlemi seçin.</p>
                 )}
              </div>

              {activeModal !== 'GOOGLE_DRIVE' && (
                <button 
                  onClick={handleModalClose}
                  className="w-full py-4 bg-primary text-on-primary font-display font-bold rounded-2xl tactile-button-primary"
                >
                  Tamam
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
