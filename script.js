const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');
const themeToggle = document.getElementById('themeToggle');
const cartCount = document.getElementById('cartCount');
const toast = document.getElementById('toast');
const CART_KEY = 'pinkaCartItemsV4';
let selectedProduct = null;
let cartItems = loadCart();

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(item => item && item.name && Number(item.price) >= 0 && Number(item.qty) > 0) : [];
  } catch (error) {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  updateCartBadge();
}

function money(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function slugify(text) {
  return String(text || 'product').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function cartQuantity() {
  return cartItems.reduce((sum, item) => sum + Number(item.qty || 0), 0);
}

function updateCartBadge() {
  if (cartCount) cartCount.textContent = String(cartQuantity());
}

updateCartBadge();

menuBtn?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

const savedTheme = localStorage.getItem('pinkaTheme');
if (savedTheme === 'dark') document.body.classList.add('dark');
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('pinkaTheme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  if (!document.querySelector('.modal.open')) document.body.style.overflow = '';
}

document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.open));
});

document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', () => closeModal(el.closest('.modal')));
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(closeModal);
});

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__pinkaToast);
  window.__pinkaToast = setTimeout(() => toast.classList.remove('show'), 2300);
}

function highlightPromptSection() {
  const section = document.getElementById('prompts');
  if (!section) return;
  section.classList.remove('prompt-focus');
  void section.offsetWidth;
  section.classList.add('prompt-focus');
  setTimeout(() => section.classList.remove('prompt-focus'), 1300);
}

document.querySelectorAll('a[href="#prompts"]').forEach(link => {
  link.addEventListener('click', () => setTimeout(highlightPromptSection, 350));
});

// Product modal
function selectProduct(card) {
  selectedProduct = {
    id: slugify(card.dataset.title),
    name: card.dataset.title,
    price: Number(card.dataset.price)
  };
  const nameEl = document.getElementById('modalProductName');
  const priceEl = document.getElementById('modalProductPrice');
  if (nameEl) nameEl.textContent = selectedProduct.name;
  if (priceEl) priceEl.textContent = money(selectedProduct.price);
  openModal('productModal');
}

document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    if (card) selectProduct(card);
  });
});

document.getElementById('addToCartBtn')?.addEventListener('click', () => {
  if (!selectedProduct) return;
  const existing = cartItems.find(item => item.id === selectedProduct.id);
  if (existing) existing.qty += 1;
  else cartItems.push({ ...selectedProduct, qty: 1 });
  saveCart();
  closeModal(document.getElementById('productModal'));
  renderCart();
  showToast(`${selectedProduct.name} បានបន្ថែមទៅកន្ត្រក ✓`);
});

// Detailed cart modal
function renderCart() {
  const list = document.getElementById('cartItems');
  const empty = document.getElementById('cartEmpty');
  const summary = document.getElementById('cartSummary');
  const itemCount = document.getElementById('cartItemCount');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');
  if (!list || !empty || !summary) return;

  list.innerHTML = '';
  const hasItems = cartItems.length > 0;
  empty.hidden = hasItems;
  summary.hidden = !hasItems;

  if (!hasItems) {
    updateCartBadge();
    return;
  }

  cartItems.forEach(item => {
    const row = document.createElement('article');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-item-thumb"><span>✦</span></div>
      <div class="cart-item-info">
        <strong>${escapeHtml(item.name)}</strong>
        <small>${money(item.price)} / មួយ</small>
      </div>
      <div class="qty-control" aria-label="Quantity controls">
        <button type="button" data-cart-action="minus" data-id="${escapeHtml(item.id)}">−</button>
        <span>${item.qty}</span>
        <button type="button" data-cart-action="plus" data-id="${escapeHtml(item.id)}">+</button>
      </div>
      <strong class="cart-line-total">${money(item.price * item.qty)}</strong>
      <button class="cart-remove" type="button" data-cart-action="remove" data-id="${escapeHtml(item.id)}" aria-label="Remove ${escapeHtml(item.name)}">×</button>`;
    list.appendChild(row);
  });

  const qty = cartQuantity();
  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);
  if (itemCount) itemCount.textContent = `${qty}`;
  if (subtotalEl) subtotalEl.textContent = money(subtotal);
  if (totalEl) totalEl.textContent = money(subtotal);
  updateCartBadge();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]));
}

document.getElementById('cartBtn')?.addEventListener('click', () => {
  renderCart();
  openModal('cartModal');
});

document.getElementById('cartItems')?.addEventListener('click', event => {
  const button = event.target.closest('[data-cart-action]');
  if (!button) return;
  const item = cartItems.find(product => product.id === button.dataset.id);
  if (!item) return;

  if (button.dataset.cartAction === 'plus') item.qty += 1;
  if (button.dataset.cartAction === 'minus') item.qty = Math.max(1, item.qty - 1);
  if (button.dataset.cartAction === 'remove') cartItems = cartItems.filter(product => product.id !== item.id);
  saveCart();
  renderCart();
});

document.getElementById('browsePromptsBtn')?.addEventListener('click', () => {
  closeModal(document.getElementById('cartModal'));
  document.getElementById('prompts')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(highlightPromptSection, 450);
});

document.getElementById('checkoutBtn')?.addEventListener('click', () => {
  if (!cartItems.length) return;
  showToast('Checkout UI រួចរាល់ — អាចភ្ជាប់ ABA Pay ជំហានបន្ទាប់');
});

// Prompt filters
 document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

// Login / Sign Up tabs
function setAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(button => button.classList.toggle('active', button.dataset.authTab === tab));
  document.querySelectorAll('.auth-panel').forEach(panel => panel.classList.toggle('active', panel.dataset.authPanel === tab));
}

document.querySelectorAll('[data-auth-tab]').forEach(button => {
  button.addEventListener('click', () => setAuthTab(button.dataset.authTab));
});

document.querySelectorAll('[data-switch-auth]').forEach(button => {
  button.addEventListener('click', () => setAuthTab(button.dataset.switchAuth));
});

document.getElementById('loginForm')?.addEventListener('submit', event => {
  event.preventDefault();
  closeModal(document.getElementById('loginModal'));
  event.currentTarget.reset();
  showToast('Login demo ✓ ភ្ជាប់ backend ដើម្បីប្រើគណនីពិត');
});

document.getElementById('signupForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  if (form.get('password') !== form.get('confirmPassword')) {
    showToast('ពាក្យសម្ងាត់ទាំងពីរមិនដូចគ្នាទេ');
    return;
  }
  event.currentTarget.reset();
  setAuthTab('login');
  showToast('Sign Up demo ✓ ឥឡូវអាចបន្តទៅ Login');
});

document.getElementById('forgotPasswordBtn')?.addEventListener('click', () => {
  showToast('Forgot password UI — ភ្ជាប់ email service ពេលក្រោយ');
});

// Newsletter
 document.getElementById('newsletterForm')?.addEventListener('submit', e => {
  e.preventDefault();
  e.currentTarget.reset();
  showToast('អរគុណ! បានចុះឈ្មោះរួច ✓');
});

// Reveal animation
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Scroll spy only for actual hash links.
const sections = [...document.querySelectorAll('main section[id]')];
const sectionNavLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')].filter(a => (a.getAttribute('href') || '').length > 1);
if (sections.length && sectionNavLinks.length) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 135;
    let current = sections[0]?.id;
    sections.forEach(sec => { if (sec.offsetTop <= y) current = sec.id; });
    sectionNavLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
  }, { passive: true });
}
