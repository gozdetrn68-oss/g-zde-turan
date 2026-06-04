import { useState, useEffect, FormEvent } from 'react';
import { Mail, Lock, Eye, ArrowRight, User, Loader2, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getLoginFunFact } from '../services/gemini.ts';

interface LoginProps {
  onLogin: () => void;
}

type AuthMode = 'LOGIN' | 'REGISTER' | 'FORGOT_PASSWORD';

export default function Login({ onLogin }: LoginProps) {
  const [mode, setMode] = useState<AuthMode>('LOGIN');
  const [funFact, setFunFact] = useState("Yükleniyor...");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    getLoginFunFact().then(setFunFact);
  }, []);

  const handleAction = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    
    if (mode === 'FORGOT_PASSWORD') {
      alert(`Şifre sıfırlama kodu ${email} adresine gönderildi!`);
      setMode('LOGIN');
    } else {
      onLogin();
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Hesabınız başarıyla oluşturuldu! Şimdi giriş yapabilirsiniz.');
    setMode('LOGIN');
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    // Simulation of Google OAuth redirection
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onLogin();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-10 overflow-x-hidden">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex flex-col items-center justify-center space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-primary" />
            </motion.div>
            <p className="font-display text-xl font-bold text-primary animate-pulse">
              {mode === 'LOGIN' ? 'Giriş Yapılıyor...' : mode === 'REGISTER' ? 'Hesap Oluşturuluyor...' : 'Yönlendiriliyorsunuz...'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Image Section */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full h-[35vh] relative overflow-hidden flex items-center justify-center p-5 bg-gradient-to-b from-primary/20 to-background"
      >
        <img 
          alt="Flowly App Header" 
          src="https://images.unsplash.com/photo-1548932813-71ede39359ec?q=80&w=1000&auto=format&fit=crop"
          className="w-full h-full object-cover absolute inset-0 opacity-40 mix-blend-overlay"
        />
        <img 
          alt="Flowly Mascot" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXPe3CZi99aUWTngwi4PDmjI383d0RL-9vEWin4soSO5A8Nye5AGFdBNPZ3WDm92cXEd9WZU-Gv2Mp3GrBhDNbDiIlJ4jeUWcJpABwpVwkeUSa9dmR45zhUgZUc22FTaMsp5Zcib113kFVcdL113uS9LqyKVgV8aQVwLp87x_c48ApWw5Uv8RCUBX_KhnppNWw3bKzB1QIBn3MehZlhPIbxzeWvU-Mg9VgLP64UlMp0q0YHTgtR2NRw3RpJ_-5BKKWZmDJextrKLY"
          className="w-48 h-48 object-contain relative z-10 drop-shadow-2xl"
        />
      </motion.div>

      <div className="px-5 -mt-8 relative z-20">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8 bg-background/80 backdrop-blur-sm p-4 rounded-3xl"
        >
          <h1 className="font-display text-5xl text-primary font-bold mb-1 italic tracking-tighter">Flowly</h1>
          <p className="text-on-surface-variant font-bold">
            {mode === 'LOGIN' ? 'Hoş Geldiniz' : mode === 'REGISTER' ? 'Yeni Bir Başlangıç' : 'Şifreni Sıfırla'}
          </p>
        </motion.div>

        <div className="w-full max-w-sm mx-auto space-y-4">
          <form onSubmit={mode === 'REGISTER' ? handleRegister : handleAction} className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div 
                key={mode}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-4"
              >
                {mode === 'REGISTER' && (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant px-1 uppercase tracking-widest">Ad Soyad</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary w-5 h-5 transition-colors" />
                      <input 
                        type="text" 
                        placeholder="Adınız Soyadınız"
                        className="w-full h-14 pl-12 pr-4 bg-surface-container rounded-2xl border-2 border-transparent focus:border-primary outline-none transition-all font-medium text-on-surface shadow-inner"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-bold text-on-surface-variant px-1 uppercase tracking-widest font-mono">E-posta</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary w-5 h-5 transition-colors" />
                    <input 
                      type="text" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@mail.com"
                      className="w-full h-14 pl-12 pr-4 bg-surface-container rounded-2xl border-2 border-transparent focus:border-primary outline-none transition-all font-medium text-on-surface shadow-inner"
                    />
                  </div>
                </div>

                {mode !== 'FORGOT_PASSWORD' && (
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant px-1 uppercase tracking-widest font-mono">Şifre</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary w-5 h-5 transition-colors" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className="w-full h-14 pl-12 pr-12 bg-surface-container rounded-2xl border-2 border-transparent focus:border-primary outline-none transition-all font-medium text-on-surface shadow-inner"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {mode === 'LOGIN' && (
              <div className="flex justify-end">
                <button 
                  type="button"
                  onClick={() => setMode('FORGOT_PASSWORD')}
                  className="text-sm font-bold text-primary hover:text-on-primary-container transition-colors"
                >
                  Şifremi Unuttum
                </button>
              </div>
            )}

            <button 
              type="submit"
              className="w-full h-16 bg-primary text-on-primary font-display text-xl rounded-2xl tactile-button-primary flex items-center justify-center gap-2 mt-4 hover:brightness-110 active:scale-95 transition-all shadow-xl"
            >
              {mode === 'LOGIN' ? 'Giriş Yap' : mode === 'REGISTER' ? 'Kayıt Ol' : 'Kod Gönder'}
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>

          {mode !== 'FORGOT_PASSWORD' && (
            <div className="pt-6 text-center space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-px w-full bg-outline-variant opacity-30"></div>
                <span className="text-xs font-bold text-outline uppercase tracking-wider">veya</span>
                <div className="h-px w-full bg-outline-variant opacity-30"></div>
              </div>

              <button 
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full h-14 bg-surface-container-highest text-on-surface font-bold rounded-2xl flex items-center justify-center gap-3 border-b-4 border-surface-container-highest hover:bg-surface-container-high transition-colors active:translate-y-1 active:border-b-0 shadow-sm"
              >
                <img 
                  alt="Google Logo" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdn99F5IZgRnp4rm1MN_SuKvnhslnL1hcEQUZfLRrYbjrRQZRD9nO4-N3tJ0JlBtQbMuqBHiBmmdRzIpFGQKOc14olmHFqy7uRXDm9FqUhZz7oOElDVxEKknRZMIr8fxduohR8q6glPxzmWsxfOcVdNewDHQbMzXWJxZY50Fvu3eMqaWKxGXQ2yw2UdRdyXw8upVoYTdEYmXaCBr73FYvCXF-OmCayZBTbLatqrtwQ6bC1QrOTKbl098z-d9JSp0-ByPxOGKe2voQ"
                  className="w-6 h-6"
                />
                Google ile Devam Et
              </button>
            </div>
          )}

          <div className="text-center mt-6">
            <button 
              type="button"
              onClick={() => setMode(mode === 'LOGIN' ? 'REGISTER' : 'LOGIN')}
              className="text-sm font-bold text-on-surface-variant"
            >
              {mode === 'LOGIN' ? (
                <>Hesabın yok mu? <span className="text-secondary hover:underline">Yeni Hesap Oluştur</span></>
              ) : (
                 <span className="text-secondary hover:underline flex items-center justify-center gap-2">
                   <ArrowRight className="w-4 h-4 rotate-180" /> Giriş Yap'a Dön
                 </span>
              )}
            </button>
          </div>
        </div>

        <motion.div 
          key={funFact}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-12 p-6 bg-secondary-container/20 rounded-2xl flex items-start gap-4 border border-secondary-container/30 max-w-sm mx-auto shadow-sm"
        >
          <div className="text-secondary text-2xl">💡</div>
          <p className="text-xs font-bold text-on-secondary-container">
            {funFact}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

