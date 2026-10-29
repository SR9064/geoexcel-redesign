// Whole spices, transcribed from the live GeoExcel site (28 Oct 2026).
// Rules: values copied as listed; obvious spelling typos normalised
// (e.g. "Baby Colves" -> "Baby cloves"); `null` = missing or contradictory on
// the source, shown to buyers as "To be confirmed by GeoExcel";
// conflicts are recorded in `notes`. Summaries are written for this redesign.

const kg = (...n) => n.map((x) => `${x} kg`);
const PP = ['PP bag'];

export const spices = [
  {
    id: 'spice-cardamom', name: 'Cardamom (Green)', category: 'spices',
    origin: ['Kerala'], packSizes: kg(1), packTypes: [], hsCode: '09083120',
    summary: 'Green cardamom, graded by size from 5 mm to 8 mm bold.',
    specs: { 'Sizes': '5-6 mm, 6-7 mm, 7-8 mm, 7-8 mm split, 8 mm bold' },
    notes: [],
  },
  {
    id: 'spice-black-pepper', name: 'Black Peppercorn', category: 'spices',
    origin: ['Kerala', 'Karnataka'], packSizes: kg(1, 5, 25, 50), packTypes: [], hsCode: '09041130',
    summary: 'Bold, farm-fresh black pepper from Kerala and Karnataka.',
    specs: { Grade: 'Bold, farm fresh', Moisture: '5%', 'Extraneous matter': '0.50%', 'Light berries': '2%' },
    notes: [],
  },
  {
    id: 'spice-clove', name: 'Clove', category: 'spices',
    origin: ['Kerala'], packSizes: kg(1, 5), packTypes: [], hsCode: '09071020',
    summary: 'Brown, bold whole cloves from Kerala.',
    specs: { Colour: 'Brown', Grade: 'Bold whole', Moisture: '12%', 'Baby cloves': '2% per 100 g' },
    notes: [],
  },
  {
    id: 'spice-cinnamon', name: 'Cinnamon Sticks', category: 'spices',
    origin: ['Kerala'], packSizes: kg(1, 5), packTypes: [], hsCode: '09061110',
    summary: 'Cinnamon sticks from Kerala with ash limits listed.',
    specs: { Colour: 'Brown', Moisture: '11%', 'Total ash': '5%', 'Acid insoluble ash': '1%' },
    notes: [],
  },
  {
    id: 'spice-mace', name: 'Mace Flower (Javitri)', category: 'spices',
    origin: ['Kerala'], packSizes: kg(1, 5), packTypes: [], hsCode: '09083190',
    summary: 'Red mace (javitri) from Kerala.',
    specs: { Colour: 'Red', Moisture: '12%', 'Shelf life': '1 year' },
    notes: [],
  },
  {
    id: 'spice-nutmeg', name: 'Nutmeg', category: 'spices',
    origin: ['Kerala'], packSizes: kg(1, 5), packTypes: [], hsCode: '09083190',
    summary: 'Brown nutmeg from Kerala. Store in a cool, dry place.',
    specs: { Colour: 'Brown', Storage: 'Cool and dry place', 'Shelf life': null },
    notes: [
      'The source description is the Mace Flower text. A nutmeg-specific description is needed.',
      'Shelf life reads "14Yr" on the source, probably a typo. Left blank.',
      'Uses the same HS code as Mace; confirm.',
    ],
  },
  {
    id: 'spice-coriander', name: 'Coriander Seeds', category: 'spices',
    origin: [], packSizes: kg(25, 50), packTypes: [], hsCode: '09092110',
    summary: 'Bold coriander seeds, 99% purity, graded Eagle or Single Parrot.',
    specs: { Colour: 'Green', Moisture: '8%', Purity: '99%', Grade: 'Eagle, Single Parrot etc.' },
    notes: [],
  },
  {
    id: 'spice-cumin', name: 'Cumin Seeds', category: 'spices',
    origin: [], packSizes: kg(25, 50), packTypes: PP, hsCode: '09092110',
    summary: 'Whole cumin (jeera) seeds in white and brown.',
    specs: { Colour: 'White, brown', Moisture: '8%', 'Shelf life': '12 months' },
    notes: ['Uses the same HS code as coriander seeds; confirm.'],
  },
  {
    id: 'spice-ajwain', name: 'Ajwain', category: 'spices',
    origin: [], packSizes: kg(25, 50), packTypes: PP, hsCode: '0909914',
    summary: 'Ajwain (carom) seeds, green.',
    specs: { Colour: 'Green', Moisture: null, 'Shelf life': '12 months' },
    notes: ['Moisture field is empty on the source.', 'HS code has 7 digits on the source; confirm.'],
  },
  {
    id: 'spice-fenugreek', name: 'Fenugreek Seeds', category: 'spices',
    origin: [], packSizes: kg(25, 50), packTypes: PP, hsCode: '0909914',
    summary: 'Yellow fenugreek (methi) seeds.',
    specs: { Colour: 'Yellow', Storage: 'Dry place', 'Shelf life': '12 months' },
    notes: ['HS code has 7 digits on the source and matches ajwain; confirm.'],
  },
  {
    id: 'spice-mustard', name: 'Mustard Seeds', category: 'spices',
    origin: [], packSizes: kg(25, 50), packTypes: PP, hsCode: '0909927',
    summary: 'Black mustard seeds, 99% purity.',
    specs: { Colour: 'Black', Purity: '99%', 'Shelf life': '12 months' },
    notes: ['HS code has 7 digits on the source; confirm.'],
  },
  {
    id: 'spice-star-anise', name: 'Star Anise', category: 'spices',
    origin: [], packSizes: kg(5), packTypes: PP, hsCode: '0909927',
    summary: 'Brown star anise, 99% purity, shelf life 1-2 years.',
    specs: { Colour: 'Brown', Purity: '99%', 'Shelf life': '1-2 years' },
    notes: [
      'Description says "Origin: Vietnam"; specification says "Country of Origin: India". Origin left blank.',
      'HS code is the same as mustard seeds and has 7 digits; confirm.',
    ],
  },
  {
    id: 'spice-sesame-white', name: 'Sesame Seeds (White)', category: 'spices',
    origin: [], packSizes: kg(50), packTypes: PP, hsCode: '0909927',
    summary: 'White sesame seeds, 99% purity.',
    specs: { Colour: 'White', Purity: '99%', 'Shelf life': '12 months' },
    notes: ['HS code is the same as mustard seeds and star anise, while black sesame uses a different code; confirm.'],
  },
  {
    id: 'spice-sesame-black', name: 'Sesame Seeds (Black)', category: 'spices',
    origin: [], packSizes: kg(50), packTypes: PP, hsCode: '12074010',
    summary: 'Black sesame seeds, 99% purity.',
    specs: { Colour: 'Black', Purity: '99%', 'Shelf life': '12 months' },
    notes: [],
  },
];