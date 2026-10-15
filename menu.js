/* =========================================================
   MENU
========================================================= */

function createMenuBar() {

  const oldMenu = document.getElementById('menuBar');

  if (oldMenu) {
    oldMenu.remove();
  }


  /* =========================================================
     PAGE
  ========================================================= */

  const path = window.location.pathname;

  const isHomePage =
    path === '/' ||
    path.endsWith('/index.html');


  /* =========================================================
     MAIN MENU BAR
  ========================================================= */

  const menuBar = document.createElement('div');

  menuBar.id = 'menuBar';

  menuBar.style.position = 'fixed';
  menuBar.style.top = '0';
  menuBar.style.left = '0';
  menuBar.style.width = '100%';
  menuBar.style.height = '90px';

  menuBar.style.boxSizing = 'border-box';

  menuBar.style.zIndex = '99999';

  menuBar.style.color =
    isHomePage ? '#fefbea' : '#000000';

  menuBar.style.backgroundColor =
    'transparent';

  menuBar.style.transform =
    'translateX(0)';

  menuBar.style.transition =
    'top 0.55s cubic-bezier(0.22, 1, 0.36, 1), ' +
    'left 0.55s cubic-bezier(0.22, 1, 0.36, 1), ' +
    'width 0.55s cubic-bezier(0.22, 1, 0.36, 1), ' +
    'height 0.55s cubic-bezier(0.22, 1, 0.36, 1), ' +
    'border-radius 0.55s cubic-bezier(0.22, 1, 0.36, 1), ' +
    'background-color 0.3s ease, ' +
    'box-shadow 0.55s ease, ' +
    'backdrop-filter 0.55s ease';

  menuBar.style.border =
    'none';


  /* =========================================================
     HOMEPAGE HOVER BACKGROUND
  ========================================================= */

  let hoverBackground = null;

  if (isHomePage) {

    hoverBackground =
      document.createElement('div');

    hoverBackground.style.position =
      'absolute';

    hoverBackground.style.top = '0';
    hoverBackground.style.left = '0';

    hoverBackground.style.width = '100%';
    hoverBackground.style.height = '100%';

    hoverBackground.style.backgroundColor =
      'rgba(255, 255, 255, 0)';

    hoverBackground.style.transition =
      'background-color 0.3s ease';

    hoverBackground.style.zIndex = '0';

    hoverBackground.style.pointerEvents =
      'none';

    menuBar.appendChild(
      hoverBackground
    );
  }


  /* =========================================================
     MENU CONTENT
  ========================================================= */

  const menuContent =
    document.createElement('div');

  menuContent.id =
    'menuContent';

  menuContent.style.position =
    'relative';

  menuContent.style.width =
    '100%';

  menuContent.style.height =
    '100%';

  menuContent.style.display =
    'flex';

  menuContent.style.alignItems =
    'center';

  menuContent.style.justifyContent =
    'center';

  menuContent.style.zIndex =
    '2';

  menuContent.style.boxSizing =
    'border-box';


  /* =========================================================
     LEFT CONTAINER
  ========================================================= */

  const leftContainer =
    document.createElement('div');

  leftContainer.id =
    'menuLeft';

  leftContainer.style.position =
    'absolute';

  leftContainer.style.left =
    '30px';

  leftContainer.style.top =
    '50%';

  leftContainer.style.transform =
    'translateY(-50%)';

  leftContainer.style.display =
    'flex';

  leftContainer.style.alignItems =
    'center';

  leftContainer.style.gap =
    '40px';

  leftContainer.style.transition =
    'left 0.55s cubic-bezier(0.22, 1, 0.36, 1), ' +
    'gap 0.55s cubic-bezier(0.22, 1, 0.36, 1)';


  /* =========================================================
     SHOP
  ========================================================= */

  const shopBtn =
    document.createElement('span');

  shopBtn.className =
    'menu-item';

  shopBtn.textContent =
    'Shop';

  styleMenuItem(shopBtn);

  shopBtn.addEventListener(
    'click',
    () => {
      window.location.href =
        '/shop';
    }
  );


  /* =========================================================
     ACCOUNT
  ========================================================= */

  const accountBtn =
    document.createElement('span');

  accountBtn.className =
    'menu-item';

  accountBtn.textContent =
    'Account';

  styleMenuItem(accountBtn);

  accountBtn.addEventListener(
    'click',
    () => {
      window.location.href =
        '/account';
    }
  );


  leftContainer.appendChild(
    shopBtn
  );

  leftContainer.appendChild(
    accountBtn
  );


  /* =========================================================
     CENTER CONTAINER
  ========================================================= */

  const centerContainer =
    document.createElement('div');

  centerContainer.id =
    'menuCenter';

  centerContainer.style.position =
    'absolute';

  centerContainer.style.left =
    '50%';

  centerContainer.style.top =
    '50%';

  centerContainer.style.transform =
    'translate(-50%, -50%)';

  centerContainer.style.display =
    'flex';

  centerContainer.style.alignItems =
    'center';

  centerContainer.style.justifyContent =
    'center';

  centerContainer.style.height =
    '100%';

  centerContainer.style.width =
    'auto';

  centerContainer.style.pointerEvents =
    'auto';

  centerContainer.style.zIndex =
    '10';


  /* =========================================================
     LOGO LINK
  ========================================================= */

  const logoLink =
    document.createElement('a');

  logoLink.href =
    '/';

  logoLink.style.display =
    'flex';

  logoLink.style.alignItems =
    'center';

  logoLink.style.justifyContent =
    'center';

  logoLink.style.position =
    'relative';

  logoLink.style.textDecoration =
    'none';

  logoLink.style.padding =
    '4px 12px';

  logoLink.style.height =
    '30px';

  logoLink.style.overflow =
    'hidden';

  logoLink.style.zIndex =
    '10';


  /* =========================================================
     HOMEPAGE LOGO
  ========================================================= */

  if (isHomePage) {

    const logoImg =
      document.createElement('img');

    logoImg.className =
      'menu-logo';

    logoImg.src =
      'assets/wordmark3.png';

    logoImg.alt =
      'Farshestan Wordmark';

    logoImg.style.height =
      '25px';

    logoImg.style.width =
      'auto';

    logoImg.style.display =
      'block';

    logoImg.style.position =
      'relative';

    logoImg.style.zIndex =
      '2';

    logoImg.style.transition =
      'none';

    logoLink.appendChild(
      logoImg
    );

  }


  /* =========================================================
     OTHER PAGE LOGO
  ========================================================= */

  else {

    const logoBg =
      document.createElement('div');

    logoBg.className =
      'logo-bg';

    logoBg.style.position =
      'absolute';

    logoBg.style.top =
      '0';

    logoBg.style.left =
      '40%';

    logoBg.style.transform =
      'translateX(-50%)';

    logoBg.style.height =
      '100%';

    logoBg.style.width =
      '60px';

    logoBg.style.borderRadius =
      '8px';

    logoBg.style.zIndex =
      '0';

    logoBg.style.pointerEvents =
      'none';

    logoBg.style.transition =
      'width 0.3s ease, left 0.3s ease';


    const originalLogo =
      document.createElement('img');

    originalLogo.className =
      'menu-original-logo';

    originalLogo.src =
      'assets/logo.png';

    originalLogo.alt =
      'Farshestan Logo';

    originalLogo.style.height =
      '25px';

    originalLogo.style.width =
      'auto';

    originalLogo.style.display =
      'block';

    originalLogo.style.position =
      'relative';

    originalLogo.style.zIndex =
      '2';

    originalLogo.style.transform =
      'translateX(50px)';

    originalLogo.style.transition =
      'transform 0.3s ease';


    const newLogo =
      document.createElement('img');

    newLogo.className =
      'menu-hover-logo';

    newLogo.src =
      'assets/wordmark.png';

    newLogo.alt =
      'Hover Logo';

    newLogo.style.height =
      '20px';

    newLogo.style.width =
      'auto';

    newLogo.style.opacity =
      '0';

    newLogo.style.marginLeft =
      '4px';

    newLogo.style.position =
      'relative';

    newLogo.style.zIndex =
      '2';

    newLogo.style.transition =
      'opacity 0.3s ease';


    logoLink.appendChild(
      logoBg
    );

    logoLink.appendChild(
      originalLogo
    );

    logoLink.appendChild(
      newLogo
    );


    /* =======================================================
       LOGO HOVER — ONLY AT TOP
    ======================================================= */

    logoLink.addEventListener(
      'mouseenter',
      () => {

        if (
          menuBar.classList.contains(
            'scrolled'
          )
        ) {
          return;
        }

        originalLogo.style.transform =
          'translateX(-1px)';

        newLogo.style.opacity =
          '1';

        logoBg.style.width =
          '200px';

        logoBg.style.left =
          '50%';
      }
    );


    logoLink.addEventListener(
      'mouseleave',
      () => {

        if (
          menuBar.classList.contains(
            'scrolled'
          )
        ) {
          return;
        }

        originalLogo.style.transform =
          'translateX(50px)';

        newLogo.style.opacity =
          '0';

        logoBg.style.width =
          '55px';

        logoBg.style.left =
          '40%';
      }
    );
  }


  centerContainer.appendChild(
    logoLink
  );


  /* =========================================================
     RIGHT CONTAINER
  ========================================================= */

  const rightContainer =
    document.createElement('div');

  rightContainer.id =
    'menuRight';

  rightContainer.style.position =
    'absolute';

  rightContainer.style.right =
    '30px';

  rightContainer.style.top =
    '50%';

  rightContainer.style.transform =
    'translateY(-50%)';

  rightContainer.style.display =
    'flex';

  rightContainer.style.alignItems =
    'center';

  rightContainer.style.gap =
    '40px';

  rightContainer.style.transition =
    'right 0.55s cubic-bezier(0.22, 1, 0.36, 1), ' +
    'gap 0.55s cubic-bezier(0.22, 1, 0.36, 1)';


  /* =========================================================
     INFO
  ========================================================= */

  const infoBtn =
    document.createElement('span');

  infoBtn.className =
    'menu-item';

  infoBtn.textContent =
    'Info';

  styleMenuItem(infoBtn);

  infoBtn.addEventListener(
    'click',
    () => {

      const panel =
        document.getElementById(
          'slidePanel'
        );

      const iframe =
        document.getElementById(
          'panelContent'
        );

      if (iframe && panel) {

        iframe.src =
          'other-page.html';

        panel.style.bottom =
          '0';

      } else {

        console.warn(
          'Slide panel not found.'
        );
      }
    }
  );


  /* =========================================================
     CART
  ========================================================= */

  const cartBtn =
    document.createElement('span');

  cartBtn.className =
    'menu-item';

  cartBtn.textContent =
    'Cart';

  cartBtn.id =
    'menuCartBtn';

  styleMenuItem(cartBtn);

  cartBtn.addEventListener(
    'click',
    () => {

      /* New cart drawer (cart.js) */
      if (typeof window.toggleCart === 'function') {
        window.toggleCart();
        return;
      }

      const cartSidebar =
        document.getElementById(
          'cartSidebar'
        );

      if (cartSidebar) {

        cartSidebar.style.right =
          (
            cartSidebar.style.right ===
            '0px'
          )
            ? '-300px'
            : '0';

      } else {

        console.warn(
          'Cart sidebar not found!'
        );
      }
    }
  );


  rightContainer.appendChild(
    infoBtn
  );

  rightContainer.appendChild(
    cartBtn
  );


  /* =========================================================
     BUILD MENU
  ========================================================= */

  menuContent.appendChild(
    leftContainer
  );

  menuContent.appendChild(
    centerContainer
  );

  menuContent.appendChild(
    rightContainer
  );

  menuBar.appendChild(
    menuContent
  );

  document.body.appendChild(
    menuBar
  );

  /* Show item count next to "Cart" */
  if (typeof window.refreshCartBadge === 'function') {
    window.refreshCartBadge();
  }


  /* =========================================================
     OTHER COMPONENTS
  ========================================================= */

  createCartSidebar();

  createInfoModal();


  /* =========================================================
     RESIZE
  ========================================================= */

  handleMenuResize();

  window.addEventListener(
    'resize',
    handleMenuResize
  );


  /* =========================================================
     SCROLL
  ========================================================= */

  setupScrollMenu();


  /* =========================================================
     HOMEPAGE HOVER
  ========================================================= */

  if (isHomePage) {

    menuBar.addEventListener(
      'mouseenter',
      () => {

        if (
          menuBar.classList.contains(
            'scrolled'
          )
        ) {
          return;
        }

        if (hoverBackground) {

          hoverBackground.style.backgroundColor =
            'rgba(255, 255, 255, 1)';
        }


        const items =
          menuBar.querySelectorAll(
            '.menu-item'
          );

        items.forEach(item => {

          item.style.color =
            '#000000';
        });


        const logo =
          menuBar.querySelector(
            '.menu-logo'
          );

        if (logo) {

          logo.src =
            'assets/wordmark.png';
        }
      }
    );


    menuBar.addEventListener(
      'mouseleave',
      () => {

        if (
          menuBar.classList.contains(
            'scrolled'
          )
        ) {
          return;
        }

        if (hoverBackground) {

          hoverBackground.style.backgroundColor =
            'rgba(255, 255, 255, 0)';
        }


        const items =
          menuBar.querySelectorAll(
            '.menu-item'
          );

        items.forEach(item => {

          item.style.color =
            '#ffffff';
        });


        const logo =
          menuBar.querySelector(
            '.menu-logo'
          );

        if (logo) {

          logo.src =
            'assets/wordmark3.png';
        }
      }
    );
  }
}


