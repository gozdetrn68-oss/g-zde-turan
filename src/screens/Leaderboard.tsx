import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Medal, Clock, TrendingUp, TrendingDown, UserPlus, Users, Shield } from 'lucide-react';

export default function Leaderboard() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const contacts = [
    { name: 'Ayşe Kaya', status: 'Üye Değil' },
    { name: 'Can Demir', status: 'Üye Değil' },
    { name: 'Seda Akın', status: 'Üye Değil' },
    { name: 'Emre Yıldız', status: 'Üye' },
  ];

  return (
    <div className="px-5 mt-6 max-w-2xl mx-auto space-y-8 pb-24">
      {/* League Header Section */}
      <section className="bg-gradient-to-br from-tertiary-fixed to-tertiary-container rounded-3xl p-6 flex flex-col items-center text-center relative overflow-hidden shadow-lg border-b-4 border-tertiary">
        <div className="absolute -right-4 -top-4 opacity-20 rotate-12">
          <Medal className="w-32 h-32" />
        </div>
        <Medal className="text-on-tertiary-fixed w-16 h-16 mb-2 fill-current" />
        <h2 className="font-display text-3xl font-bold text-on-tertiary-fixed">Altın Lig</h2>
        <p className="text-xs font-bold text-on-tertiary-fixed-variant opacity-80 uppercase tracking-widest">Haftalık Kupa</p>
        
        <div className="mt-4 bg-surface-container-lowest/40 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-2 border border-white/20">
          <Clock className="w-4 h-4 text-on-tertiary-fixed" />
          <span className="text-xs font-bold text-on-tertiary-fixed">Kapanışa: 2g 14s</span>
        </div>
      </section>

      {/* Leaderboard */}
      <div className="space-y-4">
        <h3 className="font-display text-xl font-bold text-on-surface-variant flex items-center gap-2 px-2">
          <Users className="w-6 h-6" />
          Su Şampiyonu Sıralaması
        </h3>

        {[
          { 
            rank: 1, 
            name: 'Mert', 
            stat: '250L Tasarruf', 
            sub: 'Geçen hafta şampiyonu', 
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDihzFgaf6PyWSVd-8EYra5-qoEdUfj7dnV6HFAcicZ1PYfikn6Z2VVWgn9htwnuXcJWkHvnP39qde1AqfE42wtjuw6SjAgZ13QcPlzKCJtcBl5W2zmRDObBgkgu6aIRXNAfcSiJuGBX4NIhAsMRA-QDcmsygeMXcQ_0-Q31XvxmDxiE13dohwquq_dyiF1yOgrOGB0MNNHhDW1vW9nJTdZokJHBHW21Ik3QFOhK_A3g1sRuI6YuVcyNeeIbIz-yLbkci5cc_ierIs', 
            highlight: true,
            trend: 'up'
          },
          { 
            rank: 2, 
            name: 'Selin', 
            stat: '210L Tasarruf', 
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjGNuYOamcy4kzu_dm89mWmpnkMWdnZRZoyZXiLQKEHrXv0ZjmPGOaE-AEeDMrs2-S-6JB0nv3vAFcex6TGjYiHXGQNZdfa94NJVM3KuRUZnvnlD6yUJQzX_taCMwu3deFk9S1YKDkqwwII-TNCxAEp2_LwuKmTJbfjcgC8Ol5-OeAxOjK_pPbbI-R6t6wcGjaEceGkvKBU4PkhjyYOg2j6bPaAFmxSgmLl7nv_BqDRqb5qzbLkUft25EyV6izVbrOIW9BxE7DBb0' 
          },
          { 
            rank: 3, 
            name: 'Kullanıcı (Siz)', 
            stat: '190L Tasarruf', 
            sub: 'İlk 3\'te kalmaya devam et!', 
            isUser: true,
            trend: 'up',
            change: '+2'
          },
        ].map((user, i) => (
          <motion.div 
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center justify-between p-4 rounded-3xl border-2 transition-all shadow-md ${
              user.isUser 
                ? 'bg-primary-fixed border-primary-container ring-2 ring-primary ring-offset-2' 
                : 'bg-surface-container-lowest border-surface-container-highest'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                {user.img ? (
                  <img src={user.img} className={`w-12 h-12 rounded-full border-2 ${user.highlight ? 'border-tertiary' : 'border-outline-variant'}`} />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center border-2 border-white">
                    <span className="text-white">👤</span>
                  </div>
                )}
                <span className={`absolute -top-2 -left-2 w-6 h-6 flex items-center justify-center rounded-full border-2 border-white text-[10px] font-bold ${
                  user.rank === 1 ? 'bg-tertiary text-white' : 
                  user.rank === 2 ? 'bg-outline-variant text-on-surface' : 
                  'bg-secondary-container text-on-secondary-container'
                }`}>
                  {user.rank}
                </span>
              </div>
              <div>
                <p className={`font-bold text-sm ${user.isUser ? 'text-on-primary-fixed' : 'text-on-surface'}`}>
                  {user.name} ({user.stat}) {user.highlight && '🏆'}
                </p>
                {user.sub && <p className={`text-[10px] font-semibold ${user.isUser ? 'text-primary' : 'text-outline'}`}>{user.sub}</p>}
              </div>
            </div>
            
            {user.trend && (
              <div className="flex flex-col items-center">
                {user.trend === 'up' ? <TrendingUp className="w-4 h-4 text-primary" /> : <TrendingDown className="w-4 h-4 text-error" />}
                {user.change && <span className="text-[10px] font-bold text-primary">{user.change}</span>}
              </div>
            )}
          </motion.div>
        ))}

        {/* Promotion Info */}
        <div className="flex items-center gap-3 bg-secondary-container/20 p-5 rounded-3xl border-2 border-dashed border-secondary-container text-on-secondary-container mt-6 shadow-inner">
          <div className="bg-secondary-container p-2 rounded-full">
            <Shield className="w-5 h-5 text-secondary fill-secondary/20" />
          </div>
          <p className="text-xs font-bold">Tebrikler! Mevcut konumunla üst lige yükseliyorsun.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="pt-6">
        <button 
          onClick={() => setShowInviteModal(true)}
          className="w-full bg-primary hover:bg-primary-container text-on-primary font-display py-5 rounded-2xl tactile-button-primary flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
        >
          <UserPlus className="w-6 h-6" />
          Arkadaşlarını Davet Et
        </button>
        <p className="text-center mt-3 text-xs font-bold text-outline uppercase tracking-wider">Arkadaşlarınla yarışarak daha fazla tasarruf et!</p>
      </div>

      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowInviteModal(false)}
               className="absolute inset-0 bg-on-background/40 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="relative w-full max-w-sm bg-surface rounded-[2rem] p-6 shadow-2xl space-y-4"
            >
              <h3 className="font-display text-xl font-bold text-on-surface">Kişilerden Seç</h3>
              <div className="space-y-2">
                {contacts.map((contact, i) => (
                  <button 
                    key={i} 
                    className="w-full flex items-center justify-between p-4 bg-surface-container-lowest rounded-2xl border-2 border-surface-container-highest hover:bg-primary/5 active:scale-95 transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center font-bold text-primary">
                        {contact.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-on-surface">{contact.name}</p>
                        <p className="text-[10px] text-outline font-semibold">{contact.status}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-primary px-2 py-1 bg-primary-container/20 rounded-full">DAVET ET</span>
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="w-full py-3 text-sm font-bold text-outline hover:text-on-surface transition-colors"
              >
                Kapat
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
