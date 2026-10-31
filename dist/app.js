const menuItems = [
  {
    id: 'pizzas',
    name: 'chicken onion white cheese pizza',
    category: 'Fast food',
    price: 12.5,
    prepMinutes: 18,
    description: 'Thin crust white sauce, with the toppings of chicken, onion, Mushroom .',
    image:
      'https://sscloudkitchenstorage.blob.core.windows.net/images/IMG_0197.JPG',
  },
  {
    id: 'appetizer',
    name: 'crispy pan-fried salmon',
    category: 'Appetizer',
    price: 12,
    prepMinutes: 14,
    description: 'Pan-fried salmon with butter, salt, pepper, with a flavor of rosemary ',
    image:
      'https://sscloudkitchenstorage.blob.core.windows.net/images/IMG_0248.jpeg',
  },
  {
    id: 'c',
    name: 'Chicken Strips',
    category: 'Appetizer',
    price: 14,
    prepMinutes: 20,
    description: 'Chicken marinated with salt, pepper and yogurt then coated with the flour and deep fried in avaczdo oil ',
    image:
      'https://sscloudkitchenstorage.blob.core.windows.net/images/IMG_0638.jpeg',
  },
  {
    id: 'chai-tres',
    name: 'Decadent Fudge Brownie',
    category: 'Sweets',
    price: 4.5,
    prepMinutes: 8,
    description: 'Rich, ultra-fudgy chocolate brownie with a crackly top and a dense, melt-in-your-mouth center. Baked with premium cocoa and finished with a pinch of sea salt to elevate every rich chocolate note.',
    image:
      'https://sscloudkitchenstorage.blob.core.windows.net/images/IMG_0681.jpeg',
  },
	{
	  id: 'mandi',
    name: 'Juicy chicken Mandi',
    category: 'Main course',
    price: 30,
    prepMinutes: 30,
    description: 'Tender, spice-marinated chicken slow-cooked to juicy perfection, served over fragrant, long-grain Basmati rice with traditional roasted nuts and a side of tangy daqoos sauce.',
    image:
      'https://sscloudkitchenstorage.blob.core.windows.net/images/PHOTO-2026-10-22-21-44-06.jpg',
  },
	{
	  id: 'chinese',
    name: 'Juicy and tangy chicken Manchurian',
    category: 'Main course',
    price: 30,
    prepMinutes: 30,
    description: 'Crispy, tender chicken pieces wok-tossed in a rich, tangy, and savory garlic-soy sauce with fresh bell peppers and spring onions. Perfect paired with fried rice or noodles!',
    image:
      'https://sscloudkitchenstorage.blob.core.windows.net/images/IMG_9241.jpeg',
  },
];

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});


if (typeof window !== 'undefined' && typeof 
document !== 'undefined') {

const cart = new Map();
const menuGrid = document.getElementById('menuGrid');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutButton');
const orderResult = document.getElementById('orderResult');

renderMenu()
renderCart()

}


function renderMenu() {
  menuGrid.innerHTML = menuItems
    .map(
      (item) => `
        <article class="menu-card">
          <div class="menu-card-image">
            <img src="${item.image}" alt="${item.name}" />
            <span class="menu-badge">${item.category}</span>
          </div>
          <div class="menu-card-body">
            <div class="menu-header">
              <h3>${item.name}</h3>
              <span class="price">${currency.format(item.price)}</span>
            </div>
            <p class="menu-description">${item.description}</p>
            <div class="menu-meta">
              <span class="time">⏱ ${item.prepMinutes} min</span>
              <button class="add-btn" type="button" data-id="${item.id}">Add</button>
            </div>
          </div>
        </article>
      `,
    )
    .join('');

  document.querySelectorAll('.add-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      const item = menuItems.find((entry) => entry.id === id);
      if (!item) return;

      cart.set(item.id, (cart.get(item.id) || 0) + 1);
      renderCart();
    });
  });
}

function renderCart() {
  const entries = [...cart.entries()].map(([id, quantity]) => {
    const item = menuItems.find((entry) => entry.id === id);
    return { ...item, quantity };
  });

  if (!entries.length) {
    cartItems.classList.add('empty-state');
    cartItems.innerHTML = '<p>Your cart is empty.</p><small>Add a favorite from the menu.</small>';
    cartCount.textContent = '0 items';
    cartTotal.textContent = currency.format(0);
    checkoutButton.disabled = true;
    return;
  }

  cartItems.classList.remove('empty-state');
  cartItems.innerHTML = entries
    .map(
      (item) => `
        <div class="cart-item">
          <div class="item-copy">
            <strong>${item.name}</strong>
            <span>${currency.format(item.price)} each</span>
          </div>
          <div class="item-actions">
            <button class="qty-btn" type="button" data-action="decrease" data-id="${item.id}">−</button>
            <strong>${item.quantity}</strong>
            <button class="qty-btn" type="button" data-action="increase" data-id="${item.id}">+</button>
          </div>
        </div>
      `,
    )
    .join('');

  cartCount.textContent = `${entries.reduce((sum, item) => sum + item.quantity, 0)} items`;
  checkoutButton.disabled = false;
  cartTotal.textContent = currency.format(
    entries.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  document.querySelectorAll('.qty-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      const action = button.getAttribute('data-action');
      if (!id) return;

      const current = cart.get(id) || 0;
      if (action === 'increase') {
        cart.set(id, current + 1);
      } else if (action === 'decrease') {
        if (current <= 1) {
          cart.delete(id);
        } else {
          cart.set(id, current - 1);
        }
      }

      renderCart();
    });
  });
}




 checkoutButton.addEventListener('click', () => 
{
  orderResult.textContent = 'This static preview does not send or store 
  real orders.'; orderResult.hidden = false;
});

renderMenu();
renderCart();
