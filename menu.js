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
  menuBar.style.color = '#fefbea';
  menuBar.style.backgroundColor = 'transparent';

  // Background hover for homepage
  let hoverBackground;
  if (isHomePage) {
    hoverBackground = document.createElement('div');
    hoverBackground.style.position = 'absolute';
    hoverBackground.style.top = '0';
    hoverBackground.style.left = '0';
    hoverBackground.style.width = '100%';
    hoverBackground.style.height = '100%';
    hoverBackground.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    hoverBackground.style.transition = 'background-color 0.3s ease';
    hoverBackground.style.zIndex = '0';

    menuBar.addEventListener('mouseenter', () => {
      hoverBackground.style.backgroundColor = 'rgba(255, 255, 255)';

      const menuItems = menuBar.querySelectorAll('span');
      menuItems.forEach(item => {
        item.style.color = '#000000';
      });

      const logoImg = menuBar.querySelector('img[src="assets/wordmark3.png"]');
      if (logoImg) logoImg.src = 'assets/wordmark.png';
    });

    menuBar.addEventListener('mouseleave', () => {
      hoverBackground.style.backgroundColor = 'rgba(255, 255, 255, 0)';

      const menuItems = menuBar.querySelectorAll('span');
      menuItems.forEach(item => {
        item.style.color = '#ffffff';
      });

      const logoImg = menuBar.querySelector('img[src="assets/wordmark.png"]');
      if (logoImg) logoImg.src = 'assets/wordmark3.png';
    });

    menuBar.appendChild(hoverBackground);
  }

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
  shopBtn.addEventListener('click', () => window.location.href = '/shop');

  const accountBtn = document.createElement('span');
  accountBtn.textContent = 'Account';
  styleMenuItem(accountBtn);
  accountBtn.addEventListener('click', () => window.location.href = '/account');

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
    logoImg.src = 'assets/wordmark3.png'; // white by default
    logoImg.alt = 'Farshestan Wordmark';
    logoImg.style.height = '25px';
    logoImg.style.zIndex = '1';
    logoImg.style.position = 'relative';
    logoImg.style.transition = 'opacity 0.3s ease';

    logoLink.appendChild(logoImg);
  } else {
    const logoBg = document.createElement('div');
    logoBg.style.position = 'absolute';
    logoBg.style.top = '0';
    logoBg.style.left = '40%';
    logoBg.style.transform = 'translateX(-50%)';
    logoBg.style.height = '100%';
    logoBg.style.borderRadius = '8px';

    logoBg.style.transition = 'width 0.3s ease, opacity 0.3s ease';
    logoBg.style.zIndex = '0';
    logoBg.style.width = '60px';
    logoBg.style.pointerEvents = 'none';
    logoBg.style.opacity = '1';

    const originalLogo = document.createElement('img');
    originalLogo.src = 'assets/logo.png';
    originalLogo.alt = 'Farshestan Logo';
    originalLogo.style.height = '25px';
    originalLogo.style.transition = 'transform 0.3s ease';
    originalLogo.style.transform = 'translateX(50px)';
    originalLogo.style.zIndex = '1';
    originalLogo.style.position = 'relative';

    const newLogo = document.createElement('img');
    newLogo.src = 'assets/wordmark.png';
    newLogo.alt = 'Hover Logo';
    newLogo.style.height = '20px';
    newLogo.style.opacity = '0';
    newLogo.style.marginLeft = '4px';
    newLogo.style.transition = 'opacity 0.3s ease';
    newLogo.style.zIndex = '1';
    newLogo.style.position = 'relative';

    logoLink.appendChild(logoBg);
    logoLink.appendChild(originalLogo);
    logoLink.appendChild(newLogo);

    logoLink.addEventListener('mouseenter', () => {
      originalLogo.style.transform = 'translateX(-1px)';
      newLogo.style.opacity = '1';
      logoBg.style.width = '200px';
      logoBg.style.left = '50%';
      
    });

    logoLink.addEventListener('mouseleave', () => {
      originalLogo.style.transform = 'translateX(50px)';
      newLogo.style.opacity = '0';
      logoBg.style.width = '55px';
      logoBg.style.left = '40%';
      
    });
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
      cartSidebar.style.right = (cartSidebar.style.right === '0px') ? '-300px' : '0';
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
  createInfoModal();
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
  elem.style.transition = 'color 0.3s ease';
  elem.style.fontFamily = 'Vazirmatn, sans-serif';
  elem.style.padding = '6px 16px';
  elem.style.borderRadius = '8px';

  if (isHomePage) {
    elem.style.color = '#ffffff'; // white by default
    // ✅ no hover listeners here anymore
  } else {
    elem.style.color = '#000000';

    elem.addEventListener('mouseenter', () => {
      
    });
    elem.addEventListener('mouseleave', () => {
      
    });
  }
}



function createCartSidebar() {
  if (document.getElementById('cartSidebar')) return;

  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'Vazirmatn';
      src: url('assets/Vazirmatn.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
  `;
  document.head.appendChild(style);

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


function createInfoModal() {
  if (document.getElementById('infoModal')) return;

  const modal = document.createElement('div');
  modal.id = 'infoModal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
  modal.style.display = 'none';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = '10000';
  modal.style.fontFamily = "'Vazirmatn', sans-serif";

  const modalContent = document.createElement('div');
  modalContent.style.backgroundColor = '#ffffff';
  modalContent.style.padding = '30px';
  modalContent.style.width = '420px';
  modalContent.style.boxSizing = 'border-box';
  modalContent.style.fontSize = '14px';
  modalContent.style.lineHeight = '1.6';
  modalContent.style.position = 'relative';

  const closeBtn = document.createElement('div');
  closeBtn.textContent = '×';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '10px';
  closeBtn.style.right = '16px';
  closeBtn.style.fontSize = '22px';
  closeBtn.style.lineHeight = '1';
  closeBtn.style.fontWeight = 'normal';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.color = '#000';
  closeBtn.style.userSelect = 'none';
  closeBtn.style.fontFamily = "'Vazirmatn', sans-serif";

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  const modalTitle = document.createElement('h2');
  modalTitle.textContent = 'Information';
  modalTitle.style.margin = '0 0 10px 0';
  modalTitle.style.fontSize = '16px';
  modalTitle.style.fontWeight = 'bold';

  const modalText = document.createElement('p');
  modalText.textContent = 'This platform showcases handpicked Persian carpets with a focus on tradition, quality, and aesthetic harmony.';
  modalText.style.margin = '0';

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalText);
  modal.appendChild(modalContent);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  document.body.appendChild(modal);
}

function handleMenuResize() {
  const fontSize = window.innerWidth < 600 ? '13px' : '14px';
  const menuItems = document.querySelectorAll('#menuBar span');
  menuItems.forEach(item => {
    item.style.fontSize = fontSize;
  });
}

window.addEventListener('DOMContentLoaded', createMenuBar);
