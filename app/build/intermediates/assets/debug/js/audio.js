/**
 * audio.js — low-level audio synthesis
 *
 * Manages a single shared AudioContext and provides playNote().
 * All other modules call playNote(); none create oscillators directly.
 */

const Audio = (() => {
  let _ctx = null;

  function getCtx() {
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
    return _ctx;
  }

  function midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  /**
   * Play a single MIDI note.
   * @param {number} midi  - MIDI note number
   * @param {HTMLElement} [el] - optional DOM element to flash .pressed
   * @param {number} [duration=1.5] - seconds the note sustains
   */
  function playNote(midi, el, duration = 1.5) {
    const ctx = getCtx();
    const soundType = document.getElementById('kb-sound-select')?.value ?? 'triangle';
    const freq = midiToFreq(midi);

    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (soundType === 'triangle') {
      // Veena-like: fundamental triangle + light second harmonic
      osc.type = 'triangle';
      const osc2 = ctx.createOscillator();
      const g2   = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.value = freq * 2;
      g2.gain.value = 0.1;
      osc2.connect(g2);
      g2.connect(ctx.destination);
      osc2.start();
      osc2.stop(ctx.currentTime + duration * 0.8);
    } else {
      osc.type = soundType;
    }

    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);

    if (el) {
      el.classList.add('pressed');
      setTimeout(() => el.classList.remove('pressed'), 300);
    }
  }

  return { playNote, midiToFreq };
})();
