(function () {
    function initMobileNav() {
        var toggle = document.querySelector('.nav-toggle');
        var menu = document.querySelector('.menu');
        if (!toggle || !menu) return;

        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var menuItems = menu.querySelectorAll('li');

        toggle.addEventListener('click', function () {
            var isOpen = menu.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));

            if (isOpen && window.gsap && !prefersReduced) {
                gsap.set(menuItems, { opacity: 0, y: -8 });
                gsap.to(menuItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.35,
                    ease: 'power2.out',
                    stagger: 0.05
                });
            }
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    function initActiveNav() {
        var links = document.querySelectorAll('.menu a[href^="#"]');
        var sections = Array.prototype.map.call(links, function (link) {
            return document.querySelector(link.getAttribute('href'));
        }).filter(Boolean);

        if (!sections.length || !('IntersectionObserver' in window)) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var link = document.querySelector('.menu a[href="#' + entry.target.id + '"]');
                if (!link) return;
                links.forEach(function (l) { l.removeAttribute('aria-current'); });
                link.setAttribute('aria-current', 'page');
            });
        }, { rootMargin: '-40% 0px -50% 0px' });

        sections.forEach(function (section) { observer.observe(section); });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initMobileNav();
        initActiveNav();
    });
})();
