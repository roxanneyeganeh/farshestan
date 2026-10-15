/* =========================================================
   FARSHESTAN — SHOP BY REGION (shop page, above the footer)

   A map of the towns and tribal regions the rugs come from.
   Each dot is placed by its real latitude / longitude; tribal
   regions have a dashed ring. Choosing a place lists its rugs,
   and choosing a rug opens the usual product popup (shop.js).

   Each rug's origin comes from its name ("Tabriz Rug, ..." ->
   Tabriz). When you add a rug, add an entry to RUGS below.
========================================================= */

(function () {

  const RUGS = [
    {"id": 1, "name": "Tabriz Rug, Floral Medallion", "town": "Tabriz", "townFa": "تبریز", "kind": "town", "lat": 38.08, "lon": 46.29},
    {"id": 2, "name": "Nain Rug, Classic Pattern", "town": "Nain", "townFa": "نائین", "kind": "town", "lat": 32.86, "lon": 53.09},
    {"id": 3, "name": "Isfahan Rug, Garden Motif", "town": "Isfahan", "townFa": "اصفهان", "kind": "town", "lat": 32.65, "lon": 51.67},
    {"id": 4, "name": "Kashan Rug, Herati Design", "town": "Kashan", "townFa": "کاشان", "kind": "town", "lat": 33.98, "lon": 51.43},
    {"id": 5, "name": "Qom Rug, Silk Medallion", "town": "Qom", "townFa": "قم", "kind": "town", "lat": 34.64, "lon": 50.88},
    {"id": 6, "name": "Mashhad Rug, Geometric", "town": "Mashhad", "townFa": "مشهد", "kind": "town", "lat": 36.3, "lon": 59.6},
    {"id": 7, "name": "Kerman Rug, Rose Medallion", "town": "Kerman", "townFa": "کرمان", "kind": "town", "lat": 30.28, "lon": 57.08},
    {"id": 8, "name": "Heriz Rug, Bold Medallion", "town": "Heriz", "townFa": "هریس", "kind": "town", "lat": 38.33, "lon": 47.1},
    {"id": 9, "name": "Bidjar Rug, Dense Knot", "town": "Bidjar", "townFa": "بیجار", "kind": "town", "lat": 35.87, "lon": 47.6},
    {"id": 10, "name": "Bakhtiari Rug, Tribal Pattern", "town": "Bakhtiari", "townFa": "بختیاری", "kind": "region", "lat": 32.0, "lon": 50.0},
    {"id": 11, "name": "Sarouk Rug, Classic Floral", "town": "Sarouk", "townFa": "ساروق", "kind": "town", "lat": 34.4, "lon": 49.6},
    {"id": 12, "name": "Malayer Rug, Field Motif", "town": "Malayer", "townFa": "ملایر", "kind": "town", "lat": 34.3, "lon": 48.82},
    {"id": 13, "name": "Yazd Rug, Geometric Medallion", "town": "Yazd", "townFa": "یزد", "kind": "town", "lat": 31.9, "lon": 54.37},
    {"id": 14, "name": "Afshar Rug, Tribal Weave", "town": "Afshar", "townFa": "افشار", "kind": "region", "lat": 29.6, "lon": 56.0},
    {"id": 15, "name": "Luri Rug, Nomadic Pattern", "town": "Luri", "townFa": "لری", "kind": "region", "lat": 33.5, "lon": 48.3},
    {"id": 16, "name": "Hamadan Rug, Floral Lattice", "town": "Hamadan", "townFa": "همدان", "kind": "town", "lat": 34.8, "lon": 48.51},
    {"id": 17, "name": "Moud Rug, Sapphire Medallion", "town": "Moud", "townFa": "مود", "kind": "town", "lat": 32.72, "lon": 59.52},
    {"id": 18, "name": "Baluch Rug, Desert Motif", "town": "Baluch", "townFa": "بلوچ", "kind": "region", "lat": 28.5, "lon": 60.5},
    {"id": 19, "name": "Qashqai Rug, Tribal Design", "town": "Qashqai", "townFa": "قشقایی", "kind": "region", "lat": 29.9, "lon": 51.9},
    {"id": 20, "name": "Kurdistan Rug, Natural Palette", "town": "Kurdistan", "townFa": "کردستان", "kind": "region", "lat": 35.4, "lon": 46.9},
    {"id": 21, "name": "Ardabil Rug, Heritage Medallion", "town": "Ardabil", "townFa": "اردبیل", "kind": "town", "lat": 38.25, "lon": 48.29},
    {"id": 22, "name": "Shiraz Rug, Ember Floral", "town": "Shiraz", "townFa": "شیراز", "kind": "town", "lat": 29.59, "lon": 52.58},
    {"id": 23, "name": "Zanjan Rug, Rustic Pattern", "town": "Zanjan", "townFa": "زنجان", "kind": "town", "lat": 36.67, "lon": 48.48},
    {"id": 24, "name": "Bijar Rug, Guard Design", "town": "Bijar", "townFa": "بیجار", "kind": "town", "lat": 35.87, "lon": 47.6},
    {"id": 25, "name": "Ghom Rug, Golden Medallion", "town": "Ghom", "townFa": "قم", "kind": "town", "lat": 34.64, "lon": 50.88},
    {"id": 26, "name": "Senneh Rug, Garden Pattern", "town": "Senneh", "townFa": "سنه", "kind": "town", "lat": 35.31, "lon": 46.99},
    {"id": 27, "name": "Kalat Rug, Silk Motif", "town": "Kalat", "townFa": "کلات", "kind": "town", "lat": 36.99, "lon": 59.77},
    {"id": 28, "name": "Khoy Rug, Border Detail", "town": "Khoy", "townFa": "خوی", "kind": "town", "lat": 38.55, "lon": 44.95},
    {"id": 29, "name": "Varamin Rug, Night Design", "town": "Varamin", "townFa": "ورامین", "kind": "town", "lat": 35.32, "lon": 51.65},
    {"id": 30, "name": "Tafresh Rug, Sun Medallion", "town": "Tafresh", "townFa": "تفرش", "kind": "town", "lat": 34.69, "lon": 50.01},
    {"id": 31, "name": "Fars Rug, Nomadic Pattern", "town": "Fars", "townFa": "فارس", "kind": "region", "lat": 29.3, "lon": 53.2},
    {"id": 32, "name": "Jozan Rug, Midnight Floral", "town": "Jozan", "townFa": "جوزان", "kind": "town", "lat": 34.42, "lon": 48.95},
    {"id": 33, "name": "Kashmar Rug, Glory Design", "town": "Kashmar", "townFa": "کاشمر", "kind": "town", "lat": 35.24, "lon": 58.46},
    {"id": 34, "name": "Tuiserkan Rug, Dust Pattern", "town": "Tuiserkan", "townFa": "تویسرکان", "kind": "town", "lat": 34.55, "lon": 48.45},
    {"id": 35, "name": "Dorokhsh Rug, Petal Motif", "town": "Dorokhsh", "townFa": "درخش", "kind": "town", "lat": 32.97, "lon": 59.6},
    {"id": 36, "name": "Saveh Rug, Moonlight Medallion", "town": "Saveh", "townFa": "ساوه", "kind": "town", "lat": 35.02, "lon": 50.36},
    {"id": 37, "name": "Ferahan Rug, Gold Pattern", "town": "Ferahan", "townFa": "فراهان", "kind": "town", "lat": 34.5, "lon": 49.7},
    {"id": 38, "name": "Nahavand Rug, Storm Design", "town": "Nahavand", "townFa": "نهاوند", "kind": "town", "lat": 34.19, "lon": 48.37},
    {"id": 39, "name": "Tonekabon Rug, Cloud Motif", "town": "Tonekabon", "townFa": "تنکابن", "kind": "town", "lat": 36.82, "lon": 50.87},
    {"id": 40, "name": "Ravar Rug, Silk Detail", "town": "Ravar", "townFa": "راور", "kind": "town", "lat": 31.27, "lon": 56.81},
    {"id": 41, "name": "Sultanabad Rug, Bloom Design", "town": "Sultanabad", "townFa": "سلطان‌آباد", "kind": "town", "lat": 34.09, "lon": 49.69},
    {"id": 42, "name": "Behbahan Rug, Starlit Pattern", "town": "Behbahan", "townFa": "بهبهان", "kind": "town", "lat": 30.6, "lon": 50.24},
    {"id": 43, "name": "Khorasan Rug, Velvet Motif", "town": "Khorasan", "townFa": "خراسان", "kind": "region", "lat": 35.6, "lon": 58.9},
    {"id": 45, "name": "Maragheh Rug, Crimson Detail", "town": "Maragheh", "townFa": "مراغه", "kind": "town", "lat": 37.39, "lon": 46.24},
    {"id": 46, "name": "Neiriz Rug, Desert Motif", "town": "Neiriz", "townFa": "نی‌ریز", "kind": "town", "lat": 29.2, "lon": 54.33},
    {"id": 47, "name": "Delijan Rug, Night Bloom", "town": "Delijan", "townFa": "دلیجان", "kind": "town", "lat": 33.99, "lon": 50.68},
    {"id": 48, "name": "Langarud Rug, Fire Motif", "town": "Langarud", "townFa": "لنگرود", "kind": "town", "lat": 37.19, "lon": 50.15},
    {"id": 49, "name": "Gonbad Rug, Horizon Medallion", "town": "Gonbad", "townFa": "گنبد", "kind": "town", "lat": 37.25, "lon": 55.17}
  ];

  const MAP = { W: 1000, H: 915, lon0: 43.5, lat0: 40, sx: 50, sy: 59 };
  const xy = (lat, lon) => [(lon - MAP.lon0) * MAP.sx, (MAP.lat0 - lat) * MAP.sy];
  const ANCHORS = ['Tabriz', 'Isfahan', 'Mashhad', 'Shiraz', 'Kerman', 'Yazd', 'Hamadan', 'Kashan'];

  /* One entry per place (Qom/Ghom and Bidjar/Bijar share a place) */
  const PLACES = (() => {
    const by = new Map();
    RUGS.forEach(r => {
      if (!by.has(r.townFa)) by.set(r.townFa, { key: r.townFa, name: r.town, fa: r.townFa, kind: r.kind, lat: r.lat, lon: r.lon, rugs: [] });
      by.get(r.townFa).rugs.push(r);
    });
    return [...by.values()];
  })();
  const placeOf = rug => PLACES.find(p => p.key === rug.townFa);

  const SVGNS = 'http://www.w3.org/2000/svg';
  function s(tag, attrs = {}, ...kids) {
    const el = document.createElementNS(SVGNS, tag);
    for (const [k, v] of Object.entries(attrs)) if (v != null) el.setAttribute(k, v);
    kids.forEach(k => k && el.append(k.nodeType ? k : document.createTextNode(k)));
    return el;
  }

  /**
   * drawMap(container, { interactive, highlight: [placeKeys], onSelect, labels: 'anchors'|'highlight'|'none', theme: 'dark'|'light' })
   */
  function drawMap(container, opts = {}) {
    const { interactive = false, highlight = [], onSelect, labels = 'anchors', theme = 'dark' } = opts;
    const svg = s('svg', { viewBox: `0 0 ${MAP.W} ${MAP.H}`, class: `map map-${theme}`, role: interactive ? 'group' : 'img',
      'aria-label': interactive ? 'Map of weaving towns and tribal regions in Iran' : 'Map of where the rugs were woven' });

    // dotted ground + orientation
    const defs = s('defs', {}, s('pattern', { id: `dots-${theme}`, width: 22, height: 22, patternUnits: 'userSpaceOnUse' }, s('circle', { cx: 2, cy: 2, r: 1.3, class: 'map-grid' })));
    svg.append(defs, s('rect', { width: MAP.W, height: MAP.H, fill: `url(#dots-${theme})` }));
    const [cx, cy] = xy(38.7, 51); svg.append(s('text', { x: cx, y: cy, class: 'map-sea', 'text-anchor': 'middle' }, 'Caspian Sea'));
    const [gx, gy] = xy(26.9, 51.6); svg.append(s('text', { x: gx, y: gy, class: 'map-sea', 'text-anchor': 'middle' }, 'Persian Gulf'));

    const tip = s('g', { class: 'map-tip', 'pointer-events': 'none', opacity: 0 });
    const tipBg = s('rect', { rx: 0, height: 78 });
    const tipFa = s('text', { class: 'map-tip-fa', 'text-anchor': 'middle' });
    const tipEn = s('text', { class: 'map-tip-en', 'text-anchor': 'middle' });
    tip.append(tipBg, tipFa, tipEn);

    const nodes = new Map();
    PLACES.forEach(p => {
      const [x, y] = xy(p.lat, p.lon);
      const r = 7 + Math.min(4, p.rugs.length - 1) * 3;
      const on = highlight.includes(p.key);
      const g = s('g', { class: `place ${p.kind}${on ? ' on' : ''}${highlight.length && !on ? ' dim' : ''}`, transform: `translate(${x} ${y})` });
      if (p.kind === 'region') g.append(s('circle', { r: r + 7, class: 'ring' }));
      g.append(s('circle', { r: r + 10, class: 'pulse' }), s('circle', { r, class: 'dot' }));
      const showLabel = labels === 'anchors' ? ANCHORS.includes(p.name) : labels === 'highlight' ? on : false;
      if (showLabel) g.append(s('text', { y: -r - 9, class: 'map-label', 'text-anchor': 'middle' }, p.name));
      if (interactive) {
        g.setAttribute('tabindex', '0');
        g.setAttribute('role', 'button');
        g.setAttribute('aria-label', `${p.name}, ${p.rugs.length} ${p.rugs.length === 1 ? 'rug' : 'rugs'}${p.kind === 'region' ? ', tribal region' : ''}`);
        const show = () => {
          tipFa.textContent = p.fa; tipEn.textContent = `${p.name}  ${p.rugs.length} ${p.rugs.length === 1 ? 'rug' : 'rugs'}`;
          const w = Math.max(170, p.name.length * 13 + 110);
          tipBg.setAttribute('width', w); tipBg.setAttribute('x', -w / 2); tipBg.setAttribute('y', -r - 96);
          tipFa.setAttribute('y', -r - 62); tipEn.setAttribute('y', -r - 30);
          tip.setAttribute('transform', `translate(${Math.min(MAP.W - w / 2, Math.max(w / 2, x))} ${y})`);
          tip.setAttribute('opacity', 1);
          svg.append(tip);
        };
        const hide = () => tip.setAttribute('opacity', 0);
        g.addEventListener('pointerenter', show);
        g.addEventListener('pointerleave', hide);
        g.addEventListener('focus', show);
        g.addEventListener('blur', hide);
        g.addEventListener('click', () => onSelect && onSelect(p));
        g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect && onSelect(p); } });
      }
      nodes.set(p.key, g);
      svg.append(g);
    });

    container.replaceChildren(svg);
    return {
      select(key) {
        nodes.forEach((g, k) => {
          g.classList.toggle('on', k === key);
          g.classList.toggle('dim', key != null && k !== key);
        });
      }
    };
  }


  /* ---------- Panel ---------- */

  function el(tag, attrs = {}, ...kids) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    kids.flat().forEach(kid => kid != null && node.append(kid.nodeType ? kid : document.createTextNode(kid)));
    return node;
  }

  let mapApi;
  let selected = null;

  function select(place) {
    selected = place && selected && selected.key === place.key ? null : place;
    mapApi.select(selected ? selected.key : null);
    renderPanel();
  }

  function openRug(id) {
    // products and openModal come from shop.js
    const product = typeof products !== 'undefined' && products.find(p => p.id === id);
    if (product && typeof openModal === 'function') openModal(product);
  }

  function renderPanel() {
    const panel = document.querySelector('.region-panel');
    const p = selected;
    if (!p) {
      const towns = PLACES.filter(x => x.kind === 'town').length;
      panel.replaceChildren(
        el('p', { class: 'hint', text: 'Choose a place on the map.' }),
        el('div', { class: 'legend' },
          el('span', {}, el('i'), `${towns} towns`),
          el('span', {}, el('i', { class: 'ring' }), `${PLACES.length - towns} tribal regions`)
        )
      );
      return;
    }
    panel.replaceChildren(
      el('span', { class: 'place-fa fa', lang: 'fa', text: p.fa }),
      el('h3', { text: p.name }),
      el('p', { class: 'meta', text: `${p.kind === 'region' ? 'Tribal region' : 'Weaving town'}. ${p.rugs.length} ${p.rugs.length === 1 ? 'rug' : 'rugs'} in the collection.` }),
      el('div', { class: 'region-thumbs' }, p.rugs.map(r =>
        el('button', { type: 'button', 'aria-label': r.name, onclick: () => openRug(r.id) },
          el('img', { src: `assets/rugs/rug-${r.id}.webp`, alt: '', loading: 'lazy' }))
      )),
      el('button', { class: 'text-link', type: 'button', onclick: () => select(null) }, 'Show all places')
    );
  }

  mapApi = drawMap(document.querySelector('.map-wrap'), { interactive: true, onSelect: select });
  renderPanel();

})();
