/**
 * keyboard.js — Piano keyboard tab
 *
 * Responsibilities:
 *  - Render two-octave piano with correct key layout
 *  - Highlight swaras for the selected sequence (aroh / avaroh)
 *  - Arohana / Avarohana playback with note animation
 *  - Loop mode
 */

const Keyboard = (() => {

  // Semitone offsets of white keys within an octave
  const WHITE_SEMITONES = [0, 2, 4, 5, 7, 9, 11];
  // Which white key (by semitone) is followed by a black key
  const BLACK_AFTER = { 0: 1, 2: 3, 5: 6, 7: 8, 9: 10 };

  // ── Helpers ───────────────────────────────────────────────────
  function _noteInterval() {
    return Math.round(60000 / State.tempo);
  }

  function _getRaga() {
    const idx = document.getElementById('kb-raga-select').value;
    return idx !== '' ? RAGAS[parseInt(idx)] : null;
  }

  function _getTonic() {
    return parseInt(document.getElementById('kb-tonic-select').value);
  }

  // ── Render ────────────────────────────────────────────────────
  function render(keepSeq = false) {
    if (!keepSeq) {
      State.activeSeq = null;
      ['btn-aroh', 'btn-avaroh'].forEach(id => {
        document.getElementById(id)?.classList.remove('active');
      });
      _updateHint();
    }

    const raga  = _getRaga();
    const tonic = _getTonic();

    // Update name display and playback panel visibility
    const display = document.getElementById('kb-raga-name-display');
    if (display) display.textContent = raga ? raga.name : 'No raga selected';
    document.getElementById('kb-playback').style.display = raga ? 'block' : 'none';

    // Build semitone sets for highlighting
    let highlightSemitones = new Set();
    let vadiSemitone   = -1;
    let samvadiSemitone = -1;
    const swaraNames   = {};

    if (raga) {
      const seqSwaras = State.activeSeq === 'aroh'   ? raga.aroh
                      : State.activeSeq === 'avaroh' ? raga.avaroh
                      : [];
      seqSwaras.forEach(sw => {
        if (sw in SWARA_SEMITONES) highlightSemitones.add(SWARA_SEMITONES[sw]);
      });
      [...new Set([...raga.aroh, ...raga.avaroh])].forEach(sw => {
        if (sw in SWARA_SEMITONES) {
          swaraNames[(tonic + SWARA_SEMITONES[sw]) % 12] = sw;
        }
      });
      if (raga.vadi    in SWARA_SEMITONES) vadiSemitone    = SWARA_SEMITONES[raga.vadi];
      if (raga.samvadi in SWARA_SEMITONES) samvadiSemitone = SWARA_SEMITONES[raga.samvadi];
    }

    _buildKeys(tonic, highlightSemitones, vadiSemitone, samvadiSemitone, swaraNames);
  }

  function _buildKeys(tonic, highlightSemitones, vadiSemitone, samvadiSemitone, swaraNames) {
    const kb        = document.getElementById('keyboard');
    kb.innerHTML    = '';
    const startNote = 48 + tonic;

    for (let oct = 0; oct < 2; oct++) {
      for (let w = 0; w < WHITE_SEMITONES.length; w++) {
        const semi    = WHITE_SEMITONES[w];
        const absMidi = startNote + oct * 12 + semi;
        const absSemi = (tonic + semi) % 12;

        // ── White key ──
        const wKey = _makeKey('white-key', absMidi, swaraNames[absSemi] || '', NOTE_NAMES[absSemi],
          highlightSemitones.has(semi), semi === vadiSemitone, semi === samvadiSemitone);
        kb.appendChild(wKey);

        // ── Black key (if present after this white key) ──
        if (semi in BLACK_AFTER) {
          const bSemi    = BLACK_AFTER[semi];
          const bAbsMidi = startNote + oct * 12 + bSemi;
          const bAbsSemi = (tonic + bSemi) % 12;
          const wrapper  = document.createElement('div');
          wrapper.className = 'black-key-wrapper';
          wrapper.appendChild(
            _makeKey('black-key', bAbsMidi, swaraNames[bAbsSemi] || '', NOTE_NAMES[bAbsSemi],
              highlightSemitones.has(bSemi), bSemi === vadiSemitone, bSemi === samvadiSemitone)
          );
          kb.appendChild(wrapper);
        }
      }
    }
  }

  function _makeKey(baseClass, midi, swName, noteName, inSeq, isVadi, isSamvadi) {
    const el = document.createElement('div');
    let cls  = baseClass;
    if (isVadi)    cls += ' in-raga vadi';
    else if (isSamvadi) cls += ' in-raga samvadi';
    else if (inSeq) cls += ' in-raga';
    el.className    = cls;
    el.dataset.midi = midi;
    el.innerHTML = `<div class="key-label">
      <span class="swara-name">${swName}</span>
      <span class="note-name">${noteName}</span>
    </div>`;
    el.addEventListener('mousedown', () => Audio.playNote(midi, el));
    el.addEventListener('touchstart', e => { e.preventDefault(); Audio.playNote(midi, el); }, { passive: false });
    return el;
  }

  // ── Sequence selection ────────────────────────────────────────
  function selectSequence(type) {
    stopAll();
    State.activeSeq = State.activeSeq === type ? null : type;
    document.getElementById('btn-aroh').classList.toggle('active',   State.activeSeq === 'aroh');
    document.getElementById('btn-avaroh').classList.toggle('active', State.activeSeq === 'avaroh');
    _updateHint();
    render(true);
  }

  function _updateHint() {
    const hint = document.getElementById('kb-sequence-hint');
    if (!hint) return;
    hint.textContent = State.activeSeq
      ? `${State.activeSeq === 'aroh' ? 'Arohana' : 'Avarohana'} highlighted. Press Play to hear it.`
      : 'Select Arohana or Avarohana to highlight keys, then press Play.';
  }

  // ── Playback ──────────────────────────────────────────────────
  async function playSelected() {
    if (!State.activeSeq) return;
    stopAll();
    await _playSequence(State.activeSeq, false);
  }

  async function _playSequence(type, isLoopCall) {
    const raga = _getRaga();
    if (!raga) return true;
    const tonic   = _getTonic();
    const swaras  = type === 'aroh' ? raga.aroh : [...raga.avaroh];
    const playBtn = document.getElementById('btn-play');
    if (playBtn) playBtn.classList.add('playing');
    const base = 48 + tonic;

    for (let i = 0; i < swaras.length; i++) {
      const sw = swaras[i];
      let midi;
      if      (sw === 'Sa' && type === 'aroh'   && i === swaras.length - 1) midi = base + 12;
      else if (sw === 'Sa' && type === 'avaroh'  && i === 0)                midi = base + 12;
      else                                                                    midi = base + (SWARA_SEMITONES[sw] ?? 0);

      // Flash the key
      const keyEl = document.querySelector(`.keyboard [data-midi="${midi}"]`);
      if (keyEl) {
        keyEl.classList.add('pressed');
        setTimeout(() => keyEl.classList.remove('pressed'), _noteInterval() * 0.8);
      }

      Audio.playNote(midi);
      await new Promise(r => { State.playbackTimeout = setTimeout(r, _noteInterval()); });

      if (isLoopCall && !State.isLooping) {
        if (playBtn) playBtn.classList.remove('playing');
        return false;
      }
    }

    if (playBtn) playBtn.classList.remove('playing');
    return true;
  }

  function toggleLoop() {
    if (State.isLooping) {
      State.isLooping = false;
      document.getElementById('btn-loop').classList.remove('active');
      stopAll();
    } else {
      if (!State.activeSeq) return;
      State.isLooping = true;
      document.getElementById('btn-loop').classList.add('active');
      _runLoop();
    }
  }

  async function _runLoop() {
    while (State.isLooping) {
      const ok = await _playSequence(State.activeSeq, true);
      if (!ok || !State.isLooping) break;
      await new Promise(r => { State.playbackTimeout = setTimeout(r, _noteInterval()); });
    }
    document.getElementById('btn-loop').classList.remove('active');
    State.isLooping = false;
  }

  function stopAll() {
    State.isLooping = false;
    clearTimeout(State.playbackTimeout);
    document.getElementById('btn-loop')?.classList.remove('active');
    document.getElementById('btn-play')?.classList.remove('playing');
  }

  // ── Controls ──────────────────────────────────────────────────
  function changeOctave(delta) {
    State.currentOctave = Math.max(2, Math.min(6, State.currentOctave + delta));
    document.getElementById('octave-label').textContent = State.currentOctave;
  }

  function updateTempo(val) {
    State.tempo = parseInt(val);
    document.getElementById('tempo-label').textContent = State.tempo + ' BPM';
    // Keep guitar tempo in sync
    const gs = document.getElementById('guitar-tempo-slider');
    if (gs) {
      gs.value = State.tempo;
      document.getElementById('guitar-tempo-label').textContent = State.tempo + ' BPM';
    }
  }

  // ── Quick load (from Explorer) ────────────────────────────────
  function quickLoad(ragaName) {
    const idx = RAGAS.findIndex(r => r.name === ragaName);
    if (idx < 0) return;
    document.getElementById('kb-raga-select').value = idx;
    render(false);
    App.showTab('keyboard', document.querySelectorAll('nav button')[1]);
  }

  // ── Public API ────────────────────────────────────────────────
  return { render, selectSequence, playSelected, toggleLoop, stopAll, changeOctave, updateTempo, quickLoad };
})();
