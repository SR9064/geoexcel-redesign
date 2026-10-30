import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { categories, products } from '../data/products.js'
import { credentials } from '../data/credentials.js'

const TINTS = {
  rice: 'bg-amber-100 text-amber-900',
  spices: 'bg-red-100 text-red-900',
  iqf: 'bg-teal-100 text-teal-900',
  oils: 'bg-yellow-100 text-yellow-900',
  fashion: 'bg-stone-200 text-stone-800',
}
const SHORT = { apeda: 'APEDA', fssai: 'FSSAI', udyam: 'Udyam (MSME)', iec: 'IEC (DGFT)', cle: 'CLE (leather footwear)' }
const VERTICALS = ['Agriculture', 'Automotive', 'Construction', 'Trading']
const STEPS = [
  ['Find', `Search or filter ${products.length} products by category, origin and pack size.`],
  ['Add to enquiry', 'Collect everything you need in one list.'],
  ['Send one request', 'Add quantities and your destination, and send a complete quote request.'],
]

const bySize = (a, b) => parseFloat(a) - parseFloat(b) || a.localeCompare(b)
const field = 'min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800'

export default function Home() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('')
  const [pack, setPack] = useState('')

  // Pack sizes offered for the chosen category (or for all products)
  const packOptions = [
    ...new Set(products.filter((p) => !category || p.category === category).flatMap((p) => p.packSizes)),
  ].sort(bySize)

  function onSubmit(e) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (pack) params.set('pack', pack)
    const qs = params.toString()
    navigate(qs ? `/products?${qs}` : '/products')
  }

  return (
    <div>
      {/* Hero + quick-start */}
      <section className="relative overflow-hidden bg-navy">
        <img
          src="/images/products/banner.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid gap-8 rounded-xl bg-white p-6 text-slate-800 shadow-lg md:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-slate-600">GeoExcel · Bengaluru, India</p>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-navy md:text-5xl">
                Find your product. Send one complete quote request.
              </h1>
              <p className="mt-4 max-w-xl text-base text-slate-600 md:text-lg">
                Rice, whole spices, IQF vegetables, oils and ghee, and leather footwear, for international and domestic
                trade. Choose what you need, add it to your enquiry, and tell GeoExcel the quantity and destination in
                one go.
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex min-h-12 items-center rounded-md bg-flame px-6 text-base font-medium text-navy transition-colors hover:bg-flame/90"
              >
                Browse all {products.length} products
              </Link>
            </div>

            <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-stone-50 p-4 text-slate-800 md:p-6" aria-labelledby="h-finder">
              <h2 id="h-finder" className="text-lg font-bold text-navy">
                Find my product
              </h2>
              <p className="mt-1 text-sm text-slate-600">Two choices take you to a filtered catalogue.</p>
              <div className="mt-4 space-y-3">
                <label className="block text-sm font-medium text-slate-700">
                  Product type
                  <select
                    className={`${field} mt-1`}
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value)
                      setPack('') // pack sizes depend on the category
                    }}
                  >
                    <option value="">Any product</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Pack size
                  <select className={`${field} mt-1`} value={pack} onChange={(e) => setPack(e.target.value)}>
                    <option value="">Any pack size</option>
                    {packOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button
                type="submit"
                className="mt-4 min-h-12 w-full rounded-md bg-navy px-6 text-base font-medium text-white transition-colors hover:bg-navy/90"
              >
                Show matching products
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="h-categories">
        <h2 id="h-categories" className="text-2xl font-bold text-navy">
          What GeoExcel supplies
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => {
            const count = products.filter((p) => p.category === c.id).length
            // Photo for the card: the first product in this category (its own photo)
            const first = products.find((p) => p.category === c.id)
            const photo = first ? (first.images?.[0] ?? `/images/products/${first.id}.png`) : null
            return (
              <Link
                key={c.id}
                to={`/products?category=${c.id}`}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className={`group relative flex h-28 items-end overflow-hidden text-xs font-medium uppercase tracking-wider ${TINTS[c.id]}`}>
                  {photo && (
                    <img
                      src={photo}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                  <span className="relative m-3 rounded bg-white/90 px-2 py-1 text-slate-800">
                    {count} {count === 1 ? 'product' : 'products'}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-lg font-bold text-navy">{c.label}</p>
                  <p className="mt-1 text-sm font-medium text-navy underline">View {c.label.toLowerCase()}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-10" aria-labelledby="h-how">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="h-how" className="text-2xl font-bold text-navy">
            How an enquiry works
          </h2>
          <ol className="mt-4 grid gap-4 md:grid-cols-3">
            {STEPS.map(([title, text], i) => (
              <li key={title} className="rounded-xl border border-slate-200 bg-stone-50 p-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="mt-2 font-bold text-navy">{title}</p>
                <p className="mt-1 text-sm text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="h-trust">
        <h2 id="h-trust" className="text-2xl font-bold text-navy">
          Registrations GeoExcel lists
        </h2>
        <p className="mt-1 text-slate-600">Company incorporated November 2023. Check each registration on the issuing portal.</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {credentials.map((c) => (
            <li key={c.id} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-navy">
              {SHORT[c.id] ?? c.title}
            </li>
          ))}
        </ul>
        <Link to="/certificates" className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-navy underline">
          See the certificates and verification links
        </Link>
      </section>

      {/* Group story */}
      <section className="bg-white py-10" aria-labelledby="h-group">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="h-group" className="text-2xl font-bold text-navy">
            The GeoExcel group
          </h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            GeoExcel&rsquo;s website describes roots going back to the 1980s, from growing rice, sugarcane and sesame to
            a cement and steel dealership. The GeoExcel name, short for Geographic Excellence, was formally adopted in
            2023. Today the group lists these verticals:
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {VERTICALS.map((v) => (
              <li key={v} className="rounded-md bg-stone-100 px-4 py-2 text-sm font-medium text-navy">
                {v}
              </li>
            ))}
          </ul>
          <p className="mt-3 max-w-3xl text-sm text-slate-600">
            As described on geoexcel.group. This site covers the food, agri-product and footwear range for trade buyers.
          </p>
          <Link to="/about" className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-navy underline">
            Read the full story
          </Link>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-xl bg-navy p-6 text-white md:p-8">
          <h2 className="text-2xl font-bold">Know what you need?</h2>
          <p className="mt-2 text-slate-200">Add products to your enquiry and send one complete request.</p>
          <Link
            to="/products"
            className="mt-4 inline-flex min-h-12 items-center rounded-md bg-flame px-6 text-base font-medium text-navy hover:bg-flame/90"
          >
            Start your enquiry
          </Link>
        </div>
      </section>
    </div>
  )
}
