/**
 * Editorial Pages — shared behaviors
 * Used by: index.html, golf-for-good-2026.html
 *
 * - Scroll-reveal via IntersectionObserver
 * - Mosaic tab switching (homepage)
 * - Format card detail toggles (GFG)
 * - Tournament Groups collapsible toggle (GFG)
 * - GFG countdown + progress bar
 *
 * AOS is intentionally NOT used on these pages.
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initRevealObserver();
        initMosaicTabs();
        initFormatCards();
        initGroupsCollapse();
        initGfgCountdown();
        initGfgProgress();
        initFooterYear();
        initNavbarScroll();
    });

    /* ------------------------------------------------------------
       Scroll reveal
       ------------------------------------------------------------ */
    function initRevealObserver() {
        var els = document.querySelectorAll('.reveal');
        if (!els.length) return;

        if (!('IntersectionObserver' in window)) {
            els.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        els.forEach(function (el) { io.observe(el); });
    }

    /* ------------------------------------------------------------
       Mosaic tab switching (homepage past tournaments)
       ------------------------------------------------------------ */
    function initMosaicTabs() {
        var tabs = document.querySelectorAll('.mosaic-tab');
        if (!tabs.length) return;

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var target = tab.getAttribute('data-target');
                if (!target) return;

                tabs.forEach(function (t) { t.classList.remove('is-active'); });
                tab.classList.add('is-active');

                document.querySelectorAll('.mosaic-set').forEach(function (set) {
                    set.classList.toggle('is-active', set.getAttribute('data-set') === target);
                });
            });
        });
    }

    /* ------------------------------------------------------------
       Format card expandable detail (GFG rules)
       ------------------------------------------------------------ */
    function initFormatCards() {
        var toggles = document.querySelectorAll('.format-card__detail-toggle');
        if (!toggles.length) return;

        toggles.forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                var expanded = toggle.getAttribute('aria-expanded') === 'true';
                var content = toggle.nextElementSibling;
                toggle.setAttribute('aria-expanded', String(!expanded));
                if (content) {
                    content.classList.toggle('is-open', !expanded);
                }
                var labelEl = toggle.querySelector('[data-toggle-label]');
                if (labelEl) {
                    labelEl.textContent = expanded ? 'Read details' : 'Hide details';
                }
            });
        });
    }

    /* ------------------------------------------------------------
       Tournament Groups collapsible (GFG)
       Pure JS replacement — does not depend on Bootstrap collapse,
       but the inner table#tournament-registrations-table remains
       intact so sheets.js can still populate it.
       ------------------------------------------------------------ */
    function initGroupsCollapse() {
        var toggle = document.querySelector('.groups-block__toggle');
        var panel = document.querySelector('#groups-panel');
        if (!toggle || !panel) return;

        // Start collapsed
        panel.style.display = 'none';

        toggle.addEventListener('click', function () {
            var expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            panel.style.display = expanded ? 'none' : 'block';
            var label = toggle.querySelector('[data-toggle-label]');
            if (label) {
                label.textContent = expanded ? 'Show' : 'Hide';
            }
        });
    }

    /* ------------------------------------------------------------
       GFG Countdown
       ------------------------------------------------------------ */
    function initGfgCountdown() {
        var root = document.getElementById('event-countdown');
        if (!root) return;

        var eventDate = new Date('August 22, 2026 14:00:00 PDT').getTime();
        var dEl = document.getElementById('countdown-days');
        var hEl = document.getElementById('countdown-hours');
        var mEl = document.getElementById('countdown-minutes');
        var sEl = document.getElementById('countdown-seconds');

        function tick() {
            var now = Date.now();
            var dist = eventDate - now;
            if (dist < 0) {
                if (dEl) dEl.textContent = '0';
                if (hEl) hEl.textContent = '0';
                if (mEl) mEl.textContent = '0';
                if (sEl) sEl.textContent = '0';
                clearInterval(timer);
                return;
            }
            var days = Math.floor(dist / 86400000);
            var hrs = Math.floor((dist % 86400000) / 3600000);
            var mins = Math.floor((dist % 3600000) / 60000);
            var secs = Math.floor((dist % 60000) / 1000);
            if (dEl) dEl.textContent = days;
            if (hEl) hEl.textContent = hrs;
            if (mEl) mEl.textContent = mins;
            if (sEl) sEl.textContent = secs;
        }
        tick();
        var timer = setInterval(tick, 1000);
    }

    /* ------------------------------------------------------------
       GFG Registration progress bar
       ------------------------------------------------------------ */
    function initGfgProgress() {
        var fill = document.getElementById('progress-fill');
        var countEl = document.getElementById('progress-count');
        var remainingEl = document.getElementById('progress-remaining');
        if (!fill || !countEl) return;

        var GROUPS_FILLED = 18;
        var MAX_GROUPS = 30;
        var pct = (GROUPS_FILLED / MAX_GROUPS) * 100;

        // Trigger animation on first paint after a brief delay so transition runs
        requestAnimationFrame(function () {
            setTimeout(function () { fill.style.width = pct + '%'; }, 150);
        });

        countEl.innerHTML = GROUPS_FILLED + ' <em>/ ' + MAX_GROUPS + '</em>';
        if (remainingEl) {
            var remaining = MAX_GROUPS - GROUPS_FILLED;
            remainingEl.textContent = remaining + (remaining === 1 ? ' team spot' : ' team spots') + ' remaining';
        }
    }

    /* ------------------------------------------------------------
       Footer year
       ------------------------------------------------------------ */
    function initFooterYear() {
        var el = document.getElementById('current-year');
        if (el) el.textContent = String(new Date().getFullYear());
    }

    /* ------------------------------------------------------------
       Navbar scroll-state
       ------------------------------------------------------------ */
    function initNavbarScroll() {
        var navbar = document.querySelector('.navbar');
        if (!navbar) return;
        function check() {
            if (window.scrollY > 40) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }
        check();
        window.addEventListener('scroll', check, { passive: true });
    }

    /* ------------------------------------------------------------
       Mobile nav close on link click
       ------------------------------------------------------------ */
    document.addEventListener('click', function (e) {
        var link = e.target.closest('.navbar-nav .nav-link');
        if (!link) return;
        var collapse = document.querySelector('.navbar-collapse.show');
        if (collapse) collapse.classList.remove('show');
    });
})();
