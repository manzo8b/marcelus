'use strict';
// Progressive enhancement: the menu is usable without JavaScript.
const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#primary-navigation');
if (navToggle && navigation) {
  document.documentElement.classList.add('js');
  const closeMenu = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Apri il menu');
  };
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navToggle.setAttribute('aria-label', expanded ? 'Apri il menu' : 'Chiudi il menu');
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      navToggle.focus();
    }
  });
}
