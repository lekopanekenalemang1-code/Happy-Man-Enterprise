---
name: Phone image sourcing quirks
description: Gotchas when fetching phone product images and brand icons for the phone store
---

- GSMArena `fdn2.gsmarena.com/vv/bigpic/<slug>.jpg` slugs are inconsistent: newer models (Pixel 9/10, Galaxy S24) need a **trailing dash** (e.g. `google-pixel-9-pro-.jpg`), some need a model-code suffix (`samsung-galaxy-s25-sm-s931.jpg`) or `-r1`; some Pixels drop the dash after the brand (`google-pixel7.jpg`). Failed fetches return small HTML files — always verify with `file`. When guessing fails, curl the phone's GSMArena spec page (find URL via web search) and grep for `bigpic.*\.jpg` — the search endpoint `res.php3` is blocked for curl.
- Apple store CDN `png-alpha` images exist only for some models; many Pro variants 404 ("Asset Not Found") — fall back to GSMArena + background removal.
- `SiLinkedin` was removed from react-icons/si (simple-icons dropped LinkedIn). Use `Linkedin` from lucide-react.
- All store images now local transparent PNGs in `artifacts/phone-store/public/phones/`; raw originals kept in `attached_assets/phones_raw/`.

**Why:** wasted several fetch rounds discovering slug patterns; a wrong icon import crashes the whole Vite page.
**How to apply:** when adding new phone models, follow the slug patterns above, verify downloads, and background-remove non-transparent images before adding to `MODEL_IMAGES`.
