const cartKey = 'myCart';
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

function saveCart() {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function updateCartUI() {
  const sidebar = document.getElementById('cartSidebar');
  if (!sidebar) return;

  sidebar.innerHTML = ''; // Clear previous content
  sidebar.style.position = 'fixed';
  sidebar.style.top = '0';
  sidebar.style.right = sidebar.style.right || '-300px';
  sidebar.style.width = '300px';
  sidebar.style.height = '100vh';
  sidebar.style.background = '#ffffff';
  sidebar.style.display = 'flex';
  sidebar.style.flexDirection = 'column';
 sidebar.style.overflow = 'visible';
  sidebar.style.zIndex = '1000';

  const heading = document.createElement('h2');
  heading.textContent = cart.length === 0 ? 'Your Cart is Empty' : 'Your Cart';
  heading.style.marginTop = '50px';
  heading.style.fontSize = '14px';

  const footerHeight = 120;

  const itemsWrapper = document.createElement('div');
  itemsWrapper.style.height = `calc(100vh - ${footerHeight}px)`;
  itemsWrapper.style.overflowY = 'auto';
  itemsWrapper.style.padding = '10px 0px 0px 20px';
  itemsWrapper.style.boxSizing = 'border-box';

  

  if (cart.length > 0) {
    cart.forEach((item, index) => {
      const li = document.createElement('div');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = '15px';
      li.style.margin = '10px 0';
      li.style.padding = '0';

      const imgBox = document.createElement('div');
      imgBox.style.background = '#fff';
      imgBox.style.border = '1px solid #ddd';
      imgBox.style.padding = '10px';
      imgBox.style.display = 'flex';
      imgBox.style.justifyContent = 'center';
      imgBox.style.alignItems = 'center';
      imgBox.style.flexShrink = '0';
      imgBox.style.marginLeft = '-20px';

      const img = document.createElement('img');
      img.src = item.imgPath || '';
      img.alt = item.name;
      img.style.width = '80px';
      img.style.height = '80px';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '4px';

      imgBox.appendChild(img);

      const textContainer = document.createElement('div');
      textContainer.style.display = 'flex';
      textContainer.style.flexDirection = 'column';
      textContainer.style.justifyContent = 'center';
      textContainer.style.textAlign = 'left';
      textContainer.style.flexGrow = '1';

      const nameSpan = document.createElement('span');
      nameSpan.textContent = item.name;
      nameSpan.style.fontWeight = 'normal';
      nameSpan.style.fontSize = '14px';

      const quantitySpan = document.createElement('span');
      quantitySpan.textContent = `Quantity: ${item.quantity}`;
      quantitySpan.style.fontSize = '14px';

      const priceSpan = document.createElement('span');
      const totalPrice = item.price * item.quantity;
      const formattedPrice = totalPrice.toLocaleString('en-GB', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      priceSpan.textContent = `Total: £${formattedPrice}`;
      priceSpan.style.fontSize = '14px';

      const remove = document.createElement('span');
      remove.textContent = 'Remove';
      remove.style.color = '#000000';
      remove.style.cursor = 'pointer';
      remove.style.fontSize = '12px';
      remove.style.textDecoration = 'underline';
      remove.style.marginTop = '4px';
      remove.style.width = 'max-content';
      remove.addEventListener('click', () => {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
      });

      textContainer.appendChild(nameSpan);
      textContainer.appendChild(quantitySpan);
      textContainer.appendChild(priceSpan);
      textContainer.appendChild(remove);

      li.appendChild(imgBox);
      li.appendChild(textContainer);

      itemsWrapper.appendChild(li);
    });
  }

  
  const footer = document.createElement('div');
footer.style.position = 'relative';
footer.style.marginTop = 'auto';
footer.style.marginBottom = '-10px';

  footer.style.height = `${footerHeight}px`;
  // footer.style.padding = '20px';
  // footer.style.borderTop = '1px solid #000';
  footer.style.background = '#fff';
  footer.style.zIndex = '10';
  footer.style.display = 'flex';
  footer.style.flexDirection = 'column';
  footer.style.justifyContent = 'center';


  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formattedSubtotal = subtotal.toLocaleString('en-GB', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const subtotalElement = document.createElement('div');
  subtotalElement.textContent = `Subtotal: £${formattedSubtotal}`;
  subtotalElement.style.fontSize = '14px';
  subtotalElement.style.marginBottom = '10px';
  subtotalElement.style.textAlign = 'left';

  const checkoutButton = document.createElement('button');
  checkoutButton.textContent = 'Checkout';
  checkoutButton.style.width = '100%';
  checkoutButton.style.padding = '12px';
  checkoutButton.style.fontSize = '14px';
  checkoutButton.style.cursor = 'pointer';
  checkoutButton.style.backgroundColor = '#000000';
  checkoutButton.style.color = '#fff';
  checkoutButton.style.border = 'none';
  checkoutButton.style.transition = 'background-color 0.3s ease';
  checkoutButton.style.marginBottom = '0';
  checkoutButton.style.flexShrink = '0';
  checkoutButton.style.height = 'auto';

  checkoutButton.addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });

  footer.appendChild(subtotalElement);
  footer.appendChild(checkoutButton);

  sidebar.appendChild(heading);
  sidebar.appendChild(itemsWrapper);
  sidebar.appendChild(footer);
}

window.addToCart = function (item) {
  const sidebar = document.getElementById('cartSidebar');
  if (!sidebar) return;

  const existing = cart.find((i) => i.id === item.id);
  if (existing) {
    existing.quantity++;
  } else {
    item.quantity = 1;
    cart.push(item);
  }

  saveCart();
  updateCartUI();
};

window.addEventListener('DOMContentLoaded', () => {
  let cartSidebar = document.getElementById('cartSidebar');
  if (!cartSidebar) {
    const sidebar = document.createElement('div');
    sidebar.id = 'cartSidebar';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.right = '-300px';
    sidebar.style.width = '300px';
    sidebar.style.height = '100vh';
    sidebar.style.backgroundColor = '#ffffff';
    sidebar.style.transition = 'right 0.3s ease';
    sidebar.style.padding = '20px';
    sidebar.style.boxSizing = 'border-box';
    sidebar.style.borderLeft = '1px solid black';
    sidebar.style.zIndex = '1000';
    sidebar.style.overflowY = 'auto';
    document.body.appendChild(sidebar);
    cartSidebar = sidebar;
  }

  updateCartUI(); // moved here — after sidebar creation

  const cartButton = document.getElementById('cartButton');
  if (cartButton) {
    cartButton.addEventListener('click', () => {
      const sidebar = document.getElementById('cartSidebar');
      if (!sidebar) return;

      if (sidebar.style.right === '0px') {
        sidebar.style.right = '-300px';
      } else {
        sidebar.style.right = '0';
        updateCartUI();
      }
    });
  }
});
