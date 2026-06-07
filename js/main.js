/* =============================================
   DECODELABS — main.js
============================================= */

// ─── Custom Cursor ───────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
});

(function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
})();

document.querySelectorAll('a, button, .service-card, .work-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        follower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        follower.classList.remove('active');
    });
});


// ─── Navbar Scroll ────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});


// ─── Mobile Menu ─────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.classList.remove('open');
        document.body.style.overflow = '';
    });
});





// ─── Simple AOS (Animate on Scroll) ──────────
function initAOS() {
    const items = document.querySelectorAll('[data-aos]');

    const delays = { '100': 100, '200': 200, '300': 300, '400': 400 };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseInt(el.dataset.aosDelay || '0');
                setTimeout(() => el.classList.add('aos-animate'), delay);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => observer.observe(el));
}

initAOS();


// ─── Counter Animation ────────────────────────
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 1800;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            el.textContent = Math.round(ease * target);
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target;
        }

        requestAnimationFrame(update);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));


// ─── Smooth Scroll ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const navH = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});


// ─── Active Nav Link Highlight ────────────────
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + navbar.offsetHeight + 80;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (!link) return;
        link.style.color = (scrollY >= top && scrollY < top + height)
            ? 'var(--gold)'
            : '';
    });
});


// ─── Contact Form ─────────────────────────────
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        const btn = contactForm.querySelector('.btn-submit');
        const name  = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const msg   = document.getElementById('message').value.trim();

        if (!name || !email || !msg) return;

        btn.innerHTML = '<span>Sending…</span> <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<span>Message sent!</span> <i class="fas fa-check"></i>';
            btn.style.background = '#4CAF82';
            contactForm.reset();

            setTimeout(() => {
                btn.innerHTML = '<span>Send message</span> <i class="fas fa-paper-plane"></i>';
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}


// ─── Marquee Pause on Hover ───────────────────
const track = document.querySelector('.marquee-track');
if (track) {
    track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}