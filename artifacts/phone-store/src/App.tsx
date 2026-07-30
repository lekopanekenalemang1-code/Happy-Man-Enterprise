import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TechStore from './TechStore';
import OlamStore from './OlamStore';

type Store = 'tech' | 'olam' | null;

const fadeSlide = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -12, scale: 0.97, transition: { duration: 0.3 } },
};

function HomePage({ onSelect }: { onSelect: (s: Store) => void }) {
  return (
    <div className="h-[100dvh] w-full flex flex-col bg-background text-foreground overflow-hidden">
      {/* Background effects */}
      <div className="noise-bg" />
      <div className="ambient-glow" />
      {/* Extra glow for the blue side */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 60% at 75% 60%, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />

      {/* Header */}
      <header className="h-16 flex-shrink-0 flex items-center justify-center px-6 border-b border-border/10 relative z-10">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Happy Man Enterprise" className="h-9 w-9 object-contain" />
          <div className="text-center">
            <p className="text-[11px] font-bold tracking-[0.15em] text-foreground/70 uppercase">Happy Man Enterprise PTY LTD</p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-2 tracking-tight text-primary">
            Welcome
          </h1>
          <p className="text-center text-muted-foreground text-sm md:text-base mb-10">
            Select a store to start shopping
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Tech Inc */}
            <motion.button
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect('tech')}
              className="group relative flex flex-col items-start p-7 bg-card/40 backdrop-blur-xl border border-border/50 rounded-[2rem] hover:border-primary/50 hover:bg-secondary/30 transition-all duration-500 text-left overflow-hidden shadow-lg"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <div className="absolute bottom-0 right-0 w-40 h-40 opacity-[0.04] pointer-events-none"
                style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />

              {/* Logo */}
              <div className="mb-5">
                <img src="/logo.png" alt="Tech Inc" className="w-14 h-14 object-contain" />
              </div>

              <h2 className="text-2xl font-bold text-primary mb-1 tracking-tight">Tech Inc</h2>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                A subsidiary of Happy Man Enterprise PTY LTD
              </p>
              <p className="text-sm text-foreground/60 leading-relaxed mb-5">
                Certified refurbished iPhones, Samsung & Pixel phones. Battery health guaranteed over 80%.
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {['iPhone','Samsung','Pixel'].map(b => (
                  <span key={b} className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary/80">{b}</span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-foreground/50 group-hover:text-primary transition-colors">
                Shop now <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </motion.button>

            {/* Olam's Footprints */}
            <motion.button
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect('olam')}
              className="group relative flex flex-col items-start p-7 rounded-[2rem] border border-blue-900/40 hover:border-blue-500/40 transition-all duration-500 text-left overflow-hidden shadow-lg"
              style={{ background: 'rgba(4,13,30,0.7)', backdropFilter: 'blur(20px)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
              <div className="absolute bottom-0 right-0 w-40 h-40 opacity-[0.06] pointer-events-none"
                style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />

              {/* Olam's logo — infinity symbol in brand blue */}
              <div className="mb-5 w-14 h-14 rounded-2xl flex items-center justify-center border border-blue-800/40"
                style={{ background: 'rgba(10,30,60,0.8)' }}>
                <span className="text-3xl font-black text-blue-400">∞</span>
              </div>

              <h2 className="text-2xl font-bold text-blue-300 mb-1 tracking-tight">Olam's Footprints</h2>
              <p className="text-xs text-blue-400/50 mb-4 italic">"Steps That Leave a Mark"</p>
              <p className="text-sm text-blue-200/50 leading-relaxed mb-5">
                Premium jerseys & quality footwear. Nike, Adidas, Converse, ASICS, Puma, Vans, NB, Crocs & more.
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {['Jerseys','Nike','Adidas','+ 6 more'].map(b => (
                  <span key={b} className="text-[11px] px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-700/30 text-blue-400/80">{b}</span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-blue-400/40 group-hover:text-blue-300 transition-colors">
                Shop now <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </motion.button>
          </div>

          <p className="text-center text-xs text-muted-foreground/30 mt-8">Botswana · Pula (P)</p>
        </motion.div>
      </main>
    </div>
  );
}

export default function App() {
  const [store, setStore] = useState<Store>(null);

  return (
    <AnimatePresence mode="wait">
      {store === null && (
        <motion.div key="home" {...fadeSlide} className="w-full h-full">
          <HomePage onSelect={setStore} />
        </motion.div>
      )}
      {store === 'tech' && (
        <motion.div key="tech" {...fadeSlide} className="w-full h-full">
          <TechStore onBack={() => setStore(null)} />
        </motion.div>
      )}
      {store === 'olam' && (
        <motion.div key="olam" {...fadeSlide} className="w-full h-full">
          <OlamStore onBack={() => setStore(null)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
