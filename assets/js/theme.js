(function () {
    var STORAGE_KEY = 'site-theme';
    var root = document.documentElement;

    function getPreferredTheme() {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        var meta = document.querySelector('meta[name="theme-color"][data-dynamic]');
        if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b0f19' : '#ffffff');
        var btn = document.querySelector('.theme-toggle');
        if (btn) {
            var label = window.i18n
                ? window.i18n.t(theme === 'dark' ? 'theme.toLight' : 'theme.toDark')
                : (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            btn.setAttribute('aria-label', label);
        }
    }

    function toggleTheme() {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    }

    function animateThemeToggle(x, y) {
        var endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );
        root.style.setProperty('--theme-toggle-x', x + 'px');
        root.style.setProperty('--theme-toggle-y', y + 'px');
        root.style.setProperty('--theme-toggle-radius', endRadius + 'px');
        document.startViewTransition(toggleTheme);
    }

    document.addEventListener('DOMContentLoaded', function () {
        applyTheme(getPreferredTheme());
        var btn = document.querySelector('.theme-toggle');
        if (!btn) return;
        btn.addEventListener('click', function (e) {
            var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!document.startViewTransition || prefersReduced) {
                toggleTheme();
                return;
            }
            animateThemeToggle(e.clientX, e.clientY);
        });
    });

    window.themeModule = {
        getPreferredTheme: getPreferredTheme,
        applyTheme: applyTheme,
        toggleTheme: toggleTheme
    };
})();
