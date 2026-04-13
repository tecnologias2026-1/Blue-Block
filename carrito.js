const CART_STORAGE_KEY = 'blueblock_cart';
const LEGACY_CART_STORAGE_KEY = 'carrito';

const cartListEl = document.getElementById('cart-list');
const cartTotalEl = document.getElementById('cart-total');
const cartTemplate = document.getElementById('cart-item-template');
const cartSummaryEl = document.getElementById('cart-summary');
const cartCheckoutEl = document.getElementById('cart-checkout');
const cartClearEl = document.getElementById('cart-clear');

function formatCop(value) {
  return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

function normalizeCart(rawCart) {
  if (!Array.isArray(rawCart)) {
    return [];
  }

  return rawCart
    .map((item, index) => {
      const precio = Number(item?.precio);
      const cantidad = Math.max(1, Number(item?.cantidad) || 1);

      if (!item?.nombre || !item?.imagen || !Number.isFinite(precio) || precio <= 0) {
        return null;
      }

      return {
        id: item.id || `${item.nombre}-${item.talla || 'sin-talla'}-${index}`,
        nombre: String(item.nombre),
        precio,
        imagen: String(item.imagen),
        categoria: String(item.categoria || 'SIN CATEGORÍA'),
        talla: String(item.talla || 'N/A'),
        cantidad
      };
    })
    .filter(Boolean);
}

function readCart() {
  const cartText = localStorage.getItem(CART_STORAGE_KEY);
  const legacyCartText = localStorage.getItem(LEGACY_CART_STORAGE_KEY);

  if (!cartText && !legacyCartText) {
    return [];
  }

  try {
    const parsedCart = cartText ? JSON.parse(cartText) : JSON.parse(legacyCartText);
    const normalized = normalizeCart(parsedCart);

    if (!cartText && normalized.length) {
      saveCart(normalized);
      localStorage.removeItem(LEGACY_CART_STORAGE_KEY);
    }

    return normalized;
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function toggleCartSummary(isEmpty) {
  const display = isEmpty ? 'none' : '';
  cartSummaryEl.style.display = display;
  cartCheckoutEl.style.display = display;
  cartClearEl.style.display = display;
}

function createEmptyState() {
  const emptyState = document.createElement('article');
  emptyState.className = 'cart-empty';
  emptyState.innerHTML = '<h2>Tu carrito está vacío</h2><p>Agrega productos desde el catálogo para verlos aquí.</p><a href="catalogo.html">Ir al catálogo</a>';
  return emptyState;
}

function calculateTotal(cart) {
  return cart.reduce((sum, product) => sum + product.precio * product.cantidad, 0);
}

function renderCart() {
  const cart = readCart();

  cartListEl.innerHTML = '';

  if (!cart.length) {
    cartListEl.appendChild(createEmptyState());
    cartTotalEl.textContent = '$0';
    toggleCartSummary(true);
    return;
  }

  toggleCartSummary(false);

  const fragment = document.createDocumentFragment();

  cart.forEach((item) => {
    const clone = cartTemplate.content.cloneNode(true);
    const card = clone.querySelector('.cart-item');

    card.dataset.cartId = item.id;

    const image = clone.querySelector('.cart-item-image');
    image.src = item.imagen;
    image.alt = item.nombre;

    clone.querySelector('.cart-item-category').textContent = item.categoria;
    clone.querySelector('.cart-item-name').textContent = item.nombre;
    clone.querySelector('.cart-item-size').textContent = `Talla: ${item.talla}`;
    clone.querySelector('.cart-item-price').textContent = `Total: ${formatCop(item.precio * item.cantidad)}`;
    clone.querySelector('.cart-qty-value').textContent = String(item.cantidad);

    fragment.appendChild(clone);
  });

  cartListEl.appendChild(fragment);
  cartTotalEl.textContent = formatCop(calculateTotal(cart));
}

function updateQuantity(cartId, delta) {
  const cart = readCart();
  const item = cart.find((product) => product.id === cartId);

  if (!item) {
    return;
  }

  item.cantidad = Math.max(1, item.cantidad + delta);
  saveCart(cart);
  renderCart();
}

function removeProduct(cartId) {
  const cart = readCart().filter((product) => product.id !== cartId);
  saveCart(cart);
  renderCart();
}

cartListEl.addEventListener('click', (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const cartItem = target.closest('.cart-item');

  if (!cartItem) {
    return;
  }

  const { cartId } = cartItem.dataset;

  if (!cartId) {
    return;
  }

  const action = target.getAttribute('data-action');

  if (action === 'increase') {
    updateQuantity(cartId, 1);
  }

  if (action === 'decrease') {
    updateQuantity(cartId, -1);
  }

  if (action === 'remove') {
    removeProduct(cartId);
  }
});

cartClearEl.addEventListener('click', () => {
  localStorage.removeItem(CART_STORAGE_KEY);
  localStorage.removeItem(LEGACY_CART_STORAGE_KEY);
  renderCart();
});

cartCheckoutEl.addEventListener('click', () => {
  window.location.href = 'checkout.html';
});

renderCart();
