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
