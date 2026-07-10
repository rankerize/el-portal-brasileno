

// lista de productos oficiales (cargados dinámicamente desde WordPress / cms.js)
let products = [];

// Estado global de la aplicación (Carrito)
let cart = JSON.parse(localStorage.getItem('portal_cart')) || [];

// Referencias para devolver el foco al cerrar carrito/modal (accesibilidad de teclado)
let lastFocusedBeforeCart = null;
let lastFocusedBeforeModal = null;

// Elementos del DOM
const menuGrid = document.getElementById('menu-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartIcon = document.getElementById('cart-icon-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalElement = document.getElementById('cart-total');
const cartCountBadge = document.getElementById('cart-count');
const whatsappOrderBtn = document.getElementById('whatsapp-order-btn');
const productModalOverlay = document.getElementById('product-modal-overlay');
const closeModalBtn = document.getElementById('close-modal');
const heroVideo = document.querySelector('.hero-video-bg');
const navTriggerBtn = document.getElementById('nav-trigger-btn');
const navLinksList = document.getElementById('nav-links-list');

// Inicializar Aplicación
document.addEventListener('DOMContentLoaded', async () => {
  // Cargar productos
  products = await CMS.getProducts();
  
  renderMenu('all');
  
  // Cargar sedes y promociones desde la API/Fallback
  await initSedesAndPromos();
  
  updateCartUI();
  setupEventListeners();
  initTheme();
  initScrollEffects();
});

// Registrar eventos
function setupEventListeners() {
  // Filtros de menú
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      e.target.classList.add('active');
      e.target.setAttribute('aria-pressed', 'true');
      const category = e.target.dataset.filter;
      renderMenu(category);
    });
  });

  // Drawer de Carrito
  cartIcon.addEventListener('click', () => openCart(cartIcon));
  closeCartBtn.addEventListener('click', () => closeCart());
  cartOverlay.addEventListener('click', () => closeCart());

  // Modal de Detalle
  closeModalBtn.addEventListener('click', closeModal);
  productModalOverlay.addEventListener('click', (e) => {
    if (e.target === productModalOverlay) closeModal();
  });

  // Enviar pedido por WhatsApp
  whatsappOrderBtn.addEventListener('click', sendOrderToWhatsApp);

  // Menú móvil (hamburguesa)
  if (navTriggerBtn && navLinksList) {
    navTriggerBtn.addEventListener('click', () => {
      const isOpen = navLinksList.classList.toggle('nav-open');
      navTriggerBtn.setAttribute('aria-expanded', String(isOpen));
      navTriggerBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    });

    // Cerrar el menú móvil al seleccionar un enlace
    navLinksList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('nav-open');
        navTriggerBtn.setAttribute('aria-expanded', 'false');
        navTriggerBtn.setAttribute('aria-label', 'Abrir menú de navegación');
      });
    });
  }

  // Cerrar carrito/modal/menú móvil con la tecla Escape (accesibilidad de teclado)
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (productModalOverlay.classList.contains('show')) {
      closeModal();
    } else if (cartDrawer.classList.contains('open')) {
      closeCart();
    } else if (navLinksList && navLinksList.classList.contains('nav-open')) {
      navLinksList.classList.remove('nav-open');
      navTriggerBtn.setAttribute('aria-expanded', 'false');
      navTriggerBtn.setAttribute('aria-label', 'Abrir menú de navegación');
      navTriggerBtn.focus();
    }
  });
}

// Inicializar Tema (Siempre Claro)
function initTheme() {
  document.documentElement.setAttribute('data-theme', 'light');
}

function initScrollEffects() {
  const revealTargets = document.querySelectorAll('.menu-section, .promo-futbol-section, .about-section, .recipes-section, .location-section, .features');

  revealTargets.forEach((section, index) => {
    section.classList.add('scroll-reveal');
    section.dataset.revealDelay = String(index % 4);
    section.classList.add('is-visible');
  });
}

