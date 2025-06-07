/**
 * script.js
 * JavaScript for Kedai Pisang Keju e-commerce page
 * Implements navigation, product modal, cart management, and toast notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  // Cart state
  let totalAmount = 0;
  let cartItems = [];

  // DOM Elements
  const cartDisplaySection = document.getElementById('cart-display');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartTotalAmount = document.getElementById('cart-total-amount');
  const cartEmptyMsg = document.getElementById('cart-empty-msg');
  const cartPayBtn = document.getElementById('cart-pay-btn');
  const cartTotalNav = document.getElementById('cart-total');

  const navBeranda = document.getElementById('nav-beranda');
  const navProduk = document.getElementById('nav-produk');
  const navKeranjang = document.getElementById('nav-keranjang');
  const navKontak = document.getElementById('nav-kontak');

  const kontakSection = document.getElementById('kontak');
  const heroSection = document.getElementById('hero');
  const produkSection = document.getElementById('produk-terbaru');

  const navLinks = document.querySelectorAll('nav ul li a');

  // Product listing and modal data (mirroring HTML)
  const products = [
    {
      title: "Pisang Keju",
      description: "Lezat dan gurih dengan keju premium.",
      price: "Rp 10.000",
      img: "/Users/user/Downloads/WhatsApp Image 2025-04-20 at 19.45.03.jpeg"
    },
    {
      title: "Pisang Coklat",
      description: "Manis dengan taburan coklat.",
      price: "Rp 10.000",
      img: "/Users/user/Downloads/WhatsApp Image 2025-04-20 at 19.45.04 (1).jpeg"
    },
    {
      title: "Pisang Keju Coklat",
      description: "Rasa kombinasi keju dan coklat yang menggoda.",
      price: "Rp 10.000",
      img: "/Users/user/Downloads/WhatsApp Image 2025-04-20 at 19.45.03 (1).jpeg"
    },
    {
      title: "Spesial Topping Double Keju",
      description: "Pisang dan kejunya lebih banyak bikin nagih.",
      price: "Rp 15.000",
      img: "/Users/user/Documents/WhatsApp Image 2025-04-20 at 19.45.04 (2).jpeg"
    },
    {
      title: "Spesial Topping Pisang Keju Coklat",
      description: "Campuran keju dan coklat yang lebih banyak.",
      price: "Rp 15.000",
      img: "/Users/user/Documents/WhatsApp Image 2025-04-20 at 19.45.04 (3).jpeg"
    }
  ];

  // Toast notification
  const toast = document.getElementById('toast');
  let toastTimeoutId = null;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    if(toastTimeoutId) clearTimeout(toastTimeoutId);
    toastTimeoutId = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // Update cart display
  function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    if (cartItems.length === 0) {
      cartEmptyMsg.hidden = false;
      cartTotalAmount.textContent = 'Total: Rp 0';
      cartTotalNav.textContent = 'Total: Rp 0';
    } else {
      cartEmptyMsg.hidden = true;
      cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.quantity > 1 ? `${item.name} x${item.quantity}` : item.name;
        cartItemsList.appendChild(li);
      });
      cartTotalAmount.textContent = 'Total: Rp ' + totalAmount.toLocaleString('id-ID');
      cartTotalNav.textContent = 'Total: Rp ' + totalAmount.toLocaleString('id-ID');
    }
  }

  // Add product to cart
  function addToCart(price, productName) {
    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ name: productName, price: price, quantity: 1 });
    }
    totalAmount += price;
    updateCartDisplay();
    showToast(`Produk "${productName}" telah ditambahkan ke keranjang.`);
  }

  // Navigation active state
  function setActiveMenu(selectedLink) {
    navLinks.forEach(a => a.classList.remove('active'));
    selectedLink.classList.add('active');
  }

  // Hide all main sections
  function hideAllMainSections() {
    heroSection.style.display = 'none';
    produkSection.style.display = 'none';
    kontakSection.style.display = 'none';
    cartDisplaySection.classList.remove('visible');
  }

  // Navigation handlers
  navBeranda.addEventListener('click', e => {
    e.preventDefault();
    hideAllMainSections();
    heroSection.style.display = 'flex';
    setActiveMenu(navBeranda);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  navProduk.addEventListener('click', e => {
    e.preventDefault();
    hideAllMainSections();
    produkSection.style.display = 'block';
    setActiveMenu(navProduk);
    produkSection.scrollIntoView({ behavior: 'smooth' });
  });

  navKeranjang.addEventListener('click', e => {
    e.preventDefault();
    hideAllMainSections();
    cartDisplaySection.classList.add('visible');
    setActiveMenu(navKeranjang);
    cartDisplaySection.scrollIntoView({ behavior: 'smooth' });
  });

  navKontak.addEventListener('click', e => {
    e.preventDefault();
    hideAllMainSections();
    kontakSection.style.display = 'block';
    setActiveMenu(navKontak);
    kontakSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Hero CTA button
  const heroCtaBtn = document.getElementById('hero-cta-btn');
  heroCtaBtn.addEventListener('click', () => {
    hideAllMainSections();
    produkSection.style.display = 'block';
    setActiveMenu(navProduk);
    produkSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Add to cart buttons
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const price = Number(btn.getAttribute('data-price'));
      const productCard = btn.closest('.product');
      const productName = productCard.querySelector('h3').textContent;
      addToCart(price, productName);
    });
  });

  // Pay button handler
  cartPayBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
      alert('Keranjang kosong! Silakan tambahkan produk terlebih dahulu.');
      return;
    }
    alert(`Total pembayaran Anda: Rp ${totalAmount.toLocaleString('id-ID')}. Terima kasih sudah berbelanja!`);
    // Clear cart after payment
    cartItems = [];
    totalAmount = 0;
    updateCartDisplay();
    cartDisplaySection.classList.remove('visible');
    setActiveMenu(navBeranda);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Product Modal
  const modal = document.getElementById('product-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalPrice = document.getElementById('modal-price');
  const btnClose = modal.querySelector('.modal-close');
  const btnPrev = document.getElementById('prev-product');
  const btnNext = document.getElementById('next-product');

  let currentProductIndex = 0;

  function openModal(index) {
    currentProductIndex = index;
    updateModalContent();
    modal.classList.add('active');
    modal.focus();
  }

  function updateModalContent() {
    const product = products[currentProductIndex];
    modalImage.src = product.img;
    modalImage.alt = product.title;
    modalTitle.textContent = product.title;
    modalDescription.textContent = product.description;
    modalPrice.textContent = product.price;
    btnPrev.disabled = currentProductIndex === 0;
    btnNext.disabled = currentProductIndex === products.length - 1;
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  // Modal control buttons
  btnPrev.addEventListener('click', () => {
    if (currentProductIndex > 0) {
      currentProductIndex--;
      updateModalContent();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentProductIndex < products.length - 1) {
      currentProductIndex++;
      updateModalContent();
    }
  });

  btnClose.addEventListener('click', closeModal);

  // Close modal by Escape key or clicking overlay
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Expose openModal function for usage if needed (e.g., add event listeners on product cards)
  // For now, you can add event listeners on product cards to open modal on click:
  document.querySelectorAll('.product').forEach(card => {
    card.addEventListener('click', () => {
      const index = Number(card.getAttribute('data-index'));
      if (!isNaN(index)) openModal(index);
    });

    // Accessibility: keyboard enter key opens modal
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const index = Number(card.getAttribute('data-index'));
        if (!isNaN(index)) openModal(index);
      }
    });
  });

  // Initialize cart display on load
  updateCartDisplay();

  // Initialize hero section as visible by default
  hideAllMainSections();
  heroSection.style.display = 'flex';
  setActiveMenu(navBeranda);
});

