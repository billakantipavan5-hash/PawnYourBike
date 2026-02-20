// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-menu a').forEach(n =>
    n.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    })
  );
}

// Fade-in on scroll using IntersectionObserver
const fadeElements = document.querySelectorAll('.scroll-fade');

if ('IntersectionObserver' in window && fadeElements.length > 0) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: 0.2
  });

  fadeElements.forEach(el => observer.observe(el));
} else {
  // Fallback
  fadeElements.forEach(el => el.classList.add('visible'));
}

// Popup logic
const overlay = document.getElementById('globalOverlay');
const popupTriggers = document.querySelectorAll('[data-open-popup]');
const popupCloseButtons = document.querySelectorAll('[data-close-popup], .popup-close');

// Open popup
popupTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const popupId = trigger.getAttribute('data-open-popup');
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.classList.add('active');
      if (overlay) overlay.classList.add('active');
    }
  });
});

// Close popup
popupCloseButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const popupId = btn.getAttribute('data-close-popup') || btn.closest('.popup')?.id;
    if (popupId) {
      const popup = document.getElementById(popupId);
      if (popup) popup.classList.remove('active');
    }
    if (overlay) overlay.classList.remove('active');
  });
});

// Close when clicking overlay
if (overlay) {
  overlay.addEventListener('click', () => {
    document.querySelectorAll('.popup.active').forEach(p => p.classList.remove('active'));
    overlay.classList.remove('active');
  });
}

// Close with ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.popup.active').forEach(p => p.classList.remove('active'));
    if (overlay) overlay.classList.remove('active');
  }
});

  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  let index = 0;
  const intervalTime = 3000;
  let timer;

  function setActiveSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active-dot'));
    slides[n].classList.add('active');
    dots[n].classList.add('active-dot');
  }

  function showNext() {
    index = (index + 1) % slides.length;
    setActiveSlide(index);
  }

  function showPrev() {
    index = (index - 1 + slides.length) % slides.length;
    setActiveSlide(index);
  }

  function startAutoPlay() {
    timer = setInterval(showNext, intervalTime);
  }

  function stopAutoPlay() {
    clearInterval(timer);
  }

  // Arrows
  next.addEventListener('click', () => {
    stopAutoPlay();
    showNext();
    startAutoPlay();
  });

  prev.addEventListener('click', () => {
    stopAutoPlay();
    showPrev();
    startAutoPlay();
  });

  // Dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoPlay();
      index = i;
      setActiveSlide(index);
      startAutoPlay();
    });
  });

  // Init
  setActiveSlide(index);
  startAutoPlay();


