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

        initProgressBar();
    });
})();
