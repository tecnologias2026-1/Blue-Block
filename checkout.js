const CART_STORAGE_KEY = 'blueblock_cart';
const LEGACY_CART_STORAGE_KEY = 'carrito';

const checkoutItemsEl = document.getElementById('checkout-items');
const checkoutTemplateEl = document.getElementById('checkout-item-template');
const subtotalEl = document.getElementById('checkout-subtotal');
const shippingEl = document.getElementById('checkout-shipping');
const totalEl = document.getElementById('checkout-total');
const checkoutFormEl = document.getElementById('checkout-form');
const saveBtnEl = document.getElementById('checkout-save-btn');
const saveFeedbackEl = document.getElementById('checkout-save-feedback');
const confirmBtnEl = document.getElementById('checkout-confirm-btn');

const SHIPPING_COST = 15000;

function formatCop(value) {
  return `$${Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
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
        talla: String(item.talla || 'N/A'),
        cantidad
      };
    })
    .filter(Boolean);
}

function readCart() {
  const current = localStorage.getItem(CART_STORAGE_KEY);
  const legacy = localStorage.getItem(LEGACY_CART_STORAGE_KEY);

  if (!current && !legacy) {
    return [];
  }

  try {
    const parsed = current ? JSON.parse(current) : JSON.parse(legacy);
    const normalized = normalizeCart(parsed);

    if (!current && normalized.length) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalized));
      localStorage.removeItem(LEGACY_CART_STORAGE_KEY);
    }

    return normalized;
  } catch (error) {
    return [];
  }
}

function renderEmptyCheckout() {
  checkoutItemsEl.innerHTML = '<article class="checkout-empty"><h3>No hay productos en tu carrito</h3><p>Regresa al catalogo para agregar productos antes de pagar.</p><a href="catalogo.html">Ir al catalogo</a></article>';
  subtotalEl.textContent = '$0';
  shippingEl.textContent = '$0';
  totalEl.textContent = '$0';
}

function renderCheckoutItems(cart) {
  checkoutItemsEl.innerHTML = '';

  const fragment = document.createDocumentFragment();

  cart.forEach((item) => {
    const clone = checkoutTemplateEl.content.cloneNode(true);

    const image = clone.querySelector('.checkout-item-image');
    image.src = item.imagen;
    image.alt = item.nombre;

    clone.querySelector('.checkout-item-name').textContent = item.nombre;
    clone.querySelector('.checkout-item-size').textContent = `Talla: ${item.talla}`;
    clone.querySelector('.checkout-item-qty').textContent = `Cantidad: ${item.cantidad}`;
    clone.querySelector('.checkout-item-price').textContent = formatCop(item.precio * item.cantidad);

    fragment.appendChild(clone);
  });

  checkoutItemsEl.appendChild(fragment);
}

function renderTotals(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const shipping = cart.length ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  subtotalEl.textContent = formatCop(subtotal);
  shippingEl.textContent = formatCop(shipping);
  totalEl.textContent = formatCop(total);
}

function isFormValid() {
  return checkoutFormEl.checkValidity();
}

function handlePurchase() {
  if (!isFormValid()) {
    checkoutFormEl.reportValidity();
    return;
  }

  alert('Compra confirmada. Gracias por comprar en Blue Block.');
}

function handleSaveInfo() {
  if (!isFormValid()) {
    checkoutFormEl.reportValidity();
    return;
  }

  saveFeedbackEl.textContent = 'Guardado ✓';

  setTimeout(() => {
    saveFeedbackEl.textContent = '';
  }, 1800);
}

saveBtnEl.addEventListener('click', handleSaveInfo);

confirmBtnEl.addEventListener('click', handlePurchase);

const cart = readCart();

if (!cart.length) {
  renderEmptyCheckout();
} else {
  renderCheckoutItems(cart);
  renderTotals(cart);
}
