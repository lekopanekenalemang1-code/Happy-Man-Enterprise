import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, CheckCircle2, Smartphone, Upload, X, Copy, Check, ExternalLink
} from 'lucide-react';
import { SiApple, SiSamsung, SiGoogle } from 'react-icons/si';

// ─── Types ────────────────────────────────────────────────────────────────────

type StorageOption = { size: string; price: number };
type PhoneModel    = { name: string; colors: string[]; storages: StorageOption[] };
type BrandData     = { series: Record<string, PhoneModel[]> };

// ─── Payment Info (update account numbers here) ───────────────────────────────

const PAYMENT_INFO = {
  paypal: {
    email: 'happymanrentals@outlook.com',
    link:  `https://www.paypal.com/send?recipient=happymanrentals%40outlook.com`,
  },
  fnb: {
    bankName:      'FNB (First National Bank)',
    accountName:   'Happy Man Rentals',
    accountNumber: 'UPDATE_FNB_ACC_NO',
    branchCode:    'UPDATE_BRANCH',
    accountType:   'Current Account',
  },
  orange: {
    name:   'Happy Man Rentals',
    number: '+267 74066603',
  },
  absa: {
    bankName:      'ABSA Bank Botswana',
    accountName:   'Happy Man Rentals',
    accountNumber: 'UPDATE_ABSA_ACC_NO',
    branchCode:    'UPDATE_BRANCH',
    accountType:   'Current Account',
  },
} as const;

// ─── Catalog ─────────────────────────────────────────────────────────────────

