/**
 * notation.js: swara reference system
 *
 * Maps every Carnatic swara to:
 *  - Full name (Shadja, Rishabha, etc.)
 *  - Solfège (Do, Re, Mi, …)
 *  - Western scale degree (Root, 2nd, 3rd, …)
 *  - Semitone offset from Sa
 *  - A plain-English character description
 *
 * Used throughout the app to make notation readable by beginners
 * while keeping the classical shorthand visible for learners.
 */

const Notation = (() => {

  // ── Swara dictionary ──────────────────────────────────────────
  // Each entry: { full, solfege, degree, semitones, character }
  const SWARAS = {
    Sa:  { full: 'Shadja',         solfege: 'Do',   degree: 'Root',       semitones: 0,  variant: null,    character: 'The anchor note: every raga begins and ends here' },
    R1:  { full: 'Shuddha Ri',     solfege: 'Ra',   degree: 'b2nd',       semitones: 1,  variant: 'flat',  character: 'The lowest Rishabha: tense, yearning' },
    R2:  { full: 'Chatushruti Ri', solfege: 'Re',   degree: '2nd',        semitones: 2,  variant: 'mid',   character: 'The natural Rishabha: bright and expressive' },
    R3:  { full: 'Shatshruti Ri',  solfege: 'Ri',   degree: '#2nd',       semitones: 4,  variant: 'sharp', character: 'The highest Rishabha: shares pitch with Ga₃' },
    G1:  { full: 'Shuddha Ga',     solfege: 'Me',   degree: 'b3rd',       semitones: 2,  variant: 'flat',  character: 'The lowest Gandhara: shares pitch with Ri₂, very gentle' },
    G2:  { full: 'Sadharana Ga',   solfege: 'Me',   degree: 'b3rd',       semitones: 3,  variant: 'mid',   character: 'The natural minor third: melancholic and soft' },
    G3:  { full: 'Antara Ga',      solfege: 'Mi',   degree: '3rd',        semitones: 4,  variant: 'nat',   character: 'The major third: bright, joyful, the heart of major ragas' },
    M1:  { full: 'Shuddha Ma',     solfege: 'Fa',   degree: '4th',        semitones: 5,  variant: 'nat',   character: 'The natural fourth: stable and grounded (suddha madhyama)' },
    M2:  { full: 'Prati Ma',       solfege: 'Fi',   degree: '#4th',       semitones: 6,  variant: 'sharp', character: 'The raised fourth: bright, restless, distinctive (prati madhyama)' },
    Pa:  { full: 'Panchama',       solfege: 'Sol',  degree: '5th',        semitones: 7,  variant: null,    character: 'The perfect fifth: steady and strong, like Sa it never changes' },
    D1:  { full: 'Shuddha Dha',    solfege: 'Le',   degree: 'b6th',       semitones: 8,  variant: 'flat',  character: 'The minor sixth: dark and introspective' },
    D2:  { full: 'Chatushruti Dha',solfege: 'La',   degree: '6th',        semitones: 9,  variant: 'mid',   character: 'The major sixth: bright and open' },
    D3:  { full: 'Shatshruti Dha', solfege: 'Li',   degree: '#6th',       semitones: 11, variant: 'sharp', character: 'The highest Dhaivata: shares pitch with Ni₃' },
    N1:  { full: 'Shuddha Ni',     solfege: 'Te',   degree: 'b7th',       semitones: 9,  variant: 'flat',  character: 'The lowest Nishada: shares pitch with Dha₂' },
    N2:  { full: 'Kaisiki Ni',     solfege: 'Te',   degree: 'b7th',       semitones: 10, variant: 'mid',   character: 'The natural minor seventh: expressive, slightly tense' },
    N3:  { full: 'Kakali Ni',      solfege: 'Ti',   degree: '7th (maj)',  semitones: 11, variant: 'nat',   character: 'The leading tone: strong pull back to Sa' },
  };

  // Aliases
  SWARAS['P'] = SWARAS['Pa'];

  // ── Public query functions ────────────────────────────────────

  /**
   * Get full info for a swara code.
   * @param {string} code - e.g. 'R2', 'G3', 'Sa', 'Pa'
   * @returns {object|null}
   */
  function get(code) {
    return SWARAS[code] ?? null;
  }

  /**
   * Format a swara for display depending on user's knowledge level.
   *
   * Levels:
   *   'carnatic' : just the short code:           "R2"
   *   'hybrid'   : code + western:                "R2 (2nd)"
   *   'western'  : solfège + degree:              "Re (2nd)"
   *   'full'     : everything:                    "R2 · Chatushruti Ri · Re / 2nd"
   */
  function format(code, level = 'hybrid') {
    const s = SWARAS[code];
    if (!s) return code;
    switch (level) {
      case 'carnatic': return code;
      case 'hybrid':   return `${code} <span class="swara-western">(${s.degree})</span>`;
      case 'western':  return `${s.solfege} <span class="swara-western">(${s.degree})</span>`;
      case 'full':     return `${code} · ${s.full} · ${s.solfege} / ${s.degree}`;
      default:         return code;
    }
  }

  /**
   * Build a tooltip string for a swara: shown on long-press or hover.
   */
  function tooltip(code) {
    const s = SWARAS[code];
    if (!s) return '';
    return `${code} = ${s.full}\n${s.solfege} · ${s.degree}\n"${s.character}"`;
  }

  /**
   * Map of raga structure terms to plain English.
   */
  const TERMS = {
    aroh:     { label: 'Ascending scale',  desc: 'The notes used going up from low Sa to high Sa' },
    avaroh:   { label: 'Descending scale', desc: 'The notes used coming back down from high Sa to low Sa' },
    vadi:     { label: 'King note',        desc: 'The most important, frequently used note: the personality of the raga' },
    samvadi:  { label: 'Minister note',    desc: 'The second most important note: supports the vadi and often a 4th or 5th away' },
    melakarta:{ label: 'Parent scale',     desc: 'The 7-note parent scale this raga is derived from (like a mode family)' },
    janya:    { label: 'Derived raga',     desc: 'A raga derived from a parent scale, often using fewer notes or zigzag movements' },
    gamaka:   { label: 'Ornament',         desc: 'The way notes are approached with slides, shakes, and bends: the life of Carnatic music' },
    pakad:    { label: 'Signature phrase', desc: 'A short melodic phrase that immediately identifies the raga to a listener' },
    sampurna: { label: 'Full scale',       desc: 'Uses all 7 notes (like a major or minor scale in Western music)' },
    audava:   { label: '5-note scale',     desc: 'Uses only 5 notes: like a pentatonic scale in Western music' },
    shadava:  { label: '6-note scale',     desc: 'Uses 6 notes: one note is omitted from the full 7' },
    vakra:    { label: 'Zigzag movement',  desc: 'The scale goes up or down in a non-linear order, skipping and coming back: gives the raga a unique shape' },
  };

  function term(key) {
    return TERMS[key] ?? { label: key, desc: '' };
  }

  /**
   * Plain-English description of a raga's scale structure.
   * e.g. "5-note ascending, 7-note descending"
   */
  function scaleDescription(raga) {
    const arohCount   = new Set(raga.aroh.filter(s => s !== 'Sa')).size + 1;
    const avarohCount = new Set(raga.avaroh.filter(s => s !== 'Sa')).size + 1;
    const countLabel  = n => n === 5 ? '5-note (pentatonic)' : n === 6 ? '6-note' : n === 7 ? '7-note (full)' : `${n}-note`;
    if (arohCount === avarohCount) return `${countLabel(arohCount)} scale`;
    return `${countLabel(arohCount)} ascending · ${countLabel(avarohCount)} descending`;
  }

  /**
   * Western analogy for well-known ragas (displayed in detail panel for beginners).
   */
  const WESTERN_ANALOGY = {
    'Shankarabharanam': 'Western major scale (Do Re Mi Fa Sol La Ti Do)',
    'Natabhairavi':     'Natural minor scale (like A minor)',
    'Keeravani':        'Harmonic minor scale',
    'Mechakalyani':     'Lydian mode (major scale with a raised 4th)',
    'Kharaharapriya':   'Dorian mode (minor scale with a raised 6th)',
    'Harikambhoji':     'Mixolydian mode (major scale with a flattened 7th)',
    'Mohanam':          'Major pentatonic scale',
    'Hindolam':         'Minor pentatonic scale (like the blues scale)',
    'Hamsadhwani':      'Major pentatonic without 4th and 6th',
    'Bhairavi':         'Close to the Phrygian mode',
    'Kalyani':          'Lydian mode: equivalent to Hindustani Yaman',
    'Charukesi':        'Major lower half + minor upper half (unusual hybrid)',
    'Shanmukhapriya':   'Similar to Lydian dominant (jazz scale)',
  };

  function westernAnalogy(ragaName) {
    return WESTERN_ANALOGY[ragaName] ?? null;
  }

  // ── Public API ────────────────────────────────────────────────
  return { get, format, tooltip, term, scaleDescription, westernAnalogy, SWARAS };
})();
