const productCards = document.querySelectorAll('.product-card');
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

function setupProductCards() {
  productCards.forEach((card, index) => {
    const productName = card.querySelector('h3')?.textContent?.trim() || `Producto ${index + 1}`;
    const productId = index + 1;
    const productPrice = parsePriceFromCard(card);

    card.dataset.productId = String(productId);
    card.dataset.price = String(productPrice);

    if (!card.querySelector('.product-card-link')) {
      const cardLink = document.createElement('a');
      cardLink.href = `producto.html?id=${productId}`;
      cardLink.className = 'product-card-link';
      cardLink.setAttribute('aria-label', `Ver detalle de ${productName}`);
      card.appendChild(cardLink);
    }
  });

  const prices = Array.from(productCards)
    .map((card) => Number(card.dataset.price || '0'))
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

  updatePriceUI(minBound, maxBound);
}

function formatCop(value) {
  return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
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

function applyFilters() {
  const selectedCategories = Array.from(categoryCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const minPrice = Number(minPriceInput.value || priceBounds.min);
  const maxPrice = Number(maxPriceInput.value || priceBounds.max);

  updatePriceUI(minPrice, maxPrice);

  productCards.forEach((card) => {
    const category = card.dataset.category || '';
    const price = Number(card.dataset.price || '0');

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
    const matchesPrice = price >= minPrice && price <= maxPrice;

    card.style.display = matchesCategory && matchesPrice ? 'block' : 'none';
  });
}

function resetFilters() {
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  minPriceInput.value = String(priceBounds.min);
  maxPriceInput.value = String(priceBounds.max);
  updatePriceUI(priceBounds.min, priceBounds.max);
  applyFilters();
}

function bindFilterEvents() {
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', applyFilters);
  });

  minPriceInput.addEventListener('input', () => {
    normalizeRangeValues('min');
    applyFilters();
  });

  maxPriceInput.addEventListener('input', () => {
    normalizeRangeValues('max');
    applyFilters();
  });

  clearFiltersButton.addEventListener('click', resetFilters);
}

function applyCategoryFromUrl() {
  if (!categoriaURL) {
    return;
  }

  categoryCheckboxes.forEach((checkbox) => {
    checkbox.checked = checkbox.value.toLowerCase() === categoriaURL;
  });
}

setupProductCards();
bindFilterEvents();
applyCategoryFromUrl();
applyFilters();