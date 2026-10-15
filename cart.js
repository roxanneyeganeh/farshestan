/* =========================================================
   CART
   Slide-in drawer styled to match other-page.html
   (cream ground, Naskh headings, hairline rules, black CTA).
   Public API: addToCart(item), openCart(), closeCart(), toggleCart()
========================================================= */

const cartKey = 'myCart';

let cart = [];
try {
  cart = JSON.parse(localStorage.getItem(cartKey)) || [];
} catch (e) {
  cart = [];
}

function saveCart() {
  try {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  } catch (e) { /* storage unavailable — cart lives for this page only */ }

  // Lets the cart page and checkout re-render whenever the cart changes.
  window.dispatchEvent(new CustomEvent('cart:updated'));
}

/* Helpers used by cart.html and checkout.html */
window.getCart = () => cart.map(i => ({ ...i }));

window.updateCartQuantity = (id, quantity) => {
  const index = cart.findIndex(i => i.id === id);
  if (index === -1) return;
  if (quantity <= 0) cart.splice(index, 1);
  else cart[index].quantity = quantity;
  saveCart();
  updateCartUI();
};

window.removeFromCart = id => window.updateCartQuantity(id, 0);

window.clearCart = () => {
  cart.length = 0;
  saveCart();
  updateCartUI();
};

const cartGBP = n =>
  '£' + Number(n).toLocaleString('en-GB', { maximumFractionDigits: 0 });

const cartCount = () => cart.reduce((sum, i) => sum + i.quantity, 0);


/* =========================================================
   STYLES (injected so the cart looks right on every page)
========================================================= */

