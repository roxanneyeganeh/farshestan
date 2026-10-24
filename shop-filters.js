/* =========================================================
   FARSHESTAN — SHOP FILTERS
   A search bar (towns in English or Persian, plus phrases like
   "red under £3,000" or "cheapest first") above colour and
   price chips. Both drive the original filter controls in
   shop.html, so shop.js does the actual filtering.
========================================================= */
(function () {
  const COLOURS = [
    { v: 'red',    en: 'Red',    fa: 'قرمز',     c: '#A52A2A' },
    { v: 'blue',   en: 'Blue',   fa: 'آبی',      c: '#2c3f6b' },
    { v: 'green',  en: 'Green',  fa: 'سبز',      c: '#4f6b45' },
    { v: 'yellow', en: 'Yellow', fa: 'زرد',      c: '#c99a3a' },
    { v: 'gray',   en: 'Grey',   fa: 'خاکستری',  c: '#8a857e' }
  ];
  const PRESETS = [
    { id: 'any', label: 'Any price', min: 0, max: 9000 },
    { id: 'u3', label: 'Under £3,000', min: 0, max: 2900 },
    { id: '35', label: '£3,000 – £5,000', min: 3000, max: 5000 },
    { id: '57', label: '£5,000 – £7,000', min: 5100, max: 7000 },
    { id: 'o7', label: 'Over £7,000', min: 7100, max: 9000 }
  ];
  const MIN = 0, MAX = 9000, STEP = 100;
  const gbp = n => '£' + Number(n).toLocaleString('en-GB');
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  const minR = $('#minRange'), maxR = $('#maxRange');
  const getPrice = () => [parseInt(minR.value, 10), parseInt(maxR.value, 10)];
  const getColours = () => [...document.querySelectorAll('.color-option.selected')].map(o => o.dataset.value).filter(v => v !== 'all');
  const counts = () => { const m = {}; (typeof products !== 'undefined' ? products : []).forEach(p => { m[p.dominantColor] = (m[p.dominantColor] || 0) + 1; }); return m; };
  const allProducts = () => (typeof products !== 'undefined' ? products : []);
  const shown = () => [...$('#image-grid').querySelectorAll('.image-item')].filter(c => !c.hidden).length;

  function toggleColour(v) { const o = $(`.color-option[data-value="${v}"]`); o && o.click(); }
  function clearColours() { $('.color-option[data-value="all"]').click(); }
  function setPrice(a, b) {
    minR.value = Math.max(MIN, Math.min(a, b)); maxR.value = Math.min(MAX, Math.max(a, b));
    minR.dispatchEvent(new Event('input'));
  }
  function presetOf([a, b]) { return (PRESETS.find(p => p.min === a && p.max === b) || {}).id; }
  function priceText([a, b], any = 'Any price') {
    if (a === MIN && b === MAX) return any;
    const p = PRESETS.find(x => x.min === a && x.max === b);
    if (p) return p.label;
    if (a === MIN) return (b + 100) % 500 === 0 ? `Under ${gbp(b + 100)}` : `Up to ${gbp(b)}`;
    if (b === MAX) return (a - 100) % 500 === 0 ? `Over ${gbp(a - 100)}` : `From ${gbp(a)}`;
    return `${gbp(a)} – ${gbp(b)}`;
  }

  const host = el('div', 'shop-filters');
  $('#filter-controls').before(host);
  const views = [];

  /* ---------------------------------------------------------
     1. Swatch chips: everything visible, no dropdowns
  --------------------------------------------------------- */
  (function chips() {
    const v = el('div', 'fx filter-chips');
    v.innerHTML = `
      <div class="chips-row"><span class="chips-label">Colour</span><div class="chips-colours" role="group" aria-label="Colour"></div></div>
      <div class="chips-row"><span class="chips-label">Price</span><div class="chips-prices" role="group" aria-label="Price"></div></div>
      <div class="chips-foot"><span class="chips-count"></span><button type="button" class="chips-clear">Clear all</button></div>`;
    const cBox = $('.chips-colours', v), pBox = $('.chips-prices', v);
    v.querySelector('.chips-clear').onclick = () => { clearColours(); setPrice(MIN, MAX); };
    host.append(v);
    views.push(() => {
      const cnt = counts(), sel = getColours();
      cBox.innerHTML = '';
      const all = el('button', 'chips-chip' + (sel.length ? '' : ' on'), 'All');
      all.type = 'button'; all.setAttribute('aria-pressed', !sel.length); all.onclick = clearColours; cBox.append(all);
      COLOURS.filter(c => cnt[c.v]).forEach(c => {
        const b = el('button', 'chips-chip' + (sel.includes(c.v) ? ' on' : ''), `<i style="background:${c.c}"></i>${c.en}<small>${cnt[c.v]}</small>`);
        b.type = 'button'; b.setAttribute('aria-pressed', sel.includes(c.v)); b.onclick = () => toggleColour(c.v); cBox.append(b);
      });
      const cur = presetOf(getPrice());
      pBox.innerHTML = '';
      PRESETS.forEach(p => {
        const b = el('button', 'chips-chip' + (cur === p.id ? ' on' : ''), p.label);
        b.type = 'button'; b.setAttribute('aria-pressed', cur === p.id); b.onclick = () => setPrice(p.min, p.max); pBox.append(b);
      });
      $('.chips-count', v).textContent = `${shown()} of ${allProducts().length} rugs`;
      $('.chips-clear', v).hidden = !sel.length && cur === 'any';
    });
  })();

  /* =========================================================
     Shared for Chips+ and Search+: faceted counts, sorting,
     text search (English or Persian town names)
  ========================================================= */
  const TOWNS = {"1": ["Tabriz", "تبریز"], "2": ["Nain", "نائین"], "3": ["Isfahan", "اصفهان"], "4": ["Kashan", "کاشان"], "5": ["Qom", "قم"], "6": ["Mashhad", "مشهد"], "7": ["Kerman", "کرمان"], "8": ["Heriz", "هریس"], "9": ["Bidjar", "بیجار"], "10": ["Bakhtiari", "بختیاری"], "11": ["Sarouk", "ساروق"], "12": ["Malayer", "ملایر"], "13": ["Yazd", "یزد"], "14": ["Afshar", "افشار"], "15": ["Luri", "لری"], "16": ["Hamadan", "همدان"], "17": ["Moud", "مود"], "18": ["Baluch", "بلوچ"], "19": ["Qashqai", "قشقایی"], "20": ["Kurdistan", "کردستان"], "21": ["Ardabil", "اردبیل"], "22": ["Shiraz", "شیراز"], "23": ["Zanjan", "زنجان"], "24": ["Bijar", "بیجار"], "25": ["Ghom", "قم"], "26": ["Senneh", "سنه"], "27": ["Kalat", "کلات"], "28": ["Khoy", "خوی"], "29": ["Varamin", "ورامین"], "30": ["Tafresh", "تفرش"], "31": ["Fars", "فارس"], "32": ["Jozan", "جوزان"], "33": ["Kashmar", "کاشمر"], "34": ["Tuiserkan", "تویسرکان"], "35": ["Dorokhsh", "درخش"], "36": ["Saveh", "ساوه"], "37": ["Ferahan", "فراهان"], "38": ["Nahavand", "نهاوند"], "39": ["Tonekabon", "تنکابن"], "40": ["Ravar", "راور"], "41": ["Sultanabad", "سلطان‌آباد"], "42": ["Behbahan", "بهبهان"], "43": ["Khorasan", "خراسان"], "45": ["Maragheh", "مراغه"], "46": ["Neiriz", "نی‌ریز"], "47": ["Delijan", "دلیجان"], "48": ["Langarud", "لنگرود"], "49": ["Gonbad", "گنبد"]};
  let sortMode = 'featured';
  let words = [];               // town names or other words typed into the search
  const idOf = src => { const m = String(src).match(/rug-(\d+)\./); return m ? +m[1] : 0; };
  const norm = s => s.toLowerCase().normalize('NFKD').replace(/[\u064B-\u065F\u200C]/g, '');
  function nameMatches(p, ws = words) {
    if (!ws.length) return true;
    const t = TOWNS[p.id] || ['', ''];
    const parts = norm(p.name + ' ' + t[1]).split(/[\s,]+/);
    return ws.every(w => parts.some(x => x.startsWith(norm(w))));
  }
  const inPrice = (p, [a, b]) => p.price >= a && p.price <= b;
  function facet() {
    const sel = getColours(), pr = getPrice(), all = allProducts();
    const colourN = v => all.filter(p => p.dominantColor === v && inPrice(p, pr) && nameMatches(p)).length;
    const priceN = ps => all.filter(p => (!sel.length || sel.includes(p.dominantColor)) && inPrice(p, [ps.min, ps.max]) && nameMatches(p)).length;
    return { colourN, priceN };
  }
  function applyGridExtras() {
    const plus = true;
    const byId = new Map(allProducts().map(p => [p.id, p]));
    const cards = [...$('#image-grid').querySelectorAll('.image-item')];
    cards.forEach((card, i) => {
      const p = byId.get(idOf((card.querySelector('img') || {}).src));
      if (true && p) card.hidden = !nameMatches(p);
      if (!plus || sortMode === 'featured' || !p) { card.style.order = ''; return; }
      card.style.order = sortMode === 'low' ? p.price : 100000 - p.price;
    });
    // empty state for Search+ when the text hides every card
    let empty = $('#image-grid .filter-empty');
    const none = true && cards.length && cards.every(c => c.hidden);
    if (none && !empty) { empty = el('div', 'filter-empty grid-message', '<h2>No rugs match</h2><p>Try removing a filter above.</p>'); $('#image-grid').append(empty); }
    if (!none && empty) empty.remove();
  }
  const SORTS = [{ id: 'featured', label: 'Featured' }, { id: 'low', label: 'Price, low to high' }, { id: 'high', label: 'Price, high to low' }];

  /* ---------------------------------------------------------
     11. Search+: a command bar
  --------------------------------------------------------- */
  (function searchPlus() {
    const v = el('div', 'fx filter-search');
    v.innerHTML = `
      <div class="search-box">
        <span class="sr-icon" aria-hidden="true"></span>
        <div class="search-field">
          <span class="search-tokens"></span>
          <input type="text" class="search-in" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="false" aria-controls="search-list" aria-label="Search rugs by colour, price or town, in English or Persian">
          <span class="search-ph" aria-hidden="true"></span>
        </div>
        <span class="search-count" aria-live="polite"></span>
        <kbd class="search-kbd" title="Press / to search">/</kbd>
      </div>
      <div class="search-panel" id="search-list" role="listbox" aria-label="Suggestions"></div>`;
    host.append(v);
    const input = $('.search-in', v), panel = $('.search-panel', v), ph = $('.search-ph', v);
    let towns = [];       // chosen town tokens
    let active = -1, items = [];

    // rotating, typed-out placeholder
    const IDEAS = ['red rugs under £3,000', 'Tabriz', 'blue between £4k and £6k', 'کاشان', 'grey, cheapest first', 'Heriz over £5,000'];
    let ii = 0, ci = 0, del = false;
    (function type() {
      const t = IDEAS[ii];
      ci += del ? -1 : 1;
      ph.textContent = 'Try “' + t.slice(0, ci) + '”';
      let wait = del ? 28 : 65;
      if (!del && ci === t.length) { del = true; wait = 1600; }
      else if (del && ci === 0) { del = false; ii = (ii + 1) % IDEAS.length; wait = 350; }
      setTimeout(type, wait);
    })();

    const COLOUR_WORDS = { red: 'red', blue: 'blue', navy: 'blue', yellow: 'yellow', gold: 'yellow', grey: 'gray', gray: 'gray', green: 'green', 'قرمز': 'red', 'آبی': 'blue', 'زرد': 'yellow', 'خاکستری': 'gray', 'سبز': 'green' };
    const STOP = new Set(['rug', 'rugs', 'show', 'me', 'and', 'the', 'a', 'in', 'with', 'persian', 'carpet', 'carpets', 'or', 'from', 'to', 'between', 'under', 'over', 'below', 'above', 'less', 'more', 'than', 'at', 'any', 'price', 'first', 'فرش']);
    const num = s => { const m = String(s).replace(/[£,\s]/g, '').match(/^(\d+(?:\.\d+)?)(k?)$/i); return m ? Math.round(parseFloat(m[1]) * (m[2] ? 1000 : 1)) : null; };
    const down = n => Math.max(MIN, Math.ceil(n / 100) * 100 - 100), up = n => Math.min(MAX, Math.floor(n / 100) * 100 + 100);
    function parse(text) {
      const w = text.toLowerCase().replace(/[–—]/g, '-').replace(/,/g, ' ').split(/\s+/).filter(Boolean);
      const out = { colours: [], price: null, sort: null, text: [] };
      for (let i = 0; i < w.length; i++) {
        const x = w[i];
        if (COLOUR_WORDS[x]) { out.colours.push(COLOUR_WORDS[x]); continue; }
        if (['cheapest', 'cheap', 'lowest'].includes(x)) { out.sort = 'low'; continue; }
        if (['expensive', 'priciest', 'highest', 'luxury'].includes(x)) { out.sort = 'high'; continue; }
        if (x === 'most' && w[i + 1] === 'expensive') { out.sort = 'high'; i++; continue; }
        if (['under', 'below', 'less'].includes(x)) { let j = i + 1; if (w[j] === 'than') j++; const n = num(w[j]); if (n != null) { out.price = [MIN, down(n)]; i = j; continue; } }
        if (['over', 'above', 'more'].includes(x)) { let j = i + 1; if (w[j] === 'than') j++; const n = num(w[j]); if (n != null) { out.price = [up(n), MAX]; i = j; continue; } }
        const r = x.match(/^(£?[\d.]+k?)-(£?[\d.]+k?)$/i);
        if (r && num(r[1]) != null && num(r[2]) != null) { out.price = [num(r[1]), num(r[2])]; continue; }
        if (num(x) != null && ['to', 'and', '-'].includes(w[i + 1]) && num(w[i + 2]) != null) { out.price = [num(x), num(w[i + 2])]; i += 2; continue; }
        if (!STOP.has(x) && num(x) == null) out.text.push(x);
      }
      return out;
    }
    function commit(text) {
      const q = parse(text);
      q.colours.filter(c => counts()[c] && !getColours().includes(c)).forEach(toggleColour);
      if (q.sort) sortMode = q.sort;
      // free words that name a town become town tokens; anything else stays as text
      q.text.forEach(t => { const hit = Object.values(TOWNS).find(([en, fa]) => norm(en).startsWith(norm(t)) || norm(fa).startsWith(norm(t))); towns.push(hit ? hit[0] : t); });
      input.value = '';
      sync();
      if (q.price) setPrice(q.price[0], q.price[1]); else refresh();
    }
    function sync() { words = [...towns, ...parse(input.value).text]; }
    sharedParse = parse;

    const open = o => { panel.classList.toggle('open', o); input.setAttribute('aria-expanded', String(o)); };
    input.onfocus = () => { open(true); refresh(); };
    input.oninput = () => { sync(); active = -1; refresh(); ph.hidden = !!input.value || towns.length > 0; };
    document.addEventListener('click', e => { if (!v.contains(e.target)) open(false); });
    input.onkeydown = e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); open(true); active = (active + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; mark(); }
      else if (e.key === 'Enter') { e.preventDefault(); if (active >= 0 && items[active]) items[active].click(); else if (input.value.trim()) commit(input.value); }
      else if (e.key === 'Escape') { open(false); input.blur(); }
      else if (e.key === 'Backspace' && !input.value) { const t = $('.search-tokens', v).lastElementChild; if (t) t.click(); }
    };
    document.addEventListener('keydown', e => {
      if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); }
    });
    function mark() { items.forEach((b, i) => b.classList.toggle('act', i === active)); if (items[active]) { input.setAttribute('aria-activedescendant', items[active].id); items[active].scrollIntoView({ block: 'nearest' }); } }

    views.push(() => {
      const sel = getColours(), pr = getPrice(), cur = presetOf(pr), { colourN, priceN } = facet();
      // tokens inside the box
      const tk = $('.search-tokens', v); tk.innerHTML = '';
      const tok = (html, remove, label) => { const b = el('button', 'search-tok', html + '<span aria-hidden="true">×</span>'); b.type = 'button'; b.setAttribute('aria-label', 'Remove ' + label); b.onclick = e => { e.stopPropagation(); remove(); input.focus(); }; tk.append(b); };
      COLOURS.filter(c => sel.includes(c.v)).forEach(c => tok(`<i style="background:${c.c}"></i>${c.en}`, () => toggleColour(c.v), c.en));
      if (!(pr[0] === MIN && pr[1] === MAX)) tok(priceText(pr), () => setPrice(MIN, MAX), 'price');
      towns.forEach((t, i) => tok(t, () => { towns.splice(i, 1); sync(); refresh(); }, t));
      if (sortMode !== 'featured') tok(sortMode === 'low' ? 'Cheapest first' : 'Most expensive first', () => { sortMode = 'featured'; refresh(); }, 'sorting');
      ph.hidden = !!input.value || tk.children.length > 0;
      input.placeholder = tk.children.length ? 'Add more…' : '';

      // suggestions
      const frag = input.value.trim(), q = parse(frag), last = (frag.split(/\s+/).pop() || '');
      const all = allProducts();
      let html = '';
      const groups = [];
      // 1. what Enter would do
      if (frag) groups.push(['', [{ label: `Search for “${frag}”`, sub: 'Enter', act: () => commit(frag), cls: 'go' }]]);
      // 2. colours
      const cs = COLOURS.filter(c => counts()[c.v] && !sel.includes(c.v) && (!last || c.en.toLowerCase().startsWith(last.toLowerCase()) || c.fa.startsWith(last)));
      if (cs.length) groups.push(['Colour', cs.map(c => ({ label: `<i style="background:${c.c}"></i>${c.en} <span class="fa" lang="fa">${c.fa}</span>`, sub: colourN(c.v), zero: !colourN(c.v), act: () => { toggleColour(c.v); input.value = frag.split(/\s+/).slice(0, -1).join(' '); sync(); } }))]);
      // 3. towns (English or Persian), with a thumbnail and count
      const tl = new Map();
      all.forEach(p => { const t = TOWNS[p.id]; if (!t) return; if (!tl.has(t[0])) tl.set(t[0], { en: t[0], fa: t[1], ids: [] }); tl.get(t[0]).ids.push(p.id); });
      let tw = [...tl.values()].filter(t => !towns.includes(t.en));
      tw = last ? tw.filter(t => norm(t.en).startsWith(norm(last)) || norm(t.fa).startsWith(norm(last))) : tw.filter(t => ['Tabriz', 'Kashan', 'Isfahan', 'Heriz', 'Nain', 'Qom'].includes(t.en));
      // count only the rugs from that town that also fit the colour and price already chosen
      const townN = t => all.filter(p => t.ids.includes(p.id) && (!sel.length || sel.includes(p.dominantColor)) && inPrice(p, pr) && nameMatches(p, towns)).length;
      if (tw.length) groups.push([last ? 'Towns' : 'Popular towns', tw.slice(0, 6).map(t => ({ label: `<img src="assets/rugs/rug-${t.ids[0]}.webp" alt="">${t.en} <span class="fa" lang="fa">${t.fa}</span>`, sub: townN(t), zero: !townN(t), act: () => { towns.push(t.en); input.value = frag.split(/\s+/).slice(0, -1).join(' '); sync(); } }))]);
      // 4. price
      if (!frag || /\d|under|over|£|cheap|price/i.test(frag)) groups.push(['Price', PRESETS.slice(1).filter(p => p.id !== cur).map(p => ({ label: p.label, sub: priceN(p), zero: !priceN(p), act: () => setPrice(p.min, p.max) }))]);
      // 5. sort
      if (!frag) groups.push(['Sort', SORTS.filter(s => s.id !== sortMode).map(s => ({ label: s.label, act: () => { sortMode = s.id; } }))]);

      panel.innerHTML = '';
      items = [];
      groups.forEach(([title, list]) => {
        const g = el('div', 'search-group');
        if (title) g.append(el('p', 'search-gh', title));
        const row = el('div', 'search-items');
        list.forEach(it => {
          const b = el('button', 'search-item' + (it.cls ? ' ' + it.cls : '') + (it.zero ? ' zero' : ''), `<span class="search-l">${it.label}</span>${it.sub !== undefined ? `<small>${it.sub}</small>` : ''}`);
          b.type = 'button'; b.setAttribute('role', 'option'); b.id = 'search-o' + items.length; b.disabled = !!it.zero;
          b.onclick = e => { e.stopPropagation(); it.act(); active = -1; refresh(); input.focus(); };
          row.append(b); if (!it.zero) items.push(b);
        });
        g.append(row); panel.append(g);
      });
      mark();
      const n = shown();
      $('.search-count', v).textContent = `${n} ${n === 1 ? 'rug' : 'rugs'}`;
    });
  })();

  function refresh() { applyGridExtras(); views.forEach(f => f()); }
  new MutationObserver(refresh).observe($('#image-grid'), { childList: true });
  refresh();
})();
