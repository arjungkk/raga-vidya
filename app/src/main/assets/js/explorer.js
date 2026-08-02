/**
 * explorer.js: Raga Explorer tab
 *
 * Renders the raga list and detail panel.
 * Uses Notation module so swara names are readable by beginners,
 * Carnatic students, and Western musicians alike.
 */

const Explorer = (() => {

  // ── Swara pill colour class ───────────────────────────────────
  function getSwaraClass(sw) {
    if (!sw) return '';
    if (sw === 'Sa')               return 'swara-Sa';
    if (sw.startsWith('R'))        return 'swara-R1';
    if (sw.startsWith('G'))        return 'swara-G1';
    if (sw.startsWith('M'))        return 'swara-M1';
    if (sw === 'Pa' || sw === 'P') return 'swara-Pa';
    if (sw.startsWith('D'))        return 'swara-D1';
    if (sw.startsWith('N'))        return 'swara-N1';
    return '';
  }

  function _swaraPill(sw) {
    const info = Notation.get(sw);
    const cls  = getSwaraClass(sw);
    const tip  = info ? sw + ' = ' + info.full + ' - ' + info.solfege + ' - ' + info.degree : sw;
    const sub  = info ? '<span class="swara-sub">' + info.degree + '</span>' : '';
    return '<span class="swara-pill ' + cls + '" title="' + tip + '">' + sw + sub + '</span>';
  }

  function swaraPills(swaras) {
    return swaras.map(_swaraPill).join('');
  }

  // ── List ──────────────────────────────────────────────────────
  function _ragaListItem(raga) {
    const idx  = RAGAS.indexOf(raga);
    const num  = raga.number ? '#' + raga.number + ' · ' : '';
    const sel  = State.selectedRaga && State.selectedRaga.name === raga.name ? 'selected' : '';
    const desc = Notation.scaleDescription(raga);
    return '<div class="raga-item ' + sel + '" onclick="Explorer.selectRaga(' + idx + ')">' +
      '<div>' +
        '<div class="raga-item-name">' + raga.name + '</div>' +
        '<div class="raga-item-meta">' + num + raga.time + ' · ' + desc + '</div>' +
      '</div>' +
      '<div class="raga-item-chevron">›</div>' +
      '</div>';
  }

  function renderList(ragas) {
    const el = document.getElementById('raga-list-items');
    if (!ragas.length) {
      el.innerHTML = '<div style="padding:20px;font-size:0.72rem;color:var(--text-muted);text-align:center">No ragas match</div>';
      return;
    }
    const melakartas = ragas.filter(function(r){ return r.type === 'melakarta'; });
    const janyas     = ragas.filter(function(r){ return r.type === 'janya'; });
    var html = '';
    if (melakartas.length && State.activeTypeFilter !== 'janya') {
      html += '<div class="melakarta-label">Melakarta: Parent Scales (' + melakartas.length + ')</div>';
      html += melakartas.map(_ragaListItem).join('');
    }
    if (janyas.length && State.activeTypeFilter !== 'melakarta') {
      html += '<div class="melakarta-label" style="margin-top:8px">Janya: Derived Ragas (' + janyas.length + ')</div>';
      html += janyas.map(_ragaListItem).join('');
    }
    el.innerHTML = html;
  }

  function filter(query) {
    var q = query.toLowerCase();
    var filtered = RAGAS.filter(function(r) {
      return r.name.toLowerCase().includes(q) ||
        r.tags.some(function(t){ return t.toLowerCase().includes(q); }) ||
        r.mood.toLowerCase().includes(q) ||
        r.melakarta.toLowerCase().includes(q);
    });
    if (State.activeTypeFilter !== 'all') {
      filtered = filtered.filter(function(r){ return r.type === State.activeTypeFilter; });
    }
    renderList(filtered);
  }

  function setTypeFilter(type) {
    State.activeTypeFilter = type;
    document.querySelectorAll('.type-filter-btn').forEach(function(b){ b.classList.remove('active'); });
    document.querySelector('.type-filter-btn[data-type="' + type + '"]').classList.add('active');
    filter(document.getElementById('raga-search').value);
  }

  function selectRaga(index) {
    State.selectedRaga = RAGAS[index];
    filter(document.getElementById('raga-search').value);
    _renderDetail(State.selectedRaga);
  }

  // ── Detail ────────────────────────────────────────────────────
  function _renderDetail(raga) {
    const inner = document.getElementById('raga-detail-content');
    const num = raga.number ? ' <span style="font-size:0.7rem;color:var(--text-muted)">#' + raga.number + '</span>' : '';
    const typeColor = raga.type === 'melakarta'
      ? 'color:var(--gold);border-color:rgba(201,168,76,0.4)'
      : 'color:var(--teal);border-color:rgba(76,168,160,0.4)';
    const typeLabel  = raga.type === 'melakarta' ? 'Melakarta (Parent scale)' : 'Janya (Derived raga)';
    const scaleDesc  = Notation.scaleDescription(raga);
    const analogy    = Notation.westernAnalogy(raga.name);
    const vadiInfo   = Notation.get(raga.vadi);
    const samvInfo   = Notation.get(raga.samvadi);
    const nameSafe   = raga.name.replace(/'/g, "\\'");

    const analogyHtml = analogy
      ? '<div class="info-box info-box--western">' +
          '<div class="info-box__icon">🎵</div>' +
          '<div><div class="info-box__label">Western equivalent</div>' +
          '<div class="info-box__text">' + analogy + '</div></div></div>'
      : '';

    // Build swara reference table for only the swaras used in this raga
    const uniqueSwaras = Array.from(new Set([].concat(raga.aroh, raga.avaroh)));
    const refRows = uniqueSwaras.map(function(sw) {
      const info = Notation.get(sw);
      if (!info) return '';
      return '<div class="swara-ref-code ' + getSwaraClass(sw) + '">' + sw + '</div>' +
             '<div class="swara-ref-text">' + info.full + '</div>' +
             '<div class="swara-ref-text">' + info.solfege + '</div>' +
             '<div class="swara-ref-text">' + info.degree + '</div>';
    }).join('');

    inner.innerHTML =
      '<div class="raga-title">' + raga.name + num + '</div>' +
      '<div class="raga-subtitle">' + raga.melakarta + '</div>' +
      '<div style="margin-bottom:16px">' +
        '<span class="tag" style="' + typeColor + '">' + typeLabel + '</span>' +
        raga.tags.map(function(t){ return '<span class="tag">' + t + '</span>'; }).join('') +
      '</div>' +
      '<p class="raga-description">' + raga.description + '</p>' +
      analogyHtml +
      '<div class="info-box info-box--neutral" style="margin-bottom:16px">' +
        '<div class="info-box__icon">🎼</div>' +
        '<div><div class="info-box__label">Scale structure</div>' +
        '<div class="info-box__text">' + scaleDesc + '</div></div>' +
      '</div>' +
      '<div class="detail-card">' +
        '<div class="detail-card-label">Ascending scale <span class="detail-card-hint">- notes going up</span></div>' +
        '<div class="swara-row">' + swaraPills(raga.aroh) + '</div>' +
        '<div class="swara-legend">Each note shows its Western scale degree</div>' +
      '</div>' +
      '<div class="detail-card">' +
        '<div class="detail-card-label">Descending scale <span class="detail-card-hint">- notes coming back down</span></div>' +
        '<div class="swara-row">' + swaraPills(raga.avaroh) + '</div>' +
      '</div>' +
      '<div class="detail-card">' +
        '<div class="detail-card-label">Key notes <span class="detail-card-hint">- the personality of this raga</span></div>' +
        '<div class="vadi-section">' +
          '<div class="vadi-block">' +
            '<label>King note <span style="font-weight:400;opacity:0.7">(Vadi)</span></label>' +
            '<span class="swara-pill ' + getSwaraClass(raga.vadi) + '">' + raga.vadi + '</span>' +
            (vadiInfo ? '<div class="vadi-western">' + vadiInfo.full + '<br><span style="color:var(--text-muted)">' + vadiInfo.degree + ' &mdash; ' + vadiInfo.character + '</span></div>' : '') +
          '</div>' +
          '<div class="vadi-block">' +
            '<label>Supporting note <span style="font-weight:400;opacity:0.7">(Samvadi)</span></label>' +
            '<span class="swara-pill ' + getSwaraClass(raga.samvadi) + '">' + raga.samvadi + '</span>' +
            (samvInfo ? '<div class="vadi-western">' + samvInfo.full + '<br><span style="color:var(--text-muted)">' + samvInfo.degree + ' &mdash; ' + samvInfo.character + '</span></div>' : '') +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="detail-card">' +
        '<div class="detail-card-label">When &amp; how it feels</div>' +
        '<span class="time-badge"> ' + raga.time + '</span>' +
        '<div style="font-size:0.78rem;color:var(--text-dim);margin-top:8px">' + raga.mood + '</div>' +
      '</div>' +
      '<div class="detail-card">' +
        '<div class="detail-card-label">Signature phrases <span class="detail-card-hint">- short patterns that identify this raga</span></div>' +
        raga.phrases.map(function(p){ return '<div class="phrase-item">' + p + '</div>'; }).join('') +
      '</div>' +
      '<div class="detail-card swara-reference-card">' +
        '<div class="detail-card-label">Note reference: what each symbol means</div>' +
        '<div class="swara-ref-grid">' +
          '<div class="swara-ref-header">Symbol</div>' +
          '<div class="swara-ref-header">Full name</div>' +
          '<div class="swara-ref-header">Solfège</div>' +
          '<div class="swara-ref-header">Western</div>' +
          refRows +
        '</div>' +
      '</div>' +
      '<button class="open-in-btn" onclick="Keyboard.quickLoad(\'' + nameSafe + '\')">' +
        'Piano&nbsp; Explore on Keyboard</button>' +
      '<button class="open-in-btn" onclick="Guitar.quickLoad(\'' + nameSafe + '\')">' +
        'Guitar&nbsp; Explore on Guitar</button>';

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

  return { renderList, filter, setTypeFilter, selectRaga, showList, getSwaraClass, swaraPills };
})();