function injectCartStyles() {
  if (document.getElementById('cart-styles')) return;

  if (!document.querySelector('link[href*="Noto+Naskh+Arabic"]')) {
    const font = document.createElement('link');
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;600&display=swap';
    document.head.appendChild(font);
  }

  const style = document.createElement('style');
  style.id = 'cart-styles';
  style.textContent = `
    @font-face {
      font-family: 'Vazirmatn';
      src: url('assets/Vazirmatn.ttf') format('truetype');
      font-display: swap;
    }

    html.cart-open { overflow: hidden; }

    #cartOverlay {
      position: fixed; inset: 0;
      background: rgba(20, 14, 8, 0.35);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
      opacity: 0; visibility: hidden;
      transition: opacity .4s ease, visibility .4s ease;
      z-index: 100000;
    }
    #cartOverlay.open { opacity: 1; visibility: visible; }

    #cartSidebar {
      position: fixed; top: 0; right: 0;
      width: min(420px, 100vw); height: 100%;
      display: flex; flex-direction: column;
      background: #f7f2eb; color: #000;
      border-left: 1px solid #000;
      font-family: 'Vazirmatn', sans-serif; line-height: 1.3;
      box-sizing: border-box;
      transform: translateX(100%);
      visibility: hidden;
      transition: transform .5s cubic-bezier(0.22, 1, 0.36, 1), visibility .5s;
      z-index: 100001;
    }
    #cartSidebar.open {
      transform: none; visibility: visible;
      box-shadow: -20px 0 60px rgba(0, 0, 0, .08);
    }
    #cartSidebar *, #cartSidebar *::before, #cartSidebar *::after { box-sizing: border-box; }
    #cartSidebar button { font-family: inherit; color: inherit; }

    .cart-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 1.5rem 1.75rem 1.1rem;
      border-bottom: 1px solid #000;
    }
    .cart-title {
      margin: 0;
      font-family: 'Noto Naskh Arabic', serif; font-weight: normal;
      font-size: 1.9rem; line-height: 1.2;
    }
    .cart-title .cart-count {
      font-family: 'Vazirmatn', sans-serif;
      font-size: .9rem; color: #555; margin-left: .5rem;
    }
    .cart-close {
      background: none; border: 0; padding: 1px 8px;
      font-size: 1.7rem; font-weight: 200; line-height: 1; cursor: pointer;
    }

    .cart-items { flex: 1; overflow-y: auto; padding: 0 1.75rem; }

    .cart-item {
      display: grid; grid-template-columns: 84px 1fr; gap: 1rem;
      padding: 1.25rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, .12);
      animation: cartItemIn .45s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    @keyframes cartItemIn { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: none; } }

    .cart-item-img {
      width: 84px; height: 105px; padding: 6px;
      object-fit: contain; background: #fff; border-radius: 12px; display: block;
    }
    .cart-item-info { display: flex; flex-direction: column; min-width: 0; }
    .cart-item-name { margin: 0 0 .25rem; font-size: .95rem; }
    .cart-item-unit { font-size: .85rem; color: #555; }
    .cart-item-row {
      display: flex; align-items: center; justify-content: space-between;
      margin-top: auto; padding-top: .75rem;
    }
    .cart-qty { display: inline-flex; align-items: center; border: 1px solid #000; }
    .cart-qty button {
      width: 30px; height: 30px; border: 0; background: none;
      font-size: 1rem; cursor: pointer; transition: background-color .25s, color .25s;
    }
    .cart-qty button:hover { background: #000; color: #f7f2eb; }
    .cart-qty span { min-width: 28px; text-align: center; font-size: .9rem; }
    .cart-line-total { font-size: .95rem; }
    .cart-remove {
      align-self: flex-start; margin-top: .5rem; padding: 0;
      background: none; border: 0; font-size: .8rem; color: #555;
      text-decoration: underline; cursor: pointer;
    }
    .cart-remove:hover { color: #000; }

    .cart-empty {
      height: 100%; display: flex; flex-direction: column;
      align-items: center; justify-content: center; text-align: center;
      padding: 2rem 0;
    }
    .cart-empty h3 {
      margin: 0 0 .5rem;
      font-family: 'Noto Naskh Arabic', serif; font-weight: normal; font-size: 1.6rem;
    }
    .cart-empty p { margin: 0 0 1.5rem; color: #555; font-size: 1rem; max-width: 26ch; }

    .cart-footer { padding: 1.25rem 1.75rem 1.75rem; border-top: 1px solid #000; }
    .cart-subtotal { display: flex; justify-content: space-between; font-size: 1.05rem; margin-bottom: .3rem; }
    .cart-note { margin: 0 0 1.1rem; font-size: .8rem; color: #888; }

    .cart-cta {
      display: block; width: 100%; padding: 1rem;
      background: #000; color: #f7f2eb !important; border: 0;
      font-size: 1rem; text-align: center; text-decoration: none;
      cursor: pointer; transition: background-color .3s ease;
    }
    .cart-cta:hover { background: #444; }
    .cart-empty .cart-cta { width: auto; padding: .8rem 1.75rem; }

    @media (prefers-reduced-motion: reduce) {
      #cartSidebar, #cartOverlay, .cart-item { transition: none; animation: none; }
    }
  `;
  document.head.appendChild(style);
}


/* =========================================================
   ELEMENTS
========================================================= */

function ensureCartElements() {
  injectCartStyles();

  let sidebar = document.getElementById('cartSidebar');
  if (!sidebar) {
    sidebar = document.createElement('aside');
    sidebar.id = 'cartSidebar';
    document.body.appendChild(sidebar);
  }
  // Drop any inline styles left by older code (e.g. menu.js fallback).
  sidebar.removeAttribute('style');
  sidebar.setAttribute('role', 'dialog');
  sidebar.setAttribute('aria-label', 'Shopping cart');
  if (!sidebar.classList.contains('open')) sidebar.setAttribute('aria-hidden', 'true');

  let overlay = document.getElementById('cartOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'cartOverlay';
    overlay.addEventListener('click', closeCart);
    document.body.appendChild(overlay);
  }

  return sidebar;
}


/* =========================================================
   RENDER
========================================================= */

