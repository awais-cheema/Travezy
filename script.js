// Nav shrink on scroll
const nav = document.getElementById('nav');

function onScroll() {
  nav.classList.toggle('shrink', window.pageYOffset > 50);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Hero Slider
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots .dot');
  const prevBtn = document.querySelector('.hero-prev');
  const nextBtn = document.querySelector('.hero-next');
  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');

    dots.forEach((dot, i) => {
      dot.classList.remove('active', 'done');
      if (i < current) dot.classList.add('done');
    });

    // Force animation restart on the active dot's fill
    const fill = dots[current].querySelector('.dot-fill');
    fill.style.animation = 'none';
    void fill.offsetWidth;
    fill.style.animation = '';
    dots[current].classList.add('active');
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 2000);
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAuto(); }));

  // Touch swipe
  let touchX = 0;
  const heroEl = document.querySelector('.hero');
  heroEl.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  heroEl.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
  }, { passive: true });

  startAuto();
}());


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
