import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ShoppingBag, Info, MessageCircle } from 'lucide-react';
import { SiAdidas, SiNike, SiPuma } from 'react-icons/si';

// ─── Olam's Business Info ─────────────────────────────────────────────────────

const OLAM = {
  name:      "Olam's Footprints",
  tagline:   'Steps That Leave a Mark. Premium quality shoes & jerseys at affordable prices.',
  phone:     '+267 77 747 365',
  whatsapp:  '+26777747365',
  email:     'olamsfootprints@gmail.com',
  facebook:  "OLAM'SFOOTPRINTS",
  instagram: "olam's.footprints",
  tiktok:    'olams.footprints',
};

// ─── Catalogue ────────────────────────────────────────────────────────────────

type Product = { name: string; price: number; note?: string };

type Category = {
  label: string;
  emoji: string;
  Icon?: React.ElementType;
  sizes: string[];
  isJersey?: boolean;
  products: Product[];
};

const SHOE_SIZES = ['UK 3','UK 4','UK 5','UK 6','UK 7','UK 8','UK 9','UK 10','UK 11','UK 12','UK 13'];
const JERSEY_SIZES = ['XS','S','M','L','XL','XXL','3XL'];

const CATALOGUE: Record<string, Category> = {
  Jerseys: {
    label: 'Jerseys', emoji: '👕', isJersey: true,
    sizes: JERSEY_SIZES,
    products: [
      { name: 'Standard Jersey', price: 380, note: 'Any team' },
      { name: 'Custom Jersey',   price: 430, note: 'Your name & number printed' },
    ],
  },
  Nike: {
    label: 'Nike', emoji: '✔', Icon: SiNike,
    sizes: SHOE_SIZES,
    products: [
      { name: 'Dunk',          price: 950 },
      { name: 'Air Force 1',   price: 800 },
      { name: 'Air Jordan',    price: 1000 },
      { name: 'Uptempo',       price: 950 },
      { name: 'Air Max Plus',  price: 1050 },
      { name: 'Air Max DN',    price: 1050 },
      { name: 'Air Max Portal',price: 900 },
      { name: 'Drift Plus',    price: 920 },
      { name: 'Cortez',        price: 1050 },
      { name: 'Retro 4',       price: 980 },
      { name: 'Nocta Glides',  price: 1050 },
      { name: 'Dama Bailleli', price: 950 },
    ],
  },
  Adidas: {
    label: 'Adidas', emoji: '🏃', Icon: SiAdidas,
    sizes: SHOE_SIZES,
    products: [
      { name: 'Samba',              price: 950 },
      { name: 'Sambae',             price: 800 },
      { name: 'Campus',             price: 900 },
      { name: 'Bad Bunny Campus',   price: 1000 },
      { name: 'Bad Bunny Low Forum',price: 1200 },
      { name: 'Forum Low',          price: 850 },
      { name: 'Gazelle',            price: 850 },
      { name: 'Gazelle Bold',       price: 900 },
      { name: 'Superstar',          price: 750 },
      { name: 'Adistar Jellyfish',  price: 1050 },
      { name: 'FYW Intimidation',   price: 1050 },
      { name: 'Terrex Freehiker',   price: 1050 },
    ],
  },
  'New Balance': {
    label: 'New Balance', emoji: 'NB',
    sizes: SHOE_SIZES,
    products: [
      { name: 'NB 574',       price: 940 },
      { name: 'NB 550',       price: 1020 },
      { name: 'NB 530',       price: 900 },
      { name: 'NB 740',       price: 920 },
      { name: 'NB 325',       price: 920 },
      { name: 'NB 1000',      price: 1100 },
      { name: 'NB 1906u',     price: 1000 },
      { name: 'NB 2002r',     price: 1000 },
      { name: 'NB 2010',      price: 1050 },
      { name: 'NB rc42',      price: 950 },
      { name: 'NB 9060',      price: 950 },
      { name: 'ABZORB 2000',  price: 1100 },
    ],
  },
  Converse: {
    label: 'Converse', emoji: '★',
    sizes: SHOE_SIZES,
    products: [
      { name: 'Runstar Hike',    price: 900 },
      { name: 'Runstar Motion',  price: 980 },
      { name: 'Chuck 70 AT-CX', price: 850 },
      { name: 'Platform Low',   price: 780 },
      { name: 'Wayvee',         price: 810 },
      { name: 'Chuck 70 Plus',  price: 830 },
    ],
  },
  ASICS: {
    label: 'ASICS', emoji: '🏅',
    sizes: SHOE_SIZES,
    products: [
      { name: 'Kinetic Fluent',         price: 1020 },
      { name: 'Metaspeed Edge Tokyo',   price: 980 },
      { name: 'GEL-1130',              price: 950 },
      { name: 'Novablast 5',            price: 950 },
      { name: 'Gel Kayano 14',          price: 960 },
      { name: 'Netburner Ballistic FF2',price: 1100 },
      { name: 'GT2160',                price: 945 },
      { name: 'Gel-Resolution',         price: 1000 },
      { name: 'Hylane',                price: 945 },
    ],
  },
  Puma: {
    label: 'Puma', emoji: '🐱', Icon: SiPuma,
    sizes: SHOE_SIZES,
    products: [
      { name: 'Speed Cat', price: 1000 },
      { name: 'MB.05',     price: 1200 },
      { name: 'Puma 180',  price: 1100 },
      { name: 'Easy Rider',price: 950 },
      { name: 'Suede XL',  price: 970 },
      { name: 'Mayze',     price: 1000 },
    ],
  },
  Crocs: {
    label: 'Crocs', emoji: '🐊',
    sizes: SHOE_SIZES,
    products: [
      { name: 'Classic Clogs', price: 370 },
      { name: 'Echo Clogs',    price: 445 },
      { name: 'Bayaband',      price: 330 },
      { name: 'Bape',          price: 450 },
      { name: 'Bembury',       price: 450 },
      { name: 'Yukon Vista',   price: 460 },
      { name: 'Coast Clogs',   price: 420 },
    ],
  },
  Vans: {
    label: 'Vans', emoji: '🛹',
    sizes: SHOE_SIZES,
    products: [
      { name: 'Wayvee',             price: 930 },
      { name: 'Oldskool Stackform', price: 850 },
      { name: 'Oldskool Stacked',   price: 900 },
      { name: 'Knuskool Platform',  price: 950 },
      { name: 'Skate Halfcab',      price: 800 },
      { name: 'Skate Estazzo',      price: 1000 },
      { name: 'SK8 Hi',             price: 830 },
      { name: 'Hylane',             price: 900 },
      { name: 'Oldskool 36',        price: 800 },
      { name: 'Dime Rowley',        price: 950 },
      { name: 'Nocta Glides',       price: 1050 },
    ],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(p: number) { return 'P' + p.toLocaleString('en-ZA'); }

function generateRef() {
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `OF-${num}`;
}

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? '10%' : '-10%', opacity: 0, scale: 0.96, filter: 'blur(6px)' }),
  center: { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: (d: number) => ({ x: d < 0 ? '10%' : '-10%', opacity: 0, scale: 0.96, filter: 'blur(6px)', transition: { duration: 0.3 } }),
};

