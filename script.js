// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.getElementById('nav-links');

// ===== THEME TOGGLE =====
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light');
  updateThemeIcon(true);
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateThemeIcon(isLight);
});

function updateThemeIcon(isLight) {
  const icon = themeToggle.querySelector('i');
  icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== MOBILE MENU =====
menuToggle.addEventListener('click', () => {
  navLinksContainer.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  icon.className = navLinksContainer.classList.contains('active') 
    ? 'fas fa-times' 
    : 'fas fa-bars';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.className = 'fas fa-bars';
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== SCROLL-BASED NAVBAR =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== INTERSECTION OBSERVER FOR ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
  root: null,
  rootMargin: '-20% 0px -80% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.getAttribute('id');
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// ===== SCROLL ANIMATIONS =====
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .location-card');
  
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        animObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    animObserver.observe(el);
  });
};

// ===== PARALLAX EFFECT ON HERO =====
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = hero.querySelector('.hero-bg');
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
});

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinksContainer.classList.contains('active')) {
    navLinksContainer.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.className = 'fas fa-bars';
  }
});

// ===== FOCUS STATES FOR ACCESSIBILITY =====
navLinks.forEach(link => {
  link.addEventListener('focus', () => {
    link.style.outline = '2px solid var(--accent)';
    link.style.outlineOffset = '4px';
  });
  
  link.addEventListener('blur', () => {
    link.style.outline = 'none';
  });
});