/* =========================================================
   MENU ITEM STYLE
========================================================= */

function styleMenuItem(elem) {

  const path =
    window.location.pathname;

  const isHomePage =
    path === '/' ||
    path.endsWith('/index.html');


  /*
    SAME SIZE IN BOTH STATES.
  */

  elem.style.fontSize =
    '13px';

  elem.style.fontWeight =
    '400';

  elem.style.lineHeight =
    '1';

  elem.style.pointerEvents =
    'auto';

  elem.style.cursor =
    'pointer';

  elem.style.whiteSpace =
    'nowrap';

  elem.style.fontFamily =
    'Vazirmatn, sans-serif';

  elem.style.padding =
    '6px 16px';

  elem.style.borderRadius =
    '8px';

  elem.style.transition =
    'color 0.3s ease';


  elem.style.color =
    isHomePage
      ? '#ffffff'
      : '#000000';
}


/* =========================================================
   SCROLL SETUP
========================================================= */

function setupScrollMenu() {

  const menuBar =
    document.getElementById(
      'menuBar'
    );

  if (!menuBar) {
    return;
  }


  /*
    Small scroll amount.
  */

  const scrollThreshold =
    45;


  let ticking = false;


  function updateMenu() {

    const shouldScroll =
      window.scrollY > scrollThreshold;


    if (shouldScroll) {

      if (
        !menuBar.classList.contains(
          'scrolled'
        )
      ) {

        menuBar.classList.add(
          'scrolled'
        );

        showScrolledMenu(
          menuBar
        );
      }

    } else {

      if (
        menuBar.classList.contains(
          'scrolled'
        )
      ) {

        menuBar.classList.remove(
          'scrolled'
        );

        showNormalMenu(
          menuBar
        );
      }
    }


    ticking = false;
  }


  window.addEventListener(
    'scroll',
    () => {

      if (!ticking) {

        window.requestAnimationFrame(
          updateMenu
        );

        ticking = true;
      }
    },
    {
      passive: true
    }
  );


  /*
    Start exactly at the original menu.
  */

  showNormalMenu(
    menuBar
  );

  updateMenu();
}


