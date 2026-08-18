# PINKA Digital Academy Theme 💗

A responsive **Pink + Black** static website theme designed for:

- Online learning / digital knowledge
- Social media creator education
- AI prompt packs
- Digital products
- GitHub Pages

## Files

- `index.html` — page content and sections
- `style.css` — full responsive design
- `script.js` — mobile menu, filters, modals, cart counter, theme toggle
- `assets/logo.svg` — editable vector logo

## Preview locally

Open `index.html` in your browser.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload all files in this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**.
6. Save. GitHub will publish the site.

## Customize

### Brand name
Search in `index.html` for `PINKA` and replace it with your own brand name.

### Contact details
At the bottom of `index.html`, replace:

- `your@email.com`
- `+855 XX XXX XXX`
- `@yourtelegram`

### Colors
Edit the CSS variables at the top of `style.css`:

```css
--pink:#ff2f92;
--pink-2:#ff5eae;
--deep:#1a0712;
```

### Products
Each product is an `<article class="product-card">` in `index.html`.
Change `data-title`, `data-price`, title, description, and price.

## Important

This is a **front-end theme**. The login and checkout are demo UI only. For real payments, accounts, order history, or protected downloads, connect a backend/payment service.


## Version 4 updates
- `Buy Prompt` now scrolls directly to the same-page `PROMPT MARKETPLACE` section.
- Buy Tax, Buy EIN and BUY TIKTOK are static Coming Soon labels (no popup/link).
- Shopping cart now shows item names, quantities, unit prices, line totals and grand total.
- Cart supports quantity +/− and removing items.
- Login modal now includes Login and Sign Up tabs. Authentication remains front-end demo until a backend is connected.


## Version 10
- Updated hero location label to Phnom Penh, Cambodia · Since 2024.
- Refined Khmer hero headline, supporting copy, and quote styling.


## Version 12
- Temporarily removed the 2,500+ community proof row.
- Temporarily removed the five-item feature/trust strip below the hero.


## Version 13
- `ទិញ PROMPT` opens `prompt-marketplace.html` as a separate marketplace page.
- Marketplace includes category chips, search, 12 prompt cards, cart integration, Login / Sign Up, and responsive design.


## Version 14
- Expanded Prompt Marketplace with the full category/tag set from the provided reference.
- Dense responsive category chip layout.
- Unmatched future categories keep the catalog visible until matching products are added.


## Prompt Preview + Locked Access (Version 17)
- Logged-in users can open a product preview image.
- Prompt text stays locked before purchase.
- `window.PINKA_PROMPT_ACCESS.unlock(productId, promptText, orderId)` is the front-end hook for a verified payment-success response.
- IMPORTANT: GitHub Pages is static. Do **not** place paid prompt text inside public HTML/JS/JSON because visitors can inspect source files. For real automatic unlock, verify the order on a secure backend (for example Supabase/Firebase/your server or ABA Pay webhook), then return the purchased prompt only to the authenticated buyer.
- Login in this package remains a front-end demo session. Connect real authentication before production.


## Product images (Version 18)
- Card images: `assets/products/thumbnails/`
- Popup preview images: `assets/products/previews/`
- Replace a placeholder image with your own image **using the same filename**.
- Recommended card size: **900 × 1080 px**.
- Recommended preview size: **1200 × 1500 px**.
- See `assets/products/README.txt` for the complete filename list.


## Version 21
Category/Tag filter UI was removed completely from Prompt Marketplace. Search + product cards remain. Cache-busting query strings were added for GitHub Pages.


## Version 22 product grid
Products are rendered from `products-data.js`. Add another product object there and the 3-column marketplace grid grows automatically. The first 3 are visible; the rest appear under the ALL button.
