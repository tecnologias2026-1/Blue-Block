const brandFilters = document.querySelectorAll(".filter-brand");
const priceFilters = document.querySelectorAll(".filter-price");
const sortSelect = document.querySelector(".sort-select");
const productsContainer = document.querySelector(".products-grid");

// 🔥 guardar orden original
const originalOrder = Array.from(document.querySelectorAll(".product-card"));

function filterAndSortProducts() {
  let productsArray = Array.from(originalOrder);

  // ===== FILTROS =====
  const selectedBrands = Array.from(brandFilters)
    .filter(f => f.checked)
    .map(f => f.value);

  const selectedPrices = Array.from(priceFilters)
    .filter(f => f.checked)
    .map(f => f.value);

  productsArray = productsArray.filter(product => {
    const brand = product.dataset.brand;
    const price = parseFloat(product.dataset.price);

    const matchBrand =
      selectedBrands.length === 0 || selectedBrands.includes(brand);

    const matchPrice =
      selectedPrices.length === 0 ||
      selectedPrices.some(range => {
        const [min, max] = range.split("-").map(Number);
        return price >= min && price <= max;
      });

    return matchBrand && matchPrice;
  });

  // ===== ORDENAMIENTO =====
  if (sortSelect.value === "price-asc") {
    productsArray.sort((a, b) => {
      return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
    });
  } 
  else if (sortSelect.value === "price-desc") {
    productsArray.sort((a, b) => {
      return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
    });
  }
  // 🔥 si es "default" → usa orden original (no hacemos nada)

  // ===== RENDER =====
  productsContainer.innerHTML = "";

  productsArray.forEach(product => {
    product.style.display = "block";
    productsContainer.appendChild(product);
  });
}

// ===== EVENTOS =====
brandFilters.forEach(f => f.addEventListener("change", filterAndSortProducts));
priceFilters.forEach(f => f.addEventListener("change", filterAndSortProducts));
sortSelect.addEventListener("change", filterAndSortProducts);