/* =========================================================
   NORMAL MENU
   DO NOT CHANGE THE ORIGINAL DESIGN
========================================================= */

function showNormalMenu(menuBar) {

  const left =
    document.getElementById(
      'menuLeft'
    );

  const right =
    document.getElementById(
      'menuRight'
    );

  const center =
    document.getElementById(
      'menuCenter'
    );

  const items =
    menuBar.querySelectorAll(
      '.menu-item'
    );


  /* ---------------------------------------------------------
     ORIGINAL MAIN MENU VALUES
  --------------------------------------------------------- */

  menuBar.style.top =
    '0';

  menuBar.style.left =
    '0';

  menuBar.style.width =
    '100%';

  menuBar.style.maxWidth =
    'none';

  menuBar.style.height =
    '90px';

  menuBar.style.transform =
    'translateX(0)';

  menuBar.style.borderRadius =
    '0';

  menuBar.style.backgroundColor =
    'transparent';

  menuBar.style.boxShadow =
    'none';

  menuBar.style.backdropFilter =
    'none';

  menuBar.style.webkitBackdropFilter =
    'none';

  menuBar.style.border =
    'none';


  /* ---------------------------------------------------------
     ORIGINAL LEFT
  --------------------------------------------------------- */

  if (left) {

    left.style.left =
      '30px';

    left.style.gap =
      '40px';
  }


  /* ---------------------------------------------------------
     ORIGINAL RIGHT
  --------------------------------------------------------- */

  if (right) {

    right.style.right =
      '30px';

    right.style.gap =
      '40px';
  }


  /* ---------------------------------------------------------
     CENTER
  --------------------------------------------------------- */

  if (center) {

    center.style.left =
      '50%';

    center.style.transform =
      'translate(-50%, -50%)';
  }


  /* ---------------------------------------------------------
     ORIGINAL TEXT SIZE
  --------------------------------------------------------- */

  items.forEach(item => {

    item.style.fontSize =
      '13px';

    item.style.padding =
      '6px 16px';


    const isHomePage =
      window.location.pathname === '/' ||
      window.location.pathname.endsWith(
        '/index.html'
      );


    item.style.color =
      isHomePage
        ? '#ffffff'
        : '#000000';
  });


  /* ---------------------------------------------------------
     ORIGINAL HOMEPAGE LOGO
  --------------------------------------------------------- */

  const logo =
    menuBar.querySelector(
      '.menu-logo'
    );

  if (logo) {

    logo.style.height =
      '25px';

    if (
      window.location.pathname === '/' ||
      window.location.pathname.endsWith(
        '/index.html'
      )
    ) {

      /*
        Only restore the white logo if
        we're actually on the homepage.
      */

      if (
        logo.src.includes(
          'wordmark.png'
        )
      ) {

        logo.src =
          'assets/wordmark3.png';
      }
    }
  }


  /* ---------------------------------------------------------
     ORIGINAL OTHER-PAGE LOGO
  --------------------------------------------------------- */

  const originalLogo =
    menuBar.querySelector(
      '.menu-original-logo'
    );

  if (originalLogo) {

    originalLogo.style.height =
      '25px';

    originalLogo.style.transform =
      'translateX(50px)';
  }


  const logoBg =
    menuBar.querySelector(
      '.logo-bg'
    );

  if (logoBg) {

    logoBg.style.width =
      '55px';

    logoBg.style.left =
      '40%';
  }


  const hoverLogo =
    menuBar.querySelector(
      '.menu-hover-logo'
    );

  if (hoverLogo) {

    hoverLogo.style.opacity =
      '0';
  }


  menuBar.style.visibility =
    'visible';

  menuBar.style.opacity =
    '1';

  menuBar.style.pointerEvents =
    'auto';
}


