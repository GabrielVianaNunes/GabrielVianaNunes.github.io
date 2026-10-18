(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var layer = document.createElement('div');
        layer.className = 'daylight';
        layer.setAttribute('aria-hidden', 'true');
        document.body.prepend(layer);

        // amanhecer (topo da página), meio-dia e entardecer (fim da página)
        var stops = [
            { t: 0, rgb: [201, 165, 102], alpha: 0.16 },
            { t: 0.5, rgb: [184, 137, 63], alpha: 0.09 },
            { t: 1, rgb: [140, 74, 43], alpha: 0.2 }
        ];

        function mix(a, b, k) { return a + (b - a) * k; }

        function paint(progress) {
            var p = Math.min(1, Math.max(0, progress));
            var i = p < 0.5 ? 0 : 1;
            var k = (p - stops[i].t) / (stops[i + 1].t - stops[i].t);
            var rgb = stops[i].rgb.map(function (c, n) { return Math.round(mix(c, stops[i + 1].rgb[n], k)); });
            var arc = (2 * p - 1) * (2 * p - 1);
            layer.style.setProperty('--sun-x', (12 + 76 * p).toFixed(1) + '%');
            layer.style.setProperty('--sun-y', (14 + 56 * arc).toFixed(1) + '%');
            layer.style.setProperty('--sun-rgb', rgb.join(','));
            layer.style.setProperty('--sun-alpha', mix(stops[i].alpha, stops[i + 1].alpha, k).toFixed(3));
        }

        function currentProgress() {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            return max > 0 ? window.scrollY / max : 0;
        }

        paint(currentProgress());
        if (prefersReduced) return;

        var ticking = false;
        window.addEventListener('scroll', function () {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(function () {
                paint(currentProgress());
                ticking = false;
            });
        }, { passive: true });
        window.addEventListener('resize', function () { paint(currentProgress()); });
    });
})();
