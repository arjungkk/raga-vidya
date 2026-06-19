/**
 * identify.js — Raga Identifier tab
 *
 * Two modes:
 *  - Text: describe swaras / mood → Claude identifies
 *  - Audio: hold-to-record mic → base64 audio → Claude listens and identifies
 */

const Identify = (() => {

  const API_URL = 'https://api.anthropic.com/v1/messages';
  const MODEL   = 'claude-sonnet-4-20250514';

  // ── Mode toggle ───────────────────────────────────────────────
  function setMode(mode) {
    State.identifyMode = mode;
    document.getElementById('identify-text-mode').style.display  = mode === 'text'  ? 'block' : 'none';
    document.getElementById('identify-audio-mode').style.display = mode === 'audio' ? 'block' : 'none';
    document.getElementById('mode-btn-text').classList.toggle('active',  mode === 'text');
    document.getElementById('mode-btn-audio').classList.toggle('active', mode === 'audio');
    document.getElementById('identify-result').classList.remove('show');
  }

  // ── Shared API helpers ────────────────────────────────────────
  function _ragaContext() {
    return RAGAS.map(r =>
      `${r.name}: aroh=[${r.aroh.join(',')}] avaroh=[${r.avaroh.join(',')}] vadi=${r.vadi} mood="${r.mood}" parent=${r.melakarta}`
    ).join('\n');
  }

  function _jsonSchema() {
    return '{"primary_raga":"Raga Name","confidence":"High|Medium|Low",' +
           '"alternatives":["Alt1","Alt2"],"explanation":"2-3 sentences",' +
           '"key_features":["f1","f2","f3"],"tip":"practical tip"}';
  }

  function _parseResponse(data) {
    if (data.error) throw new Error(data.error.message);
    const text  = data.content.map(c => c.text || '').join('');
    const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(clean);
  }

  function _setLoading(btnId, loading) {
    const btn     = document.getElementById(btnId);
    const spinner = document.getElementById('identify-spinner');
    const result  = document.getElementById('identify-result');
    if (loading) {
      if (btn) btn.disabled = true;
      spinner.classList.add('show');
      result.classList.remove('show');
    } else {
      if (btn) btn.disabled = false;
      spinner.classList.remove('show');
    }
  }

  // ── Text identification ───────────────────────────────────────
  async function identifyFromText() {
    const input = document.getElementById('identify-input').value.trim();
    if (!input) return;

    _setLoading('identify-btn-text', true);

    const system = [
      'You are a knowledgeable Carnatic music guru.',
      'The user describes swaras, notation, or mood. Identify the most likely Carnatic raga.',
      '',
      'Database:',
      _ragaContext(),
      '',
      'Respond ONLY in JSON, no markdown:',
      _jsonSchema(),
    ].join('\n');

    try {
      const res  = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL, max_tokens: 1000,
          system,
          messages: [{ role: 'user', content: 'Identify the raga: ' + input }],
        }),
      });
      showResult(_parseResponse(await res.json()));
    } catch (e) {
      _showError('Could not identify', e.message || 'Something went wrong. Try describing swaras more specifically.');
    }

    _setLoading('identify-btn-text', false);
  }

  // ── Audio recording ───────────────────────────────────────────
  async function startRecording(e) {
    if (e) e.preventDefault();
    State.recordedChunks  = [];
    State.recordedBlob    = null;
    State.recordingSeconds = 0;

    document.getElementById('audio-preview').style.display     = 'none';
    document.getElementById('recorder-timer').style.display    = 'block';
    document.getElementById('recorder-timer').textContent      = '0s';

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg', 'audio/mp4']
        .find(t => MediaRecorder.isTypeSupported(t)) ?? '';

      State.mediaRecorder = new MediaRecorder(stream, { mimeType });
      State.mediaRecorder.ondataavailable = ev => {
        if (ev.data.size > 0) State.recordedChunks.push(ev.data);
      };
      State.mediaRecorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        State.recordedBlob = new Blob(State.recordedChunks, { type: mimeType });
        document.getElementById('audio-playback').src = URL.createObjectURL(State.recordedBlob);
        document.getElementById('audio-preview').style.display = 'flex';
        document.getElementById('recorder-status').textContent = 'Recording saved — play it back or identify';
      };
      State.mediaRecorder.start(100);

      document.getElementById('record-btn').classList.add('recording');
      document.getElementById('recorder-status').textContent = 'Recording… release when done';

      State.recordingTimer = setInterval(() => {
        State.recordingSeconds++;
        document.getElementById('recorder-timer').textContent = State.recordingSeconds + 's';
        if (State.recordingSeconds >= 30) stopRecording();
      }, 1000);

    } catch (err) {
      const msgs = {
        NotFoundError:   'No microphone found on this device.',
        NotAllowedError: 'Microphone permission denied. Please allow access in settings.',
      };
      document.getElementById('recorder-status').textContent =
        msgs[err.name] ?? 'Microphone access denied.';
    }
  }

  function stopRecording(e) {
    if (e) e.preventDefault();
    if (!State.mediaRecorder || State.mediaRecorder.state === 'inactive') return;
    State.mediaRecorder.stop();
    clearInterval(State.recordingTimer);
    document.getElementById('record-btn').classList.remove('recording');
    document.getElementById('recorder-timer').style.display = 'none';
  }

  function clearRecording() {
    State.recordedBlob   = null;
    State.recordedChunks = [];
    document.getElementById('audio-preview').style.display     = 'none';
    document.getElementById('recorder-status').textContent     = 'Press and hold to record';
    document.getElementById('identify-result').classList.remove('show');
  }

  // ── Audio identification ──────────────────────────────────────
  async function identifyFromAudio() {
    if (!State.recordedBlob) return;
    _setLoading('identify-btn-audio', true);

    const system = [
      'You are an expert Carnatic musician who identifies ragas from audio.',
      'Listen for swaras used, their intervals, characteristic phrases, gamaka, and mood.',
      '',
      'Database:',
      _ragaContext(),
      '',
      'Respond ONLY in JSON, no markdown:',
      _jsonSchema(),
    ].join('\n');

    try {
      const base64   = await _blobToBase64(State.recordedBlob);
      const mimeType = State.recordedBlob.type.split(';')[0];

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL, max_tokens: 1000,
          system,
          messages: [{
            role: 'user',
            content: [
              { type: 'text', text: 'Identify the Carnatic raga from this recording.' },
              { type: 'document', source: { type: 'base64', media_type: mimeType, data: base64 } },
            ],
          }],
        }),
      });
      showResult(_parseResponse(await res.json()));
    } catch (err) {
      _showError(
        'Could not analyse audio',
        err.message || 'Audio format may not be supported.',
        true // show switch-to-text button
      );
    }

    _setLoading('identify-btn-audio', false);
  }

  function _blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // ── Result rendering ──────────────────────────────────────────
  function showResult(parsed) {
    const alts = parsed.alternatives?.length
      ? `<span style="font-size:0.72rem;color:var(--text-dim)">Also possible: ${parsed.alternatives.join(', ')}</span>`
      : '';

    const features = parsed.key_features?.length
      ? `<div style="margin-bottom:14px">
           <div style="font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px">Key Features</div>
           ${parsed.key_features.map(f => `<div style="font-size:0.75rem;color:var(--text-dim);padding:4px 0;border-bottom:1px solid var(--border)">· ${f}</div>`).join('')}
         </div>`
      : '';

    const tip = parsed.tip
      ? `<div style="background:var(--bg3);border:1px solid var(--border);border-radius:4px;padding:12px 14px;margin-top:12px">
           <div style="font-size:0.58rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Tip</div>
           <div style="font-size:0.78rem;color:var(--text);line-height:1.7">${parsed.tip}</div>
         </div>`
      : '';

    const nameSafe = (parsed.primary_raga || '').replace(/'/g, "\\'");

    document.getElementById('result-name').textContent = parsed.primary_raga;
    document.getElementById('result-body').innerHTML = `
      <div style="margin-bottom:12px">
        <span class="tag" style="background:rgba(201,168,76,0.15);border-color:var(--gold);color:var(--gold)">
          Confidence: ${parsed.confidence}
        </span>
        ${alts}
      </div>
      <p style="margin-bottom:14px;line-height:1.8">${parsed.explanation}</p>
      ${features}
      ${tip}
      <button class="play-btn" style="margin-top:16px;width:100%"
        onclick="Keyboard.quickLoad('${nameSafe}')">&#9000; Load in Keyboard</button>`;

    document.getElementById('identify-result').classList.add('show');
  }

  function _showError(title, message, showSwitch = false) {
    document.getElementById('result-name').textContent = title;
    document.getElementById('result-body').innerHTML =
      `<p style="color:var(--text-dim);margin-bottom:12px">${message}</p>` +
      (showSwitch ? `<button class="mode-btn active" onclick="Identify.setMode('text')" style="width:100%">Switch to Describe mode</button>` : '');
    document.getElementById('identify-result').classList.add('show');
  }

  // ── Public API ────────────────────────────────────────────────
  return { setMode, identifyFromText, startRecording, stopRecording, clearRecording, identifyFromAudio, showResult };
})();