/* =========================================================
   SCROLLED GLASS PILL
========================================================= */

function showScrolledMenu(menuBar) {

  const left =
    document.getElementById(
      'menuLeft'
    );

  const right =
    document.getElementById(
      'menuRight'
    );

  const center =
    document.getElementById(
      'menuCenter'
    );

  const items =
    menuBar.querySelectorAll(
      '.menu-item'
    );


  /* =========================================================
     SMALL GLASS PILL
  ========================================================= */

  menuBar.style.top =
    '10px';

  menuBar.style.left =
    '50%';

  menuBar.style.width =
    '560px';

  menuBar.style.maxWidth =
    'calc(100% - 24px)';

  menuBar.style.height =
    '58px';

  menuBar.style.transform =
    'translateX(-50%)';

  menuBar.style.borderRadius =
    '20px';


  /* =========================================================
     GLASS EFFECT

     Semi-transparent white.
     Background remains visible through it.
  ========================================================= */

  menuBar.style.backgroundColor =
    'rgba(255, 255, 255, 0.3)';

  menuBar.style.backdropFilter =
    'blur(18px) saturate(140%)';

  menuBar.style.webkitBackdropFilter =
    'blur(18px) saturate(140%)';


  menuBar.style.boxShadow =
    '0 4px 20px rgba(0, 0, 0, 0.08)';


  menuBar.style.border =
    '1px solid rgba(255, 255, 255, 0.48)';


  /* =========================================================
     LEFT
  ========================================================= */

  if (left) {

    left.style.left =
      '12px';

    left.style.gap =
      '0';
  }


  /* =========================================================
     RIGHT
  ========================================================= */

  if (right) {

    right.style.right =
      '12px';

    right.style.gap =
      '0';
  }


  /* =========================================================
     LOGO

     ALWAYS MATHEMATICALLY CENTERED.
  ========================================================= */

  if (center) {

    center.style.left =
      '50%';

    center.style.top =
      '50%';

    center.style.transform =
      'translate(-50%, -50%)';
  }


  /* =========================================================
     TEXT

     SAME 13PX SIZE.
  ========================================================= */

  items.forEach(item => {

    item.style.fontSize =
      '13px';

    item.style.padding =
      '6px 16px';

    item.style.color =
      '#000000';
  });


  /* =========================================================
     HOMEPAGE LOGO

     No hover effect while scrolled.
  ========================================================= */

  const logo =
    menuBar.querySelector(
      '.menu-logo'
    );

  if (logo) {

    logo.style.height =
      '25px';

    if (
      logo.src.includes(
        'wordmark3.png'
      )
    ) {

      logo.src =
        'assets/wordmark.png';
    }
  }


  /* =========================================================
     OTHER PAGE LOGO

     Remove the original hover translation.
  ========================================================= */

  const originalLogo =
    menuBar.querySelector(
      '.menu-original-logo'
    );

  if (originalLogo) {

    originalLogo.style.height =
      '25px';

    originalLogo.style.transform =
      'translateX(0)';
  }


  const logoBg =
    menuBar.querySelector(
      '.logo-bg'
    );

  if (logoBg) {

    logoBg.style.width =
      '45px';

    logoBg.style.left =
      '50%';
  }


  const hoverLogo =
    menuBar.querySelector(
      '.menu-hover-logo'
    );

  if (hoverLogo) {

    hoverLogo.style.opacity =
      '0';
  }


  menuBar.style.visibility =
    'visible';

  menuBar.style.opacity =
    '1';

  menuBar.style.pointerEvents =
    'auto';
}


