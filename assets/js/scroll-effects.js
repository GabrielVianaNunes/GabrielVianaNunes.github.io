(function () {
    document.addEventListener('DOMContentLoaded', function () {
        if (!window.gsap || !window.ScrollTrigger) return;
        gsap.registerPlugin(ScrollTrigger);

        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var isMobile = window.matchMedia('(max-width: 768px)').matches;

        function initProgressBar() {
            var bar = document.querySelector('.scroll-progress');
            if (!bar) return;
            ScrollTrigger.create({
                trigger: document.documentElement,
                start: 'top top',
                end: 'bottom bottom',
                onUpdate: function (self) {
                    bar.style.width = (self.progress * 100) + '%';
                }
            });
        }

        function initParallax() {
            if (prefersReduced) return;
            var offsetFactor = isMobile ? 0.1 : 0.2;
            document.querySelectorAll('.section-parallax').forEach(function (blob) {
                var section = blob.parentElement;
                if (!section) return;
                gsap.to(blob, {
                    y: function () { return section.offsetHeight * offsetFactor; },
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });
        }

        function revealGroup(container, itemSelector, staggerAmount) {
            if (!container) return;
            var items = container.querySelectorAll(itemSelector);
            if (!items.length) return;
            if (prefersReduced) {
                items.forEach(function (el) { el.style.opacity = 1; });
                return;
            }
            gsap.set(items, { opacity: 0, y: 16 });
            gsap.to(items, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                stagger: staggerAmount || 0.07,
                scrollTrigger: {
                    trigger: container,
                    start: 'top 85%',
                    once: true
                }
            });
        }

        initProgressBar();
        initParallax();
        revealGroup(document.querySelector('.hero .container'), '.badge, h1, .lead, .location, .cta', 0.1);
        revealGroup(document.querySelector('#sobre .container > div:first-child'), 'p', 0.08);
        revealGroup(document.querySelector('.contact'), 'li', 0.07);
        document.querySelectorAll('#habilidades .skills-icons').forEach(function (ul) {
            revealGroup(ul, 'li', 0.05);
        });
        revealGroup(document.querySelector('.skills-soft'), 'li', 0.06);
        revealGroup(document.querySelector('.lang-grid'), '.lang-card', 0.08);

        function initProjectCards() {
            document.querySelectorAll('#projetos .case-study, #projetos .card').forEach(function (card) {
                var tags = card.querySelectorAll('.tags li');
                if (prefersReduced) {
                    card.style.opacity = 1;
                    tags.forEach(function (t) { t.style.opacity = 1; });
                    return;
                }
                gsap.set(card, { opacity: 0, y: 16 });
                gsap.set(tags, { opacity: 0, y: 8 });
                var tl = gsap.timeline({
                    scrollTrigger: { trigger: card, start: 'top 85%', once: true }
                });
                tl.to(card, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
                if (tags.length) {
                    tl.to(tags, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }, '-=0.2');
                }
            });
        }

        initProjectCards();

        function initTimeline() {
            document.querySelectorAll('.timeline-item').forEach(function (item) {
                if (prefersReduced) {
                    item.style.opacity = 1;
                    return;
                }
                gsap.set(item, { opacity: 0, y: 16 });
                gsap.to(item, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: item, start: 'top 85%', once: true }
                });
            });

            var timeline = document.querySelector('.timeline');
            var line = document.querySelector('.timeline-line');
            if (!timeline || !line) return;
            if (prefersReduced) {
                line.style.height = '100%';
                return;
            }
            gsap.fromTo(line, { height: '0%' }, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: timeline,
                    start: 'top 70%',
                    end: 'bottom 60%',
                    scrub: true
                }
            });
        }

        initTimeline();
    });
})();
