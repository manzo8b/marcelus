'use strict';
document.documentElement.classList.add('js');
const nav=document.getElementById('site-navigation');
const navButton=document.querySelector('.nav-toggle');
if(nav && navButton){
  navButton.addEventListener('click',()=>{const show=navButton.getAttribute('aria-expanded')!=='true';navButton.setAttribute('aria-expanded',String(show));navButton.setAttribute('aria-label',show?'Chiudi navigazione':'Apri navigazione');nav.classList.toggle('open',show)});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navButton.setAttribute('aria-expanded','false');nav.classList.remove('open')}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){navButton.setAttribute('aria-expanded','false');nav.classList.remove('open')}});
}
const motionButton=document.querySelector('.motion-toggle');
if(motionButton){
  motionButton.addEventListener('click',()=>{const paused=document.body.classList.toggle('motion-paused');motionButton.setAttribute('aria-pressed',String(paused));motionButton.setAttribute('aria-label',paused?'Riprendi le animazioni':'Metti in pausa le animazioni');motionButton.querySelector('span').textContent=paused?'Riprendi effetti':'Pausa effetti';});
}
