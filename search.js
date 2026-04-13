const blueBlockProducts = [
  {
    id: 1,
    nombre: 'Aqua Flash WT',
    imagen: 'https://www.figma.com/api/mcp/asset/a202c083-0aee-468c-ab01-bed585b5dac4'
  },
  {
    id: 2,
    nombre: 'Purple Galaxy WAO',
    imagen: 'https://www.figma.com/api/mcp/asset/fa206d66-1b70-478d-81cd-f3e0a7dd4dc4'
  },
  {
    id: 3,
    nombre: 'Black Volt Strike FG',
    imagen: 'https://www.figma.com/api/mcp/asset/9a773fae-72a5-4816-a654-9a0b1d8a00d2'
  },
  {
    id: 4,
    nombre: 'Gold Kick Fire SSR',
    imagen: 'https://www.figma.com/api/mcp/asset/60052f18-06da-4bb6-bc9b-4451dd92ebd7'
  },
  {
    id: 5,
    nombre: 'Red Inferno MGM',
    imagen: 'https://www.figma.com/api/mcp/asset/0908fb06-d452-42de-b1ea-2ab922e25cdc'
  },
  {
    id: 6,
    nombre: 'Sio White Boa Pro',
    imagen: 'https://www.figma.com/api/mcp/asset/797dacac-bdb7-4549-9c1f-d0543d5ae775'
  },
  {
    id: 7,
    nombre: 'Asics Gel Purple Dedicate',
    imagen: 'https://www.figma.com/api/mcp/asset/6c5579a4-027b-4dc7-9567-7e0bb5e9380d'
  },
  {
    id: 8,
    nombre: 'Ascis Gel Navy Mint',
    imagen: 'https://www.figma.com/api/mcp/asset/f115ad83-5cbe-48b9-9c51-7282f13a832a'
  },
  {
    id: 9,
    nombre: 'DreamEagle Golden Sprint',
    imagen: 'https://www.figma.com/api/mcp/asset/66a62f3c-e693-4453-968a-2c74c2fc8215'
  },
  {
    id: 10,
    nombre: 'Black Neon Zeros',
    imagen: 'https://www.figma.com/api/mcp/asset/b6b2f49d-9acc-4ca9-b944-745eac8d4a4d'
  },
  {
    id: 11,
    nombre: 'North Yellow Flash',
    imagen: 'https://www.figma.com/api/mcp/asset/c2d12040-9f9b-4664-bfbc-e74e8acdb9e8'
  },
  {
    id: 12,
    nombre: 'Wilson Oran Brush',
    imagen: 'https://www.figma.com/api/mcp/asset/462ce1b7-cded-4484-b7be-89fedae2fd89'
  },
  {
    id: 13,
    nombre: 'KTM Black Road',
    imagen: 'https://www.figma.com/api/mcp/asset/3d8aa20a-f382-4cd6-9433-44d51f860595'
  },
  {
    id: 14,
    nombre: 'Yellow Thunder Sun',
    imagen: 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/00740a73b45dc6779b3ad00c98e24cea.jpg?imageMogr2/auto-orient|imageView2/2/w/800/q/70/format/webp'
  },
  {
    id: 15,
    nombre: 'Sio Black Dinamis',
    imagen: 'https://www.figma.com/api/mcp/asset/45df6c55-bc31-4c4c-8440-218c01e9a779'
  },
  {
    id: 16,
    nombre: 'Lima Starlight Run',
    imagen: 'https://www.figma.com/api/mcp/asset/2c88fcc3-2480-407d-9c73-a655ceeba7b4'
  },
  {
    id: 17,
    nombre: 'White Purple Galaxy High',
    imagen: 'https://www.figma.com/api/mcp/asset/7c5d45d6-0653-492b-93d5-3eb3a8463b93'
  },
  {
    id: 18,
    nombre: 'Wilson Naby Brush',
    imagen: 'https://www.figma.com/api/mcp/asset/3efd5271-7e13-474f-ac89-7ce5d7a74a16'
  },
  {
    id: 19,
    nombre: 'Blue Thunder Spike',
    imagen: 'https://www.figma.com/api/mcp/asset/dfdcf226-00aa-49a6-8009-bf5e6c4cae65'
  },
  {
    id: 20,
    nombre: 'Gray Black Whitred',
    imagen: 'https://www.figma.com/api/mcp/asset/20de875e-2124-4d18-8234-68966825d86b'
  }
];