function updateCartUI() {
  const sidebar = document.getElementById('cartSidebar');
  if (!sidebar) return;

  const count = cartCount();
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  sidebar.innerHTML = `
    <header class="cart-header">
      <h2 class="cart-title">Your Cart${count ? `<span class="cart-count">(${count})</span>` : ''}</h2>
      <button class="cart-close" type="button" aria-label="Close cart">&times;</button>
    </header>
    <div class="cart-items"></div>
  `;

  sidebar.querySelector('.cart-close').addEventListener('click', closeCart);

  const list = sidebar.querySelector('.cart-items');

  if (cart.length === 0) {
    list.innerHTML = `
      <div class="cart-empty">
        <h3>Your cart is empty</h3>
        <p>Every rug tells a story. Find the one that belongs in your home.</p>
        <a class="cart-cta" href="/shop">Explore the collection</a>
      </div>
    `;
  } else {
    cart.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'cart-item';

      const img = document.createElement('img');
      img.className = 'cart-item-img';
      img.src = item.imgPath || '';
      img.alt = item.name;

      const info = document.createElement('div');
      info.className = 'cart-item-info';

      const name = document.createElement('p');
      name.className = 'cart-item-name';
      name.textContent = item.name;

      const unit = document.createElement('span');
      unit.className = 'cart-item-unit';
      unit.textContent = cartGBP(item.price);

      const remove = document.createElement('button');
      remove.className = 'cart-remove';
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
      });

      const qtyRow = document.createElement('div');
      qtyRow.className = 'cart-item-row';

      const qty = document.createElement('div');
      qty.className = 'cart-qty';

      const minus = document.createElement('button');
      minus.type = 'button';
      minus.textContent = '−';
      minus.setAttribute('aria-label', 'Decrease quantity');
      minus.addEventListener('click', () => {
        item.quantity--;
        if (item.quantity <= 0) cart.splice(index, 1);
        saveCart();
        updateCartUI();
      });

      const qtyValue = document.createElement('span');
      qtyValue.textContent = item.quantity;

      const plus = document.createElement('button');
      plus.type = 'button';
      plus.textContent = '+';
      plus.setAttribute('aria-label', 'Increase quantity');
      plus.addEventListener('click', () => {
        item.quantity++;
        saveCart();
        updateCartUI();
      });

      qty.append(minus, qtyValue, plus);

      const lineTotal = document.createElement('span');
      lineTotal.className = 'cart-line-total';
      lineTotal.textContent = cartGBP(item.price * item.quantity);

      qtyRow.append(qty, lineTotal);
      info.append(name, unit, remove, qtyRow);
      row.append(img, info);
      list.appendChild(row);
    });

    const footer = document.createElement('footer');
    footer.className = 'cart-footer';
    footer.innerHTML = `
      <div class="cart-subtotal"><span>Subtotal</span><span>${cartGBP(subtotal)}</span></div>
      <p class="cart-note">Shipping and taxes calculated at checkout.</p>
      <button class="cart-cta" type="button">Checkout</button>
    `;
    footer.querySelector('.cart-cta').addEventListener('click', () => {
      window.location.href = '/checkout';
    });
    sidebar.appendChild(footer);
  }

  refreshCartBadge();
}

/* Keeps the "Cart" label in the menu in sync, e.g. "Cart (2)" */
function refreshCartBadge() {
  const btn = document.getElementById('menuCartBtn');
  if (!btn) return;
  const count = cartCount();
  btn.textContent = count ? `Cart (${count})` : 'Cart';
}
window.refreshCartBadge = refreshCartBadge;


/* =========================================================
   OPEN / CLOSE
========================================================= */

function openCart() {
  const sidebar = ensureCartElements();
  updateCartUI();
  sidebar.classList.add('open');
  sidebar.setAttribute('aria-hidden', 'false');
  document.getElementById('cartOverlay').classList.add('open');
  document.documentElement.classList.add('cart-open');
}

function closeCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (sidebar) {
    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true');
  }
  if (overlay) overlay.classList.remove('open');
  document.documentElement.classList.remove('cart-open');
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  if (sidebar && sidebar.classList.contains('open')) closeCart();
  else openCart();
}

window.openCart = openCart;
window.closeCart = closeCart;
window.toggleCart = toggleCart;


/* =========================================================
   ADD
========================================================= */

window.addToCart = function (item) {
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart();
  openCart();
};


/* =========================================================
   INIT
========================================================= */

window.addEventListener('DOMContentLoaded', () => {
  ensureCartElements();
  updateCartUI();

  const cartButton = document.getElementById('cartButton');
  if (cartButton) cartButton.addEventListener('click', toggleCart);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCart();
});
