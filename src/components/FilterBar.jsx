import { useState } from 'react'
import { categories } from '../data/products.js'

const fieldClass = 'min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm'

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${
        active ? 'border-navy bg-navy text-white' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  )
}

function Select({ label, value, onChange, children }) {
  return (
    <label className="block text-xs text-slate-600">
      {label}
      <select className={`${fieldClass} mt-1`} value={value} onChange={(e) => onChange(e.target.value)}>
        {children}
      </select>
    </label>
  )
}

export default function FilterBar({ filters, onChange, onClear, options }) {
  const [open, setOpen] = useState(false) // mobile only: show or hide the dropdown filters
  const activeCount = ['category', 'origin', 'pack', 'type', 'process'].filter((k) => filters[k]).length

  return (
    <section aria-label="Search and filters" className="space-y-3">
      <label className="block">
        <span className="sr-only">Search products</span>
        <input
          type="search"
          value={filters.q}
          onChange={(e) => onChange('q', e.target.value)}
          placeholder="Search by name, origin or HS code"
          className={`${fieldClass} placeholder:text-slate-400`}
        />
      </label>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
        <Chip active={!filters.category} onClick={() => onChange('category', '')}>
          All
        </Chip>
        {categories.map((c) => (
          <Chip key={c.id} active={filters.category === c.id} onClick={() => onChange('category', c.id)}>
            {c.label}
          </Chip>
        ))}
      </div>

      {/* On phones the dropdown filters sit behind this button; on desktop they are always visible. */}
      <button
        type="button"
        className="min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-medium md:hidden"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Hide filters' : `More filters${activeCount ? ` (${activeCount})` : ''}`}
      </button>

      <div className={`${open ? 'grid' : 'hidden'} gap-3 sm:grid-cols-2 md:grid md:grid-cols-4`}>
        <Select label="Origin" value={filters.origin} onChange={(v) => onChange('origin', v)}>
          <option value="">Any origin</option>
          {options.origins.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Select>

        <Select label="Pack size" value={filters.pack} onChange={(v) => onChange('pack', v)}>
          <option value="">Any pack size</option>
          {options.packs.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>

        {/* Rice-only filters */}
        {filters.category === 'rice' && (
          <>
            <Select label="Rice type" value={filters.type} onChange={(v) => onChange('type', v)}>
              <option value="">Any type</option>
              {options.types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
            <Select label="Process" value={filters.process} onChange={(v) => onChange('process', v)}>
              <option value="">Any process</option>
              {options.processes.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </>
        )}
      </div>

      {(activeCount > 0 || filters.q) && (
        <button type="button" onClick={onClear} className="min-h-11 text-sm font-medium text-navy underline">
          Clear all filters
        </button>
      )}
    </section>
  )
}