// ─── Brand Icon Component ─────────────────────────────────────────────────────

function BrandIcon({ cat }: { cat: Category }) {
  if (cat.Icon) return <cat.Icon className="w-10 h-10 text-foreground/60 group-hover:text-primary transition-colors" />;
  return <span className="text-2xl font-bold text-foreground/60 group-hover:text-primary transition-colors">{cat.emoji}</span>;
}

// ─── About Modal ──────────────────────────────────────────────────────────────

function OlamAboutModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 35 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg bg-[#0d1b2e] border border-blue-900/40 rounded-t-[2rem] p-8 pb-10 shadow-2xl">
        <div className="w-12 h-1 bg-blue-800 rounded-full mx-auto mb-6" />
        <h3 className="text-xl font-bold text-blue-400 mb-1">{OLAM.name}</h3>
        <p className="text-xs text-blue-300/60 mb-4">"Steps That Leave a Mark"</p>
        <p className="text-sm text-blue-200/70 leading-relaxed mb-5">{OLAM.tagline}</p>
        <div className="space-y-3">
          {[
            { icon: '📱', label: OLAM.phone, href: `tel:${OLAM.phone}` },
            { icon: '💬', label: 'WhatsApp Us', href: `https://wa.me/${OLAM.whatsapp}` },
            { icon: '📧', label: OLAM.email, href: `mailto:${OLAM.email}` },
            { icon: '👍', label: `Facebook: ${OLAM.facebook}`, href: `https://facebook.com/${OLAM.facebook}` },
            { icon: '📸', label: `Instagram: ${OLAM.instagram}`, href: `https://instagram.com/${OLAM.instagram}` },
            { icon: '🎵', label: `TikTok: @${OLAM.tiktok}`, href: `https://tiktok.com/@${OLAM.tiktok}` },
          ].map(({ icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-950/60 border border-blue-900/40 hover:border-blue-500/40 transition-all group">
              <span className="text-lg">{icon}</span>
              <span className="text-sm text-blue-200/80 group-hover:text-blue-300 transition-colors">{label}</span>
            </a>
          ))}
        </div>
        <button onClick={onClose} className="mt-5 w-full py-3 rounded-xl text-sm font-medium text-blue-300/60 border border-blue-900/40 hover:border-blue-700/40 transition-colors">Close</button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main OlamStore Component ─────────────────────────────────────────────────

export default function OlamStore({ onBack }: { onBack: () => void }) {
  const [step,      setStep]      = useState(0);
  const [direction, setDirection] = useState(1);
  const [showAbout, setShowAbout] = useState(false);

  const [category, setCategory] = useState<string | null>(null);
  const [product,  setProduct]  = useState<Product | null>(null);
  const [size,     setSize]     = useState<string | null>(null);
  const [customName, setCustomName] = useState('');
  const [customNum,  setCustomNum]  = useState('');

  const [orderRef] = useState(() => generateRef());

  const advance = (s: number) => { setDirection(1);  setStep(s); };
  const retreat = (s: number) => { setDirection(-1); setStep(s); };
  const handleBack = () => {
    if (step === 0) { onBack(); return; }
    if (step === 1) { setProduct(null); setSize(null); setCustomName(''); setCustomNum(''); retreat(0); }
    else if (step === 2) { setSize(null); retreat(1); }
    else retreat(step - 1);
  };
  const reset = () => {
    setCategory(null); setProduct(null); setSize(null); setCustomName(''); setCustomNum('');
    setDirection(-1); setStep(0);
  };

  const cat = category ? CATALOGUE[category] : null;
  const isCustomJersey = cat?.isJersey && product?.name.includes('Custom');

  // Build WhatsApp order message
  const buildWhatsApp = () => {
    let msg = `Hello Olam's Footprints! 👟\n\nOrder Ref: *${orderRef}*\n`;
    msg += `Item: *${product?.name}*\n`;
    msg += `Brand: *${category}*\n`;
    msg += `Size: *${size}*\n`;
    if (isCustomJersey) { msg += `Name on jersey: *${customName || 'N/A'}*\nNumber: *${customNum || 'N/A'}*\n`; }
    msg += `Price: *${formatPrice(product?.price ?? 0)}*\n\nPlease confirm availability. Thank you!`;
    return encodeURIComponent(msg);
  };

  // ── Step 0: Category / Brand selection ───────────────────────────────────────

  const renderCategories = () => (
    <div className="w-full max-w-4xl px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-blue-300">What are you looking for?</h2>
      <p className="text-center text-blue-300/50 text-sm mb-8">Premium quality · Affordable prices</p>
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 md:gap-4">
        {Object.entries(CATALOGUE).map(([key, cat]) => (
          <button key={key}
            onClick={() => { setCategory(key); setProduct(null); setSize(null); advance(1); }}
            className="group flex flex-col items-center justify-center gap-3 py-6 px-3 bg-blue-950/40 backdrop-blur-md border border-blue-900/40 rounded-2xl hover:bg-blue-900/40 hover:border-blue-500/50 transition-all duration-300">
            <BrandIcon cat={cat} />
            <span className="text-sm font-semibold text-blue-200/80 group-hover:text-blue-200 transition-colors text-center leading-tight">{cat.label}</span>
            <span className="text-xs text-blue-400/40">{cat.products.length} items</span>
          </button>
        ))}
      </div>
    </div>
  );

  // ── Step 1: Product selection ─────────────────────────────────────────────────

  const renderProducts = () => {
    if (!cat) return null;
    return (
      <div className="w-full max-w-4xl px-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center text-blue-300">{category}</h2>
        <p className="text-center text-blue-300/40 text-sm mb-8">
          {cat.isJersey ? 'Football jerseys — any team' : `${cat.products.length} styles available`}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {cat.products.map(p => (
            <button key={p.name}
              onClick={() => { setProduct(p); setSize(null); setCustomName(''); setCustomNum(''); advance(2); }}
              className="group flex flex-col justify-between p-4 md:p-5 h-28 md:h-36 bg-blue-950/40 backdrop-blur-md border border-blue-900/40 rounded-2xl hover:bg-blue-900/40 hover:border-blue-500/50 transition-all duration-300 text-left">
              <div>
                <p className="text-sm md:text-base font-semibold text-blue-200/90 group-hover:text-blue-100 transition-colors leading-snug">{p.name}</p>
                {p.note && <p className="text-xs text-blue-400/50 mt-0.5">{p.note}</p>}
              </div>
              <p className="text-lg font-bold text-blue-400">{formatPrice(p.price)}</p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // ── Step 2: Size + custom fields for jerseys ──────────────────────────────────

  const renderSize = () => {
    if (!cat || !product) return null;
    return (
      <div className="w-full max-w-2xl px-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center text-blue-300">Choose Your Size</h2>
        <p className="text-center text-blue-300/40 text-sm mb-6">{product.name} · {formatPrice(product.price)}</p>

        {/* Custom jersey fields */}
        {isCustomJersey && (
          <div className="mb-6 p-4 bg-blue-950/60 border border-blue-800/40 rounded-2xl space-y-3">
            <p className="text-sm text-blue-300 font-medium">Customisation details</p>
            <div>
              <label className="text-xs text-blue-400/60 mb-1 block">Name to print on jersey</label>
              <input
                type="text" value={customName} onChange={e => setCustomName(e.target.value)}
                placeholder="e.g. MABILA"
                className="w-full px-3 py-2 rounded-xl bg-blue-900/30 border border-blue-800/40 text-blue-100 text-sm placeholder:text-blue-500/40 focus:outline-none focus:border-blue-500/60"
              />
            </div>
            <div>
              <label className="text-xs text-blue-400/60 mb-1 block">Number</label>
              <input
                type="text" value={customNum} onChange={e => setCustomNum(e.target.value)}
                placeholder="e.g. 10"
                className="w-full px-3 py-2 rounded-xl bg-blue-900/30 border border-blue-800/40 text-blue-100 text-sm placeholder:text-blue-500/40 focus:outline-none focus:border-blue-500/60"
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 justify-center">
          {cat.sizes.map(s => (
            <button key={s}
              onClick={() => { setSize(s); advance(3); }}
              className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200
                ${size === s ? 'bg-blue-500/20 border-blue-500/60 text-blue-300' : 'bg-blue-950/40 border-blue-900/40 text-blue-300/60 hover:border-blue-600/40 hover:text-blue-300'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // ── Step 3: Order Summary ─────────────────────────────────────────────────────

  const renderOrder = () => {
    if (!product || !size) return null;
    const waMsg = buildWhatsApp();
    return (
      <div className="w-full max-w-md px-4 flex flex-col gap-4" style={{ maxHeight: 'calc(100dvh - 180px)', overflowY: 'auto' }}>
        {/* Success check */}
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="flex justify-center mb-2">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
            <ShoppingBag className="w-8 h-8 text-blue-400" />
          </div>
        </motion.div>

        {/* Order card */}
        <div className="bg-blue-950/60 border border-blue-900/40 rounded-2xl p-5 space-y-3">
          <div className="flex justify-between items-start">
            <p className="text-xl font-bold text-blue-200">{product.name}</p>
            <p className="text-xl font-bold text-blue-400">{formatPrice(product.price)}</p>
          </div>
          <div className="text-sm text-blue-300/60 space-y-1">
            <div className="flex justify-between"><span>Brand</span><span className="text-blue-200">{category}</span></div>
            <div className="flex justify-between"><span>Size</span><span className="text-blue-200">{size}</span></div>
            {isCustomJersey && customName && <div className="flex justify-between"><span>Name</span><span className="text-blue-200">{customName}</span></div>}
            {isCustomJersey && customNum  && <div className="flex justify-between"><span>Number</span><span className="text-blue-200">{customNum}</span></div>}
          </div>
          <div className="pt-2 border-t border-blue-900/40">
            <div className="flex justify-between text-sm">
              <span className="text-blue-300/40">Order Ref</span>
              <span className="font-mono text-blue-400 font-semibold">{orderRef}</span>
            </div>
          </div>
        </div>

        {/* How to order */}
        <div className="bg-blue-950/40 border border-blue-900/30 rounded-2xl p-4 text-sm text-blue-300/60 space-y-2">
          <p className="font-medium text-blue-300">How to complete your order:</p>
          <ol className="list-decimal list-inside space-y-1 text-xs">
            <li>Tap "Order via WhatsApp" below</li>
            <li>Your order details will be sent automatically</li>
            <li>Olam's team will confirm availability & payment</li>
            <li>Send payment once confirmed</li>
          </ol>
        </div>

        {/* WhatsApp CTA */}
        <a href={`https://wa.me/${OLAM.whatsapp}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-green-600/20 border border-green-500/40 text-green-400 font-semibold text-base hover:bg-green-600/30 transition-colors">
          <MessageCircle className="w-5 h-5" /> Order via WhatsApp
        </a>

        {/* Contact options */}
        <div className="grid grid-cols-2 gap-2">
          <a href={`tel:${OLAM.phone}`}
            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-blue-900/40 bg-blue-950/30 text-blue-300/70 text-sm hover:border-blue-700/40 transition-colors">
            📞 Call Us
          </a>
          <a href={`mailto:${OLAM.email}?subject=Order ${orderRef}&body=Hi! I'd like to order: ${product?.name}, ${category}, Size ${size}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-blue-900/40 bg-blue-950/30 text-blue-300/70 text-sm hover:border-blue-700/40 transition-colors">
            📧 Email Us
          </a>
        </div>

        <button onClick={reset} className="text-xs text-blue-400/40 hover:text-blue-400/60 transition-colors pb-2">← Browse more items</button>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 0: return renderCategories();
      case 1: return renderProducts();
      case 2: return renderSize();
      case 3: return renderOrder();
      default: return null;
    }
  };

  const crumbs = [];
  if (category) crumbs.push({ label: category, step: 0 });
  if (product)  crumbs.push({ label: product.name, step: 1 });
  if (size && step >= 3) crumbs.push({ label: size, step: 2 });

  return (
    <div className="h-[100dvh] w-full flex flex-col overflow-hidden selection:bg-blue-500/20"
      style={{ background: 'linear-gradient(135deg, #040d1a 0%, #0a1628 50%, #071020 100%)' }}>
      {/* Noise overlay */}
      <div className="fixed inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />

      <AnimatePresence>{showAbout && <OlamAboutModal onClose={() => setShowAbout(false)} />}</AnimatePresence>

      {/* Header */}
      <header className="h-16 flex-shrink-0 flex items-center justify-between px-5 z-20 border-b border-blue-900/20 relative">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="p-1.5 rounded-lg text-blue-400/60 hover:text-blue-300 hover:bg-blue-900/30 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-xs font-bold text-blue-400 tracking-wider">OLAM'S FOOTPRINTS</span>
            <p className="text-[9px] text-blue-400/40 tracking-widest">STEPS THAT LEAVE A MARK</p>
          </div>
        </div>
        <button onClick={() => setShowAbout(true)} className="p-2 rounded-xl text-blue-400/60 hover:text-blue-300 hover:bg-blue-900/30 transition-all">
          <Info className="w-4 h-4" />
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 relative z-10 overflow-hidden flex flex-col">
        {/* Breadcrumbs */}
        <div className="absolute top-0 left-0 w-full flex justify-center pt-4 pointer-events-none z-30">
          <AnimatePresence mode="wait">
            {crumbs.length > 0 && step < 3 && (
              <motion.div key={crumbs.length} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                className="flex items-center gap-1.5 text-xs text-blue-300/50 font-medium pointer-events-auto bg-blue-950/60 backdrop-blur-xl px-4 py-2 rounded-full border border-blue-900/30 shadow-lg">
                {crumbs.map((c, i) => (
                  <React.Fragment key={c.step}>
                    {i > 0 && <span className="opacity-30 mx-0.5">·</span>}
                    <button onClick={() => { setDirection(-1); setStep(c.step); }} className="hover:text-blue-300 transition-colors truncate max-w-[90px]">{c.label}</button>
                  </React.Fragment>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 relative w-full h-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={step} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
              className="absolute inset-0 flex items-center justify-center pb-16 pt-12"
              style={{ overflowX: 'hidden', overflowY: step >= 2 ? 'visible' : 'hidden' }}>
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-16 flex-shrink-0 flex items-center justify-between px-6 z-20 border-t border-blue-900/20 relative"
        style={{ background: 'rgba(4,13,26,0.8)', backdropFilter: 'blur(20px)' }}>
        <div className="w-24">
          {step > 0 && step < 3 && (
            <button onClick={handleBack}
              className="flex items-center gap-2 text-sm font-medium text-blue-400/50 hover:text-blue-300 transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
            </button>
          )}
        </div>
        <div className="text-center">
          <AnimatePresence mode="wait">
            {product && step < 3 && (
              <motion.div key={product.price} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center">
                <span className="text-[10px] text-blue-400/40 uppercase tracking-widest mb-0.5">Price</span>
                <span className="text-xl text-blue-300 font-bold">{formatPrice(product.price)}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="w-24 flex justify-end">
          <button onClick={() => setShowAbout(true)} className="text-xs text-blue-400/40 hover:text-blue-400/60 transition-colors">About</button>
        </div>
      </footer>
    </div>
  );
}
