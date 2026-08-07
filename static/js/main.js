/* OVTAS project page — tabs, copy-to-clipboard, scroll hints */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- tabs */
  function initTabGroup(group) {
    var tabs = group.querySelectorAll('[data-tab]');
    var panelHost = document.querySelector(group.getAttribute('data-panels'));
    if (!panelHost) return;
    var panels = panelHost.querySelectorAll('[data-panel]');

    function activate(key) {
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-tab') === key;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach(function (p) {
        p.classList.toggle('is-active', p.getAttribute('data-panel') === key);
      });
    }

    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        activate(t.getAttribute('data-tab'));
      });
    });
  }

  document.querySelectorAll('[data-panels]').forEach(initTabGroup);

  /* ------------------------------------------------------- copy bibtex */
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.querySelector(btn.getAttribute('data-copy'));
      if (!target) return;
      var text = target.innerText;
      var done = function () {
        var old = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = old; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { /* noop */ }
        document.body.removeChild(ta);
      }
    });
  });

  /* ------------------------------- show a hint when a table overflows */
  function updateHints() {
    document.querySelectorAll('.table-wrap').forEach(function (w) {
      var hint = w.nextElementSibling;
      if (!hint || !hint.classList.contains('scroll-hint')) return;
      hint.style.display = w.scrollWidth > w.clientWidth + 2 ? 'block' : 'none';
    });
  }
  updateHints();
  window.addEventListener('resize', updateHints);
  // Panels start hidden, so re-measure after a tab switch.
  document.querySelectorAll('[data-tab]').forEach(function (t) {
    t.addEventListener('click', function () { setTimeout(updateHints, 30); });
  });
})();
