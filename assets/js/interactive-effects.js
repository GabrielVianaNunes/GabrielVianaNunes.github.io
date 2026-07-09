(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

        function initMagneticButtons() {
            if (!window.gsap || !canHover || prefersReduced) return;
            var strength = 0.3;
            document.querySelectorAll('.btn').forEach(function (btn) {
                var xTo = gsap.quickTo(btn, 'x', { duration: 0.3, ease: 'power3' });
                var yTo = gsap.quickTo(btn, 'y', { duration: 0.3, ease: 'power3' });

                btn.addEventListener('mousemove', function (e) {
                    var rect = btn.getBoundingClientRect();
                    var relX = e.clientX - (rect.left + rect.width / 2);
                    var relY = e.clientY - (rect.top + rect.height / 2);
                    xTo(relX * strength);
                    yTo(relY * strength);
                });

                btn.addEventListener('mouseleave', function () {
                    xTo(0);
                    yTo(0);
                });
            });
        }

        initMagneticButtons();
    });
})();
