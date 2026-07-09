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

        function initCardTilt() {
            if (!window.gsap || !canHover || prefersReduced) return;
            var maxTilt = 8;
            document.querySelectorAll('#projetos .case-study, #projetos .card').forEach(function (card) {
                gsap.set(card, { transformPerspective: 800, transformStyle: 'preserve-3d' });
                var rotateXTo = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3' });
                var rotateYTo = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3' });

                card.addEventListener('mousemove', function (e) {
                    var rect = card.getBoundingClientRect();
                    var relX = (e.clientX - rect.left) / rect.width;
                    var relY = (e.clientY - rect.top) / rect.height;
                    rotateYTo((relX - 0.5) * maxTilt * 2);
                    rotateXTo(-(relY - 0.5) * maxTilt * 2);
                });

                card.addEventListener('mouseleave', function () {
                    rotateXTo(0);
                    rotateYTo(0);
                });
            });
        }

        function typeText(el, text, charDelay, onDone) {
            var i = 0;
            el.textContent = '';
            var timer = setInterval(function () {
                i++;
                el.textContent = text.slice(0, i);
                if (i >= text.length) {
                    clearInterval(timer);
                    if (onDone) onDone();
                }
            }, charDelay);
        }

        function initTerminal() {
            var terminal = document.querySelector('.hero-terminal');
            if (!terminal) return;
            var cmds = terminal.querySelectorAll('.hero-terminal-cmd');
            var outputs = terminal.querySelectorAll('.hero-terminal-output');

            if (prefersReduced) {
                cmds.forEach(function (cmd) { cmd.textContent = cmd.getAttribute('data-cmd'); });
                outputs.forEach(function (out) { out.classList.remove('is-pending'); });
                return;
            }

            var pairs = [];
            for (var i = 0; i < cmds.length; i++) {
                pairs.push({ cmd: cmds[i], output: outputs[i] });
            }

            function runPair(index) {
                if (index >= pairs.length) return;
                var pair = pairs[index];
                typeText(pair.cmd, pair.cmd.getAttribute('data-cmd'), 45, function () {
                    setTimeout(function () {
                        pair.output.classList.remove('is-pending');
                        setTimeout(function () { runPair(index + 1); }, 400);
                    }, 200);
                });
            }

            runPair(0);
        }

        initMagneticButtons();
        initCardTilt();
        initTerminal();
    });
})();
