function createMenuBar() {
  let oldMenu = document.querySelector('#menuBar');
  if (oldMenu) oldMenu.remove();

  const path = window.location.pathname;
  const isHomePage = path === '/' || path.endsWith('/index.html');

  const menuBar = document.createElement('div');
  menuBar.id = 'menuBar';
  menuBar.style.position = 'fixed';
  menuBar.style.top = '0';
  menuBar.style.left = '0';
  menuBar.style.width = '100%';
  menuBar.style.height = '90px';
  menuBar.style.boxSizing = 'border-box';
  menuBar.style.zIndex = '9999';
  menuBar.style.color = isHomePage ? '#ffffff' : '#000000';
  menuBar.style.backgroundColor = 'transparent';

  const menuContent = document.createElement('div');
  menuContent.style.position = 'relative';
  menuContent.style.zIndex = '1002';
  menuContent.style.display = 'flex';
  menuContent.style.alignItems = 'center';
  menuContent.style.justifyContent = 'center';
  menuContent.style.height = '100%';
  menuContent.style.boxSizing = 'border-box';

  const leftContainer = document.createElement('div');
  leftContainer.style.position = 'absolute';
  leftContainer.style.left = '30px';
  leftContainer.style.top = '50%';
  leftContainer.style.transform = 'translateY(-50%)';
  leftContainer.style.display = 'flex';
  leftContainer.style.gap = '40px';
  leftContainer.style.alignItems = 'center';

  const shopBtn = document.createElement('span');
  shopBtn.textContent = 'Shop';
  styleMenuItem(shopBtn);
  shopBtn.addEventListener('click', () => {
    window.location.href = '/shop';
  });

  const accountBtn = document.createElement('span');
  accountBtn.textContent = 'Account';
  styleMenuItem(accountBtn);
  accountBtn.addEventListener('click', () => {
    window.location.href = '/account';
  });

  leftContainer.appendChild(shopBtn);
  leftContainer.appendChild(accountBtn);

  const centerContainer = document.createElement('div');
  centerContainer.style.flex = '1';
  centerContainer.style.display = 'flex';
  centerContainer.style.justifyContent = 'center';
  centerContainer.style.alignItems = 'center';
  centerContainer.style.height = '100%';

  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.style.display = 'flex';
  logoLink.style.alignItems = 'center';
  logoLink.style.position = 'relative';
  logoLink.style.textDecoration = 'none';
  logoLink.style.padding = '4px 12px';
  logoLink.style.height = '30px';
  logoLink.style.overflow = 'hidden';

  if (isHomePage) {
    const logoImg = document.createElement('img');
    logoImg.src = 'assets/wordmark3.png';
    logoImg.alt = 'Farshestan Wordmark';
    logoImg.style.height = '25px';
    logoImg.style.zIndex = '1';
    logoImg.style.position = 'relative';

    logoLink.appendChild(logoImg);
  } else {
    const originalLogo = document.createElement('img');
    originalLogo.src = 'assets/logo.png';
    originalLogo.alt = 'Farshestan Logo';
    originalLogo.style.height = '25px';
    originalLogo.style.zIndex = '1';
    originalLogo.style.position = 'relative';

    logoLink.appendChild(originalLogo);
  }

  centerContainer.appendChild(logoLink);

  const rightContainer = document.createElement('div');
  rightContainer.style.position = 'absolute';
  rightContainer.style.right = '30px';
  rightContainer.style.top = '50%';
  rightContainer.style.transform = 'translateY(-50%)';
  rightContainer.style.display = 'flex';
  rightContainer.style.gap = '40px';
  rightContainer.style.alignItems = 'center';

  const infoBtn = document.createElement('span');
  infoBtn.textContent = 'Info';
  styleMenuItem(infoBtn);
  infoBtn.addEventListener('click', () => {
    const panel = document.getElementById('slidePanel');
    const iframe = document.getElementById('panelContent');

    if (iframe && panel) {
      iframe.src = 'other-page.html';
      panel.style.bottom = '0';
    } else {
      console.warn('Slide panel not found.');
    }
  });

  const cartBtn = document.createElement('span');
  cartBtn.textContent = 'Cart';
  styleMenuItem(cartBtn);
  cartBtn.addEventListener('click', () => {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
      cartSidebar.style.right = cartSidebar.style.right === '0px' ? '-300px' : '0';
    } else {
      console.warn('Cart sidebar not found!');
    }
  });

  rightContainer.appendChild(infoBtn);
  rightContainer.appendChild(cartBtn);

  menuContent.appendChild(leftContainer);
  menuContent.appendChild(centerContainer);
  menuContent.appendChild(rightContainer);

  menuBar.appendChild(menuContent);
  document.body.appendChild(menuBar);

  createCartSidebar();
  createSlidePanel();
  handleMenuResize();
  window.addEventListener('resize', handleMenuResize);
}