/* =========================================================
   CART SIDEBAR
========================================================= */

function createCartSidebar() {

  if (
    document.getElementById(
      'cartSidebar'
    )
  ) {
    return;
  }


  const style =
    document.createElement('style');

  style.textContent = `
    @font-face {
      font-family: 'Vazirmatn';
      src: url('assets/Vazirmatn.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
  `;

  document.head.appendChild(
    style
  );


  const sidebar =
    document.createElement('div');

  sidebar.id =
    'cartSidebar';

  sidebar.style.position =
    'fixed';

  sidebar.style.top =
    '0';

  sidebar.style.right =
    '-300px';

  sidebar.style.width =
    '300px';

  sidebar.style.height =
    '100%';

  sidebar.style.backgroundColor =
    '#ffffff';

  sidebar.style.transition =
    'right 0.3s ease';

  sidebar.style.padding =
    '20px';

  sidebar.style.boxSizing =
    'border-box';

  sidebar.style.borderLeft =
    '1px solid black';

  sidebar.style.zIndex =
    '1000';

  sidebar.style.overflowY =
    'auto';

  sidebar.style.fontFamily =
    "'Vazirmatn', sans-serif";


  sidebar.innerHTML = `
    <div style="height:40px;"></div>

    <h2 style="
      font-size:13px;
      margin-bottom:10px;
    ">
      Your Cart
    </h2>

    <ul
      id="cartItems"
      style="
        font-size:14px;
        line-height:1.5;
        padding-left:20px;
      "
    ></ul>
  `;


  document.body.appendChild(
    sidebar
  );
}


