// Custom UniLost Theme JavaScript

// Smooth scroll for anchor links
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

// Add fade-in animation to sections on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
  const nav = document.querySelector('nav');
  nav.classList.toggle('mobile-open');
}

// Console welcome message
console.log('%c🎒 UniLost', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cIntegrated Lost and Found Management System', 'font-size: 12px; color: #64748b;');
console.log('%cVisit our GitHub: https://github.com/jin040907/UniLost', 'font-size: 11px; color: #94a3b8;');