function styleMenuItem(elem) {
  const path = window.location.pathname;
  const isHomePage = path === '/' || path.endsWith('/index.html');

  elem.style.fontSize = '13px';
  elem.style.pointerEvents = 'auto';
  elem.style.cursor = 'pointer';
  elem.style.whiteSpace = 'nowrap';
  elem.style.fontFamily = 'Vazirmatn, sans-serif';
  elem.style.padding = '6px 16px';
  elem.style.borderRadius = '8px';
  elem.style.color = isHomePage ? '#ffffff' : '#000000';
}

function createCartSidebar() {
  if (document.getElementById('cartSidebar')) return;

  const existingFont = document.getElementById('vazirmatn-font-style');
  if (!existingFont) {
    const style = document.createElement('style');
    style.id = 'vazirmatn-font-style';
    style.textContent = `
      @font-face {
        font-family: 'Vazirmatn';
        src: url('assets/Vazirmatn.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    document.head.appendChild(style);
  }

  const sidebar = document.createElement('div');
  sidebar.id = 'cartSidebar';
  sidebar.style.position = 'fixed';
  sidebar.style.top = '0';
  sidebar.style.right = '-300px';
  sidebar.style.width = '300px';
  sidebar.style.height = '100%';
  sidebar.style.backgroundColor = '#ffffff';
  sidebar.style.transition = 'right 0.3s ease';
  sidebar.style.padding = '20px';
  sidebar.style.boxSizing = 'border-box';
  sidebar.style.borderLeft = '1px solid black';
  sidebar.style.zIndex = '1000';
  sidebar.style.overflowY = 'auto';
  sidebar.style.fontFamily = "'Vazirmatn', sans-serif";

  sidebar.innerHTML = `
    <div style="height: 40px;"></div>
    <h2 style="font-size: 13px; margin-bottom: 10px;">Your Cart</h2>
    <ul id="cartItems" style="font-size: 14px; line-height: 1.5; padding-left: 20px;"></ul>
  `;

  document.body.appendChild(sidebar);
}

function createSlidePanel() {
  if (document.getElementById('slidePanel')) return;

  const panel = document.createElement('div');
  panel.id = 'slidePanel';
  panel.style.position = 'fixed';
  panel.style.left = '0';
  panel.style.bottom = '-100vh';
  panel.style.width = '100%';
  panel.style.height = '100vh';
  panel.style.backgroundColor = '#ffffff';
  panel.style.zIndex = '10001';
  panel.style.transition = 'bottom 0.4s ease';
  panel.style.boxShadow = '0 -2px 20px rgba(0, 0, 0, 0.15)';
  panel.style.overflow = 'hidden';

  const closeBtn = document.createElement('div');
  closeBtn.textContent = '×';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '16px';
  closeBtn.style.right = '20px';
  closeBtn.style.fontSize = '30px';
  closeBtn.style.lineHeight = '1';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.zIndex = '10002';
  closeBtn.style.color = '#000000';
  closeBtn.style.fontFamily = "'Vazirmatn', sans-serif";

  closeBtn.addEventListener('click', () => {
    panel.style.bottom = '-100vh';
    const iframe = document.getElementById('panelContent');
    if (iframe) {
      iframe.src = '';
    }
  });

  const iframe = document.createElement('iframe');
  iframe.id = 'panelContent';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.backgroundColor = '#ffffff';

  panel.appendChild(closeBtn);
  panel.appendChild(iframe);
  document.body.appendChild(panel);
}

function handleMenuResize() {
  const fontSize = window.innerWidth < 600 ? '13px' : '14px';
  const menuItems = document.querySelectorAll('#menuBar span');
  menuItems.forEach(item => {
    item.style.fontSize = fontSize;
  });
}

window.addEventListener('DOMContentLoaded', createMenuBar);
