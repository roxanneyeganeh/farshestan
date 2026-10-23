/* =========================================================
   FARSHESTAN — PINS ON THE RUGS IN THE 3D SHOP
   home3d.js works out where each wall rug is on screen
   (window.__rugTags). This file draws a pin on each rug.
   Hover a pin to see the rug's name and price; tap it (or
   the rug itself) to open a card that links to the product.
========================================================= */

(function () {
  const SHOP = '/shop';
  const gbp = n => '£' + Number(n).toLocaleString('en-GB');
  const faDigits = s => String(s).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]).replace(/,/g, '٬');

  const layer = document.createElement('div');
  layer.className = 'rug-tags';
  layer.setAttribute('aria-live', 'polite');
  document.body.appendChild(layer);

  let rugs = [];          // product info, in wall order
  const pins = [];
  let open = -1;          // rug whose card is open

  /* ---------- the card ---------- */
  const card = document.createElement('div');
  card.className = 'rug-card';
  card.setAttribute('role', 'dialog');
  card.innerHTML = `
    <button type="button" class="rug-card-x" aria-label="Close">&times;</button>
    <img class="rug-card-img" alt="">
    <div class="rug-card-body">
      <p class="rug-card-fa fa" lang="fa"></p>
      <p class="rug-card-town"></p>
      <p class="rug-card-name"></p>
      <p class="rug-card-meta"></p>
      <p class="rug-card-price"></p>
      <a class="rug-card-link">View this rug <span aria-hidden="true">→</span></a>
    </div>`;
  layer.appendChild(card);
  card.querySelector('.rug-card-x').onclick = e => { e.stopPropagation(); close(); };

  function fill(i) {
    const r = rugs[i];
    const [town, design] = r.name.split(/,\s*/);
    card.querySelector('.rug-card-img').src = `assets/rugs/rug-${r.id}.webp`;
    card.querySelector('.rug-card-img').alt = r.name;
    card.querySelector('.rug-card-fa').textContent = r.townFa;
    card.querySelector('.rug-card-town').textContent = town;
    card.querySelector('.rug-card-name').textContent = design || '';
    card.querySelector('.rug-card-meta').textContent = r.material;
    card.querySelector('.rug-card-price').innerHTML = `${gbp(r.price)} <span class="fa" lang="fa">${faDigits(r.price.toLocaleString('en-GB'))} £</span>`;
    card.querySelector('.rug-card-link').href = `${SHOP}?rug=${r.id}`;
  }
  function show(i) {
    if (i == null || i < 0 || !rugs[i]) return;
    if (open !== i) fill(i);
    open = i;
    card.classList.add('open');
    if (!document.body.classList.contains('rug-open')) document.body.classList.add('rug-open');
  }
  function close() {
    if (open < 0) return;
    open = -1;
    card.classList.remove('open');
    if (document.body.classList.contains('rug-open')) document.body.classList.remove('rug-open');
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  /* ---------- one pin per rug ---------- */
  window.addEventListener('rugs:ready', e => {
    rugs = e.detail;
    rugs.forEach((r, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'rug-pin';
      b.setAttribute('aria-label', `${r.name}, ${gbp(r.price)}`);
      b.innerHTML = `
        <span class="pin-dot" aria-hidden="true"></span>
        <span class="pin-peek"><b>${r.name.split(',')[0]}</b> ${gbp(r.price)}</span>`;
      b.onclick = e => { e.stopPropagation(); show(i); };
      layer.appendChild(b);
      pins.push(b);
    });
  });
  // clicking the rug itself in the 3D view
  window.addEventListener('rug:select', e => show(e.detail));

  /* ---------- every frame: keep pins and the card on their rugs ---------- */
  function tick() {
    requestAnimationFrame(tick);
    const t = window.__rugTags;
    if (!t || !rugs.length) return;
    t.rugs.forEach((r, i) => {
      const p = pins[i];
      if (!p) return;
      const on = r.visible && r.dist < 7.5;
      p.classList.toggle('on', on);
      if (!on) return;
      const s = Math.max(0.6, Math.min(1.15, 2.6 / r.dist));
      p.style.transform = `translate(${r.pin.x}px, ${r.pin.y}px) scale(${s.toFixed(3)})`;
      p.style.zIndex = String(1000 - Math.round(r.dist * 10));
    });
    if (open >= 0) {
      const r = t.rugs[open];
      if (!r || !r.visible) { close(); return; }
      const x = Math.min(window.innerWidth - 300, Math.max(16, r.pin.x + 24));
      const y = Math.min(window.innerHeight - 380, Math.max(90, r.pin.y - 60));
      card.style.transform = `translate(${x}px, ${y}px)`;
    }
  }
  requestAnimationFrame(tick);
})();
