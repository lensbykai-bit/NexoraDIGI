const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');
const themeToggle = document.getElementById('themeToggle');
const cartCount = document.getElementById('cartCount');
const toast = document.getElementById('toast');
let cart = Number(localStorage.getItem('pinkaCart') || 0);
let selectedProduct = null;

cartCount.textContent = cart;

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
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.open));
});

document.querySelectorAll('.coming-soon-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const title = link.dataset.soonTitle || 'Coming soon';
    const titleEl = document.getElementById('comingSoonTitle');
    const textEl = document.getElementById('comingSoonText');
    if (titleEl) titleEl.textContent = `${title} (Coming soon)`;
    if (textEl) textEl.textContent = `${title} កំពុងតែរៀបចំ និងមិនទាន់បើកដំណើរការនៅឡើយទេ។ បើចង់ ខ្ញុំអាចបង្កើតទំព័រពិតៗ ឬភ្ជាប់ payment page ជំហានបន្ទាប់បាន។`;
    openModal('comingSoonModal');
  });
});

document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', () => closeModal(el.closest('.modal')));
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(closeModal);
});

document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    selectedProduct = { name: card.dataset.title, price: Number(card.dataset.price) };
    document.getElementById('modalProductName').textContent = selectedProduct.name;
    document.getElementById('modalProductPrice').textContent = `$${selectedProduct.price}`;
    openModal('productModal');
  });
});

document.querySelectorAll('.buy-btn-inline').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedProduct = { name: btn.dataset.product || 'Bundle', price: Number(btn.dataset.price || 0) };
    document.getElementById('modalProductName').textContent = selectedProduct.name;
    document.getElementById('modalProductPrice').textContent = `$${selectedProduct.price}`;
    openModal('productModal');
  });
});

document.getElementById('addToCartBtn')?.addEventListener('click', () => {
  if (!selectedProduct) return;
  cart += 1;
  localStorage.setItem('pinkaCart', String(cart));
  cartCount.textContent = cart;
  closeModal(document.getElementById('productModal'));
  showToast(`${selectedProduct.name} បានបន្ថែមទៅកន្ត្រក ✓`);
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__pinkaToast);
  window.__pinkaToast = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.getElementById('cartBtn')?.addEventListener('click', () => {
  showToast(cart ? `ក្នុងកន្ត្រកមាន ${cart} ផលិតផល` : 'កន្ត្រកនៅទទេ');
});

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

document.getElementById('newsletterForm')?.addEventListener('submit', e => {
  e.preventDefault();
  e.currentTarget.reset();
  showToast('អរគុណ! បានចុះឈ្មោះរួច ✓');
});

document.getElementById('loginForm')?.addEventListener('submit', e => {
  e.preventDefault();
  closeModal(document.getElementById('loginModal'));
  showToast('Login UI demo — connect backend later');
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];
const sectionNavLinks = navLinks.filter(a => {
  const href = a.getAttribute('href') || '';
  return href.startsWith('#') && href.length > 1;
});

if (sections.length && sectionNavLinks.length) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 130;
    let current = sections[0]?.id;
    sections.forEach(sec => { if (sec.offsetTop <= y) current = sec.id; });
    sectionNavLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
  }, { passive: true });
}

