import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronRight, Smartphone } from 'lucide-react';
import { SiApple, SiSamsung, SiGoogle } from 'react-icons/si';

type StoragePricing = Record<string, number>;

type PhoneModel = {
  name: string;
  basePrice: number;
  colors: string[];
  storages: StoragePricing;
};

const CATALOG: Record<string, PhoneModel[]> = {
  "iPhone": [
    { name: "iPhone 15", basePrice: 699, colors: ["Black Titanium", "White Titanium", "Blue Titanium", "Natural Titanium"], storages: { "128GB": 0, "256GB": 100, "512GB": 200 } },
    { name: "iPhone 14", basePrice: 549, colors: ["Midnight", "Starlight", "Blue", "Purple", "Red"], storages: { "128GB": 0, "256GB": 80, "512GB": 160 } },
    { name: "iPhone 13", basePrice: 429, colors: ["Midnight", "Starlight", "Blue", "Pink", "Green"], storages: { "128GB": 0, "256GB": 70, "512GB": 140 } }
  ],
  "Samsung": [
    { name: "Galaxy S24", basePrice: 649, colors: ["Onyx Black", "Marble Gray", "Cobalt Violet", "Amber Yellow"], storages: { "128GB": 0, "256GB": 100, "512GB": 200 } },
    { name: "Galaxy S23", basePrice: 499, colors: ["Phantom Black", "Cream", "Green", "Lavender"], storages: { "128GB": 0, "256GB": 80, "512GB": 160 } },
    { name: "Galaxy S22", basePrice: 379, colors: ["Phantom Black", "Phantom White", "Green", "Pink Gold"], storages: { "128GB": 0, "256GB": 70, "512GB": 140 } }
  ],
  "Google Pixel": [
    { name: "Pixel 9", basePrice: 599, colors: ["Obsidian", "Porcelain", "Wintergreen", "Peony"], storages: { "128GB": 0, "256GB": 100, "512GB": 200 } },
    { name: "Pixel 8", basePrice: 449, colors: ["Obsidian", "Hazel", "Rose"], storages: { "128GB": 0, "256GB": 80, "512GB": 160 } },
    { name: "Pixel 7", basePrice: 349, colors: ["Obsidian", "Snow", "Lemongrass"], storages: { "128GB": 0, "256GB": 70, "512GB": 140 } }
  ]
};

const COLOR_HEX: Record<string, string> = {
  "Black Titanium": "#2e2e2e", "White Titanium": "#f5f5f0", "Blue Titanium": "#2b3b4f", "Natural Titanium": "#8c8983",
  "Midnight": "#171e27", "Starlight": "#f9f6ef", "Blue": "#215e7c", "Purple": "#e5dbea", "Red": "#fc0324",
  "Pink": "#fae0d8", "Green": "#394c38",
  "Onyx Black": "#1c1c1c", "Marble Gray": "#d4d4d4", "Cobalt Violet": "#6c5b7b", "Amber Yellow": "#f4d03f",
  "Phantom Black": "#111111", "Cream": "#fdf6e3", "Lavender": "#d8b4e2",
  "Phantom White": "#f8f9fa", "Pink Gold": "#e6a8d7",
  "Obsidian": "#1c1c1c", "Porcelain": "#f1eee9", "Wintergreen": "#b0d8c7", "Peony": "#e8a0b0",
  "Hazel": "#575e53", "Rose": "#f0b3b3",
  "Snow": "#f7f7f7", "Lemongrass": "#dce5b7"
};

const BRAND_ICONS: Record<string, React.ElementType> = {
  "iPhone": SiApple,
  "Samsung": SiSamsung,
  "Google Pixel": SiGoogle
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '10%' : '-10%',
    opacity: 0,
    scale: 0.95,
    filter: 'blur(8px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '10%' : '-10%',
    opacity: 0,
    scale: 0.95,
    filter: 'blur(8px)',
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
};

