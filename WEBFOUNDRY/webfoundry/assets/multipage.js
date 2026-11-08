(() => {
  'use strict';
  const menu = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-navigation');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
      nav.classList.toggle('open', open);
    });
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Apri il menu');
    }));
  }
  const motion = document.querySelector('.motion-toggle');
  if (motion) {
    motion.addEventListener('click', () => {
      const paused = motion.getAttribute('aria-pressed') !== 'true';
      motion.setAttribute('aria-pressed', String(paused));
      motion.setAttribute('aria-label', paused ? 'Riprendi le animazioni' : 'Metti in pausa le animazioni');
      motion.querySelector('span').textContent = paused ? 'Riprendi movimento' : 'Pausa movimento';
      document.body.classList.toggle('motion-paused', paused);
    });
  }
})();