const CATALOG: Record<string, BrandData> = {
  iPhone: {
    series: {
      'iPhone 12': [
        { name: 'iPhone 12',        colors: ['Black','White','Red','Blue','Green','Purple'],                storages: [{ size:'64GB', price:3600 },{ size:'128GB', price:4500 }] },
        { name: 'iPhone 12 Pro',    colors: ['Pacific Blue','Gold','Graphite','Silver'],                   storages: [{ size:'128GB', price:5400 }] },
        { name: 'iPhone 12 Pro Max',colors: ['Pacific Blue','Gold','Graphite','Silver'],                   storages: [{ size:'128GB', price:5800 }] },
      ],
      'iPhone 13': [
        { name: 'iPhone 13',        colors: ['Midnight','Starlight','Blue','Pink','Green','Red'],           storages: [{ size:'128GB', price:5200 },{ size:'256GB', price:6500 }] },
        { name: 'iPhone 13 Pro',    colors: ['Alpine Green','Sierra Blue','Gold','Silver','Graphite'],      storages: [{ size:'128GB', price:6650 },{ size:'256GB', price:7550 }] },
        { name: 'iPhone 13 Pro Max',colors: ['Alpine Green','Sierra Blue','Gold','Silver','Graphite'],      storages: [{ size:'128GB', price:7500 },{ size:'256GB', price:8400 }] },
      ],
      'iPhone 14': [
        { name: 'iPhone 14',        colors: ['Midnight','Starlight','Blue','Purple','Red','Yellow'],        storages: [{ size:'128GB', price:5900 },{ size:'256GB', price:6700 }] },
        { name: 'iPhone 14 Plus',   colors: ['Midnight','Starlight','Blue','Purple','Red','Yellow'],        storages: [{ size:'128GB', price:6300 },{ size:'256GB', price:7300 }] },
        { name: 'iPhone 14 Pro',    colors: ['Deep Purple','Gold','Silver','Space Black'],                  storages: [{ size:'128GB', price:7350 },{ size:'256GB', price:8100 }] },
        { name: 'iPhone 14 Pro Max',colors: ['Deep Purple','Gold','Silver','Space Black'],                  storages: [{ size:'128GB', price:8500 },{ size:'256GB', price:10200 }] },
      ],
      'iPhone 15': [
        { name: 'iPhone 15',        colors: ['Black','Blue','Green','Yellow','Pink'],                       storages: [{ size:'128GB', price:8050 },{ size:'256GB', price:9390 }] },
        { name: 'iPhone 15 Plus',   colors: ['Black','Blue','Green','Yellow','Pink'],                       storages: [{ size:'128GB', price:8450 },{ size:'256GB', price:9650 }] },
        { name: 'iPhone 15 Pro',    colors: ['Black Titanium','White Titanium','Blue Titanium','Natural Titanium'], storages: [{ size:'128GB', price:9700 },{ size:'256GB', price:10400 }] },
        { name: 'iPhone 15 Pro Max',colors: ['Black Titanium','White Titanium','Blue Titanium','Natural Titanium'], storages: [{ size:'256GB', price:10750 }] },
      ],
      'iPhone 16': [
        { name: 'iPhone 16',        colors: ['Black','White','Pink','Teal','Ultramarine'],                  storages: [{ size:'128GB', price:10800 },{ size:'256GB', price:11800 }] },
        { name: 'iPhone 16 Plus',   colors: ['Black','White','Pink','Teal','Ultramarine'],                  storages: [{ size:'128GB', price:11600 },{ size:'256GB', price:13600 }] },
        { name: 'iPhone 16 Pro',    colors: ['Black Titanium','White Titanium','Desert Titanium','Natural Titanium'], storages: [{ size:'128GB', price:13300 },{ size:'256GB', price:14800 }] },
        { name: 'iPhone 16 Pro Max',colors: ['Black Titanium','White Titanium','Desert Titanium','Natural Titanium'], storages: [{ size:'256GB', price:15400 }] },
      ],
      'iPhone 17': [
        { name: 'iPhone 17',        colors: ['Black','White','Ultramarine','Rose Quartz'],                  storages: [{ size:'256GB', price:13900 },{ size:'512GB', price:17500 }] },
        { name: 'iPhone 17 Pro',    colors: ['Black Titanium','White Titanium','Natural Titanium','Desert Titanium'], storages: [{ size:'256GB', price:17680 },{ size:'512GB', price:20700 }] },
        { name: 'iPhone 17 Pro Max',colors: ['Black Titanium','White Titanium','Natural Titanium','Desert Titanium'], storages: [{ size:'256GB', price:22100 },{ size:'512GB', price:25800 }] },
      ],
    },
  },
  Samsung: {
    series: {
      'Galaxy S22': [
        { name: 'Galaxy S22',      colors: ['Phantom Black','Phantom White','Pink Gold','Green'], storages: [{ size:'128GB', price:6200 },{ size:'256GB', price:7000 }] },
        { name: 'Galaxy S22+',     colors: ['Phantom Black','Phantom White','Pink Gold','Green'], storages: [{ size:'128GB', price:7500 },{ size:'256GB', price:8200 }] },
        { name: 'Galaxy S22 Ultra',colors: ['Phantom Black','Phantom White','Burgundy','Green'],  storages: [{ size:'128GB', price:9500 },{ size:'256GB', price:10500 }] },
      ],
      'Galaxy S23': [
        { name: 'Galaxy S23',      colors: ['Phantom Black','Cream','Green','Lavender'], storages: [{ size:'128GB', price:8200 },{ size:'256GB', price:9500 }] },
        { name: 'Galaxy S23+',     colors: ['Phantom Black','Cream','Green','Lavender'], storages: [{ size:'256GB', price:10800 }] },
        { name: 'Galaxy S23 Ultra',colors: ['Phantom Black','Cream','Green','Lavender'], storages: [{ size:'256GB', price:13500 },{ size:'512GB', price:15000 }] },
      ],
      'Galaxy S24': [
        { name: 'Galaxy S24',      colors: ['Onyx Black','Marble Gray','Cobalt Violet','Amber Yellow'],         storages: [{ size:'128GB', price:10500 },{ size:'256GB', price:12000 }] },
        { name: 'Galaxy S24+',     colors: ['Onyx Black','Marble Gray','Cobalt Violet','Amber Yellow'],         storages: [{ size:'256GB', price:13500 }] },
        { name: 'Galaxy S24 Ultra',colors: ['Titanium Black','Titanium Gray','Titanium Violet','Titanium Yellow'], storages: [{ size:'256GB', price:17500 },{ size:'512GB', price:19500 }] },
      ],
    },
  },
  'Google Pixel': {
    series: {
      'Pixel 6': [
        { name: 'Pixel 6',    colors: ['Stormy Black','Kinda Coral','Sorta Seafoam'], storages: [{ size:'128GB', price:3700 },{ size:'256GB', price:4000 }] },
        { name: 'Pixel 6 Pro',colors: ['Stormy Black','Cloudy White','Sorta Sunny'],  storages: [{ size:'128GB', price:5150 },{ size:'256GB', price:5500 }] },
        { name: 'Pixel 6a',   colors: ['Chalk','Charcoal','Sage'],                    storages: [{ size:'128GB', price:3150 }] },
      ],
      'Pixel 7': [
        { name: 'Pixel 7',    colors: ['Obsidian','Snow','Lemongrass'],        storages: [{ size:'128GB', price:4200 },{ size:'256GB', price:4600 }] },
        { name: 'Pixel 7 Pro',colors: ['Obsidian','Snow','Hazel'],             storages: [{ size:'128GB', price:5400 },{ size:'256GB', price:5900 }] },
        { name: 'Pixel 7a',   colors: ['Charcoal','Snow','Sea','Coral'],       storages: [{ size:'128GB', price:4000 }] },
      ],
      'Pixel 8': [
        { name: 'Pixel 8',    colors: ['Obsidian','Hazel','Rose'],             storages: [{ size:'128GB', price:5600 },{ size:'256GB', price:6000 }] },
        { name: 'Pixel 8 Pro',colors: ['Obsidian','Bay','Porcelain'],          storages: [{ size:'128GB', price:5900 },{ size:'256GB', price:6400 }] },
        { name: 'Pixel 8a',   colors: ['Obsidian','Bay','Porcelain','Aloe'],   storages: [{ size:'128GB', price:5500 },{ size:'256GB', price:5900 }] },
      ],
      'Pixel 9': [
        { name: 'Pixel 9',        colors: ['Obsidian','Porcelain','Wintergreen','Peony'],      storages: [{ size:'128GB', price:7300 },{ size:'256GB', price:7900 }] },
        { name: 'Pixel 9 Pro',    colors: ['Obsidian','Porcelain','Hazel','Rose Quartz'],      storages: [{ size:'128GB', price:9200 },{ size:'256GB', price:9800 }] },
        { name: 'Pixel 9 Pro XL', colors: ['Obsidian','Porcelain','Hazel','Matte Hazel'],      storages: [{ size:'128GB', price:9900 },{ size:'256GB', price:10500 }] },
        { name: 'Pixel 9a',       colors: ['Obsidian','Porcelain','Iris','Peony'],             storages: [{ size:'128GB', price:6900 },{ size:'256GB', price:7400 }] },
      ],
      'Pixel 10': [
        { name: 'Pixel 10',        colors: ['Obsidian','Peony','Sea Cloud','Leaf'],  storages: [{ size:'128GB', price:8800 },{ size:'256GB', price:9200 }] },
        { name: 'Pixel 10 Pro',    colors: ['Obsidian','Porcelain','Hazel'],         storages: [{ size:'128GB', price:11000 },{ size:'256GB', price:11550 }] },
        { name: 'Pixel 10 Pro XL', colors: ['Obsidian','Porcelain','Hazel'],         storages: [{ size:'256GB', price:13400 }] },
        { name: 'Pixel 10a',       colors: ['Obsidian','Porcelain','Sage'],          storages: [{ size:'128GB', price:8700 },{ size:'256GB', price:9100 }] },
      ],
      'Pixel Fold': [
        { name: 'Pixel Fold',       colors: ['Obsidian','Porcelain'],         storages: [{ size:'256GB', price:9200 },{ size:'512GB', price:11400 }] },
        { name: 'Pixel 9 Pro Fold', colors: ['Obsidian','Porcelain','Peony'], storages: [{ size:'256GB', price:11500 },{ size:'512GB', price:13000 }] },
        { name: 'Pixel 10 Pro Fold',colors: ['Obsidian','Porcelain'],         storages: [{ size:'256GB', price:18000 },{ size:'512GB', price:19800 }] },
      ],
    },
  },
};