const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('sugerencias');
const headerActions =
  document.getElementById('headerActions') ||
  document.querySelector('.header-actions');
const mobileSearchContainer =
  document.getElementById('mobileSearchContainer') ||
  document.querySelector('.search-container');
const mobileSearchClose =
  document.getElementById('mobileSearchClose') ||
  document.querySelector('.search-close-btn');
const mobileMediaQuery = window.matchMedia('(max-width: 768px)');

function isMobileSearchView() {
  return mobileMediaQuery.matches;
}

function setMobileSearchExpanded(expanded) {
  if (!headerActions || !mobileSearchContainer) {
    return;
  }

  headerActions.classList.toggle('search-expanded', expanded);
  mobileSearchContainer.classList.toggle('is-expanded', expanded);

  if (expanded) {
    requestAnimationFrame(() => searchInput?.focus());
  } else {
    searchInput?.blur();
    clearSuggestions();
  }
}

function closeMobileSearch() {
  if (!isMobileSearchView()) {
    return;
  }

  setMobileSearchExpanded(false);
}

function openMobileSearch() {
  if (!isMobileSearchView()) {
    return;
  }

  setMobileSearchExpanded(true);
}

function irProducto(id) {
  window.location.href = `producto.html?id=${id}`;
}

function clearSuggestions() {
  if (suggestionsContainer) {
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.classList.remove('activo');
  }
}

function renderSuggestions(results, query) {
  if (!suggestionsContainer) {
    return;
  }

  suggestionsContainer.innerHTML = '';

  if (!query) {
    suggestionsContainer.classList.remove('activo');
    return;
  }

  if (!results.length) {
    suggestionsContainer.innerHTML = '<div class="sugerencia-item sugerencia-empty">No se encontraron productos</div>';
    suggestionsContainer.classList.add('activo');
    return;
  }

  const fragment = document.createDocumentFragment();

  results.slice(0, 5).forEach((product) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'sugerencia-item';
    item.innerHTML = `<img src="${product.imagen}" alt="${product.nombre}"><span>${product.nombre}</span>`;
    item.addEventListener('click', () => irProducto(product.id));
    fragment.appendChild(item);
  });

  suggestionsContainer.appendChild(fragment);
  suggestionsContainer.classList.add('activo');
}

function filterProductsByName(value) {
  const normalizedValue = value.trim().toLowerCase();

  if (!normalizedValue) {
    clearSuggestions();
    return blueBlockProducts;
  }

  const results = blueBlockProducts.filter((product) =>
    product.nombre.toLowerCase().includes(normalizedValue)
  );

  renderSuggestions(results, normalizedValue);
  return results;
}

if (searchInput && suggestionsContainer) {
  searchInput.addEventListener('input', () => {
    filterProductsByName(searchInput.value);
  });

  searchInput.addEventListener('focus', () => {
    if (isMobileSearchView()) {
      openMobileSearch();
    }

    if (searchInput.value.trim()) {
      filterProductsByName(searchInput.value);
    }
  });

  if (mobileSearchContainer) {
    mobileSearchContainer.addEventListener('click', (event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.closest('.search-close-btn')) {
        return;
      }

      if (isMobileSearchView()) {
        openMobileSearch();
      }
    });
  }

  if (mobileSearchClose) {
    mobileSearchClose.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeMobileSearch();
    });
  }

  mobileMediaQuery.addEventListener('change', (event) => {
    if (!event.matches) {
      setMobileSearchExpanded(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileSearch();
    }
  });

  document.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const searchContainer = document.querySelector('.search-container');

    if (searchContainer && !searchContainer.contains(target)) {
      clearSuggestions();
      closeMobileSearch();
    }
  });
}

window.irProducto = irProducto;
window.blueBlockProducts = blueBlockProducts;
window.blueBlockFilterProductsByName = filterProductsByName;
