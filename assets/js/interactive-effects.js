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

        function initTouchActiveWorkaround() {
            document.addEventListener('touchstart', function () {}, { passive: true });
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

        function initGyroTilt() {
            if (!window.gsap || canHover || prefersReduced) return;
            if (!('DeviceOrientationEvent' in window)) return;
            var cards = document.querySelectorAll('#projetos .case-study, #projetos .card');
            if (!cards.length) return;

            var maxTilt = 2;
            var tweens = [];
            cards.forEach(function (card) {
                gsap.set(card, { transformPerspective: 800, transformStyle: 'preserve-3d' });
                tweens.push({
                    rotateXTo: gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3' }),
                    rotateYTo: gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3' })
                });
            });

            var baseline = null;

            function handleOrientation(e) {
                if (e.beta === null || e.gamma === null) return;
                if (!baseline) {
                    baseline = { beta: e.beta, gamma: e.gamma };
                    return;
                }
                var deltaBeta = Math.max(-45, Math.min(45, e.beta - baseline.beta));
                var deltaGamma = Math.max(-45, Math.min(45, e.gamma - baseline.gamma));
                tweens.forEach(function (t) {
                    t.rotateYTo((deltaGamma / 45) * maxTilt);
                    t.rotateXTo(-(deltaBeta / 45) * maxTilt);
                });
            }

            function attach() {
                window.addEventListener('deviceorientation', handleOrientation);
            }

            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                var btn = document.querySelector('.gyro-permission-btn');
                if (!btn) return;
                btn.hidden = false;
                btn.addEventListener('click', function () {
                    DeviceOrientationEvent.requestPermission().then(function (state) {
                        if (state === 'granted') attach();
                        btn.remove();
                    }).catch(function () {
                        btn.remove();
                    });
                });
            } else {
                attach();
            }
        }

        initTouchActiveWorkaround();
        initMagneticButtons();
        initTerminal();
        initGyroTilt();
    });
})();
