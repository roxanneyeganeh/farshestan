/* =========================================================
   FARSHESTAN — PHONE MENU
   On screens 600px wide or less the desktop menu (two links
   either side of a centred logo) does not fit. On phones the
   bar keeps only a "Menu" button, the logo and Cart. "Menu"
   opens a full-screen sheet: the Persian names large, the
   English names small beside them.
   It reuses the menu's own buttons, so Shop, Account, Info
   and Cart keep their usual behaviour.
========================================================= */

(function () {
  const css = `
  @media (max-width: 600px) {
    #menuBar .menu-item { padding: 6px 8px !important; }
    #menuBar .menu-hover-logo, #menuBar .logo-bg { display: none !important; }
    #menuBar .menu-original-logo { transform: none !important; }
    /* only Menu and Cart stay in the bar */
    #menuBar #menuLeft > .menu-item { display: none !important; }
    #menuBar #menuRight > .menu-item:not(#menuCartBtn) { display: none !important; }
    #menuBar #menuLeft { left: 10px !important; }
    #menuBar #menuRight { right: 10px !important; }
    .pm-open { display: inline-flex !important; }
    .pm-sheet { display: block !important; }
  }

  .pm-open, .pm-sheet { display: none; }

  /* the Menu button: a small woven lozenge and the word */
  .pm-open {
    align-items: center; gap: 8px; padding: 6px 8px; border: 0; background: none; color: inherit; cursor: pointer;
    font: 11.5px 'Vazirmatn', sans-serif; letter-spacing: .14em; text-transform: uppercase;
  }
  .pm-open i { display: block; width: 9px; height: 9px; margin: 0 3px; border: 1.5px solid currentColor; transform: rotate(45deg); }

  /* the sheet */
  .pm-sheet {
    position: fixed; inset: 0; z-index: 100003; visibility: hidden; opacity: 0; pointer-events: none;
    transition: opacity .35s ease, visibility 0s linear .45s;
  }
  .pm-sheet.open { visibility: visible; opacity: 1; pointer-events: auto; transition: opacity .35s ease; }
  .pm-panel {
    position: absolute; inset: 0; display: flex; flex-direction: column; padding: 22px 24px 30px; overflow: auto;
    background: #f7f2eb; color: #000; transform: translateY(-8px); transition: transform .5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .pm-sheet.open .pm-panel { transform: none; }
  .pm-sheet-top { display: flex; justify-content: space-between; align-items: center; }
  .pm-sheet-top img { height: 26px; }
  .pm-sheet-x { border: 0; background: none; padding: 4px 6px; color: inherit; cursor: pointer; font: 300 30px/1 'Vazirmatn', sans-serif; }

  .pm-sheet nav { margin-top: 6vh; display: grid; }
  .pm-sheet nav button {
    display: grid; grid-template-columns: 1fr auto; align-items: end; padding: 14px 0 12px; border: 0;
    border-bottom: 1px solid rgba(0,0,0,.08); background: none; text-align: left; cursor: pointer; color: inherit;
    opacity: 0; transform: translateY(10px); transition: opacity .45s ease, transform .6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .pm-sheet.open nav button { opacity: 1; transform: none; }
  .pm-sheet.open nav button:nth-child(2) { transition-delay: .05s; }
  .pm-sheet.open nav button:nth-child(3) { transition-delay: .1s; }
  .pm-sheet.open nav button:nth-child(4) { transition-delay: .15s; }
  .pm-sheet nav b {
    display: flex; gap: 10px; align-items: baseline; padding-bottom: 12px;
    font: 500 11.5px 'Vazirmatn', sans-serif; letter-spacing: .16em; text-transform: uppercase;
  }
  .pm-sheet nav small { font: 15px 'Noto Naskh Arabic', serif; color: #A52A2A; letter-spacing: 0; }
  .pm-sheet nav span { font: 600 42px/1.2 'Noto Naskh Arabic', serif; direction: rtl; white-space: nowrap; }
  `;
  const st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  // Wait for menu.js to build the bar, then add the Menu button and the sheet
  function build() {
    const bar = document.getElementById('menuBar');
    const left = document.getElementById('menuLeft');
    if (!bar || !left) return setTimeout(build, 50);
    const items = [...bar.querySelectorAll('.menu-item')];
    const go = t => { const el = items.find(i => i.textContent.trim().startsWith(t)); if (el) el.click(); };
    const LINKS = [['Shop', 'فروشگاه'], ['Info', 'داستان ما'], ['Account', 'حساب کاربری'], ['Cart', 'سبد خرید']];
    const NUM = ['۱', '۲', '۳', '۴'];

    const open = document.createElement('button');
    open.type = 'button'; open.className = 'pm-open';
    open.setAttribute('aria-haspopup', 'dialog');
    open.innerHTML = '<i aria-hidden="true"></i>Menu';
    left.prepend(open);

    const sheet = document.createElement('div');
    sheet.className = 'pm-sheet'; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-label', 'Menu');
    sheet.innerHTML = `<div class="pm-panel">
      <div class="pm-sheet-top"><img src="assets/logo.png" alt="Farshestan"><button type="button" class="pm-sheet-x" aria-label="Close menu">&times;</button></div>
      <nav>${LINKS.map(([en, fa], k) => `<button type="button" data-go="${en}"><b>${en}<small lang="fa" aria-hidden="true">${NUM[k]}</small></b><span lang="fa">${fa}</span></button>`).join('')}</nav>
    </div>`;
    document.body.appendChild(sheet);

    const shut = () => { sheet.classList.remove('open'); document.body.style.overflow = ''; };
    open.onclick = e => { e.stopPropagation(); sheet.classList.add('open'); document.body.style.overflow = 'hidden'; };
    sheet.querySelector('.pm-sheet-x').onclick = shut;
    sheet.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { shut(); go(b.dataset.go); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') shut(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
