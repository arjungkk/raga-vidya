/**
 * state.js — centralised mutable state for Raga Vidya
 *
 * All modules import from this object rather than using scattered globals.
 * Mutation happens in the owning module; cross-module reads go through here.
 */

const State = {
  // Explorer
  selectedRaga:     null,
  activeTypeFilter: 'all',

  // Keyboard
  activeSeq:        null,   // 'aroh' | 'avaroh' | null
  currentOctave:    4,
  tempo:            100,    // BPM (shared with guitar)
  isLooping:        false,
  playbackTimeout:  null,

  // Guitar
  activeGuitarSeq:      null,
  guitarLooping:        false,
  guitarPlaybackTimeout: null,

  // Identify — audio recording
  identifyMode:    'text',  // 'text' | 'audio'
  mediaRecorder:   null,
  recordedChunks:  [],
  recordingTimer:  null,
  recordingSeconds: 0,
  recordedBlob:    null,
};