function StoreConfigurator() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [brand, setBrand] = useState<string | null>(null);
  const [model, setModel] = useState<PhoneModel | null>(null);
  const [storage, setStorage] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);

  const handleBrand = (b: string) => {
    setBrand(b);
    setModel(null);
    setStorage(null);
    setColor(null);
    setDirection(1);
    setStep(1);
  };

  const handleModel = (m: PhoneModel) => {
    setModel(m);
    setStorage(null);
    setColor(null);
    setDirection(1);
    setStep(2);
  };

  const handleStorage = (s: string) => {
    setStorage(s);
    setColor(null);
    setDirection(1);
    setStep(3);
  };

  const handleColor = (c: string) => {
    setColor(c);
    setDirection(1);
    setStep(4);
  };

  const handlePlaceOrder = () => {
    setDirection(1);
    setStep(5);
  };

  const handleJumpToStep = (targetStep: number) => {
    if (targetStep < step) {
      setDirection(-1);
      setStep(targetStep);
      // Clean up future state defensively so it matches the current step context
      if (targetStep <= 0) { setModel(null); setStorage(null); setColor(null); }
      else if (targetStep <= 1) { setStorage(null); setColor(null); }
      else if (targetStep <= 2) { setColor(null); }
    }
  };

  const handleBack = () => {
    if (step > 0) handleJumpToStep(step - 1);
  };

  const reset = () => {
    setDirection(-1);
    setBrand(null);
    setModel(null);
    setStorage(null);
    setColor(null);
    setStep(0);
  };

  const totalPrice = useMemo(() => {
    if (!model) return 0;
    let price = model.basePrice;
    if (storage && model.storages[storage]) {
      price += model.storages[storage];
    }
    return price;
  }, [model, storage]);

  const getSummaryBreadcrumbs = () => {
    const crumbs = [];
    if (brand) crumbs.push({ label: brand, step: 0 });
    if (model) crumbs.push({ label: model.name, step: 1 });
    if (storage) crumbs.push({ label: `${storage}`, step: 2 });
    if (color && step > 3) crumbs.push({ label: color, step: 3 });
    return crumbs;
  };

  const breadcrumbs = getSummaryBreadcrumbs();

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="w-full max-w-4xl px-4">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6 md:mb-12 text-center tracking-tight text-primary">Choose your brand</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {Object.keys(CATALOG).map(b => {
                const Icon = BRAND_ICONS[b];
                return (
                  <button
                    key={b}
                    onClick={() => handleBrand(b)}
                    className="group flex flex-col items-center justify-center py-8 md:py-14 px-4 bg-card/40 backdrop-blur-md border border-border/50 rounded-[2rem] hover:bg-secondary/40 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-500"
                  >
                    <Icon className="w-16 h-16 md:w-20 md:h-20 mb-6 text-foreground/60 group-hover:text-primary group-hover:scale-110 transition-all duration-500" />
                    <span className="text-xl md:text-2xl font-medium tracking-wide">{b}</span>
                  </button>
                )
              })}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="w-full max-w-4xl px-4">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6 md:mb-12 text-center tracking-tight text-primary">Which model?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {brand && CATALOG[brand]?.map(m => (
                <button
                  key={m.name}
                  onClick={() => handleModel(m)}
                  className="group flex flex-col justify-between p-6 md:p-10 h-28 md:h-48 bg-card/40 backdrop-blur-md border border-border/50 rounded-[2rem] hover:bg-secondary/40 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-500 text-left"
                >
                  <span className="text-xl md:text-3xl font-medium tracking-tight text-foreground/90 group-hover:text-primary transition-colors">{m.name}</span>
                  <span className="text-lg text-muted-foreground font-medium">From ${m.basePrice}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="w-full max-w-4xl px-4">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6 md:mb-12 text-center tracking-tight text-primary">How much storage?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {model?.storages && Object.entries(model.storages).map(([size, priceAdded]) => (
                <button
                  key={size}
                  onClick={() => handleStorage(size)}
                  className="group flex flex-col justify-between p-6 md:p-10 h-28 md:h-48 bg-card/40 backdrop-blur-md border border-border/50 rounded-[2rem] hover:bg-secondary/40 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-500 text-left"
                >
                  <span className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground/90 group-hover:text-primary transition-colors">{size}</span>
                  <span className="text-lg text-muted-foreground font-medium">{priceAdded === 0 ? "Included" : `+$${priceAdded}`}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="w-full max-w-3xl px-4">
            <h2 className="text-3xl md:text-5xl font-semibold mb-8 md:mb-16 text-center tracking-tight text-primary">Pick a color</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-14">
              {model?.colors && model.colors.map((c, i) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                  className="flex flex-col items-center gap-4"
                >
                  <button
                    onClick={() => handleColor(c)}
                    className="group relative w-16 h-16 md:w-24 md:h-24 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background transition-transform hover:scale-110 active:scale-95"
                  >
                    <div
                      className="absolute inset-0 rounded-full shadow-[inset_0_2px_10px_rgba(255,255,255,0.2),inset_0_-4px_10px_rgba(0,0,0,0.5)] border border-white/10"
                      style={{ backgroundColor: COLOR_HEX[c] }}
                    />
                    <div className="absolute -inset-2 rounded-full border border-transparent group-hover:border-primary/30 transition-colors" />
                  </button>
                  <span className="text-sm md:text-base font-medium text-muted-foreground tracking-wide">{c}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 4:
        return model ? (
          <div className="w-full max-w-md px-4">
            <div className="bg-card/60 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />

              <h2 className="text-2xl md:text-3xl font-semibold mb-8 tracking-tight">Order Summary</h2>

              <div className="space-y-4 md:space-y-6 mb-6 md:mb-10">
                <div className="flex justify-between items-end border-b border-border/50 pb-4 md:pb-6">
                  <div>
                    <div className="text-muted-foreground text-sm tracking-widest uppercase mb-2">{brand}</div>
                    <div className="text-2xl font-medium tracking-tight">{model.name}</div>
                  </div>
                  <div className="text-2xl font-medium">${model.basePrice}</div>
                </div>

                <div className="flex justify-between items-center py-2">
                  <div className="text-muted-foreground text-lg">{storage} Storage</div>
                  <div className="font-medium text-lg">{model.storages[storage!] > 0 ? `+$${model.storages[storage!]}` : 'Included'}</div>
                </div>

                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: COLOR_HEX[color!] }} />
                    <span className="text-muted-foreground text-lg">{color}</span>
                  </div>
                  <div className="font-medium text-lg">Included</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-2xl md:text-3xl font-semibold mb-6 md:mb-10">
                <div>Total</div>
                <div className="text-primary">${totalPrice}</div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg md:text-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:-translate-y-1 active:translate-y-0"
              >
                Place Order <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        ) : null;
      case 5:
        return (
          <div className="w-full max-w-lg px-4 text-center flex flex-col items-center">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
              className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center mb-8 border border-primary/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              <CheckCircle2 className="w-14 h-14 text-primary" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-primary">Order Confirmed</h2>
              <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-md mx-auto leading-relaxed">
                Your refurbished {model?.name} is being prepared. Estimated delivery in 2-3 days.
              </p>
              <button
                onClick={reset}
                className="text-base font-medium text-foreground/80 hover:text-primary transition-colors border-b border-border hover:border-primary pb-1"
              >
                Start a new configuration
              </button>
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-background text-foreground overflow-hidden selection:bg-primary/20">
      <div className="noise-bg" />
      <div className="ambient-glow" />

      {/* Header */}
      <header className="h-24 flex-shrink-0 flex items-center justify-between px-6 md:px-12 relative z-20 border-b border-border/10">
        <div className="flex items-center gap-3 font-medium text-primary">
          <Smartphone className="w-5 h-5 md:w-6 md:h-6" />
          <div className="flex flex-col">
            <span className="tracking-widest text-sm md:text-base leading-none">REFURBISHED</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Excellent Condition</span>
          </div>
        </div>
        {step < 4 && (
          <div className="text-xs md:text-sm text-muted-foreground font-medium flex gap-2 items-center tracking-widest uppercase">
            Step {step + 1} <span className="opacity-40">/</span> 4
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 overflow-hidden flex flex-col">
        {/* Breadcrumbs Overlay */}
        <div className="absolute top-0 left-0 w-full h-20 flex items-start justify-center pt-6 pointer-events-none z-30">
          <AnimatePresence mode="wait">
            {breadcrumbs.length > 0 && step < 4 && (
              <motion.div
                key={breadcrumbs.length}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-2 text-sm md:text-base text-muted-foreground font-medium pointer-events-auto bg-background/50 backdrop-blur-xl px-5 py-2.5 rounded-full border border-border/30 shadow-lg"
              >
                {breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={crumb.step}>
                    {idx > 0 && <span className="opacity-40 mx-1">·</span>}
                    <button
                      onClick={() => handleJumpToStep(crumb.step)}
                      className="hover:text-primary transition-colors focus:outline-none"
                    >
                      {crumb.label}
                    </button>
                  </React.Fragment>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Steps Container */}
        <div className="flex-1 relative w-full h-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center overflow-hidden pb-20 pt-16"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-24 flex-shrink-0 flex items-center justify-between px-6 md:px-12 relative z-20 border-t border-border/10 bg-background/50 backdrop-blur-xl">
        <div className="w-24 md:w-32">
          {step > 0 && step < 5 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm md:text-base font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" /> Back
            </button>
          )}
        </div>

        {/* Live Price */}
        <div className="text-center font-medium">
          <AnimatePresence mode="wait">
            {model && step < 5 && (
              <motion.div
                key={totalPrice}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center"
              >
                <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest mb-1">Total</span>
                <span className="text-xl md:text-2xl tracking-tight">${totalPrice}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-24 md:w-32 flex justify-end">
          {/* Empty spacer to balance footer flex */}
        </div>
      </footer>
    </div>
  );
}

export default App;

function App() {
  return <StoreConfigurator />;
}
