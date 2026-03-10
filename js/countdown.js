/* Countdown — Jun 12 2027, 16:00 Lisbon */
(function () {
    'use strict';

    var wedding = new Date('2027-06-12T16:00:00+01:00');
    var els = {
        d: document.getElementById('cd-days'),
        h: document.getElementById('cd-hours'),
        m: document.getElementById('cd-mins'),
        s: document.getElementById('cd-secs'),
    };

    if (!els.d) return;

    function pad(n, len) { return String(n).padStart(len || 2, '0'); }

    function set(el, val) {
        if (el.textContent !== val) {
            el.textContent = val;
            el.classList.remove('flip');
            void el.offsetWidth;
            el.classList.add('flip');
        }
    }

    function tick() {
        var diff = wedding - new Date();
        if (diff <= 0) { set(els.d, '000'); set(els.h, '00'); set(els.m, '00'); set(els.s, '00'); return; }
        set(els.d, pad(Math.floor(diff / 864e5), 3));
        set(els.h, pad(Math.floor(diff % 864e5 / 36e5)));
        set(els.m, pad(Math.floor(diff % 36e5 / 6e4)));
        set(els.s, pad(Math.floor(diff % 6e4 / 1e3)));
    }

    tick();
    setInterval(tick, 1000);
})();
