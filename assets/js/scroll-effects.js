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
            if (prefersReduced || isMobile) return;
            document.querySelectorAll('.section-parallax').forEach(function (blob) {
                var section = blob.parentElement;
                if (!section) return;
                gsap.to(blob, {
                    y: function () { return section.offsetHeight * 0.2; },
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
    });
})();
