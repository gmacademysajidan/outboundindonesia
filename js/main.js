// Wisata Agro Wonosari – Main JS v3.0 Premium
// Handles: Smart Navbar, Back-To-Top, Scroll Reveal, Counter Animation, Article Search

document.addEventListener('DOMContentLoaded', function () {

  /* ========================================================
     1. SMART NAVBAR – Hide on scroll down, show on scroll up
     ======================================================== */
  const navbar = document.querySelector('.navbar-custom');
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const currentY = window.scrollY;

        if (navbar) {
          // Always visible at top (Sticky Navbar)
          navbar.style.transform = 'none';
          if (currentY > 50) {
            navbar.style.boxShadow = '0 4px 28px rgba(42, 4, 10, 0.55)';
          } else {
            navbar.style.boxShadow = '0 4px 20px rgba(42, 4, 10, 0.35)';
          }
        }

        // Back-to-top visibility
        const btn = document.getElementById('backToTopBtn');
        if (btn) {
          if (currentY > 380) btn.classList.add('show');
          else btn.classList.remove('show');
        }

        lastScrollY = currentY;
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ========================================================
     1b. MOBILE OFFCANVAS NAVIGATION DRAWER & COLLAPSIBLE DROPDOWN
     ======================================================== */
  
  // Dynamic Offcanvas Drawer markup injector & handler
  function ensureMobileOffcanvasMarkup() {
    let backdrop = document.getElementById('mobileOffcanvasBackdrop');
    let drawer = document.getElementById('mobileOffcanvasDrawer');

    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'mobileOffcanvasBackdrop';
      backdrop.className = 'mobile-offcanvas-backdrop';
      document.body.appendChild(backdrop);
    }

    if (!drawer) {
      drawer = document.createElement('aside');
      drawer.id = 'mobileOffcanvasDrawer';
      drawer.className = 'mobile-offcanvas-drawer';
      drawer.setAttribute('aria-label', 'Navigasi Mobile');
      drawer.innerHTML = `
        <div class="mobile-offcanvas-header">
          <div class="mobile-offcanvas-brand">
            <i class="fa-solid fa-leaf text-gold fs-5"></i>
            <div class="d-flex flex-column" style="line-height:1.2;">
              <span class="fw-bold text-white fs-6">OUTBOUND INDONESIA</span>
              <small class="text-gold text-uppercase" style="font-size: 0.6rem; letter-spacing: 0.5px;">PRO &amp; ENTERTAINMENT</small>
            </div>
          </div>
          <button type="button" class="mobile-offcanvas-close-btn" id="mobileMenuCloseBtn" aria-label="Tutup Menu">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="mobile-offcanvas-body">
          <ul class="mobile-nav-list">
            <li class="mobile-nav-item">
              <a class="mobile-nav-link" href="/">
                <i class="fa-solid fa-house me-3 text-gold"></i>Beranda
              </a>
            </li>
            <li class="mobile-nav-item">
              <a class="mobile-nav-link" href="tentang.html">
                <i class="fa-solid fa-circle-info me-3 text-gold"></i>Tentang Kami
              </a>
            </li>

            <!-- Collapsible Dropdown for 'Paket Outbound' -->
            <li class="mobile-nav-item mobile-dropdown-item">
              <div class="mobile-dropdown-trigger">
                <a href="paket.html" class="mobile-nav-link mobile-dropdown-link-main">
                  <i class="fa-solid fa-boxes-packing me-3 text-gold"></i>Paket Outbound
                </a>
                <button type="button" class="mobile-dropdown-toggle-btn" id="mobilePaketToggleBtn" aria-expanded="false" aria-label="Buka Submenu Paket">
                  <i class="fa-solid fa-chevron-right dropdown-arrow-icon"></i>
                </button>
              </div>

              <div class="mobile-submenu-wrapper" id="mobilePaketSubmenu">
                <ul class="mobile-submenu-list">
                  <li>
                    <a href="paket.html" class="mobile-submenu-item highlight-gold">
                      <i class="fa-solid fa-layer-group me-2"></i>Lihat Semua Paket
                    </a>
                  </li>
                  <li>
                    <a href="Outbound-Team-Building-Corporate-Malang.html" class="mobile-submenu-item">
                      <i class="fa-solid fa-briefcase me-2"></i>Corporate Team Building
                    </a>
                  </li>
                  <li>
                    <a href="Fun-Outbound-Malang.html" class="mobile-submenu-item">
                      <i class="fa-solid fa-face-smile me-2"></i>Fun Outbound Games
                    </a>
                  </li>
                  <li>
                    <a href="Outbound-Sekolah-dan-Mahasiswa-Malang.html" class="mobile-submenu-item">
                      <i class="fa-solid fa-graduation-cap me-2"></i>Outbound Sekolah & Mahasiswa
                    </a>
                  </li>
                  <li>
                    <a href="Paintball-Full-Combat-Malang.html" class="mobile-submenu-item">
                      <i class="fa-solid fa-crosshairs me-2"></i>Paintball Combat
                    </a>
                  </li>
                  <li>
                    <a href="Rafting-Arung-Jeram-Malang.html" class="mobile-submenu-item">
                      <i class="fa-solid fa-water me-2"></i>Rafting & Adventure
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li class="mobile-nav-item">
              <a class="mobile-nav-link" href="fasilitas.html">
                <i class="fa-solid fa-building me-3 text-gold"></i>Fasilitas
              </a>
            </li>
            <li class="mobile-nav-item">
              <a class="mobile-nav-link" href="artikel.html">
                <i class="fa-solid fa-newspaper me-3 text-gold"></i>Artikel
              </a>
            </li>
          </ul>

          <div class="mobile-offcanvas-footer mt-auto pt-4">
            <a href="https://wa.me/6281234567890?text=Halo%20Admin%20Wisata%20Agro%20Wonosari,%20saya%20ingin%20tanya%20paket%20outbound"
              target="_blank" class="btn btn-amber w-100 py-3 text-dark fw-bold rounded-3 shadow d-flex align-items-center justify-content-center gap-2">
              <i class="fa-brands fa-whatsapp fs-5"></i> Reservasi WhatsApp
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(drawer);
    }

    // Set active link based on current path
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    drawer.querySelectorAll('.mobile-nav-link, .mobile-submenu-item').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === 'index.html' && href === '/')) {
        link.classList.add('active');
      }
    });
  }

  ensureMobileOffcanvasMarkup();

  const mobileOffcanvasDrawer = document.getElementById('mobileOffcanvasDrawer');
  const mobileOffcanvasBackdrop = document.getElementById('mobileOffcanvasBackdrop');
  const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');
  const navbarTogglerButtons = document.querySelectorAll('.navbar-toggler, .mobile-menu-toggler, #navbarTogglerBtn');

  function openMobileOffcanvas() {
    if (mobileOffcanvasDrawer) mobileOffcanvasDrawer.classList.add('show');
    if (mobileOffcanvasBackdrop) mobileOffcanvasBackdrop.classList.add('show');
    document.body.classList.add('mobile-offcanvas-open');
  }

  function closeMobileOffcanvas() {
    if (mobileOffcanvasDrawer) mobileOffcanvasDrawer.classList.remove('show');
    if (mobileOffcanvasBackdrop) mobileOffcanvasBackdrop.classList.remove('show');
    document.body.classList.remove('mobile-offcanvas-open');
  }

  navbarTogglerButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (mobileOffcanvasDrawer && mobileOffcanvasDrawer.classList.contains('show')) {
        closeMobileOffcanvas();
      } else {
        openMobileOffcanvas();
      }
    });
  });

  if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.addEventListener('click', function (e) {
      e.preventDefault();
      closeMobileOffcanvas();
    });
  }

  if (mobileOffcanvasBackdrop) {
    mobileOffcanvasBackdrop.addEventListener('click', closeMobileOffcanvas);
  }

  if (mobileOffcanvasDrawer) {
    mobileOffcanvasDrawer.querySelectorAll('a.mobile-nav-link:not(.mobile-dropdown-link-main), a.mobile-submenu-item').forEach(link => {
      link.addEventListener('click', closeMobileOffcanvas);
    });

    // Collapsible Dropdown for Paket Outbound (> to v arrow)
    const mobilePaketToggleBtn = document.getElementById('mobilePaketToggleBtn');
    const mobilePaketSubmenu = document.getElementById('mobilePaketSubmenu');

    if (mobilePaketToggleBtn && mobilePaketSubmenu) {
      mobilePaketToggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        mobilePaketSubmenu.classList.toggle('open');
      });
    }
  }



  /* ========================================================
     2. BACK TO TOP
     ======================================================== */
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ========================================================
     3. SCROLL REVEAL (Fade Up, Blur In, Scale, Stagger)
     ======================================================== */
  const revealSelectors = [
    { selector: '[data-reveal]' },
    { selector: '[data-reveal-blur]' },
    { selector: '[data-reveal-scale]' },
    { selector: '.stagger-children' }
  ];

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  revealSelectors.forEach(({ selector }) => {
    document.querySelectorAll(selector).forEach(el => revealObserver.observe(el));
  });

  /* ========================================================
     4. COUNTER ANIMATION
     ======================================================== */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1600;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString('id-ID');
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(c => counterObserver.observe(c));

  /* ========================================================
     5. IMAGE HOVER ZOOM (for fas-card images)
     ======================================================== */
  document.querySelectorAll('.fas-card').forEach(card => {
    const img = card.querySelector('img');
    if (!img) return;
    card.addEventListener('mouseenter', () => { img.style.transform = 'scale(1.06)'; });
    card.addEventListener('mouseleave', () => { img.style.transform = 'scale(1)'; });
  });

  /* ========================================================
     6. ACTIVE NAVBAR LINK
     ======================================================== */
  const currentPage = window.location.pathname.split('/').pop();
  const isHomeCurrent = !currentPage || currentPage === 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const isHomeHref = href === '/' || href === '' || href === 'index.html';
    if ((isHomeCurrent && isHomeHref) || (!isHomeCurrent && href === currentPage)) {
      link.classList.add('active');
    }
  });

  /* ========================================================
     7. ARTICLE SEARCH & FILTER (artikel.html)
     ======================================================== */
  const articleSearchInput = document.getElementById('articleSearchInput');
  const noResultsMsg = document.getElementById('noResultsMsg');
  const searchResetBtn = document.getElementById('searchResetBtn');

  if (articleSearchInput) {
    articleSearchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();
      const items = document.querySelectorAll('.article-card-item');
      let matches = 0;

      items.forEach(item => {
        const title = item.querySelector('.article-title')?.textContent.toLowerCase() || '';
        const desc  = item.querySelector('.article-desc')?.textContent.toLowerCase() || '';
        const tag   = item.querySelector('.article-tag')?.textContent.toLowerCase() || '';
        const show  = title.includes(query) || desc.includes(query) || tag.includes(query);
        item.style.display = show ? 'block' : 'none';
        if (show) matches++;
      });

      const countEl = document.getElementById('articleCount');
      if (countEl) countEl.textContent = `Menampilkan ${matches} Artikel`;

      if (noResultsMsg) noResultsMsg.classList.toggle('d-none', matches > 0);

      if (query.length > 0) {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      }
    });

    if (searchResetBtn) {
      searchResetBtn.addEventListener('click', function () {
        articleSearchInput.value = '';
        articleSearchInput.dispatchEvent(new Event('input'));
        const allBtn = document.querySelector('.category-btn[data-category="semua"]');
        if (allBtn) allBtn.click();
      });
    }
  }

  /* ========================================================
     8. PREMIUM BUTTON CLICK EFFECT (active press animation)
     ======================================================== */
  document.querySelectorAll('.btn-primary-custom, .btn-amber').forEach(btn => {
    btn.addEventListener('mousedown', () => { btn.style.transform = 'translateY(0px) scale(0.97)'; });
    btn.addEventListener('mouseup', () => { btn.style.transform = ''; });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ========================================================
     9. FACILITY DIRECTORY SHOWCASE & MODAL HANDLER
     ======================================================== */
  const fasNavPills = document.querySelectorAll('.fas-nav-pill');
  const fasSearchInput = document.getElementById('facilitySearchInput');
  const fasCatSections = document.querySelectorAll('.fas-cat-section');
  const fasDirCols = document.querySelectorAll('.fas-dir-col');
  const fasNoResults = document.getElementById('fasNoResults');

  let activeCategory = 'all';

  function filterDirectory() {
    const searchQuery = fasSearchInput ? fasSearchInput.value.toLowerCase().trim() : '';
    let totalVisible = 0;

    fasCatSections.forEach(section => {
      const sectionCat = section.getAttribute('data-category');
      const catMatch = (activeCategory === 'all' || activeCategory === sectionCat);
      const cols = section.querySelectorAll('.fas-dir-col');
      let sectionVisibleCount = 0;

      cols.forEach(col => {
        const title = col.querySelector('.fas-dir-title')?.textContent.toLowerCase() || '';
        const desc = col.querySelector('.fas-dir-desc')?.textContent.toLowerCase() || '';
        const searchMatch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery);

        if (catMatch && searchMatch) {
          col.style.display = 'block';
          sectionVisibleCount++;
          totalVisible++;
        } else {
          col.style.display = 'none';
        }
      });

      // Show/hide category section header and wrapper based on matching items inside
      if (catMatch && sectionVisibleCount > 0) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });

    if (fasNoResults) {
      fasNoResults.classList.toggle('d-none', totalVisible > 0);
    }
  }

  fasNavPills.forEach(pill => {
    pill.addEventListener('click', function (e) {
      const targetFilter = this.getAttribute('data-filter') || 'all';
      
      // If it's an anchor link, smooth scroll to section if specified
      fasNavPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      activeCategory = targetFilter;
      filterDirectory();
    });
  });

  if (fasSearchInput) {
    fasSearchInput.addEventListener('input', filterDirectory);
  }

  // Facility Consultative Modal Handler
  const facilityModal = document.getElementById('facilityDetailModal');
  if (facilityModal) {
    facilityModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      if (!button) return;

      const title = button.getAttribute('data-title') || '';
      const cat = button.getAttribute('data-cat') || '';
      const img = button.getAttribute('data-img') || '';
      const desc = button.getAttribute('data-desc') || '';
      const specs = button.getAttribute('data-specs') || '';

      const modalTitleEl = document.getElementById('modalFasTitle');
      const modalBadgeEl = document.getElementById('modalFasBadge');
      const modalImgEl = document.getElementById('modalFasImg');
      const modalDescEl = document.getElementById('modalFasDesc');

      if (modalTitleEl) modalTitleEl.textContent = title;
      if (modalBadgeEl) modalBadgeEl.textContent = cat;
      if (modalImgEl) {
        if (img) {
          modalImgEl.src = img;
          modalImgEl.alt = title;
          modalImgEl.parentElement.style.display = 'block';
        } else {
          modalImgEl.parentElement.style.display = 'none';
        }
      }
      if (modalDescEl) modalDescEl.textContent = desc;

      const specsContainer = document.getElementById('modalFasSpecs');
      if (specsContainer) {
        specsContainer.innerHTML = '';
        if (specs) {
          const list = specs.split(';');
          list.forEach(item => {
            if (item.trim()) {
              const specEl = document.createElement('div');
              specEl.className = 'facility-modal-spec-item';
              specEl.innerHTML = `<i class="fa-solid fa-circle-check text-success"></i> <span>${item.trim()}</span>`;
              specsContainer.appendChild(specEl);
            }
          });
        }
      }

      const waBtn = document.getElementById('modalFasWaBtn');
      if (waBtn) {
        waBtn.href = `https://wa.me/6281234567890?text=Halo%20Admin%20Wisata%20Agro%20Wonosari,%20saya%20ingin%20konsultasi%20ketersediaan%20fasilitas%20${encodeURIComponent(title)}`;
      }
    });
  }

});


