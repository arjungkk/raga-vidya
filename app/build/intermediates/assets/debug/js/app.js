/**
 * app.js — application entry point
 *
 * Responsibilities:
 *  - Tab navigation (showTab)
 *  - Populate raga <select> dropdowns
 *  - Bootstrap all modules on DOMContentLoaded
 *  - Handle orientation changes for landscape hint
 */

const App = (() => {

  // ── Navigation ────────────────────────────────────────────────
  function showTab(name, btn) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));

    const tab = document.getElementById('tab-' + name);
    tab.classList.add('active');
    if (btn) btn.classList.add('active');

    // Landscape hint for keyboard / guitar
    if (name === 'keyboard' || name === 'guitar') {
      _updateLandscapeHint(tab);
    }

    if (name === 'guitar') Guitar.render();
  }

  function _updateLandscapeHint(tab) {
    const isPortrait = window.innerHeight > window.innerWidth;
    tab.classList.toggle('needs-landscape', isPortrait);
  }

  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      ['keyboard', 'guitar'].forEach(name => {
        const tab = document.getElementById('tab-' + name);
        if (tab?.classList.contains('active')) _updateLandscapeHint(tab);
      });
    }, 300);
  });

  // ── Populate <select> elements ────────────────────────────────
  function _populateSelects() {
    ['kb-raga-select', 'guitar-raga-select'].forEach(id => {
      const sel = document.getElementById(id);
      RAGAS.forEach((r, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = r.name;
        sel.appendChild(opt);
      });
    });
  }

  // ── Bootstrap ─────────────────────────────────────────────────
  function init() {
    _populateSelects();
    Explorer.renderList(RAGAS);
    Keyboard.render();
    Guitar.render();
  }

  document.addEventListener('DOMContentLoaded', init);

  // ── Public API ────────────────────────────────────────────────
  return { showTab };
})();
