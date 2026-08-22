// NAVIGATION, PAGE SWITCHER & CURSOR CONTROLLER

export function initNavigation() {
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, [data-navigate]');
  const pageViews = document.querySelectorAll('.page-view');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileModal = document.querySelector('.mobile-nav-modal');

  // Header Scroll Blur
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Page Switcher
  function navigateTo(targetPageId) {
    pageViews.forEach(view => {
      if (view.id === targetPageId) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute('data-target') === targetPageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (mobileModal) {
      mobileModal.classList.remove('open');
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('data-target');
      if (target) {
        e.preventDefault();
        navigateTo(target);
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileBtn && mobileModal) {
    mobileBtn.addEventListener('click', () => {
      mobileModal.classList.toggle('open');
    });
  }

  // Custom Minimal Architectural Cursor
  const cursor = document.querySelector('.custom-cursor');
  if (cursor && window.innerWidth > 1024) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    const hoverTargets = document.querySelectorAll('a, button, .project-card-editorial, .service-row');
    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        if (target.classList.contains('project-card-editorial')) {
          cursor.innerText = 'EXPLORE';
        } else {
          cursor.innerText = '';
        }
      });
      target.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        cursor.innerText = '';
      });
    });
  }
}
