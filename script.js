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
  if (!slides.length) return;
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

// Mobile nav toggle — class-based, works up to 1023px
const burger = document.querySelector('.burger');
const navEl  = document.getElementById('nav');
const links  = document.querySelector('.nav-links');

if (burger && links && navEl) {
  // Inject phone CTA at bottom of mobile menu (hidden on desktop via CSS)
  if (!links.querySelector('.mobile-phone-link')) {
    const tel = document.createElement('a');
    tel.href = 'tel:+442083233220';
    tel.className = 'mobile-phone-link';
    tel.innerHTML = '<span class="material-symbols-outlined">phone_in_talk</span>020 8323 3220';
    links.appendChild(tel);
  }

  // Transparent backdrop — clicking outside the nav closes the menu
  const backdrop = document.createElement('div');
  backdrop.style.cssText = 'position:fixed;inset:0;z-index:40;display:none';
  document.body.appendChild(backdrop);

  function openMenu() {
    navEl.classList.add('menu-open');
    backdrop.style.display = 'block';
    burger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    navEl.classList.remove('menu-open');
    backdrop.style.display = 'none';
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => {
    navEl.classList.contains('menu-open') ? closeMenu() : openMenu();
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  backdrop.addEventListener('click', closeMenu);
}
