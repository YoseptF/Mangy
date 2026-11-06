const form = document.querySelector('#contact-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = 'Me gustaría platicar sobre mi proyecto';
  const body = `Hola equipo de Invernadero,\n\nMi nombre y marca: ${data.get('nombre')}\nMe interesa: ${data.getAll('servicio').join(', ') || 'Conversarlo'}\nMi WhatsApp o correo: ${data.get('contacto')}\n\nMe gustaría platicar sobre mi proyecto.`;
  window.location.href = `mailto:hola.invernadero.studio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
const rootSection = document.querySelector('#metodo');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function updateRoots() {
  if (reduceMotion.matches) { rootSection.style.setProperty('--root-offset', 0); return; }
  const box = rootSection.getBoundingClientRect();
  const progress = Math.max(0, Math.min(1, (window.innerHeight - box.top) / (window.innerHeight + box.height * .65)));
  rootSection.style.setProperty('--root-offset', 1 - progress);
}
window.addEventListener('scroll', updateRoots, { passive: true });
window.addEventListener('resize', updateRoots);
reduceMotion.addEventListener('change', updateRoots);
updateRoots();

const audience = document.querySelector('.audience-grid');
document.querySelectorAll('.carousel-controls button').forEach((button) => {
  button.addEventListener('click', () => {
    const card = audience.querySelector('article');
    audience.scrollBy({ left: Number(button.dataset.direction) * (card.offsetWidth + parseFloat(getComputedStyle(audience).gap)), behavior: reduceMotion.matches ? 'instant' : 'smooth' });
  });
});
function updateHeroRoots() {
  const hero = document.querySelector('.hero');
  const progress = Math.max(0, Math.min(1, 0.25 + (window.innerHeight - hero.getBoundingClientRect().top) / (hero.offsetHeight * 1.6)));
  hero.style.setProperty('--hero-offset', reduceMotion.matches ? 0 : 1 - progress);
}
window.addEventListener('scroll', updateHeroRoots, { passive: true });
reduceMotion.addEventListener('change', updateHeroRoots);
updateHeroRoots();

const methodTrack = document.querySelector('.steps');
const methodCards = [...methodTrack.querySelectorAll('article')];
const methodCount = document.querySelector('.method-count');
function currentStep() {
  return methodCards.reduce((best, card, index) => Math.abs(card.offsetLeft - methodTrack.scrollLeft) < Math.abs(methodCards[best].offsetLeft - methodTrack.scrollLeft) ? index : best, 0);
}
function showStep(index) {
  const card = methodCards[Math.max(0, Math.min(methodCards.length - 1, index))];
  methodTrack.scrollTo({ left: card.offsetLeft, behavior: reduceMotion.matches ? 'instant' : 'smooth' });
}
document.querySelector('.method-prev').addEventListener('click', () => showStep(currentStep() - 1));
document.querySelector('.method-next').addEventListener('click', () => showStep(currentStep() + 1));
methodTrack.addEventListener('scroll', () => { methodCount.textContent = `${String(currentStep() + 1).padStart(2, '0')} / 04`; }, { passive: true });

if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const reveal = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.animate([{ opacity: .25, transform: 'translateY(34px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 850, easing: 'cubic-bezier(.2,.7,.2,1)' });
      observer.unobserve(entry.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll('.section-intro, .services article, .audience-grid article, .about-content, .contact > div, #contact-form').forEach((element) => reveal.observe(element));
}
