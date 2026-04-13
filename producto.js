const productos = {
  1: {
    nombre: 'Aqua Flash WT',
    precio: 322000,
    imagen: 'https://www.figma.com/api/mcp/asset/a202c083-0aee-468c-ab01-bed585b5dac4',
    categoria: 'FOOTBALL',
    rating: '4.7 (186)'
  },
  2: {
    nombre: 'Purple Galaxy WAO',
    precio: 470000,
    imagen: 'https://www.figma.com/api/mcp/asset/fa206d66-1b70-478d-81cd-f3e0a7dd4dc4',
    categoria: 'FOOTBALL',
    rating: '4.7 (186)'
  },
  3: {
    nombre: 'Black Volt Strike FG',
    precio: 445000,
    imagen: 'https://www.figma.com/api/mcp/asset/9a773fae-72a5-4816-a654-9a0b1d8a00d2',
    categoria: 'FOOTBALL',
    rating: '4.8 (234)'
  },
  4: {
    nombre: 'Gold Kick Fire SSR',
    precio: 750000,
    imagen: 'https://www.figma.com/api/mcp/asset/60052f18-06da-4bb6-bc9b-4451dd92ebd7',
    categoria: 'FOOTBALL',
    rating: '5.0 (319)'
  },
  5: {
    nombre: 'Red Inferno MGM',
    precio: 742000,
    imagen: 'https://www.figma.com/api/mcp/asset/0908fb06-d452-42de-b1ea-2ab922e25cdc',
    categoria: 'BASKETBALL',
    rating: '4.8 (312)'
  },
  6: {
    nombre: 'Sio White Boa Pro',
    precio: 701000,
    imagen: 'https://www.figma.com/api/mcp/asset/797dacac-bdb7-4549-9c1f-d0543d5ae775',
    categoria: 'CYCLING',
    rating: '4.8 (312)'
  },
  7: {
    nombre: 'Asics Gel Purple Dedicate',
    precio: 720000,
    imagen: 'https://www.figma.com/api/mcp/asset/6c5579a4-027b-4dc7-9567-7e0bb5e9380d',
    categoria: 'TENIS',
    rating: '4.7 (312)'
  },
  8: {
    nombre: 'Ascis Gel Navy Mint',
    precio: 720000,
    imagen: 'https://www.figma.com/api/mcp/asset/f115ad83-5cbe-48b9-9c51-7282f13a832a',
    categoria: 'TENIS',
    rating: '4.7 (312)'
  },
  9: {
    nombre: 'DreamEagle Golden Sprint',
    precio: 590000,
    imagen: 'https://www.figma.com/api/mcp/asset/66a62f3c-e693-4453-968a-2c74c2fc8215',
    categoria: 'ATHLETICS',
    rating: '4.8 (312)'
  },
  10: {
    nombre: 'Black Neon Zeros',
    precio: 822000,
    imagen: 'https://www.figma.com/api/mcp/asset/b6b2f49d-9acc-4ca9-b944-745eac8d4a4d',
    categoria: 'BASKETBALL',
    rating: '4.8 (312)'
  },
  11: {
    nombre: 'North Yellow Flash',
    precio: 750000,
    imagen: 'https://www.figma.com/api/mcp/asset/c2d12040-9f9b-4664-bfbc-e74e8acdb9e8',
    categoria: 'CYCLING',
    rating: '4.8 (312)'
  },
  12: {
    nombre: 'Wilson Oran Brush',
    precio: 580000,
    imagen: 'https://www.figma.com/api/mcp/asset/462ce1b7-cded-4484-b7be-89fedae2fd89',
    categoria: 'TENIS',
    rating: '4.7 (312)'
  },
  13: {
    nombre: 'KTM Black Road',
    precio: 810000,
    imagen: 'https://www.figma.com/api/mcp/asset/3d8aa20a-f382-4cd6-9433-44d51f860595',
    categoria: 'CYCLING',
    rating: '4.8 (312)'
  },
  14: {
    nombre: 'Yellow Thunder Sun',
    precio: 630000,
    imagen: 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/00740a73b45dc6779b3ad00c98e24cea.jpg?imageMogr2/auto-orient|imageView2/2/w/800/q/70/format/webp',
    categoria: 'BASKETBALL',
    rating: '4.8 (312)'
  },
  15: {
    nombre: 'Sio Black Dinamis',
    precio: 690000,
    imagen: 'https://www.figma.com/api/mcp/asset/45df6c55-bc31-4c4c-8440-218c01e9a779',
    categoria: 'ATHLETICS',
    rating: '4.8 (312)'
  },
  16: {
    nombre: 'Lima Starlight Run',
    precio: 660900,
    imagen: 'https://www.figma.com/api/mcp/asset/2c88fcc3-2480-407d-9c73-a655ceeba7b4',
    categoria: 'ATHLETICS',
    rating: '4.8 (312)'
  },
  17: {
    nombre: 'White Purple Galaxy High',
    precio: 721000,
    imagen: 'https://www.figma.com/api/mcp/asset/7c5d45d6-0653-492b-93d5-3eb3a8463b93',
    categoria: 'BASKETBALL',
    rating: '4.8 (312)'
  },
  18: {
    nombre: 'Wilson Naby Brush',
    precio: 670000,
    imagen: 'https://www.figma.com/api/mcp/asset/3efd5271-7e13-474f-ac89-7ce5d7a74a16',
    categoria: 'TENIS',
    rating: '4.8 (312)'
  },
  19: {
    nombre: 'Blue Thunder Spike',
    precio: 510000,
    imagen: 'https://www.figma.com/api/mcp/asset/dfdcf226-00aa-49a6-8009-bf5e6c4cae65',
    categoria: 'ATHLETICS',
    rating: '4.8 (312)'
  },
  20: {
    nombre: 'Gray Black Whitred',
    precio: 910000,
    imagen: 'https://www.figma.com/api/mcp/asset/20de875e-2124-4d18-8234-68966825d86b',
    categoria: 'BASKETBALL',
    rating: '4.8 (312)'
  }
};