/* =========================================================
   INFO MODAL
========================================================= */

function createInfoModal() {

  if (
    document.getElementById(
      'infoModal'
    )
  ) {
    return;
  }


  const modal =
    document.createElement('div');

  modal.id =
    'infoModal';

  modal.style.position =
    'fixed';

  modal.style.top =
    '0';

  modal.style.left =
    '0';

  modal.style.width =
    '100vw';

  modal.style.height =
    '100vh';

  modal.style.backgroundColor =
    'rgba(0, 0, 0, 0.4)';

  modal.style.display =
    'none';

  modal.style.alignItems =
    'center';

  modal.style.justifyContent =
    'center';

  modal.style.zIndex =
    '10000';

  modal.style.fontFamily =
    "'Vazirmatn', sans-serif";


  const modalContent =
    document.createElement('div');

  modalContent.style.backgroundColor =
    '#ffffff';

  modalContent.style.padding =
    '30px';

  modalContent.style.width =
    '420px';

  modalContent.style.boxSizing =
    'border-box';

  modalContent.style.fontSize =
    '14px';

  modalContent.style.lineHeight =
    '1.6';

  modalContent.style.position =
    'relative';


  /* =======================================================
     CLOSE BUTTON
  ======================================================= */

  const closeBtn =
    document.createElement('div');

  closeBtn.textContent =
    '×';

  closeBtn.style.position =
    'absolute';

  closeBtn.style.top =
    '10px';

  closeBtn.style.right =
    '16px';

  closeBtn.style.fontSize =
    '22px';

  closeBtn.style.lineHeight =
    '1';

  closeBtn.style.fontWeight =
    'normal';

  closeBtn.style.cursor =
    'pointer';

  closeBtn.style.color =
    '#000';

  closeBtn.style.userSelect =
    'none';

  closeBtn.style.fontFamily =
    "'Vazirmatn', sans-serif";


  closeBtn.addEventListener(
    'click',
    () => {

      modal.style.display =
        'none';
    }
  );


  /* =======================================================
     TITLE
  ======================================================= */

  const modalTitle =
    document.createElement('h2');

  modalTitle.textContent =
    'Information';

  modalTitle.style.margin =
    '0 0 10px 0';

  modalTitle.style.fontSize =
    '16px';

  modalTitle.style.fontWeight =
    'bold';


  /* =======================================================
     TEXT
  ======================================================= */

  const modalText =
    document.createElement('p');

  modalText.textContent =
    'This platform showcases handpicked Persian carpets with a focus on tradition, quality, and aesthetic harmony.';

  modalText.style.margin =
    '0';


  modalContent.appendChild(
    closeBtn
  );

  modalContent.appendChild(
    modalTitle
  );

  modalContent.appendChild(
    modalText
  );

  modal.appendChild(
    modalContent
  );


  /* =======================================================
     OUTSIDE CLICK
  ======================================================= */

  modal.addEventListener(
    'click',
    (e) => {

      if (e.target === modal) {

        modal.style.display =
          'none';
      }
    }
  );


  document.body.appendChild(
    modal
  );
}


