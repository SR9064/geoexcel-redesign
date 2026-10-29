// Edible oils and ghee, transcribed from the live GeoExcel site (28 Oct 2026).
// Same rules as rice.js. The source writes "HNS CODE"; the field is hsCode.

const OIL_PACKS = ['1 L', '5 L', '25 L', '50 L'];
const OIL_PACKS_SHORT = ['1 L', '5 L', '50 L'];
const GHEE_PACKS = ['500 ml', '1 L', '15 L'];
const OIL_TYPES = ['PET bottle', 'Can', 'Drum'];
const GLASS_TYPES = ['PET bottle', 'Glass bottle', 'Drum'];
const SAME_AS = (other) => `Specifications are identical to ${other}; how the two differ is not stated.`;
const GHEE_HS_NOTE = 'HS code has 7 digits on the source (probably 04059020 with the leading zero dropped); confirm.';

export const oils = [
  {
    id: 'oil-coconut', name: 'Coconut Oil', category: 'oils',
    origin: ['Kerala'], packSizes: OIL_PACKS, packTypes: OIL_TYPES, hsCode: '15131900',
    summary: 'Cold-pressed coconut oil from Kerala.',
    specs: { Extraction: 'Cold press', 'Shelf life': '12 months' },
    notes: [],
  },
  {
    id: 'oil-coconut-ev', name: 'Extra Virgin Coconut Oil', category: 'oils',
    origin: ['Kerala'], packSizes: OIL_PACKS, packTypes: OIL_TYPES, hsCode: '15131900',
    summary: 'Cold-pressed extra virgin coconut oil from Kerala.',
    specs: { Extraction: 'Cold press', 'Shelf life': '12 months' },
    notes: [SAME_AS('Coconut Oil')],
  },
  {
    id: 'oil-groundnut', name: 'Groundnut Oil', category: 'oils',
    origin: ['Tamil Nadu', 'Karnataka'], packSizes: OIL_PACKS, packTypes: OIL_TYPES, hsCode: '15081000',
    summary: 'Cold-pressed groundnut (peanut) oil.',
    specs: { Extraction: 'Cold press', 'Shelf life': '12 months' },
    notes: [],
  },
  {
    id: 'oil-mustard', name: 'Mustard Oil', category: 'oils',
    origin: [], packSizes: OIL_PACKS_SHORT, packTypes: OIL_TYPES, hsCode: '15149120',
    summary: 'Cold-pressed mustard oil.',
    specs: { Extraction: 'Cold press', 'Shelf life': '12 months' },
    notes: ['No state of origin is listed on the source.'],
  },
  {
    id: 'oil-sesame', name: 'Sesame Oil', category: 'oils',
    origin: ['Tamil Nadu'], packSizes: OIL_PACKS_SHORT, packTypes: OIL_TYPES, hsCode: '15155091',
    summary: 'Cold-pressed sesame (til) oil from Tamil Nadu.',
    specs: { Extraction: 'Cold press', 'Shelf life': '12 months' },
    notes: [],
  },
  {
    id: 'oil-olive', name: 'Olive Oil', category: 'oils',
    origin: ['Italy'], packSizes: OIL_PACKS_SHORT, packTypes: GLASS_TYPES, hsCode: '15091000',
    summary: 'Olive oil of Italian origin.',
    specs: { Extraction: 'Cold press', 'Shelf life': '18-24 months' },
    notes: ['Country of origin is Italy, so this is an imported product; confirm supply arrangement.'],
  },
  {
    id: 'oil-olive-ev', name: 'Extra Virgin Olive Oil', category: 'oils',
    origin: ['Italy'], packSizes: OIL_PACKS_SHORT, packTypes: GLASS_TYPES, hsCode: '15091000',
    summary: 'Extra virgin olive oil of Italian origin.',
    specs: { Extraction: 'Cold press', 'Shelf life': '18-24 months' },
    notes: [SAME_AS('Olive Oil')],
  },
  {
    id: 'ghee-pure', name: 'Pure Ghee', category: 'oils',
    origin: ['Gujarat', 'Karnataka'], packSizes: GHEE_PACKS, packTypes: GLASS_TYPES, hsCode: '4059020',
    summary: 'Ghee made by bilona churning.',
    specs: { Extraction: 'Bilona churning', 'Shelf life': '9-12 months' },
    notes: [GHEE_HS_NOTE],
  },
  {
    id: 'ghee-a2', name: 'A2 Ghee', category: 'oils',
    origin: ['Gujarat', 'Karnataka'], packSizes: GHEE_PACKS, packTypes: GLASS_TYPES, hsCode: '4059020',
    summary: 'Ghee from A2 beta-casein cow milk, made by bilona churning.',
    specs: { Extraction: 'Bilona churning', 'Shelf life': '9-12 months' },
    notes: [GHEE_HS_NOTE, SAME_AS('Pure Ghee')],
  },
];