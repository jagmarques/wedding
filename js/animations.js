/* Allison & Beatriz — Animations */
(function () {
    'use strict';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    /* Responsive scale factor */
    var mobile = window.innerWidth < 768;
    var m = mobile ? 0.6 : 1;

    /* Global defaults */
    gsap.defaults({ ease: 'power3.out', duration: 1.2 });

    /* Lenis smooth scroll */
    var lenis = new Lenis({ lerp: 0.07, smoothWheel: true, wheelMultiplier: 0.8 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);


    /* --- Helpers --- */

    /* Bidirectional scroll reveal (gsap.from + toggleActions) */
    function reveal(target, props, triggerEl, start) {
        props.scrollTrigger = {
            trigger: triggerEl || target,
            start: start || 'top 85%',
            toggleActions: 'play reverse play reverse',
        };
        return gsap.from(target, props);
    }

    /* SVG path line-draw */
    function drawPath(pathEl, trigger, start, end) {
        var len = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = len;
        pathEl.style.strokeDashoffset = len;
        gsap.to(pathEl, {
            strokeDashoffset: 0, ease: 'power1.inOut',
            scrollTrigger: {
                trigger: trigger,
                start: start || 'top 82%',
                end: end || 'top 40%',
                scrub: 0.8,
            },
        });
    }


    /* SEAL SIZING — tracks shell's actual rendered height */
    var shell = document.getElementById('env-shell');
    var seal = document.getElementById('env-seal');
    if (shell && seal) {
        var sealReady = false;
        new ResizeObserver(function (entries) {
            var h = entries[0].contentRect.height;
            seal.style.setProperty('--seal-size', (h * 0.25) + 'px');
            if (!sealReady) {
                sealReady = true;
                gsap.set(seal, { opacity: 1 });
            }
        }).observe(shell);
    }


    /* ENVELOPE */

    var envTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.env',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
            pin: '.env__scene',
            anticipatePin: 1,
        }
    });

    envTl.to('.env__hint', { opacity: 0, y: 10, duration: 0.05 }, 0);

    envTl.fromTo('.env__seal', {
        scale: 1, opacity: 1,
    }, {
        scale: mobile ? 7 : 5, opacity: 0,
        duration: mobile ? 0.35 : 0.50, ease: 'power2.inOut',
    }, 0.02);

    envTl.to('.env__scene', {
        opacity: 0, duration: mobile ? 0.30 : 0.45, ease: 'power2.inOut',
    }, mobile ? 0.02 : 0.08);


    /* DOT NAV */
    ScrollTrigger.create({
        trigger: '#hero',
        start: 'top 80%',
        onEnter: function () { document.getElementById('dot-nav').classList.add('show'); },
        onLeaveBack: function () { document.getElementById('dot-nav').classList.remove('show'); },
    });


    /* HERO */

    document.querySelectorAll('.hero__name').forEach(function (el) {
        var split = new SplitType(el, { types: 'chars' });
        reveal(split.chars, {
            y: 40 * m, opacity: 0, rotateX: -90 * m,
            duration: 1.2, stagger: 0.05, ease: 'power4.out',
        }, el);
    });

    reveal('.hero__amp', {
        scale: 0, opacity: 0, rotation: -180 * m,
        duration: 1.4, ease: 'elastic.out(1, 0.5)',
    });

    ['.hero__undertitle', '.hero__date'].forEach(function (sel) {
        reveal(sel, { y: 20 * m, opacity: 0, duration: 1 }, sel, 'top 90%');
    });

    var divPath = document.querySelector('.hero__divider path');
    if (divPath) drawPath(divPath, '.hero__divider', 'top 88%', 'top 55%');

    gsap.to('.hero__inner', {
        y: -60 * m, opacity: 0, ease: 'power2.in',
        scrollTrigger: {
            trigger: '.hero',
            start: '55% top',
            end: 'bottom top',
            scrub: 0.5,
        },
    });


    /* STORY */
    var storyText = document.querySelector('.story__text');
    if (storyText) {
        var splitQ = new SplitType(storyText, { types: 'words' });
        reveal(splitQ.words, {
            y: 15 * m, opacity: 0, duration: 0.8, stagger: 0.04,
        }, '.story', 'top 65%');
    }

    document.querySelectorAll('.story__ornament path').forEach(function (p) {
        drawPath(p, p.closest('.story__ornament'));
    });

    reveal('.story__credit', { opacity: 0, y: 10 * m, duration: 1 }, '.story__credit', 'top 90%');


    /* SECTION HEADINGS */
    document.querySelectorAll('.section__heading').forEach(function (h) {
        reveal(h, { y: 30 * m, opacity: 0, duration: 1.3 });
    });


    /* DETAILS */
    reveal('.countdown', { y: 25 * m, opacity: 0, duration: 1.1 }, '.countdown', 'top 84%');

    reveal('.info-card', {
        y: 40 * m, opacity: 0, scale: 0.94,
        duration: 1, stagger: mobile ? 0.08 : 0.15,
    }, '.info-grid', 'top 80%');


    /* RSVP */
    reveal('.rsvp__sub', { y: 15 * m, opacity: 0, duration: 1 }, '.rsvp-section', 'top 75%');

    reveal('.field', {
        y: 25 * m, opacity: 0, duration: 0.8, stagger: mobile ? 0.06 : 0.1,
    }, '.rsvp-form', 'top 80%');

    reveal('.rsvp-btn', {
        y: 15 * m, opacity: 0, scale: 0.92, duration: 0.8,
    }, '.rsvp-btn', 'top 92%');


    /* FOOTER */
    reveal('.footer__heart', {
        scale: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)',
    }, '.footer', 'top 88%');

    reveal('.footer__names', { y: 15 * m, opacity: 0, duration: 1 }, '.footer', 'top 84%');


    /* DOT NAV tracking */
    var sections = document.querySelectorAll('.section');
    var dots = document.querySelectorAll('.dot-nav__a');

    sections.forEach(function (sec, i) {
        ScrollTrigger.create({
            trigger: sec,
            start: 'top center',
            end: 'bottom center',
            onEnter: function () { setActiveDot(i); },
            onEnterBack: function () { setActiveDot(i); },
        });
    });

    function setActiveDot(index) {
        dots.forEach(function (d) { d.classList.remove('on'); });
        if (dots[index]) dots[index].classList.add('on');
    }

    dots.forEach(function (dot) {
        dot.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) lenis.scrollTo(target);
        });
    });

    var topBtn = document.getElementById('back-to-top');
    if (topBtn) {
        topBtn.addEventListener('click', function () { lenis.scrollTo(0); });
    }


})();