/* =========================================================
   RESIZE
========================================================= */

function handleMenuResize() {

  const menuBar =
    document.getElementById(
      'menuBar'
    );

  if (!menuBar) {
    return;
  }


  /* ---------------------------------------------------------
     TEXT ALWAYS 13PX
  --------------------------------------------------------- */

  const items =
    menuBar.querySelectorAll(
      '.menu-item'
    );

  items.forEach(item => {

    item.style.fontSize =
      '13px';
  });


  /* ---------------------------------------------------------
     SMALL MOBILE PILL
  --------------------------------------------------------- */

  if (
    menuBar.classList.contains(
      'scrolled'
    ) &&
    window.innerWidth <= 600
  ) {

    menuBar.style.width =
      'calc(100% - 16px)';

    menuBar.style.maxWidth =
      'none';

    menuBar.style.height =
      '58px';

    menuBar.style.borderRadius =
      '20px';


    const left =
      document.getElementById(
        'menuLeft'
      );

    const right =
      document.getElementById(
        'menuRight'
      );


    if (left) {

      left.style.left =
        '5px';

      left.style.gap =
        '0';
    }


    if (right) {

      right.style.right =
        '5px';

      right.style.gap =
        '0';
    }
  }
}


/* =========================================================
   START
========================================================= */

window.addEventListener(
  'DOMContentLoaded',
  () => {

    createMenuBar();

  }
);