import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, CheckCircle2, Upload, X, Copy, Check, ExternalLink, Info,
  Shield, Battery, Unlock, Truck, Camera, RotateCcw, ChevronDown
} from 'lucide-react';
import { Linkedin, Watch } from 'lucide-react';
import { SiApple, SiSamsung, SiGoogle, SiInstagram, SiTiktok, SiWhatsapp, SiOneplus, SiOppo, SiVivo, SiXiaomi, SiSony, SiGarmin } from 'react-icons/si';
import { FaXbox } from 'react-icons/fa';

// ─── Types ────────────────────────────────────────────────────────────────────

type StorageOption = { size: string; price: number };
type PhoneModel    = { name: string; colors: string[]; storages: StorageOption[] };
type BrandData     = { series: Record<string, PhoneModel[]> };

// ─── Business Info ────────────────────────────────────────────────────────────

const BUSINESS = {
  name:     'Tech Inc',
  tagline:  'Certified refurbished phones with guaranteed battery health, delivered across Botswana.',
  slogan:   'Start small, Start scrappy, but whatever you do, JUST START!',
  whatsapp: '+267 74066703',
  email:    'happymanenterprise@outlook.com',
  tiktok:   '@Happymanenterprisebw',
  owner:     'Lekopane Kenalemang',
  linkedin:  'https://www.linkedin.com/in/special-lekopane21',
  instagram: 'https://www.instagram.com/nothing.special110/',
  location:  'Palapye, BIUST',
  about: [
    'Tech Inc is a business under Happy Man Enterprise PTY LTD, with primary operations at Palapye BIUST. We sell certified refurbished tech sourced from the US — starting with phones, and growing into smartwatches, consoles and laptops.',
    'Our vision goes beyond tech: we want to host other entrepreneurs\u2019 businesses on this platform and become a one-stop shop for the community.',
  ],
};

// ─── Payment Info (update account numbers here) ───────────────────────────────

const PAYMENT_INFO = {
  fnb: {
    bankName:      'FNB (First National Bank)',
    accountName:   'Happy Man Enterprise PTY LTD',
    accountNumber: '63015381691',
    branchCode:    '283567',
    accountType:   'Transmission Account',
  },
  orange: {
    name:   'Lekopane Kenalemang',
    number: '+267 76 579 946',
  },
  absa: {
    bankName:      'ABSA Bank Botswana',
    accountName:   'Happy Man Enterprise PTY LTD',
    accountNumber: '1650631',
    branchCode:    '17',
    accountType:   'Current Account',
  },
} as const;

// ─── Phone Images (per model) ─────────────────────────────────────────────────
// All images are local transparent PNGs in /public/phones (backgrounds removed).

const img = (file: string) => ({ url: `${import.meta.env.BASE_URL}phones/${file}.png`, transparent: true });

