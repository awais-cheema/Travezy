// Nav shrink on scroll
const nav = document.getElementById('nav');
const heroImg = document.getElementById('heroImg');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function onScroll() {
  const y = window.pageYOffset;
  nav.classList.toggle('shrink', y > 50);
  // Hero parallax
  if (heroImg && !reduceMotion) {
    heroImg.style.transform = `translateY(${y * 0.4}px)`;
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Seamless marquee — duplicate the airline set so the -50% loop has no gap
const track = document.getElementById('marquee');
if (track) {
  track.append(...Array.from(track.children).map(n => n.cloneNode(true)));
}

// Mobile nav toggle — slide the desktop links into a dropdown panel
const burger = document.querySelector('.burger');
const links = document.querySelector('.nav-links');
if (burger && links) {
  burger.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.display = open ? '' : 'flex';
    Object.assign(links.style, open ? {} : {
      position: 'absolute', top: '100%', left: '0', right: '0',
      flexDirection: 'column', gap: '0', margin: '0',
      background: 'rgba(255,255,255,.98)', padding: '8px 16px 16px',
      boxShadow: '0 12px 24px -12px rgba(0,0,0,.25)'
    });
  });
  // Close on link tap
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      if (window.innerWidth < 768) { links.style.display = ''; links.removeAttribute('style'); }
    })
  );
}