// Renderizar el menú en pantalla
function renderMenu(categoryFilter) {
  menuGrid.innerHTML = '';
  
  const filteredProducts = categoryFilter === 'all' 
    ? products 
    : products.filter(p => p.category === categoryFilter);

  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'menu-item-card';
    card.innerHTML = `
      <div class="menu-item-img-container">
        ${product.badge ? `<span class="menu-item-badge">${product.badge}</span>` : ''}
        <img src="${product.image}" alt="${product.name}" class="menu-item-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80'">
      </div>
      <div class="menu-item-content">
        <div class="menu-item-title-row">
          <h3 class="menu-item-title">${product.name}</h3>
          <span class="menu-item-price">$${formatPrice(product.price)}</span>
        </div>
        <p class="menu-item-desc">${truncateText(product.desc, 90)}</p>
        <div class="menu-item-footer">
          <button class="btn btn-outline btn-sm" onclick="openProductDetail(${product.id})" aria-label="Ver detalles de ${product.name}" style="padding: 8px 16px; font-size: 0.85rem;">Detalles</button>
          <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})" aria-label="Agregar ${product.name} al pedido" style="padding: 8px 16px; font-size: 0.85rem;">Agregar</button>
        </div>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}

// Controladores del Carrito
function openCart(trigger) {
  lastFocusedBeforeCart = trigger || document.activeElement;
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('show');
  closeCartBtn.focus();
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('show');
  if (lastFocusedBeforeCart && typeof lastFocusedBeforeCart.focus === 'function') {
    lastFocusedBeforeCart.focus();
  }
  lastFocusedBeforeCart = null;
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartUI();

  // Pequeña micro-animación en el botón del carrito
  cartIcon.classList.add('pulse');
  setTimeout(() => cartIcon.classList.remove('pulse'), 500);

  // Abrir el carrito automáticamente al agregar un producto
  if (!cartDrawer.classList.contains('open')) {
    openCart(document.activeElement);
  }
}

function updateCartUI() {
  cartItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-message">
        <i class="fas fa-shopping-bag" style="font-size: 3rem; color: var(--color-gray-border); margin-bottom: 16px;"></i>
        <p>Tu carrito está vacío</p>
        <p style="font-size: 0.85rem; margin-top: 8px;">¡Agrega nuestros deliciosos sándwiches y hamburguesas!</p>
      </div>
    `;
    cartTotalElement.textContent = '$0';
    cartCountBadge.textContent = '0';
    whatsappOrderBtn.disabled = true;
    return;
  }

  let total = 0;
  let itemCount = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    itemCount += item.qty;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80'">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${formatPrice(item.price)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)" aria-label="Quitar una unidad de ${item.name}">-</button>
          <span aria-live="polite">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)" aria-label="Agregar una unidad de ${item.name}">+</button>
        </div>
        <button class="remove-item" onclick="removeFromCart(${item.id})" aria-label="Eliminar ${item.name} del pedido">Eliminar</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotalElement.textContent = `$${formatPrice(total)}`;
  cartCountBadge.textContent = itemCount;
  whatsappOrderBtn.disabled = false;
}

function changeQty(productId, amount) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.qty += amount;
    if (item.qty <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartUI();
    }
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('portal_cart', JSON.stringify(cart));
}

// Modal de detalles
function openProductDetail(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  lastFocusedBeforeModal = document.activeElement;

  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');
  const modalPrice = document.getElementById('modal-price');
  const modalDetailsContainer = document.getElementById('modal-details-list');
  const modalActionBtn = document.getElementById('modal-action-btn');

  modalTitle.textContent = product.name;
  modalImage.src = product.image;
  modalImage.onerror = () => { modalImage.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80'; };
  modalDescription.textContent = product.desc;
  modalPrice.textContent = `$${formatPrice(product.price)} COP`;
  
  modalDetailsContainer.innerHTML = `
    <div class="modal-detail-item">
      <span>Categoría:</span>
      <strong style="text-transform: capitalize;">${product.category === 'sandwiches' ? 'Sándwich' : product.category}</strong>
    </div>
    <div class="modal-detail-item">
      <span>Saludable:</span>
      <strong style="color: var(--color-primary);">${product.healthy}</strong>
    </div>
    <div class="modal-detail-item">
      <span>Calidad:</span>
      <strong style="color: var(--color-dark);">Máxima Calidad Garantizada</strong>
    </div>
  `;

  modalActionBtn.onclick = () => {
    addToCart(product.id);
    closeModal();
  };

  productModalOverlay.classList.add('show');
  closeModalBtn.focus();
}

function closeModal() {
  productModalOverlay.classList.remove('show');
  if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
    lastFocusedBeforeModal.focus();
  }
  lastFocusedBeforeModal = null;
}

