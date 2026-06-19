const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

// Semitone offsets from Sa for each swara variant
const SWARA_SEMITONES = {
  'Sa': 0, 'R1': 1, 'R2': 2, 'R3': 4, 'G1': 2, 'G2': 3, 'G3': 4,
  'M1': 5, 'M2': 6, 'Pa': 7, 'P': 7,
  'D1': 8, 'D2': 9, 'D3': 11, 'N1': 9, 'N2': 10, 'N3': 11
};

const RAGAS = [

  // ══════════════════════════════════════════
  // 72 MELAKARTA RAGAS
  // ══════════════════════════════════════════

  // Chakra 1 — Indu
  { type:'melakarta', number:1, name:'Kanakangi', melakarta:'Kanakangi (1)',
    aroh:['Sa','R1','G1','M1','Pa','D1','N1','Sa'], avaroh:['Sa','N1','D1','Pa','M1','G1','R1','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Austere',
    phrases:['Sa R1 G1 M1 Pa','Pa D1 N1 Sa','Sa N1 D1 Pa M1'],
    tags:['Sampurna','Melakarta'], description:'First melakarta with all komal swaras except Ma. Rarely performed as a concert raga but forms the root of the system.' },

  { type:'melakarta', number:2, name:'Ratnangi', melakarta:'Ratnangi (2)',
    aroh:['Sa','R1','G1','M1','Pa','D1','N2','Sa'], avaroh:['Sa','N2','D1','Pa','M1','G1','R1','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Contemplative',
    phrases:['Sa R1 G1 M1','Pa D1 N2 Sa','N2 D1 Pa M1 G1'],
    tags:['Sampurna','Melakarta'], description:'Second melakarta. Distinguished by D1 and N2 combination in the upper tetrachord.' },

  { type:'melakarta', number:3, name:'Ganamurti', melakarta:'Ganamurti (3)',
    aroh:['Sa','R1','G1','M1','Pa','D1','N3','Sa'], avaroh:['Sa','N3','D1','Pa','M1','G1','R1','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Serious',
    phrases:['Sa R1 G1 M1 Pa','N3 D1 Pa M1','Sa N3 D1'],
    tags:['Sampurna','Melakarta'], description:'Third melakarta featuring the unusual D1-N3 combination giving a distinct, tense character.' },

  { type:'melakarta', number:4, name:'Vanaspati', melakarta:'Vanaspati (4)',
    aroh:['Sa','R1','G1','M1','Pa','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G1','R1','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Calm',
    phrases:['Sa R1 G1 M1 Pa D2','N2 D2 Pa M1','G1 R1 Sa'],
    tags:['Sampurna','Melakarta'], description:'Fourth melakarta with D2 and N2 (identical pitch) making it particularly distinctive.' },

  { type:'melakarta', number:5, name:'Manavati', melakarta:'Manavati (5)',
    aroh:['Sa','R1','G1','M1','Pa','D2','N3','Sa'], avaroh:['Sa','N3','D2','Pa','M1','G1','R1','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Regal',
    phrases:['Sa R1 G1 M1 Pa','D2 N3 Sa','Sa N3 D2 Pa'],
    tags:['Sampurna','Melakarta'], description:'Fifth melakarta combining komal lower swaras with D2 and N3.' },

  { type:'melakarta', number:6, name:'Tanarupi', melakarta:'Tanarupi (6)',
    aroh:['Sa','R1','G1','M1','Pa','D3','N3','Sa'], avaroh:['Sa','N3','D3','Pa','M1','G1','R1','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Intense',
    phrases:['Sa R1 G1 M1 Pa D3','N3 Sa','Sa N3 D3 Pa'],
    tags:['Sampurna','Melakarta'], description:'Sixth melakarta (D3=D2, N3). Parent of Varali, one of the most important ragas.' },

  // Chakra 2 — Netra
  { type:'melakarta', number:7, name:'Senavati', melakarta:'Senavati (7)',
    aroh:['Sa','R1','G2','M1','Pa','D1','N1','Sa'], avaroh:['Sa','N1','D1','Pa','M1','G2','R1','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Melancholic',
    phrases:['Sa R1 G2 M1','Pa D1 N1 Sa','N1 D1 Pa M1 G2'],
    tags:['Sampurna','Melakarta'], description:'Seventh melakarta with G2 (same pitch as R2) pairing with D1 N1.' },

  { type:'melakarta', number:8, name:'Hanumatodi', melakarta:'Hanumatodi (8)',
    aroh:['Sa','R1','G2','M1','Pa','D1','N2','Sa'], avaroh:['Sa','N2','D1','Pa','M1','G2','R1','Sa'],
    vadi:'D1', samvadi:'G2', time:'Morning', mood:'Serious, Profound',
    phrases:['Sa R1 G2 M1 Pa','Ni Da Pa Ma','Ga Ma Pa Da Ni Sa'],
    tags:['Sampurna','Melakarta','Morning'], description:'One of the most important melakartas. Parent of the magnificent Todi family. Rich in gamakas and deeply expressive.' },

  { type:'melakarta', number:9, name:'Dhenuka', melakarta:'Dhenuka (9)',
    aroh:['Sa','R1','G2','M1','Pa','D1','N3','Sa'], avaroh:['Sa','N3','D1','Pa','M1','G2','R1','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Serene',
    phrases:['Sa R1 G2 M1 Pa','N3 D1 Pa','Sa N3 D1'],
    tags:['Sampurna','Melakarta'], description:'Ninth melakarta featuring D1 N3, an unusual interval giving it a tense quality.' },

  { type:'melakarta', number:10, name:'Natakapriya', melakarta:'Natakapriya (10)',
    aroh:['Sa','R1','G2','M1','Pa','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G2','R1','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Dramatic',
    phrases:['Sa R1 G2 M1 Pa D2','N2 Sa','Sa N2 D2 Pa'],
    tags:['Sampurna','Melakarta'], description:'Tenth melakarta meaning "beloved of actors". Has a bright upper tetrachord.' },

  { type:'melakarta', number:11, name:'Kokilapriya', melakarta:'Kokilapriya (11)',
    aroh:['Sa','R1','G2','M1','Pa','D2','N3','Sa'], avaroh:['Sa','N3','D2','Pa','M1','G2','R1','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Pleasing',
    phrases:['Sa R1 G2 M1 Pa','D2 N3 Sa','Sa N3 D2 Pa M1'],
    tags:['Sampurna','Melakarta'], description:'Eleventh melakarta meaning "beloved of the cuckoo". Parent of some beautiful ragas.' },

  { type:'melakarta', number:12, name:'Rupavati', melakarta:'Rupavati (12)',
    aroh:['Sa','R1','G2','M1','Pa','D3','N3','Sa'], avaroh:['Sa','N3','D3','Pa','M1','G2','R1','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Beautiful',
    phrases:['Sa R1 G2 M1 Pa D3','N3 Sa','Sa N3 D3 Pa M1'],
    tags:['Sampurna','Melakarta'], description:'Twelfth melakarta meaning "beautiful". Completes the second chakra.' },

  // Chakra 3 — Agni
  { type:'melakarta', number:13, name:'Gayakapriya', melakarta:'Gayakapriya (13)',
    aroh:['Sa','R1','G3','M1','Pa','D1','N1','Sa'], avaroh:['Sa','N1','D1','Pa','M1','G3','R1','Sa'],
    vadi:'G3', samvadi:'N1', time:'Any', mood:'Unusual',
    phrases:['Sa R1 G3 M1 Pa','D1 N1 Sa','Sa N1 D1 Pa'],
    tags:['Sampurna','Melakarta'], description:'Thirteenth melakarta with the unusual R1-G3 (augmented second) interval giving it a distinctive exotic flavour.' },

  { type:'melakarta', number:14, name:'Vakulabharanam', melakarta:'Vakulabharanam (14)',
    aroh:['Sa','R1','G3','M1','Pa','D1','N2','Sa'], avaroh:['Sa','N2','D1','Pa','M1','G3','R1','Sa'],
    vadi:'G3', samvadi:'D1', time:'Any', mood:'Complex',
    phrases:['Sa R1 G3 M1','Pa D1 N2 Sa','N2 D1 Pa G3'],
    tags:['Sampurna','Melakarta'], description:'Fourteenth melakarta with an augmented second between R1 and G3. Used in some Thyagaraja compositions.' },

  { type:'melakarta', number:15, name:'Mayamalavagowla', melakarta:'Mayamalavagowla (15)',
    aroh:['Sa','R1','G3','M1','Pa','D1','N3','Sa'], avaroh:['Sa','N3','D1','Pa','M1','G3','R1','Sa'],
    vadi:'R1', samvadi:'Pa', time:'Dawn', mood:'Austere, Prayerful',
    phrases:['Sa Ri Ga Ma Pa','Da Ni Sa','Sa Ni Da Pa Ma Ga Ri Sa'],
    tags:['Sampurna','Melakarta','Dawn'], description:'The gateway raga — students of Carnatic music begin here. Corresponds to the Bhairav that of Hindustani. Deeply sacred.' },

  { type:'melakarta', number:16, name:'Chakravakam', melakarta:'Chakravakam (16)',
    aroh:['Sa','R1','G3','M1','Pa','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G3','R1','Sa'],
    vadi:'G3', samvadi:'N2', time:'Morning', mood:'Sweet, Pleasing',
    phrases:['Sa R1 G3 M1 Pa','D2 N2 Sa','Sa N2 D2 Pa G3'],
    tags:['Sampurna','Melakarta','Morning'], description:'A widely-used melakarta, parent of the beautiful Ahiri. Has a pleasing, versatile quality.' },

  { type:'melakarta', number:17, name:'Suryakantam', melakarta:'Suryakantam (17)',
    aroh:['Sa','R1','G3','M1','Pa','D2','N3','Sa'], avaroh:['Sa','N3','D2','Pa','M1','G3','R1','Sa'],
    vadi:'R1', samvadi:'Pa', time:'Morning', mood:'Bright',
    phrases:['Sa R1 G3 M1 Pa D2','N3 Sa','Sa N3 D2 Pa M1'],
    tags:['Sampurna','Melakarta'], description:'Seventeenth melakarta meaning "sun-gem". Has a bright, luminous quality owing to its svaras.' },

  { type:'melakarta', number:18, name:'Hatakambari', melakarta:'Hatakambari (18)',
    aroh:['Sa','R1','G3','M1','Pa','D3','N3','Sa'], avaroh:['Sa','N3','D3','Pa','M1','G3','R1','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Stately',
    phrases:['Sa R1 G3 M1 Pa D3','N3 Sa','Sa N3 D3 Pa'],
    tags:['Sampurna','Melakarta'], description:'Eighteenth melakarta completing the third chakra. Has a stately, dignified character.' },

  // Chakra 4 — Veda
  { type:'melakarta', number:19, name:'Jhankaradhwani', melakarta:'Jhankaradhwani (19)',
    aroh:['Sa','R2','G2','M1','Pa','D1','N1','Sa'], avaroh:['Sa','N1','D1','Pa','M1','G2','R2','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Resonant',
    phrases:['Sa R2 G2 M1 Pa','D1 N1 Sa','Sa N1 D1 Pa M1'],
    tags:['Sampurna','Melakarta'], description:'Nineteenth melakarta meaning "the ringing sound". Parent of the popular Kapi.' },

  { type:'melakarta', number:20, name:'Natabhairavi', melakarta:'Natabhairavi (20)',
    aroh:['Sa','R2','G2','M1','Pa','D1','N1','Sa'], avaroh:['Sa','N1','D1','Pa','M1','G2','R2','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Pathos',
    phrases:['Sa R2 G2 M1 Pa','Ni Da Pa Ma','Ga Ma Pa Da Ni Sa'],
    tags:['Sampurna','Melakarta'], description:'Parent of Bhairavi and Hindolam. The natural minor scale of Western music. One of the most important melakartas.' },

  { type:'melakarta', number:21, name:'Keeravani', melakarta:'Keeravani (21)',
    aroh:['Sa','R2','G2','M1','Pa','D1','N3','Sa'], avaroh:['Sa','N3','D1','Pa','M1','G2','R2','Sa'],
    vadi:'Pa', samvadi:'Sa', time:'Night', mood:'Melancholic, Intense',
    phrases:['Sa R2 G2 M1 Pa','N3 D1 Pa','Sa N3 D1 Pa M1 G2'],
    tags:['Sampurna','Melakarta','Night'], description:'Equivalent to the harmonic minor scale. Known for its haunting beauty. Used in many film compositions.' },

  { type:'melakarta', number:22, name:'Kharaharapriya', melakarta:'Kharaharapriya (22)',
    aroh:['Sa','R2','G2','M1','Pa','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G2','R2','Sa'],
    vadi:'R2', samvadi:'Pa', time:'Any', mood:'Versatile',
    phrases:['Sa Ri Ga Ma Pa','Da Ni Sa','Sa Ni Da Pa Ma Ga Ri Sa'],
    tags:['Sampurna','Melakarta'], description:'Parent of Kharaharapriya (Dorian mode equivalent). One of the most important melakartas, parent of Abhogi, Madhyamavati and many others.' },

  { type:'melakarta', number:23, name:'Gourimanohari', melakarta:'Gourimanohari (23)',
    aroh:['Sa','R2','G2','M1','Pa','D2','N3','Sa'], avaroh:['Sa','N3','D2','Pa','M1','G2','R2','Sa'],
    vadi:'G2', samvadi:'N3', time:'Any', mood:'Beautiful',
    phrases:['Sa R2 G2 M1 Pa D2','N3 Sa','Sa N3 D2 Pa M1 G2'],
    tags:['Sampurna','Melakarta'], description:'Twenty-third melakarta meaning "beautiful as Gauri". Has a pleasing, gentle quality.' },

  { type:'melakarta', number:24, name:'Varunapriya', melakarta:'Varunapriya (24)',
    aroh:['Sa','R2','G2','M1','Pa','D3','N3','Sa'], avaroh:['Sa','N3','D3','Pa','M1','G2','R2','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Deep',
    phrases:['Sa R2 G2 M1 Pa D3','N3 Sa','Sa N3 D3 Pa M1'],
    tags:['Sampurna','Melakarta'], description:'Twenty-fourth melakarta meaning "beloved of Varuna (rain god)". Completes the fourth chakra.' },

  // Chakra 5 — Bana
  { type:'melakarta', number:25, name:'Mararanjani', melakarta:'Mararanjani (25)',
    aroh:['Sa','R2','G3','M1','Pa','D1','N1','Sa'], avaroh:['Sa','N1','D1','Pa','M1','G3','R2','Sa'],
    vadi:'G3', samvadi:'D1', time:'Any', mood:'Pleasing',
    phrases:['Sa R2 G3 M1 Pa','D1 N1 Sa','N1 D1 Pa G3 R2 Sa'],
    tags:['Sampurna','Melakarta'], description:'Twenty-fifth melakarta. Has a charming, pleasing character. Parent of the popular Surati.' },

  { type:'melakarta', number:26, name:'Charukesi', melakarta:'Charukesi (26)',
    aroh:['Sa','R2','G3','M1','Pa','D1','N1','Sa'], avaroh:['Sa','N1','D1','Pa','M1','G3','R2','Sa'],
    vadi:'Pa', samvadi:'Sa', time:'Afternoon', mood:'Romantic, Melancholic',
    phrases:['Sa Ri Ga Ma Pa','Pa Da Ni Sa','Ni Da Pa Ma Ga Ri Sa'],
    tags:['Sampurna','Melakarta','Afternoon'], description:'A beautiful melakarta combining a major lower tetrachord with a minor upper tetrachord. Immensely popular in film music.' },

  { type:'melakarta', number:27, name:'Sarasangi', melakarta:'Sarasangi (27)',
    aroh:['Sa','R2','G3','M1','Pa','D1','N3','Sa'], avaroh:['Sa','N3','D1','Pa','M1','G3','R2','Sa'],
    vadi:'G3', samvadi:'N3', time:'Any', mood:'Sweet',
    phrases:['Sa R2 G3 M1 Pa','N3 D1 Pa','Sa N3 D1 Pa G3'],
    tags:['Sampurna','Melakarta'], description:'Twenty-seventh melakarta. Parent of some charming ragas. The D1-N3 gives an interesting tension.' },

  { type:'melakarta', number:28, name:'Harikambhoji', melakarta:'Harikambhoji (28)',
    aroh:['Sa','R2','G3','M1','Pa','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G3','R2','Sa'],
    vadi:'Pa', samvadi:'R2', time:'Evening', mood:'Heroic, Romantic',
    phrases:['Sa Ri Ga Ma Pa Da','Ni Da Pa Ma Ga Ri Sa','Pa Ni Sa'],
    tags:['Sampurna','Melakarta','Evening'], description:'Parent of Kambhoji and Mohanam. Equivalent to the Mixolydian mode. One of the most important melakartas in the system.' },

  { type:'melakarta', number:29, name:'Dheerashankarabharanam', melakarta:'Dheerashankarabharanam (29)',
    aroh:['Sa','R2','G3','M1','Pa','D2','N3','Sa'], avaroh:['Sa','N3','D2','Pa','M1','G3','R2','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Afternoon', mood:'Grandeur, Majesty',
    phrases:['Sa Ri Ga Ma Pa','Pa Ma Ga Ri Sa','Ni Da Pa Ma Ga'],
    tags:['Sampurna','Melakarta','Afternoon'], description:'The Western major scale. Considered the "king of melakartas". Parent of Shankarabharanam, Bilahari, Kedaragowla and many more.' },

  { type:'melakarta', number:30, name:'Naganandini', melakarta:'Naganandini (30)',
    aroh:['Sa','R2','G3','M1','Pa','D3','N3','Sa'], avaroh:['Sa','N3','D3','Pa','M1','G3','R2','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Bright',
    phrases:['Sa R2 G3 M1 Pa D3','N3 Sa','Sa N3 D3 Pa M1 G3'],
    tags:['Sampurna','Melakarta'], description:'Thirtieth melakarta completing the fifth chakra. Has a bright, full character.' },

  // Chakra 6 — Rutu
  { type:'melakarta', number:31, name:'Yagapriya', melakarta:'Yagapriya (31)',
    aroh:['Sa','R3','G3','M1','Pa','D1','N1','Sa'], avaroh:['Sa','N1','D1','Pa','M1','G3','R3','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Ritualistic',
    phrases:['Sa R3 G3 M1 Pa','D1 N1 Sa','Sa N1 D1 Pa M1 G3'],
    tags:['Sampurna','Melakarta'], description:'Thirty-first melakarta meaning "beloved of sacrificial rites". First raga in the system to use R3.' },

  { type:'melakarta', number:32, name:'Ragavardhini', melakarta:'Ragavardhini (32)',
    aroh:['Sa','R3','G3','M1','Pa','D1','N2','Sa'], avaroh:['Sa','N2','D1','Pa','M1','G3','R3','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Enhancing',
    phrases:['Sa R3 G3 M1 Pa','D1 N2 Sa','Sa N2 D1 Pa G3'],
    tags:['Sampurna','Melakarta'], description:'Thirty-second melakarta meaning "enhancer of ragas".' },

  { type:'melakarta', number:33, name:'Gangeyabhushani', melakarta:'Gangeyabhushani (33)',
    aroh:['Sa','R3','G3','M1','Pa','D1','N3','Sa'], avaroh:['Sa','N3','D1','Pa','M1','G3','R3','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Ornate',
    phrases:['Sa R3 G3 M1 Pa','N3 D1 Pa','Sa N3 D1 Pa G3'],
    tags:['Sampurna','Melakarta'], description:'Thirty-third melakarta meaning "adorned by Ganga". Has an ornate, decorated quality.' },

  { type:'melakarta', number:34, name:'Vagadheeswari', melakarta:'Vagadheeswari (34)',
    aroh:['Sa','R3','G3','M1','Pa','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G3','R3','Sa'],
    vadi:'G3', samvadi:'N2', time:'Any', mood:'Commanding',
    phrases:['Sa R3 G3 M1 Pa D2','N2 Sa','Sa N2 D2 Pa G3'],
    tags:['Sampurna','Melakarta'], description:'Thirty-fourth melakarta meaning "goddess of speech". Has a commanding, assertive quality.' },

  { type:'melakarta', number:35, name:'Shulini', melakarta:'Shulini (35)',
    aroh:['Sa','R3','G3','M1','Pa','D2','N3','Sa'], avaroh:['Sa','N3','D2','Pa','M1','G3','R3','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Sharp',
    phrases:['Sa R3 G3 M1 Pa D2','N3 Sa','Sa N3 D2 Pa G3'],
    tags:['Sampurna','Melakarta'], description:'Thirty-fifth melakarta. Has a sharp, piercing quality from the R3 and high svaras.' },

  { type:'melakarta', number:36, name:'Chalanata', melakarta:'Chalanata (36)',
    aroh:['Sa','R3','G3','M1','Pa','D3','N3','Sa'], avaroh:['Sa','N3','D3','Pa','M1','G3','R3','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Any', mood:'Dynamic',
    phrases:['Sa R3 G3 M1 Pa D3','N3 Sa','Sa N3 D3 Pa G3'],
    tags:['Sampurna','Melakarta'], description:'Thirty-sixth and last of the suddha madhyama melakartas. Marks the midpoint of the 72-raga system.' },

  // Chakra 7 — Rishi (Prati Madhyama begins)
  { type:'melakarta', number:37, name:'Salagam', melakarta:'Salagam (37)',
    aroh:['Sa','R1','G1','M2','Pa','D1','N1','Sa'], avaroh:['Sa','N1','D1','Pa','M2','G1','R1','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Intense',
    phrases:['Sa R1 G1 M2 Pa','D1 N1 Sa','Sa N1 D1 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'First prati madhyama melakarta. The teevra Ma gives all prati madhyama ragas their characteristic brightness.' },

  { type:'melakarta', number:38, name:'Jalarnavam', melakarta:'Jalarnavam (38)',
    aroh:['Sa','R1','G1','M2','Pa','D1','N2','Sa'], avaroh:['Sa','N2','D1','Pa','M2','G1','R1','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Flowing',
    phrases:['Sa R1 G1 M2 Pa','D1 N2 Sa','Sa N2 D1 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Thirty-eighth melakarta meaning "ocean". The teevra Ma with lower svaras creates a flowing quality.' },

  { type:'melakarta', number:39, name:'Jhalavarali', melakarta:'Jhalavarali (39)',
    aroh:['Sa','R1','G1','M2','Pa','D1','N3','Sa'], avaroh:['Sa','N3','D1','Pa','M2','G1','R1','Sa'],
    vadi:'M2', samvadi:'G1', time:'Any', mood:'Brooding',
    phrases:['Sa R1 G1 M2 Pa','N3 D1 Pa M2','G1 R1 Sa'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Thirty-ninth melakarta with a heavy, brooding quality from its dense cluster of low svaras.' },

  { type:'melakarta', number:40, name:'Navanitam', melakarta:'Navanitam (40)',
    aroh:['Sa','R1','G1','M2','Pa','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M2','G1','R1','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Buttery',
    phrases:['Sa R1 G1 M2 Pa D2','N2 Sa','Sa N2 D2 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Fortieth melakarta meaning "butter". Has a smooth, flowing quality.' },

  { type:'melakarta', number:41, name:'Pavani', melakarta:'Pavani (41)',
    aroh:['Sa','R1','G1','M2','Pa','D2','N3','Sa'], avaroh:['Sa','N3','D2','Pa','M2','G1','R1','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Purifying',
    phrases:['Sa R1 G1 M2 Pa D2','N3 Sa','Sa N3 D2 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Forty-first melakarta meaning "purifier (wind)". Has a bright, airy quality.' },

  { type:'melakarta', number:42, name:'Raghupriya', melakarta:'Raghupriya (42)',
    aroh:['Sa','R1','G1','M2','Pa','D3','N3','Sa'], avaroh:['Sa','N3','D3','Pa','M2','G1','R1','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Regal',
    phrases:['Sa R1 G1 M2 Pa D3','N3 Sa','Sa N3 D3 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Forty-second melakarta meaning "beloved of Raghu (Rama)". Has a regal, noble quality.' },

  // Chakra 8 — Vasu
  { type:'melakarta', number:43, name:'Gavambodhi', melakarta:'Gavambodhi (43)',
    aroh:['Sa','R1','G2','M2','Pa','D1','N1','Sa'], avaroh:['Sa','N1','D1','Pa','M2','G2','R1','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Earthy',
    phrases:['Sa R1 G2 M2 Pa','D1 N1 Sa','N1 D1 Pa M2 G2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Forty-third melakarta meaning "knowledge of cows". Has an earthy, grounded quality.' },

  { type:'melakarta', number:44, name:'Bhavapriya', melakarta:'Bhavapriya (44)',
    aroh:['Sa','R1','G2','M2','Pa','D1','N2','Sa'], avaroh:['Sa','N2','D1','Pa','M2','G2','R1','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Emotional',
    phrases:['Sa R1 G2 M2 Pa','D1 N2 Sa','N2 D1 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Forty-fourth melakarta meaning "beloved of emotions". Has an emotionally resonant quality.' },

  { type:'melakarta', number:45, name:'Shubhapantuvarali', melakarta:'Shubhapantuvarali (45)',
    aroh:['Sa','R1','M2','Pa','D1','Sa'], avaroh:['Sa','N3','D1','Pa','M2','G2','R1','Sa'],
    vadi:'D1', samvadi:'G2', time:'Morning', mood:'Serious, Deep',
    phrases:['Sa Ri Ga Ma Pa','Ga Ma Pa Da Ni','Ni Da Pa Ma Ga Ri Sa'],
    tags:['Sampurna','Melakarta','Morning'], description:'Parent of the great Todi. One of the most celebrated melakartas. Has immense depth and is rich in gamaka possibilities.' },

  { type:'melakarta', number:46, name:'Shadvidhamargini', melakarta:'Shadvidhamargini (46)',
    aroh:['Sa','R1','G2','M2','Pa','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M2','G2','R1','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Versatile',
    phrases:['Sa R1 G2 M2 Pa D2','N2 Sa','Sa N2 D2 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Forty-sixth melakarta meaning "one with six paths". Has a versatile, exploratory quality.' },

  { type:'melakarta', number:47, name:'Suvarnangi', melakarta:'Suvarnangi (47)',
    aroh:['Sa','R1','G2','M2','Pa','D2','N3','Sa'], avaroh:['Sa','N3','D2','Pa','M2','G2','R1','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Golden',
    phrases:['Sa R1 G2 M2 Pa D2','N3 Sa','Sa N3 D2 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Forty-seventh melakarta meaning "golden-limbed". Has a warm, golden quality.' },

  { type:'melakarta', number:48, name:'Divyamani', melakarta:'Divyamani (48)',
    aroh:['Sa','R1','G2','M2','Pa','D3','N3','Sa'], avaroh:['Sa','N3','D3','Pa','M2','G2','R1','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Divine',
    phrases:['Sa R1 G2 M2 Pa D3','N3 Sa','Sa N3 D3 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Forty-eighth melakarta meaning "divine gem". Completes the eighth chakra.' },

  // Chakra 9 — Brahma
  { type:'melakarta', number:49, name:'Dhavalambari', melakarta:'Dhavalambari (49)',
    aroh:['Sa','R1','G3','M2','Pa','D1','N1','Sa'], avaroh:['Sa','N1','D1','Pa','M2','G3','R1','Sa'],
    vadi:'M2', samvadi:'G3', time:'Any', mood:'White, Pure',
    phrases:['Sa R1 G3 M2 Pa','D1 N1 Sa','Sa N1 D1 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Forty-ninth melakarta meaning "white cloud". Has a pure, open quality.' },

  { type:'melakarta', number:50, name:'Namanarayani', melakarta:'Namanarayani (50)',
    aroh:['Sa','R1','G3','M2','Pa','D1','N2','Sa'], avaroh:['Sa','N2','D1','Pa','M2','G3','R1','Sa'],
    vadi:'M2', samvadi:'G3', time:'Any', mood:'Devotional',
    phrases:['Sa R1 G3 M2 Pa','D1 N2 Sa','N2 D1 Pa M2 G3'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Fiftieth melakarta meaning "obeisance to Narayana". Has a devotional quality.' },

  { type:'melakarta', number:51, name:'Kamavardhini', melakarta:'Kamavardhini (51)',
    aroh:['Sa','R1','G3','M2','Pa','D1','N3','Sa'], avaroh:['Sa','N3','D1','Pa','M2','G3','R1','Sa'],
    vadi:'G3', samvadi:'N3', time:'Any', mood:'Desire-enhancing',
    phrases:['Sa R1 G3 M2 Pa','N3 D1 Pa M2','G3 R1 Sa'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Fifty-first melakarta meaning "enhancer of desires". Also called Pantuvarali, parent of many important ragas.' },

  { type:'melakarta', number:52, name:'Ramapriya', melakarta:'Ramapriya (52)',
    aroh:['Sa','R1','G3','M2','Pa','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M2','G3','R1','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Beloved',
    phrases:['Sa R1 G3 M2 Pa D2','N2 Sa','Sa N2 D2 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Fifty-second melakarta meaning "beloved of Rama". Has a charming, devotional quality.' },

  { type:'melakarta', number:53, name:'Gamanashrama', melakarta:'Gamanashrama (53)',
    aroh:['Sa','R1','G3','M2','Pa','D2','N3','Sa'], avaroh:['Sa','N3','D2','Pa','M2','G3','R1','Sa'],
    vadi:'M2', samvadi:'G3', time:'Any', mood:'Wandering',
    phrases:['Sa R1 G3 M2 Pa D2','N3 Sa','Sa N3 D2 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Fifty-third melakarta. Has a wandering, exploratory quality.' },

  { type:'melakarta', number:54, name:'Vishwambhari', melakarta:'Vishwambhari (54)',
    aroh:['Sa','R1','G3','M2','Pa','D3','N3','Sa'], avaroh:['Sa','N3','D3','Pa','M2','G3','R1','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Universal',
    phrases:['Sa R1 G3 M2 Pa D3','N3 Sa','Sa N3 D3 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Fifty-fourth melakarta meaning "sustainer of the universe". Completes the ninth chakra.' },

  // Chakra 10 — Disi
  { type:'melakarta', number:55, name:'Shamalangi', melakarta:'Shamalangi (55)',
    aroh:['Sa','R2','G2','M2','Pa','D1','N1','Sa'], avaroh:['Sa','N1','D1','Pa','M2','G2','R2','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Dark, Dense',
    phrases:['Sa R2 G2 M2 Pa','D1 N1 Sa','N1 D1 Pa M2 G2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Fifty-fifth melakarta. Has a dark, dense quality from its combination of svaras.' },

  { type:'melakarta', number:56, name:'Shanmukhapriya', melakarta:'Shanmukhapriya (56)',
    aroh:['Sa','R2','G2','M2','Pa','D1','N2','Sa'], avaroh:['Sa','N2','D1','Pa','M2','G2','R2','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Evening', mood:'Pleasing, Popular',
    phrases:['Sa R2 G2 M2 Pa','D1 N2 Sa','N2 D1 Pa M2 Ga Ri Sa'],
    tags:['Sampurna','Melakarta','Evening','Prati Madhyama'], description:'Fifty-sixth melakarta meaning "beloved of Shanmukha (Murugan)". Very popular in film music, equivalent to the Lydian dominant scale.' },

  { type:'melakarta', number:57, name:'Simhendramadhyamam', melakarta:'Simhendramadhyamam (57)',
    aroh:['Sa','R2','G2','M2','Pa','D1','N3','Sa'], avaroh:['Sa','N3','D1','Pa','M2','G2','R2','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Leonine',
    phrases:['Sa R2 G2 M2 Pa','N3 D1 Pa M2','Ga Ri Sa'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Fifty-seventh melakarta meaning "middle of lion kings". Has a powerful, leonine quality.' },

  { type:'melakarta', number:58, name:'Hemavati', melakarta:'Hemavati (58)',
    aroh:['Sa','R2','G2','M2','Pa','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M2','G2','R2','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Golden',
    phrases:['Sa R2 G2 M2 Pa D2','N2 Sa','Sa N2 D2 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Fifty-eighth melakarta meaning "golden". Has a warm, rich quality.' },

  { type:'melakarta', number:59, name:'Dharmavati', melakarta:'Dharmavati (59)',
    aroh:['Sa','R2','G2','M2','Pa','D2','N3','Sa'], avaroh:['Sa','N3','D2','Pa','M2','G2','R2','Sa'],
    vadi:'M2', samvadi:'R2', time:'Any', mood:'Righteous',
    phrases:['Sa R2 G2 M2 Pa D2','N3 Sa','Sa N3 D2 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Fifty-ninth melakarta meaning "virtuous". Has a noble, righteous quality.' },

  { type:'melakarta', number:60, name:'Neetimati', melakarta:'Neetimati (60)',
    aroh:['Sa','R2','G2','M2','Pa','D3','N3','Sa'], avaroh:['Sa','N3','D3','Pa','M2','G2','R2','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Just',
    phrases:['Sa R2 G2 M2 Pa D3','N3 Sa','Sa N3 D3 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Sixtieth melakarta meaning "principled". Completes the tenth chakra.' },

  // Chakra 11 — Rudra
  { type:'melakarta', number:61, name:'Kantamani', melakarta:'Kantamani (61)',
    aroh:['Sa','R2','G3','M2','Pa','D1','N1','Sa'], avaroh:['Sa','N1','D1','Pa','M2','G3','R2','Sa'],
    vadi:'M2', samvadi:'G3', time:'Any', mood:'Gem-like',
    phrases:['Sa R2 G3 M2 Pa','D1 N1 Sa','N1 D1 Pa M2 G3'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Sixty-first melakarta meaning "neck gem". Has a sparkling, gem-like quality.' },

  { type:'melakarta', number:62, name:'Rishabhapriya', melakarta:'Rishabhapriya (62)',
    aroh:['Sa','R2','G3','M2','Pa','D1','N2','Sa'], avaroh:['Sa','N2','D1','Pa','M2','G3','R2','Sa'],
    vadi:'M2', samvadi:'G3', time:'Any', mood:'Bull-like',
    phrases:['Sa R2 G3 M2 Pa','D1 N2 Sa','N2 D1 Pa M2 G3'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Sixty-second melakarta meaning "beloved of Rishabha (the bull — Nandi)". Has a strong, steady quality.' },

  { type:'melakarta', number:63, name:'Latangi', melakarta:'Latangi (63)',
    aroh:['Sa','R2','G3','M2','Pa','D1','N3','Sa'], avaroh:['Sa','N3','D1','Pa','M2','G3','R2','Sa'],
    vadi:'M2', samvadi:'G3', time:'Any', mood:'Creeper-like',
    phrases:['Sa R2 G3 M2 Pa','N3 D1 Pa','Sa N3 D1 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Sixty-third melakarta meaning "creeper". Has a sinuous, winding quality.' },

  { type:'melakarta', number:64, name:'Vachaspati', melakarta:'Vachaspati (64)',
    aroh:['Sa','R2','G3','M2','Pa','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M2','G3','R2','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Eloquent',
    phrases:['Sa R2 G3 M2 Pa D2','N2 Sa','Sa N2 D2 Pa M2 G3'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Sixty-fourth melakarta meaning "lord of speech". Equivalent to the Lydian mode. Has an eloquent, flowing quality.' },

  { type:'melakarta', number:65, name:'Mechakalyani', melakarta:'Mechakalyani (65)',
    aroh:['Sa','R2','G3','M2','Pa','D2','N3','Sa'], avaroh:['Sa','N3','D2','Pa','M2','G3','R2','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Evening', mood:'Auspicious, Serene',
    phrases:['Sa Ri Ga Ma Pa','Ni Da Pa Ma Ga Ri Sa','Ga Ma Pa Da Ni Sa'],
    tags:['Sampurna','Melakarta','Evening'], description:'Parent of Kalyani and Hamsadhwani. One of the most important prati madhyama melakartas. Has a bright, uplifting quality.' },

  { type:'melakarta', number:66, name:'Chitrambari', melakarta:'Chitrambari (66)',
    aroh:['Sa','R2','G3','M2','Pa','D3','N3','Sa'], avaroh:['Sa','N3','D3','Pa','M2','G3','R2','Sa'],
    vadi:'M2', samvadi:'G3', time:'Any', mood:'Colourful',
    phrases:['Sa R2 G3 M2 Pa D3','N3 Sa','Sa N3 D3 Pa M2 G3'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Sixty-sixth melakarta meaning "colourful sky". Completes the eleventh chakra.' },

  // Chakra 12 — Aditya
  { type:'melakarta', number:67, name:'Sucharitra', melakarta:'Sucharitra (67)',
    aroh:['Sa','R3','G3','M2','Pa','D1','N1','Sa'], avaroh:['Sa','N1','D1','Pa','M2','G3','R3','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Virtuous',
    phrases:['Sa R3 G3 M2 Pa','D1 N1 Sa','Sa N1 D1 Pa M2'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Sixty-seventh melakarta meaning "virtuous character". Has a dignified, upright quality.' },

  { type:'melakarta', number:68, name:'Jyotisvarupini', melakarta:'Jyotisvarupini (68)',
    aroh:['Sa','R3','G3','M2','Pa','D1','N2','Sa'], avaroh:['Sa','N2','D1','Pa','M2','G3','R3','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Luminous',
    phrases:['Sa R3 G3 M2 Pa','D1 N2 Sa','N2 D1 Pa M2 G3'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Sixty-eighth melakarta meaning "embodiment of light". Has a luminous, radiant quality.' },

  { type:'melakarta', number:69, name:'Dhatuvardani', melakarta:'Dhatuvardani (69)',
    aroh:['Sa','R3','G3','M2','Pa','D1','N3','Sa'], avaroh:['Sa','N3','D1','Pa','M2','G3','R3','Sa'],
    vadi:'M2', samvadi:'G3', time:'Any', mood:'Enriching',
    phrases:['Sa R3 G3 M2 Pa','N3 D1 Pa','Sa N3 D1 Pa M2 G3'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Sixty-ninth melakarta meaning "enhancer of elements". Has an enriching, strengthening quality.' },

  { type:'melakarta', number:70, name:'Nasikabhushani', melakarta:'Nasikabhushani (70)',
    aroh:['Sa','R3','G3','M2','Pa','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M2','G3','R3','Sa'],
    vadi:'M2', samvadi:'R3', time:'Any', mood:'Adorned',
    phrases:['Sa R3 G3 M2 Pa D2','N2 Sa','Sa N2 D2 Pa M2 G3'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Seventieth melakarta meaning "nose ornament". Has a decorative, ornamented quality.' },

  { type:'melakarta', number:71, name:'Kosalam', melakarta:'Kosalam (71)',
    aroh:['Sa','R3','G3','M2','Pa','D2','N3','Sa'], avaroh:['Sa','N3','D2','Pa','M2','G3','R3','Sa'],
    vadi:'M2', samvadi:'G3', time:'Any', mood:'Regal',
    phrases:['Sa R3 G3 M2 Pa D2','N3 Sa','Sa N3 D2 Pa M2 G3'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'Seventy-first melakarta named after Kosala (ancient kingdom). Has a regal, dignified quality.' },

  { type:'melakarta', number:72, name:'Rasikapriya', melakarta:'Rasikapriya (72)',
    aroh:['Sa','R3','G3','M2','Pa','D3','N3','Sa'], avaroh:['Sa','N3','D3','Pa','M2','G3','R3','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Beloved of Connoisseurs',
    phrases:['Sa R3 G3 M2 Pa D3','N3 Sa','Sa N3 D3 Pa M2 G3'],
    tags:['Sampurna','Melakarta','Prati Madhyama'], description:'The seventy-second and final melakarta, meaning "beloved of connoisseurs". Completes the entire system — an apt final raga for the discerning listener.' },

  // ══════════════════════════════════════════
  // MAJOR JANYA RAGAS
  // ══════════════════════════════════════════

  { type:'janya', number:null, name:'Bhairavi', melakarta:'Natabhairavi (20)',
    aroh:['Sa','R1','G2','M1','Pa','D1','N2','Sa'], avaroh:['Sa','N2','D1','Pa','M1','G2','R1','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Morning', mood:'Pathos, Longing',
    phrases:['Sa Ri Ga Ma Pa','Ni Da Pa Ma Ga Ri Sa','Ma Pa Da Ni Sa'],
    tags:['Sampurna','Morning','Bhakti'], description:'One of the most beloved ragas, evoking deep pathos and devotion. Widely used in film and classical music. Uses vakra and borrowed swaras freely.' },

  { type:'janya', number:null, name:'Todi', melakarta:'Shubhapantuvarali (45)',
    aroh:['Sa','R1','M2','Pa','D1','Sa'], avaroh:['Sa','N3','D1','Pa','M2','G2','R1','Sa'],
    vadi:'D1', samvadi:'G2', time:'Morning', mood:'Serious, Deep',
    phrases:['Sa Ri Ga Ma Pa','Ga Ma Pa Da Ni','Ni Da Pa Ma Ga Ri Sa'],
    tags:['Sampurna','Morning','Serious'], description:'One of the most important ragas in Carnatic music. Profound, serious, and deeply expressive. Rich in gamaka.' },

  { type:'janya', number:null, name:'Kalyani', melakarta:'Mechakalyani (65)',
    aroh:['Sa','R2','G3','M2','Pa','D2','N3','Sa'], avaroh:['Sa','N3','D2','Pa','M2','G3','R2','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Evening', mood:'Auspicious, Serene',
    phrases:['Sa Ri Ga Ma Ga Ri','Ni Da Pa Ma Ga','Ga Ma Pa Da Ni Sa'],
    tags:['Sampurna','Evening','Auspicious'], description:'Considered auspicious and majestic. Equivalent to Yaman in Hindustani. One of the most widely performed ragas.' },

  { type:'janya', number:null, name:'Shankarabharanam', melakarta:'Dheerashankarabharanam (29)',
    aroh:['Sa','R2','G3','M1','Pa','D2','N3','Sa'], avaroh:['Sa','N3','D2','Pa','M1','G3','R2','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Afternoon', mood:'Grandeur, Majesty',
    phrases:['Sa Ri Ga Ma Pa','Pa Ma Ga Ri Sa','Ni Da Pa Ma Ga'],
    tags:['Sampurna','Afternoon','Majestic'], description:'The Western major scale. Called the "king of ragas". Used for grand, majestic compositions by all the Trinity.' },

  { type:'janya', number:null, name:'Kambhoji', melakarta:'Harikambhoji (28)',
    aroh:['Sa','R2','G3','M1','Pa','D2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G3','R2','Sa'],
    vadi:'Pa', samvadi:'R2', time:'Evening', mood:'Heroic, Romantic',
    phrases:['Sa Ri Ga Ma Pa Da','Pa Ma Ga Ri Sa','Ni Da Pa'],
    tags:['Audava-Sampurna','Evening','Heroic'], description:'Omits Ni in ascent. Majestic and heroic. Popular for tillanas, padam and dance compositions.' },

  { type:'janya', number:null, name:'Hindolam', melakarta:'Natabhairavi (20)',
    aroh:['Sa','G1','M1','D1','N1','Sa'], avaroh:['Sa','N1','D1','M1','G1','Sa'],
    vadi:'G2', samvadi:'N2', time:'Late Night', mood:'Contemplative, Devotional',
    phrases:['Sa Ga Ma Da Ni Sa','Ni Da Ma Ga Sa','Ga Ma Da Ni'],
    tags:['Audava','Night','Devotional'], description:'A pentatonic raga of immense depth. Deeply meditative and devotional. Equivalent to Malkauns in Hindustani.' },

  { type:'janya', number:null, name:'Hamsadhwani', melakarta:'Mechakalyani (65)',
    aroh:['Sa','R2','G3','Pa','N3','Sa'], avaroh:['Sa','N3','Pa','G3','R2','Sa'],
    vadi:'Pa', samvadi:'R2', time:'Evening', mood:'Cheerful, Auspicious',
    phrases:['Sa Ri Ga Pa Ni Sa','Sa Ni Pa Ga Ri Sa','Pa Ni Sa'],
    tags:['Audava','Evening','Cheerful'], description:'A delightful pentatonic raga used to open concerts and auspicious occasions. Very popular and instantly recognizable.' },

  { type:'janya', number:null, name:'Charukesi', melakarta:'Charukesi (26)',
    aroh:['Sa','R2','G3','M1','Pa','D1','N1','Sa'], avaroh:['Sa','N1','D1','Pa','M1','G3','R2','Sa'],
    vadi:'Pa', samvadi:'Sa', time:'Afternoon', mood:'Romantic, Melancholic',
    phrases:['Sa Ri Ga Ma Pa','Pa Da Ni Sa','Ni Da Pa Ma Ga'],
    tags:['Sampurna','Afternoon','Romantic'], description:'A beautiful raga combining a major lower tetrachord with a minor upper tetrachord. Deeply popular in film music across South India.' },

  { type:'janya', number:null, name:'Mohanam', melakarta:'Harikambhoji (28)',
    aroh:['Sa','R2','G3','Pa','D2','Sa'], avaroh:['Sa','D2','Pa','G3','R2','Sa'],
    vadi:'G3', samvadi:'D2', time:'Evening', mood:'Pleasing, Romantic',
    phrases:['Sa Ri Ga Pa Da Sa','Sa Da Pa Ga Ri Sa','Ga Pa Da Sa'],
    tags:['Audava','Evening','Romantic'], description:'A pentatonic raga equivalent to the major pentatonic scale. Universally loved and widely used in all Indian film music traditions.' },

  { type:'janya', number:null, name:'Madhyamavati', melakarta:'Kharaharapriya (22)',
    aroh:['Sa','R2','M1','Pa','N2','Sa'], avaroh:['Sa','N2','Pa','M1','R2','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Night', mood:'Devotional, Serene',
    phrases:['Sa Ri Ma Pa Ni Sa','Ni Pa Ma Ri Sa','Pa Ma Ri Sa'],
    tags:['Audava','Night','Devotional'], description:'A pentatonic raga equivalent to Megh in Hindustani. Known for intensely emotive devotional compositions.' },

  { type:'janya', number:null, name:'Varali', melakarta:'Tanarupi (6)',
    aroh:['Sa','R1','G2','M2','Pa','D1','N3','Sa'], avaroh:['Sa','N3','D1','Pa','M2','G2','R1','Sa'],
    vadi:'G2', samvadi:'N3', time:'Early Morning', mood:'Prayerful, Solemn',
    phrases:['Sa Ri Ga Ma Pa','Ga Ma Pa Da Ni','Ni Da Pa Ma Ga Ri Sa'],
    tags:['Sampurna','Morning','Prayerful'], description:'An ancient, weighty raga performed at temples at dawn. Considered highly auspicious and sacred.' },

  { type:'janya', number:null, name:'Saveri', melakarta:'Malahari (15)',
    aroh:['Sa','R1','M1','Pa','D1','Sa'], avaroh:['Sa','N3','D1','Pa','M1','G3','R1','Sa'],
    vadi:'R1', samvadi:'Pa', time:'Morning', mood:'Melancholic, Sweet',
    phrases:['Sa Ri Ma Pa Da Sa','Ni Da Pa Ma Ga Ri Sa','Pa Da Sa'],
    tags:['Audava-Sampurna','Morning','Melancholic'], description:'A morning raga with a sweet, melancholic quality. Popular for compositions on separation and longing.' },

  { type:'janya', number:null, name:'Bilahari', melakarta:'Dheerashankarabharanam (29)',
    aroh:['Sa','R2','G3','Pa','D2','Sa'], avaroh:['Sa','N3','D2','Pa','M1','G3','R2','Sa'],
    vadi:'G3', samvadi:'D2', time:'Morning', mood:'Cheerful, Bright',
    phrases:['Sa Ri Ga Pa Da Sa','Ni Da Pa Ma Ga Ri Sa','Pa Da Ni Sa'],
    tags:['Audava-Sampurna','Morning','Cheerful'], description:'An audava-sampurna raga with a bright, cheerful quality. Omits Ma and Ni in ascent. Popular for mangalams and auspicious pieces.' },

  { type:'janya', number:null, name:'Kedaragowla', melakarta:'Harikambhoji (28)',
    aroh:['Sa','M1','G3','M1','Pa','N2','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G3','R2','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Evening', mood:'Sweet, Bhakti',
    phrases:['Sa Ma Ga Ma Pa Ni Da Ni Sa','N2 D2 Pa M1 G3 R2 Sa','M1 G3 M1 Pa'],
    tags:['Vakra','Evening','Bhakti'], description:'A vakra raga with characteristic zigzag movements in ascent. Immensely popular for devotional compositions.' },

  { type:'janya', number:null, name:'Abhogi', melakarta:'Kharaharapriya (22)',
    aroh:['Sa','R2','G2','M1','D2','Sa'], avaroh:['Sa','D2','M1','G2','R2','Sa'],
    vadi:'G2', samvadi:'D2', time:'Any', mood:'Pleasing, Light',
    phrases:['Sa Ri Ga Ma Da Sa','Sa Da Ma Ga Ri Sa','Ga Ma Da Sa'],
    tags:['Audava','Pleasing'], description:'A simple, pleasing pentatonic raga omitting Pa and Ni. Its simplicity makes it very accessible and popular for light music.' },

  { type:'janya', number:null, name:'Kapi', melakarta:'Kharaharapriya (22)',
    aroh:['Sa','R2','G2','M1','Pa','N2','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G2','R2','Sa'],
    vadi:'M1', samvadi:'Pa', time:'Night', mood:'Light, Romantic',
    phrases:['Sa Ri Ga Ma Pa Ni Da Ni Sa','N2 D2 Pa M1 G2 Ri Sa','Ma Pa Ni Sa'],
    tags:['Vakra','Night','Romantic'], description:'A popular raga often associated with folk and light music. Uses N2 and N3 in different contexts, giving it a colourful, flexible character.' },

  { type:'janya', number:null, name:'Surutti', melakarta:'Harikambhoji (28)',
    aroh:['Sa','R2','M1','Pa','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G3','R2','Sa'],
    vadi:'M1', samvadi:'Pa', time:'Evening', mood:'Sweet, Bhakti',
    phrases:['Sa Ri Ma Pa Ni Sa','Ni Da Pa Ma Ga Ri Sa','Pa Ma Ga Ri Sa'],
    tags:['Audava-Sampurna','Evening','Bhakti'], description:'A popular raga for devotional compositions, omitting Ga in ascent. Sweet and accessible, widely used in bhajans.' },

  { type:'janya', number:null, name:'Punnagavarali', melakarta:'Hanumatodi (8)',
    aroh:['Sa','R1','M1','Pa','N3','Sa'], avaroh:['Sa','N3','Pa','M1','R1','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Morning', mood:'Plaintive, Melancholic',
    phrases:['Sa Ri Ma Pa Ni Sa','Ni Pa Ma Ri Sa','Pa Ni Sa'],
    tags:['Audava','Morning','Melancholic'], description:'A simple pentatonic raga with an extremely plaintive, melancholic quality. Instantly recognizable. Very popular in film music for sad songs.' },

  { type:'janya', number:null, name:'Begada', melakarta:'Harikambhoji (28)',
    aroh:['Sa','R2','G3','M1','Pa','G3','M1','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G3','R2','Sa'],
    vadi:'G3', samvadi:'N2', time:'Morning', mood:'Grand, Majestic',
    phrases:['Sa Ri Ga Ma Pa Ga Ma Da Ni Sa','N2 D2 Pa M1 G3 Ri Sa','M1 G3 M1 Pa'],
    tags:['Vakra','Morning','Majestic'], description:'A vakra raga with a grand, majestic character. Has characteristic zigzag movements and is rich in gamaka possibilities.' },

  { type:'janya', number:null, name:'Navaroj', melakarta:'Harikambhoji (28)',
    aroh:['Sa','R2','G3','M1','Pa','D2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G3','R2','Sa'],
    vadi:'Pa', samvadi:'Sa', time:'Evening', mood:'Grand, Popular',
    phrases:['Sa Ri Ga Ma Pa Da Sa','N2 Da Pa M1 Ga Ri Sa','Pa Da Sa'],
    tags:['Audava-Sampurna','Evening'], description:'Similar to Kambhoji but with consistent usage. A grand raga very popular in film music.' },

  { type:'janya', number:null, name:'Amrutavarshini', melakarta:'Kamavardhini (51)',
    aroh:['Sa','G3','M2','Pa','N3','Sa'], avaroh:['Sa','N3','Pa','M2','G3','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Any', mood:'Rain-evoking',
    phrases:['Sa Ga Ma Pa Ni Sa','Ni Pa Ma Ga Sa','Ma Pa Ni Sa'],
    tags:['Audava','Rain'], description:'Literally means "raining nectar". Traditionally believed to invoke rain. A pentatonic raga with an intense, yearning quality.' },

  { type:'janya', number:null, name:'Nattai', melakarta:'Kanakangi (1)',
    aroh:['Sa','R3','G3','M1','Pa','N3','Sa'], avaroh:['Sa','N3','Pa','M1','G3','R3','Sa'],
    vadi:'Pa', samvadi:'Sa', time:'Any', mood:'Grand, Heroic',
    phrases:['Sa R3 Ga Ma Pa Ni Sa','Ni Pa Ma Ga R3 Sa','Pa Ni Sa'],
    tags:['Audava-Sampurna','Heroic'], description:'A grand, heroic raga often used for large compositions and mangalams. Has a majestic, imposing quality.' },

  { type:'janya', number:null, name:'Gambhiranattai', melakarta:'Kanakangi (1)',
    aroh:['Sa','R3','M1','Pa','N3','Sa'], avaroh:['Sa','N3','Pa','M1','G3','R3','Sa'],
    vadi:'Pa', samvadi:'Sa', time:'Any', mood:'Serious, Grand',
    phrases:['Sa R3 Ma Pa Ni Sa','Ni Pa M1 G3 R3 Sa','Pa Ni Sa'],
    tags:['Audava','Serious'], description:'The serious, grander version of Nattai. Used for weighty, important compositions.' },

  { type:'janya', number:null, name:'Panthuvarali', melakarta:'Kamavardhini (51)',
    aroh:['Sa','R1','G3','M2','Pa','D1','N3','Sa'], avaroh:['Sa','N3','D1','Pa','M2','G3','R1','Sa'],
    vadi:'G3', samvadi:'N3', time:'Morning', mood:'Serious, Grand',
    phrases:['Sa Ri Ga Ma Pa','N3 D1 Pa M2','Ga Ma Pa Da Ni Sa'],
    tags:['Sampurna','Morning','Serious'], description:'A raga of great depth and seriousness. Used for weighty compositions. The vakra nature of some svaras gives it a distinctive zigzag movement.' },

  { type:'janya', number:null, name:'Saranga', melakarta:'Harikambhoji (28)',
    aroh:['Sa','R2','M1','Pa','D2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','R2','Sa'],
    vadi:'M1', samvadi:'Pa', time:'Noon', mood:'Intense, Bright',
    phrases:['Sa Ri Ma Pa Da Sa','N2 Da Pa M1 Ri Sa','Pa Da Sa Ni Da Pa'],
    tags:['Audava','Noon'], description:'A bright, intense midday raga. Equivalent to Sarang in Hindustani. Has a characteristic upward leap.' },

  { type:'janya', number:null, name:'Desh', melakarta:'Harikambhoji (28)',
    aroh:['Sa','R2','M1','Pa','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G3','R2','Sa'],
    vadi:'N2', samvadi:'G3', time:'Night', mood:'Romantic, Patriotic',
    phrases:['Sa Ri Ma Pa Ni Sa','Ni Da Pa Ma Ga Ri Sa','Pa Ni Sa'],
    tags:['Audava-Sampurna','Night','Romantic'], description:'A popular and accessible raga widely used in light classical and film music. Very close to Surutti but treated differently.' },

  { type:'janya', number:null, name:'Sahana', melakarta:'Harikambhoji (28)',
    aroh:['Sa','R2','G3','M1','Pa','G3','M1','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G3','R2','G3','R2','Sa'],
    vadi:'M1', samvadi:'Pa', time:'Evening', mood:'Pathos, Bhakti',
    phrases:['Sa Ri Ga Ma Pa Ga Ma Da Ni Sa','Ni Da Pa Ma Ga Ri Ga Ri Sa'],
    tags:['Vakra','Evening','Bhakti'], description:'A vakra raga with characteristic beautiful meanderings. Known for extraordinarily emotive compositions expressing bhakti and pathos.' },

  { type:'janya', number:null, name:'Atana', melakarta:'Kharaharapriya (22)',
    aroh:['Sa','R2','Pa','M1','Pa','N2','Sa'], avaroh:['Sa','N2','D2','N2','Pa','M1','G2','R2','Sa'],
    vadi:'Pa', samvadi:'Sa', time:'Night', mood:'Heroic, Grand',
    phrases:['Sa Ri Pa Ma Pa Ni Sa','Ni Da Ni Pa Ma Ga Ri Sa'],
    tags:['Vakra','Night','Heroic'], description:'A grand, heroic vakra raga with a strong, assertive character. Often used for compositions depicting valour and grandeur.' },

  { type:'janya', number:null, name:'Anandabhairavi', melakarta:'Natabhairavi (20)',
    aroh:['Sa','R2','G2','M1','Pa','D1','Sa'], avaroh:['Sa','N2','D1','Pa','M1','G2','R2','Sa'],
    vadi:'G2', samvadi:'D1', time:'Morning', mood:'Sweet, Melancholic',
    phrases:['Sa Ri Ga Ma Pa Da Sa','Ni Da Pa Ma Ga Ri Sa','Ga Ma Pa Da Sa'],
    tags:['Audava-Sampurna','Morning'], description:'A raga of great beauty — sweet yet melancholic. Has a distinctive feminine quality and is beloved for its emotive compositions.' },

  { type:'janya', number:null, name:'Sindhu Bhairavi', melakarta:'Natabhairavi (20)',
    aroh:['Sa','R2','G2','M1','Pa','D2','N2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G2','R2','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Morning', mood:'Melancholic, Film',
    phrases:['Sa Ri Ga Ma Pa','Ni Da Pa Ma Ga Ri Sa','Ma Pa Da Ni Sa'],
    tags:['Sampurna','Morning','Film'], description:'A popular film raga closely related to Bhairavi. Uses mixed svaras freely. Beloved for its melancholic, emotional quality.' },

  { type:'janya', number:null, name:'Huseni', melakarta:'Natabhairavi (20)',
    aroh:['Sa','R2','G2','M1','Pa','D1','N2','Sa'], avaroh:['Sa','N2','D1','Pa','M1','G2','R2','Sa'],
    vadi:'G2', samvadi:'N2', time:'Morning', mood:'Melancholic, Bhakti',
    phrases:['Sa Ri Ga Ma Pa','Da Ni Sa','Ni Da Pa Ma Ga Ri Sa'],
    tags:['Sampurna','Morning','Bhakti'], description:'An important morning raga with a melancholic, devotional quality. Many great compositions by Thyagaraja are set in Huseni.' },

  { type:'janya', number:null, name:'Sriranjani', melakarta:'Natabhairavi (20)',
    aroh:['Sa','R2','G2','M1','D1','N2','Sa'], avaroh:['Sa','N2','D1','M1','G2','R2','Sa'],
    vadi:'G2', samvadi:'N2', time:'Night', mood:'Serene, Bhakti',
    phrases:['Sa Ri Ga Ma Da Ni Sa','Ni Da Ma Ga Ri Sa','Ga Ma Da Ni Sa'],
    tags:['Shadava','Night','Bhakti'], description:'A shadava raga omitting Pa. Has an intensely serene, devotional quality. Very popular in film music.' },

  { type:'janya', number:null, name:'Dhanyasi', melakarta:'Hanumatodi (8)',
    aroh:['Sa','G2','M1','Pa','N2','Sa'], avaroh:['Sa','N2','Pa','M1','G2','Sa'],
    vadi:'G2', samvadi:'N2', time:'Morning', mood:'Melancholic, Devotional',
    phrases:['Sa Ga Ma Pa Ni Sa','Ni Pa Ma Ga Sa','Ga Ma Pa Ni Sa'],
    tags:['Audava','Morning','Devotional'], description:'A pentatonic raga of gentle, melancholic beauty. Has many beloved devotional compositions. Equivalent to Dhanashri.' },

  { type:'janya', number:null, name:'Reethigowla', melakarta:'Kharaharapriya (22)',
    aroh:['Sa','R2','G2','M1','Pa','N2','Sa'], avaroh:['Sa','N2','Pa','M1','G2','R2','G2','Sa'],
    vadi:'G2', samvadi:'N2', time:'Morning', mood:'Bhakti, Sweet',
    phrases:['Sa Ri Ga Ma Pa Ni Sa','Ni Pa Ma Ga Ri Ga Sa','Ga Ma Pa Ni'],
    tags:['Sampurna','Morning','Bhakti'], description:'A popular raga for bhakti compositions with a characteristic vakra movement in the descent. Very sweet and appealing.' },

  { type:'janya', number:null, name:'Nilambari', melakarta:'Harikambhoji (28)',
    aroh:['Sa','R2','G3','M1','Pa','N2','Sa'], avaroh:['Sa','N2','Pa','M1','G3','R2','Sa'],
    vadi:'Pa', samvadi:'Sa', time:'Night', mood:'Lullaby, Soothing',
    phrases:['Sa Ri Ga Ma Pa Ni Sa','Ni Pa Ma Ga Ri Sa','Pa Ni Sa'],
    tags:['Audava-Sampurna','Night','Lullaby'], description:'Famous as a lullaby raga — deeply soothing and sleep-inducing. Many great compositions for children and lullabies.' },

  { type:'janya', number:null, name:'Vasanta', melakarta:'Mechakalyani (65)',
    aroh:['Sa','M2','G3','M2','Pa','N3','Sa'], avaroh:['Sa','N3','D2','Pa','M2','G3','R2','Sa'],
    vadi:'M2', samvadi:'Sa', time:'Spring/Any', mood:'Playful, Spring',
    phrases:['Sa M2 Ga M2 Pa Ni Sa','Ni Da Pa M2 Ga Ri Sa','M2 Pa Ni Sa'],
    tags:['Vakra','Spring','Playful'], description:'A vakra raga associated with the spring season. Playful and colourful movements, particularly in the ascent.' },

  { type:'janya', number:null, name:'Gowla', melakarta:'Mayamalavagowla (15)',
    aroh:['Sa','R1','M1','Pa','N3','Sa'], avaroh:['Sa','N3','D1','Pa','M1','G3','R1','Sa'],
    vadi:'M1', samvadi:'Sa', time:'Morning', mood:'Devotional, Dignified',
    phrases:['Sa Ri Ma Pa Ni Sa','Ni Da Pa Ma Ga Ri Sa','Pa Ni Sa'],
    tags:['Audava-Sampurna','Morning','Devotional'], description:'An ancient and dignified morning raga, parent of the Gowla family. Deeply devotional and revered.' },

  { type:'janya', number:null, name:'Mukhari', melakarta:'Bhavapriya (44)',
    aroh:['Sa','R1','G2','M1','Pa','D1','N2','Sa'], avaroh:['Sa','N2','D1','Pa','M1','G2','R1','Sa'],
    vadi:'M1', samvadi:'Pa', time:'Morning', mood:'Melancholic, Poignant',
    phrases:['Sa Ri Ga Ma Pa','Da Ni Sa','Ni Da Pa Ma Ga Ri Sa'],
    tags:['Sampurna','Morning','Melancholic'], description:'A deeply poignant morning raga equivalent to Bhairavi with slight variations. Has extraordinary depth and emotional range.' },

  { type:'janya', number:null, name:'Poorvikalyani', melakarta:'Mechakalyani (65)',
    aroh:['Sa','R2','G3','M2','Pa','N3','Sa'], avaroh:['Sa','N3','Pa','M2','G3','R2','Sa'],
    vadi:'M2', samvadi:'Pa', time:'Evening', mood:'Grand, Majestic',
    phrases:['Sa Ri Ga Ma Pa Ni Sa','Ni Pa Ma Ga Ri Sa','Ma Pa Ni Sa'],
    tags:['Audava-Sampurna','Evening','Majestic'], description:'An audava-sampurna raga from the Kalyani family. Grand and majestic, often used for concerts. Omits Dha.' },

  { type:'janya', number:null, name:'Ahiri', melakarta:'Chakravakam (16)',
    aroh:['Sa','R1','G3','M1','Pa','D2','Sa'], avaroh:['Sa','N2','D2','Pa','M1','G3','R1','Sa'],
    vadi:'G3', samvadi:'N2', time:'Morning', mood:'Pleading, Melancholic',
    phrases:['Sa R1 G3 M1 Pa Da Sa','Ni Da Pa M1 G3 Ri Sa','G3 M1 Pa Da Sa'],
    tags:['Audava-Sampurna','Morning','Melancholic'],
    description:'A raga of tender, pleading beauty derived from Chakravakam. Omits Ni in ascent. Known for compositions of heartfelt longing and devotion, particularly associated with Thyagaraja.' },

  { type:'janya', number:null, name:'Suddha Saveri', melakarta:'Dheerashankarabharanam (29)',
    aroh:['Sa','R2','M1','Pa','D2','Sa'], avaroh:['Sa','D2','Pa','M1','R2','Sa'],
    vadi:'R2', samvadi:'Pa', time:'Morning', mood:'Pure, Pleasing',
    phrases:['Sa Ri Ma Pa Da Sa','Sa Da Pa Ma Ri Sa','Pa Da Sa'],
    tags:['Audava','Morning','Pleasing'], description:'A pure, simple pentatonic raga. Clear and pleasing, equivalent to the major pentatonic. Widely taught to beginners.' },
];
