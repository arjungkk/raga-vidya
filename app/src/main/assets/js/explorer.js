/**
 * explorer.js — Raga Explorer tab
 *
 * Responsibilities:
 *  - Render the scrollable raga list (with type filter + search)
 *  - Slide between list panel and detail panel
 *  - Render full raga detail (swara pills, phrases, vadi/samvadi, open-in buttons)
 */

const Explorer = (() => {

  // ── Swara helpers ────────────────────────────────────────────
  function getSwaraClass(sw) {
    if (!sw) return '';
    if (sw === 'Sa') return 'swara-Sa';
    if (sw.startsWith('R')) return 'swara-R1';
    if (sw.startsWith('G')) return 'swara-G1';
    if (sw.startsWith('M')) return 'swara-M1';
    if (sw === 'Pa' || sw === 'P') return 'swara-Pa';
    if (sw.startsWith('D')) return 'swara-D1';
    if (sw.startsWith('N')) return 'swara-N1';
    return '';
  }

  function swaraPills(swaras) {
    return swaras
      .map(s => `<span class="swara-pill ${getSwaraClass(s)}">${s}</span>`)
      .join('');
  }

  // ── List rendering ────────────────────────────────────────────
  function _ragaListItem(raga) {
    const idx = RAGAS.indexOf(raga);
    const num = raga.number ? `#${raga.number} · ` : '';
    const sel = State.selectedRaga?.name === raga.name ? 'selected' : '';
    return `
      <div class="raga-item ${sel}" onclick="Explorer.selectRaga(${idx})">
        <div>
          <div class="raga-item-name">${raga.name}</div>
          <div class="raga-item-meta">${num}${raga.time}</div>
        </div>
        <div class="raga-item-chevron">›</div>
      </div>`;
  }

  function renderList(ragas) {
    const el = document.getElementById('raga-list-items');
    if (!ragas.length) {
      el.innerHTML = '<div style="padding:20px;font-size:0.72rem;color:var(--text-muted);text-align:center">No ragas match</div>';
      return;
    }
    const melakartas = ragas.filter(r => r.type === 'melakarta');
    const janyas     = ragas.filter(r => r.type === 'janya');
    let html = '';
    if (melakartas.length && State.activeTypeFilter !== 'janya') {
      html += `<div class="melakarta-label">Melakarta (${melakartas.length})</div>`;
      html += melakartas.map(_ragaListItem).join('');
    }
    if (janyas.length && State.activeTypeFilter !== 'melakarta') {
      html += `<div class="melakarta-label" style="margin-top:8px">Janya (${janyas.length})</div>`;
      html += janyas.map(_ragaListItem).join('');
    }
    el.innerHTML = html;
  }

  function filter(query) {
    const q = query.toLowerCase();
    let filtered = RAGAS.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q)) ||
      r.mood.toLowerCase().includes(q) ||
      r.melakarta.toLowerCase().includes(q)
    );
    if (State.activeTypeFilter !== 'all') {
      filtered = filtered.filter(r => r.type === State.activeTypeFilter);
    }
    renderList(filtered);
  }

  function setTypeFilter(type) {
    State.activeTypeFilter = type;
    document.querySelectorAll('.type-filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.type-filter-btn[data-type="${type}"]`).classList.add('active');
    filter(document.getElementById('raga-search').value);
  }

  function selectRaga(index) {
    State.selectedRaga = RAGAS[index];
    filter(document.getElementById('raga-search').value);
    _renderDetail(State.selectedRaga);
  }

  // ── Detail panel ──────────────────────────────────────────────
  function _renderDetail(raga) {
    const inner = document.getElementById('raga-detail-content');
    const num = raga.number
      ? ` <span style="font-size:0.7rem;color:var(--text-muted)">#${raga.number}</span>`
      : '';
    const typeColor = raga.type === 'melakarta'
      ? 'color:var(--gold);border-color:rgba(201,168,76,0.4)'
      : 'color:var(--teal);border-color:rgba(76,168,160,0.4)';
    const typeLabel = raga.type === 'melakarta' ? 'Melakarta' : 'Janya';
    const nameSafe  = raga.name.replace(/'/g, "\\'");

    inner.innerHTML = `
      <div class="raga-title">${raga.name}${num}</div>
      <div class="raga-subtitle">${raga.melakarta}</div>

      <div style="margin-bottom:16px">
        <span class="tag" style="${typeColor}">${typeLabel}</span>
        ${raga.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>

      <p class="raga-description">${raga.description}</p>

      <div class="detail-card">
        <div class="detail-card-label">Arohana</div>
        <div class="swara-row">${swaraPills(raga.aroh)}</div>
      </div>

      <div class="detail-card">
        <div class="detail-card-label">Avarohana</div>
        <div class="swara-row">${swaraPills(raga.avaroh)}</div>
      </div>

      <div class="detail-card">
        <div class="detail-card-label">Vadi &amp; Samvadi</div>
        <div class="vadi-section">
          <div class="vadi-block">
            <label>Vadi (King)</label>
            <span class="swara-pill ${getSwaraClass(raga.vadi)}">${raga.vadi}</span>
          </div>
          <div class="vadi-block">
            <label>Samvadi (Minister)</label>
            <span class="swara-pill ${getSwaraClass(raga.samvadi)}">${raga.samvadi}</span>
          </div>
        </div>
      </div>

      <div class="detail-card">
        <div class="detail-card-label">Time &amp; Mood</div>
        <span class="time-badge">${raga.time}</span>
        <div style="font-size:0.75rem;color:var(--text-dim);margin-top:8px">${raga.mood}</div>
      </div>

      <div class="detail-card">
        <div class="detail-card-label">Characteristic Phrases</div>
        ${raga.phrases.map(p => `<div class="phrase-item">${p}</div>`).join('')}
      </div>

      <button class="open-in-btn" onclick="Keyboard.quickLoad('${nameSafe}')">
        &#9000;&nbsp; Open in Keyboard
      </button>
      <button class="open-in-btn" onclick="Guitar.quickLoad('${nameSafe}')">
        &#127928;&nbsp; Open in Guitar
      </button>`;

    _showDetail();
  }

  function _showDetail() {
    document.getElementById('raga-list').classList.add('hidden');
    document.getElementById('raga-detail').classList.add('visible');
  }

  function showList() {
    document.getElementById('raga-list').classList.remove('hidden');
    document.getElementById('raga-detail').classList.remove('visible');
  }

  // ── Public API ────────────────────────────────────────────────
  return { renderList, filter, setTypeFilter, selectRaga, showList, getSwaraClass, swaraPills };
})();
