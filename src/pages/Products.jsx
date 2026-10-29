import { useSearchParams } from 'react-router-dom'
import FilterBar from '../components/FilterBar.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { products, uniqueValues } from '../data/products.js'

// Filters live in the URL (e.g. /products?category=rice&type=Basmati),
// so a filtered view can be shared, bookmarked, or linked from the homepage.
const KEYS = ['q', 'category', 'origin', 'pack', 'type', 'process']

// Sort pack sizes by their number: 1, 5, 10, 25 ...
const bySize = (a, b) => parseFloat(a) - parseFloat(b) || a.localeCompare(b)

export default function Products() {
  const [params, setParams] = useSearchParams()
  const filters = Object.fromEntries(KEYS.map((k) => [k, params.get(k) || '']))

  function onChange(key, value) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    // Rice-only filters make no sense after changing category
    if (key === 'category') {
      next.delete('type')
      next.delete('process')
    }
    setParams(next, { replace: true })
  }
  const onClear = () => setParams({}, { replace: true })

  const q = filters.q.trim().toLowerCase()
  const results = products.filter((p) => {
    if (filters.category && p.category !== filters.category) return false
    if (filters.origin && !p.origin.includes(filters.origin)) return false
    if (filters.pack && !p.packSizes.includes(filters.pack)) return false
    if (filters.type && p.type !== filters.type) return false
    if (filters.process && p.process !== filters.process) return false
    if (q) {
      const haystack = [p.name, p.summary, p.hsCode ?? '', ...p.origin].join(' ').toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })

  const options = {
    origins: uniqueValues('origin'),
    packs: uniqueValues('packSizes').sort(bySize),
    types: ['Basmati', 'Non-basmati'],
    processes: [...new Set(products.map((p) => p.process).filter(Boolean))],
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-bold text-navy md:text-3xl">Product catalogue</h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Find what you need, add it to your enquiry, and send one quote request. Specifications are taken from
        GeoExcel&rsquo;s current website; anything marked &ldquo;to be confirmed&rdquo; needs GeoExcel&rsquo;s
        confirmation.
      </p>

      <div className="mt-6">
        <FilterBar filters={filters} onChange={onChange} onClear={onClear} options={options} />
      </div>

      <p className="mt-6 text-sm text-slate-600" aria-live="polite">
        Showing {results.length} of {products.length} products
      </p>

      {results.length > 0 ? (
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="font-medium text-navy">No products match these filters.</p>
          <button
            type="button"
            onClick={onClear}
            className="mt-3 min-h-11 rounded-md bg-navy px-4 text-sm font-medium text-white"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
