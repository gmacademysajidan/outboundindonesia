/* ==========================================================================
   ARTICLE DETAIL JAVASCRIPT - OUTBOUND INDONESIA
   Handles Table of Contents, Active Scroll Highlighting, Share, Back-to-Top
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Back to Top Button Logic
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 2. Active TOC Highlighting on Scroll & Smooth Scroll
  const tocLinks = document.querySelectorAll('.toc-list .toc-item a');
  const sections = [];

  tocLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        sections.push({
          link: link,
          element: targetElement
        });
      }
    }
  });

  if (sections.length > 0) {
    function highlightTOC() {
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element.offsetTop <= scrollPosition) {
          tocLinks.forEach(l => l.classList.remove('active'));
          section.link.classList.add('active');
          break;
        }
      }
    }

    window.addEventListener('scroll', highlightTOC);
    highlightTOC();
  }

  // 3. Share Button Functionality
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', function (e) {
      e.preventDefault();
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link artikel telah disalin ke clipboard!');
      }).catch(err => {
        console.error('Gagal menyalin link: ', err);
      });
    });
  }
});
