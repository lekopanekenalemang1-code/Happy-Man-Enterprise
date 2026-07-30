---
name: Phone image sourcing quirks
description: Gotchas when fetching phone product images and brand icons for the phone store
---

- GSMArena `fdn2.gsmarena.com/vv/bigpic/<slug>.jpg` slugs are inconsistent: newer models (Pixel 9/10, Galaxy S24) need a **trailing dash** (e.g. `google-pixel-9-pro-.jpg`, `samsung-galaxy-s24-5g-.jpg`); some Pixels drop the dash after the brand (`google-pixel7.jpg`). Failed fetches return small HTML files — always verify with `file`.
- Apple store CDN `png-alpha` images exist only for some models; many Pro variants 404 ("Asset Not Found") — fall back to GSMArena + background removal.
- `SiLinkedin` was removed from react-icons/si (simple-icons dropped LinkedIn). Use `Linkedin` from lucide-react.
- All store images now local transparent PNGs in `artifacts/phone-store/public/phones/`; raw originals kept in `attached_assets/phones_raw/`.

**Why:** wasted several fetch rounds discovering slug patterns; a wrong icon import crashes the whole Vite page.
**How to apply:** when adding new phone models, follow the slug patterns above, verify downloads, and background-remove non-transparent images before adding to `MODEL_IMAGES`.