const MODEL_IMAGES: Record<string, { url: string; transparent: boolean }> = {
  'iPhone 12':          img('iphone-12'),
  'iPhone 12 Pro':      img('iphone-12-pro'),
  'iPhone 12 Pro Max':  img('iphone-12-pro-max'),
  'iPhone 13':          img('iphone-13'),
  'iPhone 13 Pro':      img('iphone-13-pro'),
  'iPhone 13 Pro Max':  img('iphone-13-pro-max'),
  'iPhone 14':          img('iphone-14'),
  'iPhone 14 Plus':     img('iphone-14-plus'),
  'iPhone 14 Pro':      img('iphone-14-pro'),
  'iPhone 14 Pro Max':  img('iphone-14-pro-max'),
  'iPhone 15':          img('iphone-15'),
  'iPhone 15 Plus':     img('iphone-15-plus'),
  'iPhone 15 Pro':      img('iphone-15-pro'),
  'iPhone 15 Pro Max':  img('iphone-15-pro-max'),
  'iPhone 16':          img('iphone-16'),
  'iPhone 16 Plus':     img('iphone-16-plus'),
  'iPhone 16 Pro':      img('iphone-16-pro'),
  'iPhone 16 Pro Max':  img('iphone-16-pro-max'),
  'iPhone 17':          img('iphone-17'),
  'iPhone 17 Pro':      img('iphone-17-pro'),
  'iPhone 17 Pro Max':  img('iphone-17-pro-max'),
  'Galaxy S22':         img('galaxy-s22'),
  'Galaxy S22+':        img('galaxy-s22-plus'),
  'Galaxy S22 Ultra':   img('galaxy-s22-ultra'),
  'Galaxy S23':         img('galaxy-s23'),
  'Galaxy S23+':        img('galaxy-s23-plus'),
  'Galaxy S23 Ultra':   img('galaxy-s23-ultra'),
  'Galaxy S24':         img('galaxy-s24'),
  'Galaxy S24+':        img('galaxy-s24-plus'),
  'Galaxy S24 Ultra':   img('galaxy-s24-ultra'),
  'Galaxy S23 FE':      img('galaxy-s23-fe'),
  'Galaxy S24 FE':      img('galaxy-s24-fe'),
  'Galaxy S25':         img('galaxy-s25'),
  'Galaxy S25 FE':      img('galaxy-s25-fe'),
  'Galaxy S25+':        img('galaxy-s25-plus'),
  'Galaxy S25 Edge':    img('galaxy-s25-edge'),
  'Galaxy S25 Ultra':   img('galaxy-s25-ultra'),
  'Galaxy S26':         img('galaxy-s26'),
  'Galaxy S26+':        img('galaxy-s26-plus'),
  'Galaxy S26 Ultra':   img('galaxy-s26-ultra'),
  'Galaxy Z Flip3':     img('galaxy-z-flip3'),
  'Galaxy Z Flip4':     img('galaxy-z-flip4'),
  'Galaxy Z Flip5':     img('galaxy-z-flip5'),
  'Galaxy Z Flip6':     img('galaxy-z-flip6'),
  'Galaxy Z Flip7':     img('galaxy-z-flip7'),
  'Galaxy Z Fold3':     img('galaxy-z-fold3'),
  'Galaxy Z Fold4':     img('galaxy-z-fold4'),
  'Galaxy Z Fold5':     img('galaxy-z-fold5'),
  'Galaxy Z Fold6':     img('galaxy-z-fold6'),
  'Galaxy Z Fold7':     img('galaxy-z-fold7'),
  'Pixel 6':            img('pixel-6'),
  'Pixel 6 Pro':        img('pixel-6-pro'),
  'Pixel 6a':           img('pixel-6a'),
  'Pixel 7':            img('pixel-7'),
  'Pixel 7 Pro':        img('pixel-7-pro'),
  'Pixel 7a':           img('pixel-7a'),
  'Pixel 8':            img('pixel-8'),
  'Pixel 8 Pro':        img('pixel-8-pro'),
  'Pixel 8a':           img('pixel-8a'),
  'Pixel 9':            img('pixel-9'),
  'Pixel 9 Pro':        img('pixel-9-pro'),
  'Pixel 9 Pro XL':     img('pixel-9-pro-xl'),
  'Pixel 9a':           img('pixel-9a'),
  'Pixel 10':           img('pixel-10'),
  'Pixel 10 Pro':       img('pixel-10-pro'),
  'Pixel 10 Pro XL':    img('pixel-10-pro-xl'),
  'Pixel 10a':          img('pixel-10a'),
  'Pixel Fold':         img('pixel-fold'),
  'Pixel 9 Pro Fold':   img('pixel-9-pro-fold'),
  'Pixel 10 Pro Fold':  img('pixel-10-pro-fold'),
};

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
        { name: 'Galaxy S22',      colors: ['Phantom Black','Phantom White','Pink Gold','Green'], storages: [{ size:'128GB', price:5290.90 },{ size:'256GB', price:5660.00 }] },
        { name: 'Galaxy S22+',     colors: ['Phantom Black','Phantom White','Pink Gold','Green'], storages: [{ size:'128GB', price:5530.81 },{ size:'256GB', price:6213.63 }] },
        { name: 'Galaxy S22 Ultra',colors: ['Phantom Black','Phantom White','Burgundy','Green'],  storages: [{ size:'128GB', price:8335.89 },{ size:'256GB', price:8059.08 },{ size:'512GB', price:9166.35 }] },
      ],
      'Galaxy S23': [
        { name: 'Galaxy S23',      colors: ['Phantom Black','Cream','Green','Lavender'],   storages: [{ size:'128GB', price:6029.08 },{ size:'256GB', price:7136.35 }] },
        { name: 'Galaxy S23 FE',   colors: ['Mint','Cream','Graphite','Purple'],           storages: [{ size:'128GB', price:5844.54 }] },
        { name: 'Galaxy S23+',     colors: ['Phantom Black','Cream','Green','Lavender'],   storages: [{ size:'256GB', price:7689.99 }] },
        { name: 'Galaxy S23 Ultra',colors: ['Phantom Black','Cream','Green','Lavender'],   storages: [{ size:'256GB', price:10273.62 },{ size:'512GB', price:10827.25 }] },
      ],
      'Galaxy S24': [
        { name: 'Galaxy S24',      colors: ['Onyx Black','Marble Gray','Cobalt Violet','Amber Yellow'],            storages: [{ size:'128GB', price:8612.71 },{ size:'256GB', price:8981.80 }] },
        { name: 'Galaxy S24 FE',   colors: ['Blue','Graphite','Gray','Mint','Yellow'],                             storages: [{ size:'128GB', price:7689.99 }] },
        { name: 'Galaxy S24+',     colors: ['Onyx Black','Marble Gray','Cobalt Violet','Amber Yellow'],            storages: [{ size:'256GB', price:8981.80 },{ size:'512GB', price:9904.53 }] },
        { name: 'Galaxy S24 Ultra',colors: ['Titanium Black','Titanium Gray','Titanium Violet','Titanium Yellow'], storages: [{ size:'256GB', price:11380.89 },{ size:'512GB', price:12672.70 }] },
      ],
      'Galaxy S25': [
        { name: 'Galaxy S25',      colors: ['Navy','Icyblue','Mint','Silver Shadow'],                                     storages: [{ size:'128GB', price:10365.89 }] },
        { name: 'Galaxy S25 FE',   colors: ['Navy','Jetblack','White','Icyblue'],                                         storages: [{ size:'128GB', price:8612.71 }] },
        { name: 'Galaxy S25+',     colors: ['Navy','Icyblue','Mint','Silver Shadow'],                                     storages: [{ size:'256GB', price:12672.70 }] },
        { name: 'Galaxy S25 Edge', colors: ['Titanium Silver','Titanium Jetblack','Titanium Icyblue'],                    storages: [{ size:'256GB', price:9719.98 },{ size:'512GB', price:12119.07 }] },
        { name: 'Galaxy S25 Ultra',colors: ['Titanium Silverblue','Titanium Black','Titanium Whitesilver','Titanium Gray'], storages: [{ size:'256GB', price:14518.15 },{ size:'512GB', price:15994.51 }] },
      ],
      'Galaxy S26': [
        { name: 'Galaxy S26',      colors: ['Onyx Black','Silver','Blue'], storages: [{ size:'256GB', price:14149.06 },{ size:'512GB', price:15939.15 }] },
        { name: 'Galaxy S26+',     colors: ['Onyx Black','Silver','Blue'], storages: [{ size:'256GB', price:17378.60 },{ size:'512GB', price:17470.87 }] },
        { name: 'Galaxy S26 Ultra',colors: ['Onyx Black','Silver','Blue'], storages: [{ size:'256GB', price:18818.05 },{ size:'512GB', price:21180.22 }] },
      ],
      'Galaxy Z Flip': [
        { name: 'Galaxy Z Flip3', colors: ['Phantom Black','Cream','Green','Lavender'],  storages: [{ size:'128GB', price:5752.26 }] },
        { name: 'Galaxy Z Flip4', colors: ['Bora Purple','Graphite','Pink Gold','Blue'], storages: [{ size:'128GB', price:6213.63 },{ size:'256GB', price:6582.72 }] },
        { name: 'Galaxy Z Flip5', colors: ['Mint','Graphite','Cream','Lavender'],        storages: [{ size:'512GB', price:7874.53 }] },
        { name: 'Galaxy Z Flip6', colors: ['Silver Shadow','Yellow','Blue','Mint'],      storages: [{ size:'256GB', price:8612.71 },{ size:'512GB', price:9904.53 }] },
        { name: 'Galaxy Z Flip7', colors: ['Blue Shadow','Jetblack','Coralred'],         storages: [{ size:'256GB', price:13595.43 },{ size:'512GB', price:16363.60 }] },
      ],
      'Galaxy Z Fold': [
        { name: 'Galaxy Z Fold3', colors: ['Phantom Black','Phantom Green','Phantom Silver'], storages: [{ size:'256GB', price:7320.90 },{ size:'512GB', price:8243.62 }] },
        { name: 'Galaxy Z Fold4', colors: ['Graygreen','Beige','Phantom Black'],              storages: [{ size:'512GB', price:9904.53 }] },
        { name: 'Galaxy Z Fold5', colors: ['Icy Blue','Phantom Black','Cream'],               storages: [{ size:'256GB', price:12303.61 },{ size:'512GB', price:14905.69 }] },
        { name: 'Galaxy Z Fold6', colors: ['Silver Shadow','Pink','Navy'],                    storages: [{ size:'512GB', price:14149.06 }] },
        { name: 'Galaxy Z Fold7', colors: ['Blue Shadow','Silver Shadow','Jetblack'],         storages: [{ size:'256GB', price:17009.51 },{ size:'512GB', price:20977.23 },{ size:'1TB', price:21899.95 }] },
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

// ─── Color Hex ────────────────────────────────────────────────────────────────

const COLOR_HEX: Record<string, string> = {
  'Black':'#1c1c1e','White':'#f5f5f7','Red':'#e41e33','Blue':'#215e7c','Green':'#394c38','Purple':'#e5dbea',
  'Pacific Blue':'#2b3e4e','Gold':'#f5e6c8','Graphite':'#5a5752','Silver':'#e3e3e3',
  'Midnight':'#171e27','Starlight':'#f9f6ef','Pink':'#fae0d8',
  'Alpine Green':'#4a5c4b','Sierra Blue':'#a8c5d4',
  'Yellow':'#f5e642','Deep Purple':'#4a3764','Space Black':'#1c1c1e',
  'Black Titanium':'#2e2e2e','White Titanium':'#f5f5f0','Blue Titanium':'#2b3b4f','Natural Titanium':'#8c8983',
  'Desert Titanium':'#c4a882','Teal':'#3d7a74','Ultramarine':'#2b3e8c','Rose Quartz':'#d4a5b0',
  'Onyx Black':'#1c1c1c','Marble Gray':'#d4d4d4','Cobalt Violet':'#6c5b7b','Amber Yellow':'#f4d03f',
  'Phantom Black':'#111111','Cream':'#fdf6e3','Lavender':'#d8b4e2',
  'Phantom White':'#f8f9fa','Pink Gold':'#e6a8d7','Burgundy':'#800020',
  'Titanium Black':'#1e1e1e','Titanium Gray':'#9e9e9e','Titanium Violet':'#6a5d7e','Titanium Yellow':'#e8d88a',
  'Obsidian':'#1c1c1c','Porcelain':'#f1eee9','Wintergreen':'#b0d8c7','Peony':'#e8a0b0',
  'Hazel':'#575e53','Rose':'#f0b3b3','Snow':'#f7f7f7','Lemongrass':'#dce5b7',
  'Stormy Black':'#212121','Kinda Coral':'#f4795e','Sorta Seafoam':'#6cbfb5',
  'Cloudy White':'#e8e8e8','Sorta Sunny':'#f5d06e',
  'Chalk':'#f0ede8','Charcoal':'#3d3d3d','Sage':'#8cad8e',
  'Bay':'#4a7a9b','Aloe':'#7fad7f','Sea':'#5b9ab5','Coral':'#f07a5c',
  'Sea Cloud':'#b8d4e0','Leaf':'#7fa87f','Matte Hazel':'#6a7665','Iris':'#8b7bb5',
  'Mint':'#bfe3d0','Navy':'#1f2a44','Icyblue':'#bcd9e8','Silver Shadow':'#c9c9cd','Jetblack':'#0f0f10',
  'Titanium Silverblue':'#9fb2c8','Titanium Whitesilver':'#e8e8ea','Titanium Silver':'#d4d4d8',
  'Titanium Jetblack':'#161618','Titanium Icyblue':'#b6d2e2','Gray':'#8e8e93','Blue Shadow':'#5a6f8f',
  'Coralred':'#e8564a','Bora Purple':'#b09fce','Phantom Green':'#3d4a3f','Phantom Silver':'#d8d8d8',
  'Graygreen':'#8a9a8a','Beige':'#e0d4c0','Icy Blue':'#c2dcec',
};

const BRAND_ICONS: Record<string, React.ElementType> = {
  'iPhone': SiApple,
  'Samsung': SiSamsung,
  'Google Pixel': SiGoogle,
};

// ─── Coming Soon marquee ──────────────────────────────────────────────────────

const COMING_SOON: { label: string; color: string; Icon?: React.ElementType; wordmark?: string; font?: string }[] = [
  { label: 'Smart Watches', color: '#22d3ee', Icon: Watch },
  { label: 'Nothing',       color: '#ffffff', wordmark: 'NOTHING', font: "'Courier New', monospace" },
  { label: 'OnePlus',       color: '#F5010C', Icon: SiOneplus },
  { label: 'OPPO',          color: '#1EA366', Icon: SiOppo },
  { label: 'vivo',          color: '#415FFF', Icon: SiVivo },
  { label: 'Xiaomi',        color: '#FF6900', Icon: SiXiaomi },
  { label: 'POCO',          color: '#FFD600', wordmark: 'POCO' },
  { label: 'Redmi',         color: '#FF4A00', wordmark: 'Redmi' },
  { label: 'Xbox',          color: '#107C10', Icon: FaXbox },
  { label: 'Sony',          color: '#e8e8e8', Icon: SiSony },
  { label: 'Garmin',        color: '#007CC3', Icon: SiGarmin },
];

function ComingSoonMarquee() {
  const items = [...COMING_SOON, ...COMING_SOON]; // duplicated for seamless loop
  return (
    <div className="mt-10 w-full">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/60 mb-4">Coming Soon</p>
      <div className="relative overflow-hidden marquee-mask">
        <div className="marquee-track flex items-center gap-10 w-max">
          {items.map(({ label, color, Icon, wordmark, font }, i) => (
            <div key={`${label}-${i}`} className="flex items-center gap-2.5 flex-shrink-0 opacity-80">
              {Icon
                ? <Icon className="w-6 h-6" style={{ color }} />
                : <span className="text-base font-black tracking-widest" style={{ color, fontFamily: font }}>{wordmark}</span>}
              {Icon && <span className="text-xs font-medium" style={{ color }}>{label}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const slideVariants: import('framer-motion').Variants = {
  enter:  (dir: number) => ({ x: dir > 0 ? '10%' : '-10%', opacity: 0, scale: 0.95, filter: 'blur(8px)' }),
  center: { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit:   (dir: number) => ({ x: dir < 0 ? '10%' : '-10%', opacity: 0, scale: 0.95, filter: 'blur(8px)', transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }),
};

function formatPrice(p: number) {
  return 'P' + p.toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(p) ? 0 : 2, maximumFractionDigits: 2 });
}

function generateOrder() {
  const num = Math.floor(Math.random() * 9900) + 100;
  return { orderNumber: `HP-${new Date().getFullYear()}-${String(num).padStart(6,'0')}`, paymentRef: `HP${num}` };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="ml-2 p-1 rounded text-muted-foreground hover:text-foreground transition-colors" title="Copy">
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

function PhoneImage({ modelName, className }: { modelName: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const entry = MODEL_IMAGES[modelName];
  if (!entry || failed) return null;
  if (entry.transparent) {
    // True transparent PNG — render directly on dark background
    return (
      <img src={entry.url} alt={modelName} className={className}
        onError={() => setFailed(true)} draggable={false} />
    );
  }
  // White-bg image — frame it in a subtle light-tinted container so it looks intentional
  return (
    <div className={`${className} rounded-xl overflow-hidden flex items-center justify-center`}
      style={{ background: 'rgba(255,255,255,0.06)' }}>
      <img src={entry.url} alt={modelName} className="w-full h-full object-contain"
        onError={() => setFailed(true)} draggable={false} />
    </div>
  );
}

function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {[
        { Icon: Battery,   label: 'Battery >80% Guaranteed' },
        { Icon: Unlock,    label: 'Unlocked Device' },
        { Icon: Shield,    label: '90-Day Warranty' },
        { Icon: Truck,     label: '14 Working Days ETA' },
        { Icon: Camera,    label: 'Photos of Your Phone + Battery % Within 48hrs of Ordering' },
        { Icon: RotateCcw, label: 'Refund Before Shipping (10% Admin Fee)' },
      ].map(({ Icon, label }) => (
        <div key={label} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background/40 border border-border/30">
          <Icon className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
          <span className="text-[10px] text-muted-foreground leading-tight">{label}</span>
        </div>
      ))}
    </div>
  );
}

function AboutModal({ onClose }: { onClose: () => void }) {
  const socials = [
    { Icon: SiWhatsapp,  label: 'WhatsApp',  handle: BUSINESS.whatsapp,           href: `https://wa.me/${BUSINESS.whatsapp.replace(/\D/g,'')}` },
    { Icon: Linkedin,    label: 'LinkedIn',  handle: 'special-lekopane21',        href: BUSINESS.linkedin },
    { Icon: SiInstagram, label: 'Instagram', handle: '@nothing.special110',       href: BUSINESS.instagram },
    { Icon: SiTiktok,    label: 'TikTok',    handle: BUSINESS.tiktok,             href: `https://tiktok.com/${BUSINESS.tiktok}` },
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 35 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg bg-card border border-border/40 rounded-t-[2rem] p-8 pb-10 shadow-2xl overflow-y-auto max-h-[90dvh]">
        <div className="w-12 h-1 bg-border rounded-full mx-auto mb-6" />
        <div className="flex items-center gap-4 mb-3">
          <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
          <div>
            <h3 className="text-lg font-semibold text-primary">{BUSINESS.name}</h3>
            <p className="text-xs text-muted-foreground">a business under Happy Man Enterprise PTY LTD</p>
          </div>
        </div>
        {BUSINESS.about.map((p, i) => (
          <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3">{p}</p>
        ))}
        <div className="text-xs text-muted-foreground mb-4 space-y-1">
          <p>👤 Owner: {BUSINESS.owner}</p>
          <p>📍 {BUSINESS.location}</p>
          <p>📧 {BUSINESS.email}</p>
          <p>📱 {BUSINESS.whatsapp} — enquiries welcome on WhatsApp</p>
          <p className="text-[10px] mt-2 text-amber-400/80">Refund Policy: Cancellations before shipping are subject to a 10% admin fee.</p>
        </div>
        <p className="text-xs italic text-primary/80 mb-4">“{BUSINESS.slogan}”</p>
        <div className="grid grid-cols-1 gap-2">
          {socials.map(({ Icon, label, handle, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background/50 border border-border/30 hover:border-primary/40 transition-all group">
              <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              <span className="text-sm font-medium text-foreground/80">{label}</span>
              <span className="ml-auto text-xs text-muted-foreground font-mono">{handle}</span>
            </a>
          ))}
        </div>
        <button onClick={onClose} className="mt-5 w-full py-3 rounded-xl text-sm font-medium text-muted-foreground border border-border/30 hover:border-border/60 transition-colors">Close</button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main TechStore Component ─────────────────────────────────────────────────
// Steps: 0 = Brand, 1 = Series, 2 = Model + Storage + Color (inline), 3 = Checkout, 4 = Confirmation

export default function TechStore() {
  const [step,      setStep]      = useState(0);
  const [direction, setDirection] = useState(1);
  const [showAbout, setShowAbout] = useState(false);

  const [brand,   setBrand]   = useState<string | null>(null);
  const [series,  setSeries]  = useState<string | null>(null);
  const [model,   setModel]   = useState<PhoneModel | null>(null);
  const [storage, setStorage] = useState<StorageOption | null>(null);
  const [color,   setColor]   = useState<string | null>(null);

  // Inline selection state on the model step
  const [selectedModelName, setSelectedModelName] = useState<string | null>(null);

  type PayMethod = 'fnb' | 'orange' | 'absa';
  const [payMethod, setPayMethod] = useState<PayMethod | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [{ orderNumber, paymentRef }] = useState(() => generateOrder());
  const fileRef = useRef<HTMLInputElement>(null);

  const advance = (s: number) => { setDirection(1); setStep(s); };
  const retreat = (s: number) => {
    setDirection(-1); setStep(s);
    if (s <= 0) { setSeries(null); setModel(null); setStorage(null); setColor(null); setSelectedModelName(null); }
    else if (s <= 1) { setModel(null); setStorage(null); setColor(null); setSelectedModelName(null); }
    else if (s <= 2) { setStorage(null); setColor(null); }
    if (s < 3) { setPayMethod(null); setProofFile(null); }
  };

  const reset = () => {
    setDirection(-1);
    setBrand(null); setSeries(null); setModel(null); setStorage(null); setColor(null);
    setSelectedModelName(null); setPayMethod(null); setProofFile(null); setStep(0);
  };

  const crumbs: { label: string; step: number }[] = [];
  if (brand)  crumbs.push({ label: brand,  step: 0 });
  if (series) crumbs.push({ label: series, step: 1 });
  if (model && storage && color) crumbs.push({ label: `${model.name} · ${storage.size}`, step: 2 });

  const paymentMethods: { id: PayMethod; label: string; icon: string }[] = [
    { id: 'fnb',    label: 'FNB Bank Transfer',  icon: '🏦' },
    { id: 'orange', label: 'Orange Money',        icon: '🟠' },
    { id: 'absa',   label: 'ABSA Bank Transfer',  icon: '🏦' },
  ];

  const canConfirm = () => payMethod !== null && proofFile !== null;

  const renderUpload = () => (
    <div className="pt-2">
      <p className="text-xs text-muted-foreground mb-2">Upload proof of payment:</p>
      <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden" onChange={e => setProofFile(e.target.files?.[0] ?? null)} />
      {proofFile ? (
        <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-xl px-3 py-2">
          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
          <span className="text-xs flex-1 truncate">{proofFile.name}</span>
          <button onClick={() => setProofFile(null)}><X className="w-4 h-4 text-muted-foreground hover:text-foreground" /></button>
        </div>
      ) : (
        <button onClick={() => fileRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-border/60 rounded-xl text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors">
          <Upload className="w-4 h-4" /> Choose file (image or PDF)
        </button>
      )}
    </div>
  );

  const renderPaymentDetails = () => {
    if (!payMethod || !storage) return null;
    if (payMethod === 'orange') return (
      <motion.div key="orange" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="mt-3 p-4 bg-background/60 border border-border/40 rounded-2xl text-sm space-y-1.5">
        <div className="flex items-center"><span className="text-muted-foreground w-20">Name</span><span className="font-medium">{PAYMENT_INFO.orange.name}</span></div>
        <div className="flex items-center"><span className="text-muted-foreground w-20">Number</span><span className="font-mono font-medium">{PAYMENT_INFO.orange.number}</span><CopyButton text={PAYMENT_INFO.orange.number} /></div>
        <div className="flex items-center"><span className="text-muted-foreground w-20">Amount</span><span className="font-medium">{formatPrice(storage.price)}</span></div>
        <div className="flex items-center gap-2 py-1.5 px-3 bg-primary/5 border border-primary/15 rounded-xl mt-1">
          <span className="text-xs text-muted-foreground">Reference</span>
          <span className="font-mono font-semibold text-primary">{paymentRef}</span>
          <CopyButton text={paymentRef} />
        </div>
        <p className="text-xs text-amber-400/80">Use this reference when making your payment.</p>
        {renderUpload()}
      </motion.div>
    );
    const info = payMethod === 'fnb' ? PAYMENT_INFO.fnb : PAYMENT_INFO.absa;
    return (
      <motion.div key={payMethod} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="mt-3 p-4 bg-background/60 border border-border/40 rounded-2xl text-sm space-y-1.5">
        <div className="flex items-center"><span className="text-muted-foreground w-28">Bank</span><span className="font-medium">{info.bankName}</span></div>
        <div className="flex items-center"><span className="text-muted-foreground w-28">Account Name</span><span className="font-medium">{info.accountName}</span></div>
        <div className="flex items-center"><span className="text-muted-foreground w-28">Account No.</span><span className="font-mono font-medium">{info.accountNumber}</span><CopyButton text={info.accountNumber} /></div>
        <div className="flex items-center"><span className="text-muted-foreground w-28">Branch Code</span><span className="font-mono">{info.branchCode}</span></div>
        <div className="flex items-center"><span className="text-muted-foreground w-28">Amount</span><span className="font-medium">{formatPrice(storage.price)}</span></div>
        <div className="flex items-center gap-2 py-2 px-3 bg-primary/5 border border-primary/15 rounded-xl mt-1">
          <span className="text-xs text-muted-foreground">Reference</span>
          <span className="font-mono font-semibold text-primary text-base">{paymentRef}</span>
          <CopyButton text={paymentRef} />
        </div>
        <p className="text-xs text-amber-400/80">Use this reference when making your bank transfer.</p>
        {renderUpload()}
      </motion.div>
    );
  };

  // ── Step renderers ────────────────────────────────────────────────────────────

  const renderBrand = () => (
    <div className="w-full max-w-4xl px-4" style={{ maxHeight: 'calc(100dvh - 180px)', overflowY: 'auto', overflowX: 'hidden' }}>
      <h2 className="text-2xl md:text-4xl font-semibold mb-6 md:mb-10 text-center tracking-tight text-primary pt-2">Choose your brand</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Object.keys(CATALOG).map(b => {
          const Icon = BRAND_ICONS[b];
          return (
            <button key={b}
              onClick={() => { setBrand(b); setSeries(null); setModel(null); setStorage(null); setColor(null); setSelectedModelName(null); advance(1); }}
              className="group flex flex-col items-center justify-center py-12 px-4 bg-card/40 backdrop-blur-md border border-border/50 rounded-[2rem] hover:bg-secondary/40 hover:border-primary/50 transition-all duration-500">
              <Icon className="w-16 h-16 md:w-20 md:h-20 mb-6 text-foreground/50 group-hover:text-primary group-hover:scale-110 transition-all duration-500" />
              <span className="text-xl md:text-2xl font-medium tracking-wide">{b}</span>
            </button>
          );
        })}
      </div>
      <ComingSoonMarquee />
    </div>
  );

  const renderSeries = () => {
    if (!brand) return null;
    return (
      <div className="w-full max-w-4xl px-4">
        <h2 className="text-3xl md:text-5xl font-semibold mb-10 text-center tracking-tight text-primary">Which series?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.keys(CATALOG[brand].series).map(s => {
            // show a representative model image for the series
            const firstModel = CATALOG[brand].series[s][0];
            const img = MODEL_IMAGES[firstModel.name];
            return (
              <button key={s}
                onClick={() => { setSeries(s); setModel(null); setStorage(null); setColor(null); setSelectedModelName(null); advance(2); }}
                className="group relative flex flex-col justify-between p-5 md:p-6 h-28 md:h-40 bg-card/40 backdrop-blur-md border border-border/50 rounded-[1.5rem] hover:bg-secondary/40 hover:border-primary/50 transition-all duration-500 text-left overflow-hidden">
                {img && (
                  <div className="absolute right-0 bottom-0 w-20 h-full pointer-events-none">
                    {img.transparent
                      ? <img src={img.url} alt={s} className="absolute bottom-0 right-1 h-full object-contain opacity-15" onError={() => {}} />
                      : <div className="absolute bottom-0 right-1 h-full w-20 opacity-10 overflow-hidden rounded-xl">
                          <img src={img.url} alt={s} className="h-full w-full object-contain" onError={() => {}} />
                        </div>
                    }
                  </div>
                )}
                <span className="relative text-lg md:text-xl font-semibold tracking-tight text-foreground/90 group-hover:text-primary transition-colors">{s}</span>
                <span className="relative text-xs text-muted-foreground">{CATALOG[brand].series[s].length} models</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Step 2: Model grid with inline storage + color dropdowns
  const renderModelStep = () => {
    if (!brand || !series) return null;
    const models = CATALOG[brand].series[series];
    const selModel = models.find(m => m.name === selectedModelName) ?? null;

    return (
      <div className="w-full max-w-4xl px-4 flex flex-col gap-6" style={{ maxHeight: 'calc(100dvh - 200px)', overflowY: 'auto' }}>
        <h2 className="text-2xl md:text-4xl font-semibold text-center tracking-tight text-primary pt-2">Which model?</h2>

        {/* Model grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {models.map(m => {
            const imgEntry = MODEL_IMAGES[m.name];
            const isSelected = selectedModelName === m.name;
            return (
              <button key={m.name}
                onClick={() => {
                  if (selectedModelName === m.name) { setSelectedModelName(null); setModel(null); setStorage(null); setColor(null); }
                  else { setSelectedModelName(m.name); setModel(m); setStorage(null); setColor(null); }
                }}
                className={`group relative flex flex-col justify-between p-4 md:p-5 h-32 md:h-44 backdrop-blur-md border rounded-[1.5rem] transition-all duration-300 text-left overflow-hidden
                  ${isSelected ? 'bg-primary/10 border-primary/60 shadow-[0_0_20px_rgba(var(--primary-rgb,99,102,241),0.15)]' : 'bg-card/40 border-border/50 hover:bg-secondary/40 hover:border-primary/30'}`}>
                {/* Phone image */}
                {imgEntry && (
                  <div className="absolute right-0 bottom-0 w-20 md:w-28 h-full pointer-events-none">
                    {imgEntry.transparent
                      ? <img src={imgEntry.url} alt={m.name}
                          className={`absolute bottom-0 right-1 h-full object-contain transition-opacity duration-300 ${isSelected ? 'opacity-60' : 'opacity-20 group-hover:opacity-35'}`}
                          onError={() => {}} />
                      : <div className={`absolute bottom-1 right-1 w-20 md:w-24 h-[85%] rounded-xl overflow-hidden transition-opacity duration-300 ${isSelected ? 'opacity-40' : 'opacity-10 group-hover:opacity-20'}`}
                          style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <img src={imgEntry.url} alt={m.name} className="w-full h-full object-contain" onError={() => {}} />
                        </div>
                    }
                  </div>
                )}
                <div className="flex items-start gap-1.5">
                  <span className={`relative text-sm md:text-base font-semibold tracking-tight leading-snug transition-colors ${isSelected ? 'text-primary' : 'text-foreground/90 group-hover:text-primary'}`}>{m.name}</span>
                  {isSelected && <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />}
                </div>
                <span className="relative text-xs text-muted-foreground">From {formatPrice(m.storages[0].price)}</span>
              </button>
            );
          })}
        </div>

        {/* Inline storage + color + CTA — only when a model is selected */}
        <AnimatePresence>
          {selModel && (
            <motion.div key={selModel.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card/60 backdrop-blur-xl border border-primary/25 rounded-[2rem] p-6 shadow-xl space-y-5">

              {/* Selected model hero */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 flex-shrink-0">
                  {(() => {
                    const imgEntry = MODEL_IMAGES[selModel.name];
                    if (!imgEntry) return null;
                    return imgEntry.transparent
                      ? <img src={imgEntry.url} alt={selModel.name} className="h-full w-full object-contain" onError={() => {}} />
                      : <div className="h-full w-full rounded-xl overflow-hidden flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.07)' }}>
                          <img src={imgEntry.url} alt={selModel.name} className="h-full w-full object-contain" onError={() => {}} />
                        </div>;
                  })()}
                </div>
                <div>
                  <p className="text-base font-semibold text-primary">{selModel.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {storage ? formatPrice(storage.price) : `From ${formatPrice(selModel.storages[0].price)}`}
                  </p>
                </div>
              </div>

              {/* Storage */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Storage</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground/40" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {selModel.storages.map(opt => (
                    <button key={opt.size}
                      onClick={() => setStorage(opt)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200
                        ${storage?.size === opt.size
                          ? 'bg-primary/15 border-primary/60 text-primary'
                          : 'bg-background/40 border-border/40 text-muted-foreground hover:border-primary/30 hover:text-foreground'}`}>
                      {opt.size} <span className="text-xs opacity-70">· {formatPrice(opt.price)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Color</span>
                  {color && <span className="text-xs text-muted-foreground font-medium">— {color}</span>}
                  <ChevronDown className="w-3 h-3 text-muted-foreground/40" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {selModel.colors.map(c => (
                    <button key={c} onClick={() => setColor(c)}
                      title={c}
                      className={`relative w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 active:scale-95
                        ${color === c ? 'ring-2 ring-primary ring-offset-2 ring-offset-card scale-110' : 'ring-1 ring-white/10'}`}
                      style={{ backgroundColor: COLOR_HEX[c] ?? '#888' }}>
                      {color === c && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white drop-shadow" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => { if (storage && color) advance(3); }}
                disabled={!storage || !color}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300
                  bg-primary text-primary-foreground hover:opacity-90 hover:-translate-y-0.5
                  disabled:opacity-30 disabled:cursor-not-allowed disabled:translate-y-0">
                {!storage ? 'Select storage first' : !color ? 'Pick a color' : `Proceed to Checkout · ${formatPrice(storage.price)}`}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderCheckout = () => {
    if (!model || !storage || !color) return null;
    return (
      <div className="w-full max-w-xl px-4 flex flex-col gap-3" style={{ maxHeight: 'calc(100dvh - 180px)', overflowY: 'auto' }}>
        {/* Order summary */}
        <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-[2rem] p-5 shadow-xl relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Order</span>
                <span className="font-mono text-xs text-primary font-semibold">{orderNumber}</span>
                <CopyButton text={orderNumber} />
              </div>
              <p className="text-lg md:text-2xl font-semibold tracking-tight">{model.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{storage.size} · {color}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0" style={{ backgroundColor: COLOR_HEX[color] ?? '#888' }} />
                <span className="text-xs text-muted-foreground">{color}</span>
              </div>
              <p className="text-2xl font-semibold text-primary mt-3">{formatPrice(storage.price)}</p>
            </div>
            <div className="w-20 h-28 flex-shrink-0 flex items-end justify-end">
              {(() => {
                const imgEntry = MODEL_IMAGES[model.name];
                if (!imgEntry) return null;
                return imgEntry.transparent
                  ? <img src={imgEntry.url} alt={model.name} className="h-28 w-auto object-contain opacity-90" onError={() => {}} />
                  : <div className="h-28 w-20 rounded-xl overflow-hidden flex items-end justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <img src={imgEntry.url} alt={model.name} className="h-full w-full object-contain" onError={() => {}} />
                    </div>;
              })()}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0"><TrustBadges /></div>

        <div className="flex items-start gap-2 px-4 py-3 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex-shrink-0">
          <Camera className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Within <span className="text-foreground font-medium">48 hours of ordering</span>, we'll send you photos of your actual phone and its battery percentage — before it ships.
          </p>
        </div>

        {/* Payment */}
        <div className="bg-card/40 backdrop-blur-md border border-border/40 rounded-[2rem] p-5 flex-shrink-0">
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-3">Choose Payment</p>
          <div className="grid grid-cols-1 gap-2">
            {paymentMethods.map(pm => (
              <button key={pm.id}
                onClick={() => { setPayMethod(pm.id); setProofFile(null); }}
                className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all duration-300 text-left ${
                  payMethod === pm.id ? 'border-primary/60 bg-primary/10 text-primary' : 'border-border/40 bg-background/30 text-muted-foreground hover:border-border hover:text-foreground'}`}>
                <span className="text-base">{pm.icon}</span>
                <span>{pm.label}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">{payMethod && renderPaymentDetails()}</AnimatePresence>
        </div>

        <button onClick={() => advance(4)} disabled={!canConfirm()}
          className="w-full py-4 rounded-2xl font-semibold text-base transition-all flex items-center justify-center gap-2 flex-shrink-0
            bg-primary text-primary-foreground hover:opacity-90 hover:-translate-y-0.5
            disabled:opacity-30 disabled:cursor-not-allowed disabled:translate-y-0">
          {canConfirm() ? 'Confirm Order' : 'Upload proof to confirm'}
        </button>
      </div>
    );
  };

  const renderConfirmation = () => {
    const whatsappMsg = encodeURIComponent(`Hi Tech Inc! My order ${orderNumber} (Ref: ${paymentRef}) for ${model?.name} ${storage?.size} ${color} has been placed. Please confirm.`);
    return (
      <div className="w-full max-w-lg px-4 flex flex-col items-center" style={{ maxHeight: 'calc(100dvh - 180px)', overflowY: 'auto' }}>
        <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
          className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 tracking-tight text-primary">Order Confirmed!</h2>
          <p className="text-muted-foreground text-sm mb-4 max-w-sm mx-auto leading-relaxed">
            Your <span className="text-foreground font-medium">{model?.name}</span> is being processed. Within <span className="text-foreground font-medium">48 hours</span> we'll send you photos of your actual phone and its battery percentage — before it ships.
          </p>
          <div className="bg-card/50 border border-border/30 rounded-2xl p-4 mb-4 text-left space-y-1.5">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Order Number</span><span className="font-mono text-primary font-semibold">{orderNumber}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Payment Ref</span><span className="font-mono text-primary font-semibold">{paymentRef}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">ETA</span><span className="text-foreground">14 Working Days</span></div>
            <div className="text-xs text-amber-400/80 pt-1">Refund available before shipping — 10% admin fee applies.</div>
          </div>
          <a href={`https://wa.me/${BUSINESS.whatsapp.replace(/\D/g,'')}?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 mb-3 rounded-2xl bg-green-600/20 border border-green-500/30 text-green-400 font-medium text-sm hover:bg-green-600/30 transition-colors">
            <SiWhatsapp className="w-4 h-4" /> WhatsApp Us
          </a>
          <button onClick={reset} className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors border-b border-border/40 hover:border-primary pb-1">Start a new order</button>
        </motion.div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 0: return renderBrand();
      case 1: return renderSeries();
      case 2: return renderModelStep();
      case 3: return renderCheckout();
      case 4: return renderConfirmation();
      default: return null;
    }
  };

  const totalVisibleSteps = 3; // Brand, Series, Model
  const isConfigStep = step >= 0 && step <= 2;

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-background text-foreground overflow-hidden selection:bg-primary/20">
      <div className="noise-bg" />
      <div className="ambient-glow" />
      <AnimatePresence>{showAbout && <AboutModal onClose={() => setShowAbout(false)} />}</AnimatePresence>

      {/* Header */}
      <header className="h-16 flex-shrink-0 flex items-center justify-between px-5 md:px-10 z-20 border-b border-border/10 relative">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Tech Inc" className="h-8 w-8 object-contain" />
          <div>
            <span className="text-xs font-semibold text-primary tracking-wider">TECH INC</span>
            <p className="text-[9px] text-muted-foreground tracking-widest">REFURBISHED PHONES</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isConfigStep && (
            <span className="text-xs text-muted-foreground tracking-widest">
              Step {step + 1} / {totalVisibleSteps}
            </span>
          )}
          <button onClick={() => setShowAbout(true)} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-all">
            <Info className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 relative z-10 overflow-hidden flex flex-col">
        {/* Breadcrumbs */}
        <div className="absolute top-0 left-0 w-full flex justify-center pt-4 pointer-events-none z-30">
          <AnimatePresence mode="wait">
            {crumbs.length > 0 && step < 3 && (
              <motion.div key={crumbs.length} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium pointer-events-auto bg-background/50 backdrop-blur-xl px-4 py-2 rounded-full border border-border/30 shadow-lg">
                {crumbs.map((c, idx) => (
                  <React.Fragment key={c.step}>
                    {idx > 0 && <span className="opacity-30 mx-0.5">·</span>}
                    <button onClick={() => retreat(c.step)} className="hover:text-primary transition-colors truncate max-w-[100px]">{c.label}</button>
                  </React.Fragment>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step container */}
        <div className="flex-1 relative w-full h-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={step} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
              className="absolute inset-0 flex items-center justify-center pb-16 pt-12"
              style={{ overflowX: 'hidden', overflowY: (step >= 2) ? 'visible' : 'hidden' }}>
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 z-20 border-t border-border/10 bg-background/50 backdrop-blur-xl relative">
        <div className="h-14 flex items-center justify-between px-6 md:px-12">
          <div className="w-24">
            {step > 0 && step < 4 && (
              <button onClick={() => retreat(step - 1)}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
              </button>
            )}
          </div>
          <div className="text-center">
            <AnimatePresence mode="wait">
              {storage && step < 4 ? (
                <motion.div key={storage.price} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">Total</span>
                  <span className="text-lg md:text-xl tracking-tight">{formatPrice(storage.price)}</span>
                </motion.div>
              ) : (
                <motion.p key="slogan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="hidden sm:block text-[11px] italic text-muted-foreground/70 max-w-md">
                  “{BUSINESS.slogan}”
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="w-24 flex items-center justify-end gap-3">
            <a href={`https://wa.me/${BUSINESS.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent('Hi Tech Inc! I have an enquiry.')}`}
              target="_blank" rel="noopener noreferrer" title={`WhatsApp ${BUSINESS.whatsapp} for enquiries`}
              className="flex items-center gap-1.5 text-xs text-green-400/80 hover:text-green-300 transition-colors">
              <SiWhatsapp className="w-3.5 h-3.5" /> <span className="hidden md:inline">74066703</span>
            </a>
            <button onClick={() => setShowAbout(true)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">About Us</button>
          </div>
        </div>
        <p className="sm:hidden text-center text-[10px] italic text-muted-foreground/60 pb-1.5 px-4">“{BUSINESS.slogan}”</p>
      </footer>
    </div>
  );
}
