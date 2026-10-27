/**
 * NOIRÉ — Luxury Skincare Atelier
 * Vanilla JavaScript Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================
  // 1. PRODUCT DATABASE (Fictional Luxury Atelier Formulations)
  // ========================================================================
  const PRODUCTS = {
    cleanser: {
      id: 'cleanser',
      name: '01 — The Gentle Cleanser',
      priceNumber: 42,
      priceFormatted: '$42',
      volume: '150 ML • 5.1 FL OZ',
      category: 'STEP 01 — PURIFY',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      description: "A comforting, low-foaming gel-to-milk emulsion that removes impurities while honoring your skin's natural moisture barrier.",
      usage: 'Massage 2–3 pumps onto dry or damp skin with slow, upward circular motions. Introduce warm water to transform into a milky emulsion. Rinse thoroughly with water or a damp linen cloth.',
      actives: [
        'Colloidal Oat Kernel • Calms, comforts and cushions delicate skin mantles',
        'Rice Bran Infusion • Softens texture and balances natural skin lipids',
        'Cold-Pressed Jojoba Esters • Dissolves particulate matter without surface tightness'
      ],
      tags: ['pH-Balanced 5.5', 'Non-Stripping', 'Sulfate-Free', 'Fragrance-Free']
    },
    serum: {
      id: 'serum',
      name: '02 — The Daily Serum',
      priceNumber: 68,
      priceFormatted: '$68',
      volume: '30 ML • 1.0 FL OZ',
      category: 'STEP 02 — ILLUMINATE',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      description: 'A featherlight botanical elixir formulated to infuse sustained hydration and restore radiant skin harmony.',
      usage: 'Dispense 3 to 4 drops directly onto clean palms. Gently press into face, neck, and décolletage morning and evening before sealing with moisture balm.',
      actives: [
        'Multi-Molecular Hyaluronic Acid • Quenches deep epidermal moisture reservoirs',
        '5% Niacinamide (Vitamin B3) • Visibly refines pores and harmonizes uneven tone',
        'Fermented Camellia Sinensis • Potent antioxidant defense against urban stress'
      ],
      tags: ['Fast Absorbing', 'Silky Non-Sticky Finish', 'Dermatologist Evaluated', 'Vegan']
    },
    cream: {
      id: 'cream',
      name: '03 — The Barrier Cream',
      priceNumber: 58,
      priceFormatted: '$58',
      volume: '50 ML • 1.7 FL OZ',
      category: 'STEP 03 — REINFORCE',
      image: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=800&q=80',
      description: 'A rich lipid-replenishing moisture balm designed to shield against environmental stress and lock in hydration.',
      usage: 'Warm a pea-sized amount between fingertips. Smooth gently outward across cheeks, forehead, and jawline until enveloped in a comforting velvety veil.',
      actives: [
        'Triple Phytoceramide Complex • Rebuilds intercellular lipid architecture',
        'Centella Asiatica Leaf Extract • Soothes irritation and promotes calm recovery',
        'Meadowfoam Seed Oil • Seals moisture without weight or residue'
      ],
      tags: ['Rich Cream Balm', 'Non-Comedogenic', 'Restorative Lipids', 'Essential Oil-Free']
    },
    bundle: {
      id: 'bundle',
      name: 'The Curated Daily Ritual (Complete Trio)',
      priceNumber: 148,
      priceFormatted: '$148',
      volume: '3-PIECE COMPLETE RITUAL',
      category: 'THE COMPLETE SET',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
      description: 'Experience the harmonious interplay of all three foundational essentials. Includes The Gentle Cleanser, The Daily Serum, and The Barrier Cream, plus our porcelain spatula.',
      usage: 'Cleanse with Step 01, quench with Step 02, and seal with Step 03 every morning and evening.',
      actives: [
        'Complete Botanical Active Synergy (Niacinamide, Hyaluronic Matrix, Phytoceramides)',
        'Formulated to layer without pilling or excess weight'
      ],
      tags: ['Full Ritual Set', 'Complimentary Gift', 'Express Shipping Included']
    }
  };

  // State
  let cart = [];
  const FREE_SHIPPING_THRESHOLD = 75;

  // ========================================================================
  // 2. HEADER SCROLL EFFECT
  // ========================================================================
  const siteHeader = document.getElementById('site-header');
  
  const handleScroll = () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ========================================================================
  // 3. ACCESSIBLE MOBILE MENU DRAWER
  // ========================================================================
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('[data-mobile-link]');

  const openMobileMenu = () => {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('scroll-locked');
    mobileCloseBtn.focus();
  };

  const closeMobileMenu = () => {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('scroll-locked');
  };

  if (mobileToggleBtn && mobileMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      isOpen ? closeMobileMenu() : openMobileMenu();
    });

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', closeMobileMenu);
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // ========================================================================
  // 4. TOAST NOTIFICATION HUB
  // ========================================================================
  const toastHub = document.getElementById('toast-hub');

  const showToast = (title, message) => {
    if (!toastHub) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <span class="toast-tag">${title}</span>
      <span class="toast-msg">${message}</span>
    `;

    toastHub.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Automatically remove after 3.6s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }, 3600);
  };

  // ========================================================================
  // 5. PRODUCT QUICK-VIEW MODAL
  // ========================================================================
  const productModal = document.getElementById('product-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-image');
  const modalStepTag = document.getElementById('modal-step-tag');
  const modalCategory = document.getElementById('modal-category');
  const modalVolume = document.getElementById('modal-volume');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalBtnPrice = document.getElementById('modal-btn-price');
  const modalDescription = document.getElementById('modal-description');
  const modalUsage = document.getElementById('modal-usage');
  const modalActives = document.getElementById('modal-actives');
  const modalTags = document.getElementById('modal-tags');
  const modalAddBtn = document.getElementById('modal-add-btn');

  let activeModalProductId = null;

  const openProductModal = (productId) => {
    const product = PRODUCTS[productId];
    if (!product || !productModal) return;

    activeModalProductId = productId;

    // Populate data
    modalImg.src = product.image;
    modalImg.alt = product.name;
    modalStepTag.textContent = product.category;
    modalCategory.textContent = 'NOIRÉ BOTANICAL ATELIER';
    modalVolume.textContent = product.volume;
    modalTitle.textContent = product.name;
    modalPrice.textContent = product.priceFormatted;
    modalBtnPrice.textContent = product.priceFormatted;
    modalDescription.textContent = product.description;
    modalUsage.textContent = product.usage;

    // Render Actives
    modalActives.innerHTML = product.actives.map(act => `<li>${act}</li>`).join('');

    // Render Tags
    modalTags.innerHTML = product.tags.map(tag => `<span class="attr-tag">${tag}</span>`).join('');

    // Display modal
    productModal.classList.add('active');
    productModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('scroll-locked');
    modalCloseBtn.focus();
  };

  const closeProductModal = () => {
    if (!productModal) return;
    productModal.classList.remove('active');
    productModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('scroll-locked');
  };

  // Trigger buttons across page
  document.querySelectorAll('[data-discover-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pId = btn.getAttribute('data-discover-trigger');
      openProductModal(pId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProductModal);
  }

  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) {
        closeProductModal();
      }
    });
  }

  if (modalAddBtn) {
    modalAddBtn.addEventListener('click', () => {
      if (activeModalProductId) {
        addToCart(activeModalProductId);
        closeProductModal();
        openBagDrawer();
      }
    });
  }

  // ========================================================================
  // 6. RITUAL BAG DRAWER & CART ENGINE
  // ========================================================================
  const bagToggleBtn = document.getElementById('bag-toggle-btn');
  const bagDrawer = document.getElementById('bag-drawer');
  const bagCloseBtn = document.getElementById('bag-close-btn');
  const bagCountEl = document.getElementById('bag-count');
  const bagItemCountSub = document.getElementById('bag-item-count');
  const bagItemsList = document.getElementById('bag-items-list');
  const bagEmptyState = document.getElementById('bag-empty-state');
  const bagSubtotalEl = document.getElementById('bag-subtotal');
  const shippingTrackerText = document.getElementById('shipping-tracker-text');
  const shippingTrackerFill = document.getElementById('shipping-tracker-fill');
  const bagCheckoutBtn = document.getElementById('bag-checkout-btn');
  const emptyExploreBtn = document.getElementById('empty-explore-btn');

  const openBagDrawer = () => {
    if (!bagDrawer) return;
    bagDrawer.classList.add('active');
    bagDrawer.setAttribute('aria-hidden', 'false');
    if (bagToggleBtn) bagToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('scroll-locked');
    if (bagCloseBtn) bagCloseBtn.focus();
  };

  const closeBagDrawer = () => {
    if (!bagDrawer) return;
    bagDrawer.classList.remove('active');
    bagDrawer.setAttribute('aria-hidden', 'true');
    if (bagToggleBtn) bagToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('scroll-locked');
  };

  if (bagToggleBtn) {
    bagToggleBtn.addEventListener('click', openBagDrawer);
  }

  if (bagCloseBtn) {
    bagCloseBtn.addEventListener('click', closeBagDrawer);
  }

  if (bagDrawer) {
    bagDrawer.addEventListener('click', (e) => {
      if (e.target === bagDrawer) {
        closeBagDrawer();
      }
    });
  }

  if (emptyExploreBtn) {
    emptyExploreBtn.addEventListener('click', () => {
      closeBagDrawer();
    });
  }

  const addToCart = (productId) => {
    const product = PRODUCTS[productId];
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.priceNumber,
        image: product.image,
        qty: 1
      });
    }

    renderCart();
    showToast('RITUAL SELECTION', `${product.name} added to your bag`);
  };

  const updateCartQty = (productId, delta) => {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      cart[itemIndex].qty += delta;
      if (cart[itemIndex].qty <= 0) {
        cart.splice(itemIndex, 1);
      }
    }
    renderCart();
  };

  const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
  };

  const renderCart = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Update Header Badge
    if (bagCountEl) {
      bagCountEl.textContent = `(${totalItems})`;
    }
    if (bagToggleBtn) {
      bagToggleBtn.setAttribute('aria-label', `View ritual bag (${totalItems} items)`);
    }

    // Update Drawer Subtitle
    if (bagItemCountSub) {
      bagItemCountSub.textContent = totalItems === 1 ? '1 item selected' : `${totalItems} items selected`;
    }

    // Update Subtotal
    if (bagSubtotalEl) {
      bagSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    }

    // Update Shipping Progress
    if (shippingTrackerText && shippingTrackerFill) {
      if (subtotal >= FREE_SHIPPING_THRESHOLD || totalItems === 0) {
        if (totalItems === 0) {
          shippingTrackerText.textContent = `Add $${FREE_SHIPPING_THRESHOLD} for complimentary express delivery`;
          shippingTrackerFill.style.width = '0%';
        } else {
          shippingTrackerText.textContent = 'You have qualified for complimentary express delivery';
          shippingTrackerFill.style.width = '100%';
        }
      } else {
        const remaining = (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);
        const percent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
        shippingTrackerText.textContent = `Add $${remaining} more for complimentary express delivery`;
        shippingTrackerFill.style.width = `${percent}%`;
      }
    }

    // Render Items
    if (!bagItemsList) return;

    if (cart.length === 0) {
      bagItemsList.innerHTML = '';
      if (bagEmptyState) {
        bagItemsList.appendChild(bagEmptyState);
        bagEmptyState.style.display = 'flex';
      }
    } else {
      if (bagEmptyState) bagEmptyState.style.display = 'none';

      const itemsMarkup = cart.map(item => `
        <div class="bag-item-card" data-cart-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="bag-item-img">
          <div class="bag-item-details">
            <h4 class="bag-item-name">${item.name}</h4>
            <div class="bag-item-price">$${item.price}</div>
            <div class="bag-item-controls">
              <button type="button" class="bag-qty-btn" data-qty-change="${item.id}" data-delta="-1" aria-label="Decrease quantity for ${item.name}">&minus;</button>
              <span class="bag-qty-val" aria-label="Quantity">${item.qty}</span>
              <button type="button" class="bag-qty-btn" data-qty-change="${item.id}" data-delta="1" aria-label="Increase quantity for ${item.name}">&plus;</button>
              <button type="button" class="bag-remove-btn" data-remove-item="${item.id}" aria-label="Remove ${item.name}">Remove</button>
            </div>
          </div>
          <div class="bag-item-line-total">
            <strong>$${item.price * item.qty}</strong>
          </div>
        </div>
      `).join('');

      bagItemsList.innerHTML = itemsMarkup;

      // Attach Qty & Remove Listeners
      bagItemsList.querySelectorAll('[data-qty-change]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-qty-change');
          const delta = parseInt(btn.getAttribute('data-delta'), 10);
          updateCartQty(id, delta);
        });
      });

      bagItemsList.querySelectorAll('[data-remove-item]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-remove-item');
          removeFromCart(id);
        });
      });
    }
  };

  // Quick Add Buttons on Cards
  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pId = btn.getAttribute('data-add-cart');
      addToCart(pId);
      openBagDrawer();
    });
  });

  // Checkout Button Trigger
  if (bagCheckoutBtn) {
    bagCheckoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('NOTICE', 'Please select at least one essential for your ritual.');
        return;
      }
      showToast('DISPATCH INITIATED', 'Connecting to secure European checkout enclave...');
      setTimeout(() => {
        alert('Thank you for choosing NOIRÉ. In this atelier demonstration, orders are simulated. Your selection has been prepared for dispatch.');
        cart = [];
        renderCart();
        closeBagDrawer();
      }, 700);
    });
  }

  // ========================================================================
  // 7. CONCIERGE / CONTACT MODAL
  // ========================================================================
  const contactModal = document.getElementById('contact-modal');
  const contactCloseBtn = document.getElementById('contact-close-btn');
  const contactTrigger = document.getElementById('contact-trigger');
  const contactForm = document.getElementById('contact-form');
  const contactFeedback = document.getElementById('contact-feedback');

  const openContactModal = () => {
    if (!contactModal) return;
    contactModal.classList.add('active');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('scroll-locked');
    if (contactCloseBtn) contactCloseBtn.focus();
  };

  const closeContactModal = () => {
    if (!contactModal) return;
    contactModal.classList.remove('active');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('scroll-locked');
  };

  if (contactTrigger) {
    contactTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
  }

  if (contactCloseBtn) {
    contactCloseBtn.addEventListener('click', closeContactModal);
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeContactModal();
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const msg = document.getElementById('contact-message').value.trim();

      if (!name || !email || !msg) {
        contactFeedback.textContent = 'Please complete all required fields.';
        contactFeedback.className = 'form-feedback error';
        return;
      }

      contactFeedback.textContent = 'Thank you, your dispatch has been received. Our concierge will reply within 24 hours.';
      contactFeedback.className = 'form-feedback success';
      contactForm.reset();

      setTimeout(() => {
        closeContactModal();
        contactFeedback.textContent = '';
      }, 2500);
    });
  }

  // ========================================================================
  // 8. NEWSLETTER SUBSCRIPTION FORM
  // ========================================================================
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterInput = document.getElementById('newsletter-email');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        newsletterFeedback.textContent = 'Please provide a valid email address.';
        newsletterFeedback.className = 'newsletter-message error';
        return;
      }

      newsletterFeedback.textContent = 'You are now subscribed to The NOIRÉ Gazette. Welcome.';
      newsletterFeedback.className = 'newsletter-message success';
      newsletterForm.reset();
      showToast('GAZETTE DISPATCH', 'Welcome to the NOIRÉ editorial collective.');

      setTimeout(() => {
        newsletterFeedback.textContent = '';
      }, 5000);
    });
  }

  // ========================================================================
  // 9. LEGAL MODALS / NOTICES (Privacy, Terms, Cookies)
  // ========================================================================
  const legalPrivacy = document.getElementById('legal-privacy');
  const legalTerms = document.getElementById('legal-terms');
  const legalCookies = document.getElementById('legal-cookies');

  const showLegalNotice = (title, text) => {
    alert(`${title}\n\n${text}`);
  };

  if (legalPrivacy) {
    legalPrivacy.addEventListener('click', (e) => {
      e.preventDefault();
      showLegalNotice(
        'NOIRÉ Privacy Directive',
        'We adhere to rigorous European GDPR standards. Your data is never sold, shared, or exploited. We collect only essential dispatch logistics to honor your ritual deliveries.'
      );
    });
  }

  if (legalTerms) {
    legalTerms.addEventListener('click', (e) => {
      e.preventDefault();
      showLegalNotice(
        'NOIRÉ Terms of Service',
        'Every NOIRÉ product is formulated and packaged in limited botanical batches. We extend a 30-day gentle ritual guarantee on all direct orders.'
      );
    });
  }

  if (legalCookies) {
    legalCookies.addEventListener('click', (e) => {
      e.preventDefault();
      showLegalNotice(
        'Cookie Preferences',
        'NOIRÉ utilizes only essential session cookies for preserving your ritual bag choices and accessibility preferences. No third-party ad tracking.'
      );
    });
  }

  // ========================================================================
  // 10. GLOBAL KEYBOARD ACCESSIBILITY (ESC Key Handler)
  // ========================================================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
      if (productModal && productModal.classList.contains('active')) {
        closeProductModal();
      }
      if (bagDrawer && bagDrawer.classList.contains('active')) {
        closeBagDrawer();
      }
      if (contactModal && contactModal.classList.contains('active')) {
        closeContactModal();
      }
    }
  });

  // Initial render
  renderCart();
});
