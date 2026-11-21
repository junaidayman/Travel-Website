(() => {
  // Image gallery functionality
  const SELECTORS = {
    slider: '.js-gallery-swiper',
    nextBtn: '.gallery-nav--next',
    prevBtn: '.gallery-nav--prev',
  };

  function initGalleryCarousel() {
    const container = document.querySelector(SELECTORS.slider);
    if (!container || typeof Swiper === 'undefined') return;

    const prevBtn = container.querySelector(SELECTORS.prevBtn);
    const nextBtn = container.querySelector(SELECTORS.nextBtn);

    // Keep previous button hidden on initial DOM load
    if (prevBtn) {
      prevBtn.hidden = true;
    }

    const swiper = new Swiper(container, {
      slidesPerGroup: 1,
      spaceBetween: 0,
      loop: true,
      grabCursor: true,
      simulateTouch: true,
      threshold: 5,
      watchSlidesProgress: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      navigation: {
        nextEl: SELECTORS.nextBtn,
        prevEl: SELECTORS.prevBtn,
      },
      breakpoints: {
        0: {
          slidesPerView: 1.15,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4.25,
        },
      },
    });

    // Reveal previous button once the user interacts with the next button
    if (nextBtn && prevBtn) {
      nextBtn.addEventListener(
        'click',
        () => {
          prevBtn.hidden = false;
        },
        { once: true }
      );
    }

    return swiper;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryCarousel, { once: true });
  } else {
    initGalleryCarousel();
  }

  // Back to top button functionality
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  backToTopBtn.addEventListener('click', (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
    });

    // Reset focus to the top of the document for keyboard and screen reader users
    document.body.setAttribute('tabindex', '-1');
    document.body.focus({ preventScroll: true });
    document.body.removeAttribute('tabindex');

  });
})();