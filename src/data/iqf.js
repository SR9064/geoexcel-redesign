// IQF (frozen) products, transcribed from the live GeoExcel site (28 Oct 2026).
// Same rules as rice.js: values copied as listed, typos normalised
// ("Kennels" -> "Kernels", "Florest" -> "Florets"), null = shown as
// "To be confirmed by GeoExcel", conflicts recorded in `notes`.

const VEG_PACKS = ['1 kg', '30 kg'];
const COLD = '-18 °C and below';
const HS_NOTE =
  'HS code is in the fresh/chilled vegetable range (0704) although the product is frozen; confirm.';

export const iqf = [
  {
    id: 'iqf-green-peas', name: 'Frozen Green Peas', category: 'iqf',
    origin: [], packSizes: VEG_PACKS, packTypes: [], hsCode: '07102100',
    summary: 'IQF whole green peas. Store at -18 °C or below.',
    specs: { 'Botanical name': 'Pisum sativum', Shape: 'Whole', Storage: COLD, 'Shelf life': '2 years' },
    notes: [],
  },
  {
    id: 'iqf-sweet-corn', name: 'Frozen Sweet Corn', category: 'iqf',
    origin: [], packSizes: VEG_PACKS, packTypes: [], hsCode: '07104000',
    summary: 'IQF sweet corn kernels.',
    specs: { 'Botanical name': 'Zea mays L.', Shape: 'Kernels', Storage: COLD, 'Shelf life': '2 years' },
    notes: [],
  },
  {
    id: 'iqf-carrot', name: 'Frozen Carrot', category: 'iqf',
    origin: [], packSizes: VEG_PACKS, packTypes: [], hsCode: '07109000',
    summary: 'IQF carrot as dices, slices or shreds.',
    specs: { 'Botanical name': 'Daucus carota subsp.', Shape: 'Dices / slices / shreds', Storage: COLD, 'Shelf life': '2 years' },
    notes: [],
  },
  {
    id: 'iqf-cauliflower', name: 'Frozen Cauliflower', category: 'iqf',
    origin: [], packSizes: VEG_PACKS, packTypes: [], hsCode: '07041000',
    summary: 'IQF cauliflower florets.',
    specs: { 'Botanical name': 'Brassica oleracea var.', Shape: 'Florets', Storage: COLD, 'Shelf life': '2 years' },
    notes: [HS_NOTE, 'Source product photo is blurred.'],
  },
  {
    id: 'iqf-broccoli', name: 'Frozen Broccoli', category: 'iqf',
    origin: [], packSizes: VEG_PACKS, packTypes: [], hsCode: '07041000',
    summary: 'IQF broccoli florets.',
    specs: { 'Botanical name': 'Brassica oleracea var.', Shape: 'Florets', Storage: COLD, 'Shelf life': '2 years' },
    notes: [HS_NOTE, 'Source product photo is blurred.'],
  },
  {
    id: 'iqf-mix-veg', name: 'Frozen Mix Vegetables', category: 'iqf',
    origin: [], packSizes: VEG_PACKS, packTypes: [], hsCode: null,
    summary: 'Sorted, washed, peeled and IQF-frozen mixed vegetables.',
    specs: { Storage: COLD, 'Shelf life': '2 years', Composition: null },
    notes: ['HS code is empty on the source.', 'The vegetables in the mix are not listed.'],
  },
  {
    id: 'iqf-french-fries', name: 'Frozen French Fries', category: 'iqf',
    origin: [], packSizes: [], packTypes: [], hsCode: '20041000',
    summary: 'Frozen potato fries in four cut sizes, skin on.',
    specs: {
      Cuts: '6 mm, 7 mm, 9 mm, 11 mm, skin on',
      Ingredients: 'Potatoes (95%), edible vegetable oil (refined palmolein oil)',
      Allergens: 'Made in a facility that processes wheat and milk-based products',
      'Shelf life': '18 months',
    },
    notes: ['No packaging or storage temperature is listed on the source.'],
  },
  {
    id: 'iqf-hash-brown', name: 'Frozen Hash Brown', category: 'iqf',
    origin: [], packSizes: [], packTypes: [], hsCode: '20041000',
    summary: 'Frozen hash browns made from potato.',
    specs: {
      Ingredients: 'Potatoes (93%), refined palmolein oil, corn flour, potato flakes, salt, dehydrated white onion powder',
      Allergens: 'Made in a facility that processes wheat and milk-based products',
      'Shelf life': '18 months',
    },
    notes: ['No packaging or storage temperature is listed on the source.'],
  },
  {
    id: 'iqf-speciality-potato', name: 'Speciality Potato Products', category: 'iqf',
    origin: [], packSizes: [], packTypes: [], hsCode: '20041000',
    summary: 'Seasoned potato snacks: spicy wedges, potato cheese shots, veggie finger, chilli garlic bites, herb chilli patty, aloo tikki, lemon and mint wedges.',
    specs: { 'Shelf life': '18 months' },
    notes: [
      'Seven products are bundled in one listing.',
      'The source specification is the Hash Brown text (ingredients and grade); product-specific specifications are needed.',
    ],
  },
];