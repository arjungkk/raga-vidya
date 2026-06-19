/**
 * guitar.js — Guitar fretboard tab
 *
 * Responsibilities:
 *  - Render a 6-string × 13-fret fretboard (standard tuning)
 *  - Highlight swaras for the selected sequence
 *  - Arohana / Avarohana playback with fret-note animation
 *  - Loop mode
 */

const Guitar = (() => {

  const STRINGS = [
    { name: 'e', midi: 64 },
    { name: 'B', midi: 59 },
    { name: 'G', midi: 55 },
    { name: 'D', midi: 50 },
    { name: 'A', midi: 45 },
    { name: 'E', midi: 40 },
  ];
  const FRET_DOTS  = new Set([3, 5, 7, 9, 12]);
  const NUM_FRETS  = 13;
  const TONIC      = 0; // guitar view always uses C as Sa

  // ── Helpers ───────────────────────────────────────────────────
  function _noteInterval() {
    return Math.round(60000 / State.tempo); // shared tempo with keyboard
  }

  function _getRaga() {
    const idx = document.getElementById('guitar-raga-select').value;
    return idx !== '' ? RAGAS[parseInt(idx)] : null;
  }

  function _updateHint() {
    const hint = document.getElementById('guitar-seq-hint');
    if (!hint) return;
    hint.textContent = State.activeGuitarSeq
      ? `${State.activeGuitarSeq === 'aroh' ? 'Arohana' : 'Avarohana'} highlighted. Press Play to hear it.`
      : 'Select Arohana or Avarohana to highlight notes, then press Play.';
  }

  // ── Render fretboard ──────────────────────────────────────────
  function render(keepSeq = false) {
    if (!keepSeq) {
      State.activeGuitarSeq = null;
      ['gbtn-aroh', 'gbtn-avaroh'].forEach(id => {
        document.getElementById(id)?.classList.remove('active');
      });
      _updateHint();
    }

    const raga = _getRaga();
    document.getElementById('guitar-playback').style.display = raga ? 'block' : 'none';

    // Build highlight sets
    let highlightSemitones = new Set();
    let vadiSemitone   = -1;
    let samvadiSemitone = -1;
    const swaraNames   = {};

    if (raga) {
      const seqSwaras = State.activeGuitarSeq === 'aroh'   ? raga.aroh
                      : State.activeGuitarSeq === 'avaroh' ? raga.avaroh
                      : [];
      seqSwaras.forEach(sw => {
        if (sw in SWARA_SEMITONES) highlightSemitones.add(SWARA_SEMITONES[sw]);
      });
      [...new Set([...raga.aroh, ...raga.avaroh])].forEach(sw => {
        if (sw in SWARA_SEMITONES) swaraNames[SWARA_SEMITONES[sw]] = sw;
      });
      if (raga.vadi    in SWARA_SEMITONES) vadiSemitone    = SWARA_SEMITONES[raga.vadi];
      if (raga.samvadi in SWARA_SEMITONES) samvadiSemitone = SWARA_SEMITONES[raga.samvadi];
    }

    document.getElementById('fretboard-container').innerHTML = _buildHTML(
      highlightSemitones, vadiSemitone, samvadiSemitone, swaraNames
    );
  }

  function _buildHTML(highlightSemitones, vadiSemitone, samvadiSemitone, swaraNames) {
    let html = '<div class="fretboard">';

    // Fret numbers
    html += '<div class="fret-numbers">';
    for (let f = 0; f < NUM_FRETS; f++) html += `<div class="fret-num">${f}</div>`;
    html += '</div>';

    // Position dots
    html += '<div class="fret-dots-row">';
    for (let f = 0; f < NUM_FRETS; f++) {
      html += `<div class="fret-dot-cell">${FRET_DOTS.has(f) ? '<div class="fret-dot"></div>' : ''}</div>`;
    }
    html += '</div>';

    // String rows
    for (const str of STRINGS) {
      html += `<div class="fret-row"><div class="string-label">${str.name}</div>`;
      for (let f = 0; f < NUM_FRETS; f++) {
        const midi    = str.midi + f;
        const relSemi = (midi % 12 - TONIC + 12) % 12;
        const swName  = swaraNames[relSemi] || NOTE_NAMES[midi % 12];
        const inSeq   = highlightSemitones.has(relSemi);
        const isVadi  = relSemi === vadiSemitone;
        const isSamv  = relSemi === samvadiSemitone;
        const show    = inSeq || isVadi || isSamv;

        let noteClass = '';
        if (show) {
          if (isVadi) noteClass = 'fret-note vadi';
          else if (isSamv) noteClass = 'fret-note samvadi';
          else noteClass = 'fret-note in-raga';
        }

        html += `<div class="fret-cell"><div class="string-line"></div>`;
        if (noteClass) {
          html += `<div class="${noteClass}" data-midi="${midi}"
            onclick="Audio.playNote(${midi})" title="${swName}">${swName}</div>`;
        }
        html += `</div>`;
      }
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  // ── Sequence selection ────────────────────────────────────────
  function selectSequence(type) {
    stopAll();
    State.activeGuitarSeq = State.activeGuitarSeq === type ? null : type;
    document.getElementById('gbtn-aroh').classList.toggle('active',   State.activeGuitarSeq === 'aroh');
    document.getElementById('gbtn-avaroh').classList.toggle('active', State.activeGuitarSeq === 'avaroh');
    _updateHint();
    render(true);
  }

  // ── Playback ──────────────────────────────────────────────────
  async function playSelected() {
    if (!State.activeGuitarSeq) return;
    stopAll();
    await _playSequence(State.activeGuitarSeq, false);
  }

  async function _playSequence(type, isLoopCall) {
    const raga = _getRaga();
    if (!raga) return true;
    const swaras  = type === 'aroh' ? raga.aroh : [...raga.avaroh];
    const playBtn = document.getElementById('gbtn-play');
    if (playBtn) playBtn.classList.add('playing');
    const base = 48 + TONIC;

    for (let i = 0; i < swaras.length; i++) {
      const sw = swaras[i];
      let midi;
      if      (sw === 'Sa' && type === 'aroh'   && i === swaras.length - 1) midi = base + 12;
      else if (sw === 'Sa' && type === 'avaroh'  && i === 0)                midi = base + 12;
      else                                                                    midi = base + (SWARA_SEMITONES[sw] ?? 0);

      // Flash all matching fret notes
      const relSemi = midi % 12;
      document.querySelectorAll('#fretboard-container .fret-note').forEach(el => {
        if (parseInt(el.dataset.midi) % 12 === relSemi) {
          el.classList.add('pressed');
          setTimeout(() => el.classList.remove('pressed'), _noteInterval() * 0.8);
        }
      });

      Audio.playNote(midi);
      await new Promise(r => { State.guitarPlaybackTimeout = setTimeout(r, _noteInterval()); });

      if (isLoopCall && !State.guitarLooping) {
        if (playBtn) playBtn.classList.remove('playing');
        return false;
      }
    }

    if (playBtn) playBtn.classList.remove('playing');
    return true;
  }

  function toggleLoop() {
    if (State.guitarLooping) {
      State.guitarLooping = false;
      document.getElementById('gbtn-loop').classList.remove('active');
      stopAll();
    } else {
      if (!State.activeGuitarSeq) return;
      State.guitarLooping = true;
      document.getElementById('gbtn-loop').classList.add('active');
      _runLoop();
    }
  }

  async function _runLoop() {
    while (State.guitarLooping) {
      const ok = await _playSequence(State.activeGuitarSeq, true);
      if (!ok || !State.guitarLooping) break;
      await new Promise(r => { State.guitarPlaybackTimeout = setTimeout(r, _noteInterval()); });
    }
    document.getElementById('gbtn-loop').classList.remove('active');
    State.guitarLooping = false;
  }

  function stopAll() {
    State.guitarLooping = false;
    clearTimeout(State.guitarPlaybackTimeout);
    document.getElementById('gbtn-loop')?.classList.remove('active');
    document.getElementById('gbtn-play')?.classList.remove('playing');
  }

  function updateTempo(val) {
    State.tempo = parseInt(val);
    document.getElementById('guitar-tempo-label').textContent = State.tempo + ' BPM';
    // Keep keyboard tempo in sync
    const ks = document.getElementById('tempo-slider');
    if (ks) {
      ks.value = State.tempo;
      document.getElementById('tempo-label').textContent = State.tempo + ' BPM';
    }
  }

  // ── Quick load (from Explorer) ────────────────────────────────
  function quickLoad(ragaName) {
    const idx = RAGAS.findIndex(r => r.name === ragaName);
    if (idx < 0) return;
    document.getElementById('guitar-raga-select').value = idx;
    render(false);
    App.showTab('guitar', document.querySelectorAll('nav button')[2]);
  }

  // ── Public API ────────────────────────────────────────────────
  return { render, selectSequence, playSelected, toggleLoop, stopAll, updateTempo, quickLoad };
})();