const searchParams = new URLSearchParams(window.location.search);
const productId = Number(searchParams.get('id'));
const productoSeleccionado = productos[productId] || productos[1];

const productNameEl = document.getElementById('product-name');
const productCategoryEl = document.getElementById('product-category');
const productPriceEl = document.getElementById('product-price');
const productImgEl = document.getElementById('product-img');
const productRatingEl = document.getElementById('product-rating');
const productStarsEl = document.getElementById('product-stars');
const quantityValueEl = document.getElementById('quantity-value');
const totalValueEl = document.getElementById('total-value');
const increaseBtn = document.getElementById('increase-qty');
const decreaseBtn = document.getElementById('decrease-qty');
const sizeButtons = document.querySelectorAll('.size-pill');
const addToCartBtn = document.querySelector('.add-to-cart-btn');

const CART_STORAGE_KEY = 'blueblock_cart';

let quantity = 1;

function formatCop(value) {
  return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

function getStarTextFromRating(ratingText) {
  const numericRating = Number.parseFloat(ratingText);
  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return `${'★'.repeat(fullStars)}${hasHalfStar ? '☆' : ''}${'☆'.repeat(emptyStars)}`;
}

function renderProduct(producto) {
  productNameEl.textContent = producto.nombre;
  productCategoryEl.textContent = producto.categoria;
  productPriceEl.textContent = `${formatCop(producto.precio)} COP`;
  productRatingEl.textContent = producto.rating;
  productStarsEl.textContent = getStarTextFromRating(producto.rating);

  productImgEl.src = producto.imagen;
  productImgEl.alt = producto.nombre;

  document.title = `${producto.nombre} - Blue Block`;
}

function updateTotal() {
  totalValueEl.textContent = formatCop(productoSeleccionado.precio * quantity);
  quantityValueEl.textContent = String(quantity);
}

function getCategoryInSpanish(category) {
  const categories = {
    FOOTBALL: 'FUTBOL',
    BASKETBALL: 'BASKET',
    CYCLING: 'CICLISMO',
    ATHLETICS: 'ATLETISMO',
    TENIS: 'TENIS'
  };

  return categories[category] || category;
}

function getSelectedSize() {
  const activeSize = document.querySelector('.size-pill.is-active');
  return activeSize ? activeSize.textContent.trim() : '7';
}

function readCart() {
  try {
    const rawCart = localStorage.getItem(CART_STORAGE_KEY);
    return rawCart ? JSON.parse(rawCart) : [];
  } catch (error) {
    return [];
  }
}

function addToCart() {
  const selectedSize = getSelectedSize();
  const cart = readCart();

  const existingProduct = cart.find(
    (item) => item.nombre === productoSeleccionado.nombre && item.talla === selectedSize
  );

  if (existingProduct) {
    existingProduct.cantidad += quantity;
  } else {
    cart.push({
      id: `${productId}-${selectedSize}`,
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      imagen: productoSeleccionado.imagen,
      categoria: getCategoryInSpanish(productoSeleccionado.categoria),
      cantidad: quantity,
      talla: selectedSize
    });
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.location.href = 'carrito.html';
}

increaseBtn.addEventListener('click', () => {
  quantity += 1;
  updateTotal();
});

decreaseBtn.addEventListener('click', () => {
  if (quantity > 1) {
    quantity -= 1;
    updateTotal();
  }
});

sizeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    sizeButtons.forEach((item) => {
      item.classList.remove('is-active');
      item.setAttribute('aria-pressed', 'false');
    });

    button.classList.add('is-active');
    button.setAttribute('aria-pressed', 'true');
  });
});

if (addToCartBtn) {
  addToCartBtn.addEventListener('click', addToCart);
}

renderProduct(productoSeleccionado);
updateTotal();