// Enlace de Pedido a WhatsApp
function sendOrderToWhatsApp() {
  if (cart.length === 0) return;

  const phoneNumber = '573059248921'; // Teléfono real de contacto de El Portal Brasileño en Bogotá, Colombia
  let message = `🍔 *Pedido de El Portal Brasileño* 🥪\n\nHola, me gustaría realizar el siguiente pedido:\n\n`;

  let total = 0;
  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    message += `• *${item.qty}x* ${item.name} ($${formatPrice(item.price)} c/u)\n`;
  });

  message += `\n💵 *Total a Pagar:* $${formatPrice(total)} COP\n`;
  message += `📍 *Sede:* Por favor indícame si prefieres Subazar (Suba) o Ciudad Montes\n\n_Por favor confirmarme tiempo de preparación y entrega. ¡Gracias!_`;

  // Codificar URL del mensaje
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Abrir en nueva pestaña
  window.open(whatsappUrl, '_blank');
  
  // Opcional: Vaciar carrito tras pedir
  cart = [];
  saveCart();
  updateCartUI();
  closeCart();
}

// Helper: Formatear precios (ej. 17000 -> 17.000)
function formatPrice(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Helper: Recortar texto largo
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

// Agregar estilos CSS inyectados para efectos rápidos
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); box-shadow: 0 0 15px var(--color-primary); }
    100% { transform: scale(1); }
  }
  .pulse {
    animation: pulse 0.5s ease;
  }
`;
document.head.appendChild(style);

// Cargar Sedes y Promociones dinámicamente desde WordPress / fallback
async function initSedesAndPromos() {
  const sedesContainer = document.getElementById('sedes-container');
  if (sedesContainer) {
    const sedesList = await CMS.getSedes();
    sedesContainer.innerHTML = '';
    
    sedesList.forEach((sede, index) => {
      const isEven = index % 2 === 0;
      const marginStyle = isEven && index < sedesList.length - 1 ? 'margin-bottom: 60px;' : '';
      
      const valPhone = sede.phone ? SedeCleanPhone(sede.phone) : '3059248921';
      
      const sedeCard = document.createElement('div');
      sedeCard.className = 'sede-wrapper';
      sedeCard.innerHTML = `
        <h3 style="font-size: 1.4rem; margin-bottom: 20px; font-weight: bold;">${sede.name}</h3>
        <div class="location-grid" style="${marginStyle}">
          <div class="location-info-card">
            <div>
              <!-- Item Dirección -->
              <div class="contact-item">
                <div class="contact-item-icon"><i class="fas fa-map-marker-alt"></i></div>
                <div class="contact-item-text">
                  <h4>Dirección</h4>
                  <p>${sede.address}</p>
                </div>
              </div>

              <!-- Item Teléfono -->
              <div class="contact-item">
                <div class="contact-item-icon"><i class="fas fa-phone-alt"></i></div>
                <div class="contact-item-text">
                  <h4>Teléfono & Domicilios</h4>
                  <p>${sede.phone}</p>
                </div>
              </div>

              <!-- Item Horario -->
              <div class="contact-item">
                <div class="contact-item-icon"><i class="fas fa-clock"></i></div>
                <div class="contact-item-text">
                  <h4>Horario de Atención</h4>
                  <p>${sede.hours.join('<br>')}</p>
                </div>
              </div>
            </div>

            <a href="tel:${valPhone}" class="btn btn-outline" style="width: 100%;"><i class="fas fa-phone-alt" style="margin-right: 8px;"></i> Llamar Ahora</a>
          </div>

          <div class="map-wrapper">
            <iframe
              src="${sede.mapUrl}"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      `;
      sedesContainer.appendChild(sedeCard);
    });
  }

  // Banners y Promociones
  const promos = await CMS.getPromotions();
  if (promos && promos.length > 0) {
    const promo = promos[0]; // Tomamos la promo principal activa
    
    // Si queremos actualizar el texto de la barra de anuncios fija
    const promoTopBar = document.querySelector('.top-promo-bar p');
    if (promoTopBar) {
      promoTopBar.innerHTML = `⚽ ¡${promo.title}! ${promo.subtitle} ⚽`;
    }
    
    // Si queremos actualizar la sección de promo futbolera
    const futbolBadge = document.querySelector('.futbol-badge');
    const futbolTitle = document.querySelector('.futbol-title');
    const futbolDesc = document.querySelector('.futbol-desc');
    const banner = document.querySelector('.futbol-banner');
    
    if (futbolBadge) futbolBadge.innerHTML = `<i class="fas fa-futbol"></i> ${promo.badge}`;
    if (futbolTitle) futbolTitle.innerHTML = promo.title;
    if (futbolDesc) futbolDesc.innerHTML = promo.subtitle;
    if (banner && promo.bgGradient) {
      banner.style.background = promo.bgGradient;
    }
  }
}

// Auxiliar para limpiar teléfonos
function SedeCleanPhone(phone) {
  return phone.replace(/\D/g, '');
}
