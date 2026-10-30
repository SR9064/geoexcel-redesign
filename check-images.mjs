import fs from 'node:fs'
import { products } from './src/data/products.js'

// Product photos
const have = new Set(fs.readdirSync('public/images/products'))
const missing = products.filter((p) => !have.has(`${p.id}.png`))
console.log(`Product photos: ${products.length - missing.length} of ${products.length} found`)
if (missing.length) console.log('  Missing:\n  ' + missing.map((p) => p.id + '.png').join('\n  '))
const known = new Set(products.map((p) => `${p.id}.png`))
const extra = [...have].filter((f) => !known.has(f))
if (extra.length) console.log('  Names that match no product (typo or capital letters?):\n  ' + extra.join('\n  '))

// Certificate images
const counts = { apeda: 3, fssai: 7, udyam: 4, iec: 1, cle: 2 }
const certHave = new Set(fs.readdirSync('public/images/certificates'))
const certMissing = []
for (const [id, n] of Object.entries(counts))
  for (let i = 1; i <= n; i++) if (!certHave.has(`${id}-${i}.png`)) certMissing.push(`${id}-${i}.png`)
console.log(`Certificate images: ${17 - certMissing.length} of 17 found`)
if (certMissing.length) console.log('  Missing: ' + certMissing.join(', '))