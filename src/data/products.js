// One list for the whole catalog. Every product ends up with the same shape:
// { id, name, category, origin[], packSizes[], packTypes[], hsCode, summary,
//   specs{}, notes[] }
// A spec value of null means "missing or contradictory on the source" and the
// UI shows "To be confirmed by GeoExcel".

import { rice, riceGlobalNote } from './rice.js';
import { spices } from './spices.js';
import { iqf } from './iqf.js';
import { oils } from './oils.js';

// Rice stores its specs as top-level fields; move them into `specs`.
const riceProducts = rice.map((r) => ({
  id: r.id,
  name: r.name,
  category: r.category,
  origin: r.origin,
  packSizes: r.packSizes,
  packTypes: r.packTypes,
  hsCode: r.hsCode,
  summary: r.summary,
  specs: {
    Type: r.type,
    Process: r.process,
    Grain: r.grain,
    Broken: r.broken,
    Moisture: r.moisture,
    Colour: r.colour,
    Speciality: r.speciality,
  },
  // Used by the rice filters (type / process / grain)
  type: r.type,
  process: r.process,
  grain: r.grain,
  notes: r.notes,
}));

export const products = [...riceProducts, ...spices, ...iqf, ...oils];

export const categories = [
  { id: 'rice', label: 'Rice' },
  { id: 'spices', label: 'Whole spices' },
  { id: 'iqf', label: 'IQF & frozen' },
  { id: 'oils', label: 'Oils & ghee' },
];

export const catalogNote = riceGlobalNote;

export const getProduct = (id) => products.find((p) => p.id === id);

// Unique, sorted values for a filter, e.g. uniqueValues('origin')
export const uniqueValues = (field, list = products) =>
  [...new Set(list.flatMap((p) => p[field] ?? []))].sort();