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

        initProgressBar();
        initParallax();
    });
})();
