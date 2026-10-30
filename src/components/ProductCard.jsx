import { useState } from 'react'
import { useEnquiry } from '../context/EnquiryContext.jsx'

// Photos live in public/images/products/ and are named after the product id,
// e.g. rice-1121-steam.png. A product can also list several photos in an
// `images` array (see fashion.js); then the top photo becomes a small slider.
// If a photo is missing, a coloured block is shown instead.
const imageSrc = (id) => `/images/products/${id}.png`

const TINTS = {
  rice: 'bg-amber-100 text-amber-900',
  spices: 'bg-red-100 text-red-900',
  iqf: 'bg-teal-100 text-teal-900',
  oils: 'bg-yellow-100 text-yellow-900',
  fashion: 'bg-stone-200 text-stone-800',
}
const LABELS = {
  rice: 'Rice',
  spices: 'Whole spice',
  iqf: 'IQF & frozen',
  oils: 'Oil & ghee',
  fashion: 'Fashion & lifestyle',
}
const TBC = 'To be confirmed by GeoExcel'

const arrowClass =
  'absolute top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-navy shadow transition-colors hover:bg-white'

function Spec({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className={value ? 'text-sm font-medium' : 'text-sm italic text-slate-500'}>{value || TBC}</dd>
    </div>
  )
}

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false)
  const [photo, setPhoto] = useState(0) // which photo is showing
  const [failed, setFailed] = useState({}) // photos that could not load
  const { has, add, remove } = useEnquiry()
  const added = has(product.id)

  const photos = product.images?.length ? product.images : [imageSrc(product.id)]
  const currentSrc = photos[photo]
  const go = (step) => setPhoto((p) => (p + step + photos.length) % photos.length)

  const specs = Object.entries(product.specs)
  const keySpecs = specs.slice(0, 3) // shown on the card
  const moreSpecs = specs.slice(3) // shown in details

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className={`group relative flex h-40 items-end overflow-hidden ${TINTS[product.category]}`}>
        {!failed[currentSrc] && (
          <img
            key={currentSrc}
            src={currentSrc}
            alt={product.imageAlts?.[photo] ?? product.name}
            loading="lazy"
            width="400"
            height="160"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            onError={() => setFailed((f) => ({ ...f, [currentSrc]: true }))}
          />
        )}

        <span className="relative m-3 rounded bg-white/90 px-2 py-1 text-xs font-medium uppercase tracking-wider text-slate-800">
          {LABELS[product.category]}
        </span>

        {photos.length > 1 && (
          <>
            <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className={`${arrowClass} left-2`}>
              ‹
            </button>
            <button type="button" aria-label="Next photo" onClick={() => go(1)} className={`${arrowClass} right-2`}>
              ›
            </button>
            <span
              className="absolute bottom-3 right-3 z-10 rounded bg-white/90 px-2 py-1 text-xs font-medium text-slate-800"
              aria-live="polite"
            >
              {photo + 1} / {photos.length}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-lg font-bold text-navy">{product.name}</h3>
        <p className="text-sm text-slate-600">{product.summary}</p>

        {keySpecs.length > 0 && (
          <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
            {keySpecs.map(([label, value]) => (
              <Spec key={label} label={label} value={value} />
            ))}
          </dl>
        )}

        <p className="text-sm">
          <span className="text-slate-500">Pack sizes: </span>
          {product.packSizes.length ? product.packSizes.join(', ') : <i className="text-slate-500">{TBC}</i>}
        </p>
        <p className="text-sm">
          <span className="text-slate-500">Origin: </span>
          {product.origin.length ? product.origin.join(', ') : <i className="text-slate-500">{TBC}</i>}
        </p>

        {product.notes.length > 0 && (
          <p className="rounded-md bg-amber-50 px-2 py-1 text-xs text-amber-900">
            Some details to be confirmed by GeoExcel
          </p>
        )}

        {open && (
          <div id={`details-${product.id}`} className="space-y-3 border-t border-slate-200 pt-3">
            {moreSpecs.length > 0 && (
              <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
                {moreSpecs.map(([label, value]) => (
                  <Spec key={label} label={label} value={value} />
                ))}
              </dl>
            )}
            <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
              <Spec label="HS code (as listed)" value={product.hsCode} />
              <Spec label="Packaging types" value={product.packTypes.join(', ')} />
            </dl>
            {product.notes.length > 0 && (
              <ul className="list-disc space-y-1 pl-5 text-xs text-slate-600">
                {product.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-2">
          <button
            type="button"
            className="min-h-11 flex-1 rounded-md border border-slate-300 px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            aria-expanded={open}
            aria-controls={`details-${product.id}`}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Hide details' : 'Full details'}
          </button>
          <button
            type="button"
            aria-pressed={added}
            title={added ? 'Remove from enquiry' : 'Add to enquiry'}
            className={`min-h-11 flex-1 rounded-md px-3 text-sm font-medium text-white transition-colors ${
              added ? 'bg-leaf hover:bg-leaf/90' : 'bg-navy hover:bg-navy/90'
            }`}
            onClick={() => (added ? remove(product.id) : add(product.id))}
          >
            {added ? 'Added ✓' : 'Add to enquiry'}
          </button>
        </div>
      </div>
    </article>
  )
}