// ─── Color Hex Map ────────────────────────────────────────────────────────────

const COLOR_HEX: Record<string, string> = {
  // iPhone 12
  'Black':'#1c1c1e','White':'#f5f5f7','Red':'#e41e33','Blue':'#215e7c','Green':'#394c38','Purple':'#e5dbea',
  'Pacific Blue':'#2b3e4e','Gold':'#f5e6c8','Graphite':'#5a5752','Silver':'#e3e3e3',
  // iPhone 13
  'Midnight':'#171e27','Starlight':'#f9f6ef','Pink':'#fae0d8',
  'Alpine Green':'#4a5c4b','Sierra Blue':'#a8c5d4',
  // iPhone 14
  'Yellow':'#f5e642','Deep Purple':'#4a3764','Space Black':'#1c1c1e',
  // iPhone 15 Pro / 16 Pro
  'Black Titanium':'#2e2e2e','White Titanium':'#f5f5f0','Blue Titanium':'#2b3b4f','Natural Titanium':'#8c8983',
  'Desert Titanium':'#c4a882',
  // iPhone 15
  'Teal':'#3d7a74','Ultramarine':'#2b3e8c',
  // iPhone 17
  'Rose Quartz':'#d4a5b0',
  // Samsung
  'Onyx Black':'#1c1c1c','Marble Gray':'#d4d4d4','Cobalt Violet':'#6c5b7b','Amber Yellow':'#f4d03f',
  'Phantom Black':'#111111','Cream':'#fdf6e3','Lavender':'#d8b4e2',
  'Phantom White':'#f8f9fa','Pink Gold':'#e6a8d7','Burgundy':'#800020',
  'Titanium Black':'#1e1e1e','Titanium Gray':'#9e9e9e','Titanium Violet':'#6a5d7e','Titanium Yellow':'#e8d88a',
  // Google Pixel
  'Obsidian':'#1c1c1c','Porcelain':'#f1eee9','Wintergreen':'#b0d8c7','Peony':'#e8a0b0',
  'Hazel':'#575e53','Rose':'#f0b3b3','Snow':'#f7f7f7','Lemongrass':'#dce5b7',
  'Stormy Black':'#212121','Kinda Coral':'#f4795e','Sorta Seafoam':'#6cbfb5',
  'Cloudy White':'#e8e8e8','Sorta Sunny':'#f5d06e',
  'Chalk':'#f0ede8','Charcoal':'#3d3d3d','Sage':'#8cad8e',
  'Bay':'#4a7a9b','Aloe':'#7fad7f','Sea':'#5b9ab5','Coral':'#f07a5c',
  'Sea Cloud':'#b8d4e0','Leaf':'#7fa87f','Matte Hazel':'#6a7665','Iris':'#8b7bb5',
};

