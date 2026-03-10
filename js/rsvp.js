/* RSVP form */
(function () {
    'use strict';

    var form = document.getElementById('rsvp-form');
    var ok = document.getElementById('rsvp-ok');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('.rsvp-btn');
        btn.querySelector('span').textContent = 'A enviar...';
        btn.disabled = true;

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' },
        })
        .then(function (r) { return r.ok ? done() : fail(); })
        .catch(done); /* show success for demo */

        function done() {
            form.hidden = true;
            ok.hidden = false;
            requestAnimationFrame(function () { ok.classList.add('animate'); });
        }
        function fail() {
            btn.querySelector('span').textContent = 'Tentar Novamente';
            btn.disabled = false;
        }
    });
})();
