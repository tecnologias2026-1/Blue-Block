const productContainer = document.getElementById('contenedor-productos');
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const minPriceInput = document.getElementById('filter-min-price');
const maxPriceInput = document.getElementById('filter-max-price');
const clearFiltersButton = document.getElementById('clear-filters');
const minPriceValue = document.getElementById('price-min-value');
const maxPriceValue = document.getElementById('price-max-value');
const priceTrack = document.getElementById('price-slider-track');

const params = new URLSearchParams(window.location.search);
const categoriaURL = (params.get('categoria') || '').toLowerCase();

const RANGE_STEP = 1000;
let priceBounds = { min: 0, max: 1000000 };

function parsePriceFromCard(card) {
  const priceText = Array.from(card.querySelectorAll('p'))
    .map((node) => node.textContent?.trim() || '')
    .find((text) => text.includes('COP'));

  const numericValue = Number((priceText || '').replace(/[^\d]/g, ''));
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : 0;
}

function parseCategoryFromCard(card) {
  const categoryTag = card.querySelector('p');
  const rawCategory = categoryTag ? categoryTag.textContent.trim().toLowerCase() : '';

  const categoryMap = {
    'fútbol': 'futbol',
    'basketball': 'basket',
    'basket': 'basket',
    'atletismo': 'atletismo',
    'ciclismo': 'ciclismo',
    'tenis': 'tenis'
  };

  return categoryMap[rawCategory] || rawCategory;
}

function formatCop(value) {
  return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

const productos = Array.from(document.querySelectorAll('.product-card')).map((card, index) => {
  const id = index + 1;
  const nombre = card.querySelector('h3')?.textContent?.trim() || `Producto ${id}`;
  const imagen = card.querySelector('img')?.src || '';
  const categoria = parseCategoryFromCard(card);
  const precio = parsePriceFromCard(card);

  return {
    id,
    nombre,
    imagen,
    categoria,
    precio
  };
});

function renderProductos(lista) {
  if (!lista.length) {
    productContainer.innerHTML = '<p class="no-results">No se encontraron productos</p>';
    return;
  }

  productContainer.innerHTML = lista.map((p) => `
    <article class="login-form product-card card-producto" data-category="${p.categoria}" onclick="irProducto(${p.id})" style="padding: 0; max-width: none; overflow: hidden; position: relative; cursor: pointer;">
      <button type="button" aria-label="Agregar ${p.nombre} a favoritos" style="position: absolute; top: 16px; right: 16px; width: 36px; height: 36px; border: 0; border-radius: 999px; background: rgba(255,255,255,0.9); box-shadow: 0 4px 6px rgba(0,0,0,0.1); cursor: pointer; color: #6a7282; font-size: 16px;">♡</button>
      <img src="${p.imagen}" alt="${p.nombre}" style="width: 100%; height: 300px; object-fit: cover; display: block;" />
      <div style="padding: 12px 16px 16px; background: #f3f4f6;">
        <p style="margin: 0 0 8px; color: #0ea5e9; font-size: 12px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase;">${p.categoria.toUpperCase()}</p>
        <h3 style="margin: 0 0 6px; color: #0a0a0a; font-size: 34px; font-weight: 700; line-height: 1.15;">${p.nombre}</h3>
        <div style="display: flex; align-items: center; gap: 12px;">
          <p style="margin: 0; color: #101828; font-size: 34px; font-weight: 700; line-height: 1.1;">${formatCop(p.precio)} COP</p>
        </div>
      </div>
    </article>
  `).join('');
}

function irProducto(id) {
  window.location.href = `producto.html?id=${id}`;
}

function updatePriceTrack(minPrice, maxPrice) {
  const range = Math.max(1, priceBounds.max - priceBounds.min);
  const minPercent = ((minPrice - priceBounds.min) / range) * 100;
  const maxPercent = ((maxPrice - priceBounds.min) / range) * 100;

  priceTrack.style.background = `linear-gradient(90deg, #cbd5e1 ${minPercent}%, #0ea5e9 ${minPercent}%, #0ea5e9 ${maxPercent}%, #cbd5e1 ${maxPercent}%)`;
}

function updatePriceUI(minPrice, maxPrice) {
  minPriceValue.textContent = formatCop(minPrice);
  maxPriceValue.textContent = formatCop(maxPrice);
  updatePriceTrack(minPrice, maxPrice);
}

function normalizeRangeValues(changedControl) {
  let minValue = Number(minPriceInput.value);
  let maxValue = Number(maxPriceInput.value);

  if (changedControl === 'min' && minValue > maxValue) {
    maxValue = minValue;
    maxPriceInput.value = String(maxValue);
  }

  if (changedControl === 'max' && maxValue < minValue) {
    minValue = maxValue;
    minPriceInput.value = String(minValue);
  }

  return { minValue, maxValue };
}

function aplicarFiltros() {
  let filtrados = productos;

  const categorias = Array.from(document.querySelectorAll('input[name="category"]:checked'))
    .map((checkbox) => checkbox.value.toLowerCase());

  if (categorias.length > 0) {
    filtrados = filtrados.filter((p) => categorias.includes(p.categoria.toLowerCase()));
  }

  const minPrice = Number(minPriceInput.value || priceBounds.min);
  const maxPrice = Number(maxPriceInput.value || priceBounds.max);

  filtrados = filtrados.filter((p) => p.precio >= minPrice && p.precio <= maxPrice);

  updatePriceUI(minPrice, maxPrice);
  renderProductos(filtrados);
}

function resetFilters() {
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  minPriceInput.value = String(priceBounds.min);
  maxPriceInput.value = String(priceBounds.max);
  aplicarFiltros();
}

function bindFilterEvents() {
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', aplicarFiltros);
  });

  minPriceInput.addEventListener('input', () => {
    normalizeRangeValues('min');
    aplicarFiltros();
  });

  maxPriceInput.addEventListener('input', () => {
    normalizeRangeValues('max');
    aplicarFiltros();
  });

  clearFiltersButton.addEventListener('click', resetFilters);
}

function setupPriceBounds() {
  const prices = productos
    .map((producto) => producto.precio)
    .filter((price) => Number.isFinite(price) && price > 0);

  const minBound = prices.length ? Math.min(...prices) : 0;
  const maxBound = prices.length ? Math.max(...prices) : 1000000;

  priceBounds = { min: minBound, max: maxBound };

  minPriceInput.min = String(minBound);
  minPriceInput.max = String(maxBound);
  minPriceInput.step = String(RANGE_STEP);
  minPriceInput.value = String(minBound);

  maxPriceInput.min = String(minBound);
  maxPriceInput.max = String(maxBound);
  maxPriceInput.step = String(RANGE_STEP);
  maxPriceInput.value = String(maxBound);
}

function applyCategoryFromUrl() {
  if (!categoriaURL) {
    return;
  }

  categoryCheckboxes.forEach((checkbox) => {
    checkbox.checked = checkbox.value.toLowerCase() === categoriaURL;
  });
}

window.irProducto = irProducto;

setupPriceBounds();
bindFilterEvents();
applyCategoryFromUrl();
aplicarFiltros();