// ─── Brand Icons ──────────────────────────────────────────────────────────────

const BRAND_ICONS: Record<string, React.ElementType> = {
  'iPhone': SiApple,
  'Samsung': SiSamsung,
  'Google Pixel': SiGoogle,
};

// ─── Animation Variants ───────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '10%' : '-10%', opacity: 0, scale: 0.95, filter: 'blur(8px)' }),
  center: { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit: (dir: number) => ({ x: dir < 0 ? '10%' : '-10%', opacity: 0, scale: 0.95, filter: 'blur(8px)', transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(p: number) {
  return 'P' + p.toLocaleString('en-ZA');
}

// ─── Copy Button ──────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
      title="Copy"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

// ─── Main Configurator ────────────────────────────────────────────────────────

function StoreConfigurator() {
  const [step,      setStep]      = useState(0);
  const [direction, setDirection] = useState(1);

  const [brand,   setBrand]   = useState<string | null>(null);
  const [series,  setSeries]  = useState<string | null>(null);
  const [model,   setModel]   = useState<PhoneModel | null>(null);
  const [storage, setStorage] = useState<StorageOption | null>(null);
  const [color,   setColor]   = useState<string | null>(null);

  type PayMethod = 'paypal' | 'fnb' | 'orange' | 'absa';
  const [payMethod, setPayMethod] = useState<PayMethod | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  // Navigation helpers
  const advance = (nextStep: number) => { setDirection(1); setStep(nextStep); };
  const retreat = (targetStep: number) => {
    setDirection(-1);
    setStep(targetStep);
    if (targetStep <= 0) { setSeries(null); setModel(null); setStorage(null); setColor(null); }
    else if (targetStep <= 1) { setModel(null); setStorage(null); setColor(null); }
    else if (targetStep <= 2) { setStorage(null); setColor(null); }
    else if (targetStep <= 3) { setColor(null); }
    if (targetStep < 5) { setPayMethod(null); setProofFile(null); }
  };
  const handleBack = () => { if (step > 0) retreat(step - 1); };

  const reset = () => {
    setDirection(-1);
    setBrand(null); setSeries(null); setModel(null); setStorage(null); setColor(null);
    setPayMethod(null); setProofFile(null);
    setStep(0);
  };

  // Breadcrumbs (steps 0–4)
  const crumbs: { label: string; step: number }[] = [];
  if (brand)   crumbs.push({ label: brand,         step: 0 });
  if (series)  crumbs.push({ label: series,         step: 1 });
  if (model)   crumbs.push({ label: model.name,     step: 2 });
  if (storage) crumbs.push({ label: storage.size,   step: 3 });
  if (color && step >= 5) crumbs.push({ label: color, step: 4 });

  // ── Step renderers ───────────────────────────────────────────────────────────

  const renderBrandStep = () => (
    <div className="w-full max-w-4xl px-4">
      <h2 className="text-3xl md:text-5xl font-semibold mb-10 text-center tracking-tight text-primary">Choose your brand</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Object.keys(CATALOG).map(b => {
          const Icon = BRAND_ICONS[b];
          return (
            <button
              key={b}
              data-testid={`brand-${b}`}
              onClick={() => { setBrand(b); setSeries(null); setModel(null); setStorage(null); setColor(null); advance(1); }}
              className="group flex flex-col items-center justify-center py-12 px-4 bg-card/40 backdrop-blur-md border border-border/50 rounded-[2rem] hover:bg-secondary/40 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.06)] transition-all duration-500"
            >
              <Icon className="w-16 h-16 md:w-20 md:h-20 mb-6 text-foreground/50 group-hover:text-primary group-hover:scale-110 transition-all duration-500" />
              <span className="text-xl md:text-2xl font-medium tracking-wide">{b}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderSeriesStep = () => {
    if (!brand) return null;
    const seriesList = Object.keys(CATALOG[brand].series);
    return (
      <div className="w-full max-w-4xl px-4">
        <h2 className="text-3xl md:text-5xl font-semibold mb-10 text-center tracking-tight text-primary">Which series?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {seriesList.map(s => (
            <button
              key={s}
              data-testid={`series-${s}`}
              onClick={() => { setSeries(s); setModel(null); setStorage(null); setColor(null); advance(2); }}
              className="group flex flex-col justify-between p-5 md:p-8 h-24 md:h-36 bg-card/40 backdrop-blur-md border border-border/50 rounded-[1.5rem] hover:bg-secondary/40 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(255,255,255,0.05)] transition-all duration-500 text-left"
            >
              <span className="text-lg md:text-2xl font-medium tracking-tight text-foreground/90 group-hover:text-primary transition-colors">{s}</span>
              <span className="text-xs text-muted-foreground">{CATALOG[brand].series[s].length} models</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderModelStep = () => {
    if (!brand || !series) return null;
    const models = CATALOG[brand].series[series];
    return (
      <div className="w-full max-w-4xl px-4">
        <h2 className="text-3xl md:text-5xl font-semibold mb-10 text-center tracking-tight text-primary">Which model?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {models.map(m => (
            <button
              key={m.name}
              data-testid={`model-${m.name}`}
              onClick={() => { setModel(m); setStorage(null); setColor(null); advance(3); }}
              className="group flex flex-col justify-between p-5 md:p-8 h-28 md:h-44 bg-card/40 backdrop-blur-md border border-border/50 rounded-[1.5rem] hover:bg-secondary/40 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(255,255,255,0.05)] transition-all duration-500 text-left"
            >
              <span className="text-base md:text-2xl font-medium tracking-tight text-foreground/90 group-hover:text-primary transition-colors leading-snug">{m.name}</span>
              <span className="text-sm text-muted-foreground">From {formatPrice(m.storages[0].price)}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderStorageStep = () => {
    if (!model) return null;
    return (
      <div className="w-full max-w-4xl px-4">
        <h2 className="text-3xl md:text-5xl font-semibold mb-10 text-center tracking-tight text-primary">How much storage?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {model.storages.map(opt => (
            <button
              key={opt.size}
              data-testid={`storage-${opt.size}`}
              onClick={() => { setStorage(opt); setColor(null); advance(4); }}
              className="group flex flex-col justify-between p-6 md:p-10 h-32 md:h-48 bg-card/40 backdrop-blur-md border border-border/50 rounded-[2rem] hover:bg-secondary/40 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.06)] transition-all duration-500 text-left"
            >
              <span className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground/90 group-hover:text-primary transition-colors">{opt.size}</span>
              <span className="text-lg text-muted-foreground font-medium">{formatPrice(opt.price)}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderColorStep = () => {
    if (!model) return null;
    return (
      <div className="w-full max-w-3xl px-4">
        <h2 className="text-3xl md:text-5xl font-semibold mb-12 text-center tracking-tight text-primary">Pick a color</h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {model.colors.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 + 0.15 }}
              className="flex flex-col items-center gap-3"
            >
              <button
                data-testid={`color-${c}`}
                onClick={() => { setColor(c); advance(5); }}
                className="group relative w-14 h-14 md:w-20 md:h-20 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background transition-transform hover:scale-110 active:scale-95"
              >
                <div
                  className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(255,255,255,0.18),inset_0_-4px_10px_rgba(0,0,0,0.5)] border border-white/10"
                  style={{ backgroundColor: COLOR_HEX[c] ?? '#888' }}
                />
                <div className="absolute -inset-2 rounded-full border border-transparent group-hover:border-primary/30 transition-colors" />
              </button>
              <span className="text-xs md:text-sm font-medium text-muted-foreground tracking-wide text-center max-w-[70px]">{c}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // ── Checkout (Step 5) ────────────────────────────────────────────────────────

  const paymentMethods: { id: PayMethod; label: string; icon: string }[] = [
    { id: 'paypal', label: 'PayPal',             icon: '💳' },
    { id: 'fnb',    label: 'FNB Bank Transfer',  icon: '🏦' },
    { id: 'orange', label: 'Orange Money',        icon: '🟠' },
    { id: 'absa',   label: 'ABSA Bank Transfer', icon: '🏦' },
  ];

  const renderPaymentDetails = () => {
    if (!payMethod || !storage) return null;
    const ref = model ? model.name.replace(/\s+/g,'-') : 'Phone-Order';

    if (payMethod === 'paypal') {
      return (
        <motion.div
          key="paypal"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-4 bg-background/60 border border-border/40 rounded-2xl text-sm space-y-2"
        >
          <p className="text-muted-foreground">Send <span className="text-foreground font-medium">{formatPrice(storage.price)}</span> to:</p>
          <div className="flex items-center gap-1">
            <span className="font-mono text-foreground">{PAYMENT_INFO.paypal.email}</span>
            <CopyButton text={PAYMENT_INFO.paypal.email} />
          </div>
          <a
            href={`${PAYMENT_INFO.paypal.link}&amount=${storage.price}&currency_code=BWP&item_name=${encodeURIComponent(ref)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-primary hover:underline font-medium mt-1"
          >
            Open PayPal <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      );
    }

    if (payMethod === 'orange') {
      return (
        <motion.div
          key="orange"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-4 bg-background/60 border border-border/40 rounded-2xl text-sm space-y-1.5"
        >
          <div className="flex items-center"><span className="text-muted-foreground w-20">Name</span><span className="font-medium">{PAYMENT_INFO.orange.name}</span></div>
          <div className="flex items-center"><span className="text-muted-foreground w-20">Number</span><span className="font-mono font-medium">{PAYMENT_INFO.orange.number}</span><CopyButton text={PAYMENT_INFO.orange.number} /></div>
          <div className="flex items-center"><span className="text-muted-foreground w-20">Amount</span><span className="font-medium">{formatPrice(storage.price)}</span></div>
          <div className="flex items-center"><span className="text-muted-foreground w-20">Reference</span><span className="font-mono text-xs">{ref}</span><CopyButton text={ref} /></div>
          {renderUploadSection()}
        </motion.div>
      );
    }

    const info = payMethod === 'fnb' ? PAYMENT_INFO.fnb : PAYMENT_INFO.absa;
    return (
      <motion.div
        key={payMethod}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="mt-3 p-4 bg-background/60 border border-border/40 rounded-2xl text-sm space-y-1.5"
      >
        <div className="flex items-center"><span className="text-muted-foreground w-28">Bank</span><span className="font-medium">{info.bankName}</span></div>
        <div className="flex items-center"><span className="text-muted-foreground w-28">Account Name</span><span className="font-medium">{info.accountName}</span></div>
        <div className="flex items-center"><span className="text-muted-foreground w-28">Account No.</span><span className="font-mono font-medium">{info.accountNumber}</span><CopyButton text={info.accountNumber} /></div>
        <div className="flex items-center"><span className="text-muted-foreground w-28">Branch Code</span><span className="font-mono">{info.branchCode}</span></div>
        <div className="flex items-center"><span className="text-muted-foreground w-28">Amount</span><span className="font-medium">{formatPrice(storage.price)}</span></div>
        <div className="flex items-center"><span className="text-muted-foreground w-28">Reference</span><span className="font-mono text-xs">{ref}</span><CopyButton text={ref} /></div>
        {renderUploadSection()}
      </motion.div>
    );
  };

  const renderUploadSection = () => (
    <div className="pt-2">
      <p className="text-xs text-muted-foreground mb-2">Upload proof of payment:</p>
      <input
        ref={fileRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={e => setProofFile(e.target.files?.[0] ?? null)}
      />
      {proofFile ? (
        <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-xl px-3 py-2">
          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
          <span className="text-xs text-foreground flex-1 truncate">{proofFile.name}</span>
          <button onClick={() => setProofFile(null)} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-border/60 rounded-xl text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
        >
          <Upload className="w-4 h-4" /> Choose file (image or PDF)
        </button>
      )}
    </div>
  );

  const canConfirm = () => {
    if (!payMethod) return false;
    if (payMethod === 'paypal') return true;
    return proofFile !== null;
  };

  const renderCheckoutStep = () => {
    if (!model || !storage || !color) return null;
    return (
      <div className="w-full max-w-xl px-4 flex flex-col gap-4" style={{ maxHeight: 'calc(100dvh - 200px)', overflowY: 'auto' }}>
        {/* Order Summary */}
        <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-[2rem] p-5 shadow-xl relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Order Summary</p>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg md:text-2xl font-semibold tracking-tight">{model.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{storage.size} · {color}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Refurbished · Excellent Condition</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-2xl font-semibold text-primary">{formatPrice(storage.price)}</p>
            </div>
          </div>
          {/* Color swatch */}
          <div className="flex items-center gap-2 mt-3">
            <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: COLOR_HEX[color] ?? '#888' }} />
            <span className="text-xs text-muted-foreground">{color}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-card/40 backdrop-blur-md border border-border/40 rounded-[2rem] p-5 flex-shrink-0">
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-3">Choose Payment</p>
          <div className="grid grid-cols-2 gap-2">
            {paymentMethods.map(pm => (
              <button
                key={pm.id}
                data-testid={`payment-${pm.id}`}
                onClick={() => { setPayMethod(pm.id); setProofFile(null); }}
                className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all duration-300 text-left ${
                  payMethod === pm.id
                    ? 'border-primary/60 bg-primary/10 text-primary'
                    : 'border-border/40 bg-background/30 text-muted-foreground hover:border-border hover:text-foreground'
                }`}
              >
                <span className="text-base leading-none">{pm.icon}</span>
                <span className="leading-snug">{pm.label}</span>
              </button>
            ))}
          </div>

          {/* Payment Details */}
          <AnimatePresence mode="wait">
            {payMethod && renderPaymentDetails()}
          </AnimatePresence>
        </div>

        {/* Confirm Button */}
        <button
          data-testid="confirm-order"
          onClick={() => advance(6)}
          disabled={!canConfirm()}
          className="w-full py-4 rounded-2xl font-semibold text-base md:text-lg transition-all flex items-center justify-center gap-2 flex-shrink-0
            bg-primary text-primary-foreground shadow-[0_0_30px_rgba(255,255,255,0.12)]
            hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0
            disabled:opacity-30 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          {payMethod === 'paypal' ? 'I have paid — Confirm Order' : (canConfirm() ? 'Confirm Order' : 'Upload proof to confirm')}
        </button>
      </div>
    );
  };

  // ── Confirmation (Step 6) ────────────────────────────────────────────────────

  const renderConfirmationStep = () => (
    <div className="w-full max-w-lg px-4 text-center flex flex-col items-center">
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
        className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8 border border-primary/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
      >
        <CheckCircle2 className="w-12 h-12 text-primary" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-4xl md:text-5xl font-semibold mb-5 tracking-tight text-primary">Order Confirmed</h2>
        <p className="text-muted-foreground text-base md:text-lg mb-4 max-w-sm mx-auto leading-relaxed">
          Your refurbished {model?.name} is being processed. We will contact you on WhatsApp to confirm delivery details.
        </p>
        <p className="text-sm text-muted-foreground mb-10">WhatsApp: <span className="text-foreground font-medium">+267 74066603</span></p>
        <button
          onClick={reset}
          className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors border-b border-border/50 hover:border-primary pb-1"
        >
          Start a new order
        </button>
      </motion.div>
    </div>
  );

  // ── Step Router ──────────────────────────────────────────────────────────────

  const renderStep = () => {
    switch (step) {
      case 0: return renderBrandStep();
      case 1: return renderSeriesStep();
      case 2: return renderModelStep();
      case 3: return renderStorageStep();
      case 4: return renderColorStep();
      case 5: return renderCheckoutStep();
      case 6: return renderConfirmationStep();
      default: return null;
    }
  };

  const isConfigStep = step >= 0 && step <= 4;

  // ── Layout ───────────────────────────────────────────────────────────────────

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-background text-foreground overflow-hidden selection:bg-primary/20">
      <div className="noise-bg" />
      <div className="ambient-glow" />

      {/* Header */}
      <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 md:px-12 relative z-20 border-b border-border/10">
        <div className="flex items-center gap-2.5 font-medium text-primary">
          <Smartphone className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="tracking-widest text-sm leading-none">REFURBISHED</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Excellent Condition</span>
          </div>
        </div>
        {isConfigStep && (
          <div className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
            Step {step + 1} <span className="opacity-40">/</span> 5
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 relative z-10 overflow-hidden flex flex-col">

        {/* Breadcrumbs */}
        <div className="absolute top-0 left-0 w-full flex justify-center pt-4 pointer-events-none z-30">
          <AnimatePresence mode="wait">
            {crumbs.length > 0 && step < 5 && (
              <motion.div
                key={crumbs.length}
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground font-medium pointer-events-auto bg-background/50 backdrop-blur-xl px-4 py-2 rounded-full border border-border/30 shadow-lg"
              >
                {crumbs.map((c, idx) => (
                  <React.Fragment key={c.step}>
                    {idx > 0 && <span className="opacity-30 mx-0.5">·</span>}
                    <button
                      onClick={() => retreat(c.step)}
                      className="hover:text-primary transition-colors focus:outline-none truncate max-w-[80px]"
                    >
                      {c.label}
                    </button>
                  </React.Fragment>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step Container */}
        <div className="flex-1 relative w-full h-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center pb-16 pt-12"
              style={{ overflowX: 'hidden', overflowY: step === 5 ? 'visible' : 'hidden' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-20 flex-shrink-0 flex items-center justify-between px-6 md:px-12 relative z-20 border-t border-border/10 bg-background/50 backdrop-blur-xl">
        <div className="w-20 md:w-24">
          {step > 0 && step < 6 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
            </button>
          )}
        </div>

        {/* Live Price in footer */}
        <div className="text-center font-medium">
          <AnimatePresence mode="wait">
            {storage && step < 6 && (
              <motion.div
                key={storage.price}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center"
              >
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">Total</span>
                <span className="text-xl md:text-2xl tracking-tight">{formatPrice(storage.price)}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-20 md:w-24" />
      </footer>
    </div>
  );
}

export default function App() {
  return <StoreConfigurator />;
}
