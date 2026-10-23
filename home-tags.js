/* =========================================================
   FARSHESTAN — TAGS ON THE RUGS IN THE 3D SHOP
   home3d.js works out where each wall rug is on screen
   (window.__rugTags). This file draws the tags.

   Styles (class on <body>):
   tags-1  Pins        a small pin on each rug; tap for its card
   tags-2  Label       a gallery label for the rug you face
   tags-3  Look        a centre dot; hold your gaze on a rug to reveal it
   tags-4  Price tag   a paper tag tied to each rug, price in Persian numerals
========================================================= */

(function () {
  const SHOP = '/shop';
  const gbp = n => '£' + Number(n).toLocaleString('en-GB');
  const faDigits = s => String(s).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]).replace(/,/g, '٬');
  const mode = () => (document.body.className.match(/\btags-(\d)\b/) || [, '1'])[1];

  const layer = document.createElement('div');
  layer.className = 'rug-tags';
  layer.setAttribute('aria-live', 'polite');
  document.body.appendChild(layer);

  let rugs = [];          // product info, in wall order
  const pins = [];        // per-rug element for modes 1 and 4
  let open = -1;          // rug whose card is open
  let gazeIdx = -1, gazeStart = 0;

  /* ---------- the card, shared by every style ---------- */
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
    if (open < 0 && !pins.some(p => p.classList.contains('flipped'))) return;
    open = -1;
    card.classList.remove('open');
    if (document.body.classList.contains('rug-open')) document.body.classList.remove('rug-open');
    pins.forEach(p => p.classList.remove('flipped'));
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  /* ---------- per-rug elements ---------- */
  function build() {
    rugs.forEach((r, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'rug-pin';
      b.setAttribute('aria-label', `${r.name}, ${gbp(r.price)}`);
      b.innerHTML = `
        <span class="pin-dot" aria-hidden="true"></span>
        <span class="pin-peek"><b>${r.name.split(',')[0]}</b> ${gbp(r.price)}</span>
        <span class="ptag" aria-hidden="true">
          <span class="ptag-string"></span>
          <span class="ptag-paper">
            <span class="ptag-front"><span class="fa" lang="fa">${faDigits(r.price.toLocaleString('en-GB'))}</span><small>${gbp(r.price)}</small></span>
            <span class="ptag-back"><span class="fa" lang="fa">${r.townFa}</span><small>View →</small></span>
          </span>
        </span>`;
      b.onclick = e => {
        e.stopPropagation();
        if (mode() === '4') {
          // first tap flips the tag, second tap opens the card
          if (b.classList.contains('flipped')) show(i);
          else { pins.forEach(p => p.classList.remove('flipped')); b.classList.add('flipped'); }
        } else show(i);
      };
      layer.appendChild(b);
      pins.push(b);
    });
  }

  /* label (style 2) and gaze ring (style 3) */
  const label = document.createElement('a');
  label.className = 'rug-label';
  label.innerHTML = `<span class="lb-fa fa" lang="fa"></span><span class="lb-town"></span><span class="lb-name"></span><span class="lb-price"></span><span class="lb-go">View this rug →</span>`;
  layer.appendChild(label);

  const reticle = document.createElement('div');
  reticle.className = 'rug-reticle';
  reticle.innerHTML = `<svg viewBox="0 0 44 44" aria-hidden="true"><circle class="rt-track" cx="22" cy="22" r="18"/><circle class="rt-fill" cx="22" cy="22" r="18" pathLength="100"/></svg><span class="rt-hint">Hold your gaze on a rug</span>`;
  layer.appendChild(reticle);

  window.addEventListener('rugs:ready', e => { rugs = e.detail; build(); });
  window.addEventListener('rug:select', e => {
    const i = e.detail;
    if (mode() === '4' && pins[i] && !pins[i].classList.contains('flipped')) { pins.forEach(p => p.classList.remove('flipped')); pins[i].classList.add('flipped'); return; }
    show(i);
  });

  /* ---------- every frame ---------- */
  const GAZE_MS = 1100;
  function tick() {
    requestAnimationFrame(tick);
    const t = window.__rugTags;
    const m = mode();
    layer.dataset.mode = m;
    if (!t || !rugs.length) return;

    // pins (1) and price tags (4) sit on the rugs themselves
    t.rugs.forEach((r, i) => {
      const p = pins[i];
      if (!p) return;
      const on = (m === '1' || m === '4') && r.visible && r.dist < 7.5;
      p.classList.toggle('on', on);
      if (!on) return;
      const at = m === '4' ? r.tag : r.pin;
      const s = Math.max(0.6, Math.min(1.15, 2.6 / r.dist));
      p.style.transform = `translate(${at.x}px, ${at.y}px) scale(${s.toFixed(3)})`;
      p.style.zIndex = String(1000 - Math.round(r.dist * 10));
    });

    // the card follows its rug in styles 1 and 4; it docks in 2 and 3
    if (open >= 0) {
      const r = t.rugs[open];
      if ((m === '1' || m === '4') && r) {
        if (!r.visible) { close(); }
        else {
          const at = m === '4' ? r.tag : r.pin;
          const x = Math.min(window.innerWidth - 300, Math.max(16, at.x + 24));
          const y = Math.min(window.innerHeight - 380, Math.max(90, at.y - 60));
          card.style.transform = `translate(${x}px, ${y}px)`;
        }
      } else card.style.transform = '';
    }

    // style 2: a gallery label for the rug most in front of you
    if (m === '2') {
      const best = t.rugs.filter(r => r.visible && r.dist < 5 && r.centred < 0.28).sort((a, b) => a.centred - b.centred)[0];
      label.classList.toggle('on', !!best && open < 0);
      if (best && label.dataset.i !== String(best.index)) {
        const info = rugs[best.index];
        label.dataset.i = best.index;
        label.href = `${SHOP}?rug=${info.id}`;
        label.querySelector('.lb-fa').textContent = info.townFa;
        label.querySelector('.lb-town').textContent = info.name.split(',')[0];
        label.querySelector('.lb-name').textContent = (info.name.split(/,\s*/)[1] || '') + ' · ' + info.material.split(' –')[0];
        label.querySelector('.lb-price').textContent = gbp(info.price);
        label.classList.remove('swap'); void label.offsetWidth; label.classList.add('swap');
      }
    } else label.classList.remove('on');

    // style 3: hold the centre dot on a rug to reveal it
    if (m === '3') {
      const look = t.lookedAt;
      if (look !== gazeIdx) { gazeIdx = look; gazeStart = performance.now(); }
      const p = gazeIdx >= 0 ? Math.min(1, (performance.now() - gazeStart) / GAZE_MS) : 0;
      reticle.style.setProperty('--p', (p * 100).toFixed(1));
      reticle.classList.toggle('aiming', gazeIdx >= 0);
      if (p >= 1 && open !== gazeIdx) show(gazeIdx);
      if (gazeIdx < 0 && open >= 0 && performance.now() - gazeStart > 600) close();
    }
    reticle.classList.toggle('on', m === '3');
  }
  requestAnimationFrame(tick);

  // switching style closes anything open
  new MutationObserver(() => {
    if (layer.dataset.mode === mode()) return;
    layer.dataset.mode = mode();
    close();
  }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
})();
