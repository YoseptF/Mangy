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
