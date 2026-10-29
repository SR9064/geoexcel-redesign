import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext.jsx'
import { getProduct } from '../data/products.js'
import { FORM_ENDPOINT } from '../config.js'

const UNITS = ['Metric tonnes', 'Kilograms', 'Containers']
const BUYER_TYPES = [
  'Importer',
  'Distributor',
  'Wholesaler',
  'Food processor',
  'Retailer / supermarket',
  'Restaurant / catering',
  'Other',
]

const base = 'min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm'
const full = `${base} w-full`
const card = 'rounded-xl border border-slate-200 bg-white p-4 md:p-6'

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-brick">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Enquiry() {
  const { ids, remove, clear } = useEnquiry()
  const items = ids.map(getProduct).filter(Boolean)

  const [qty, setQty] = useState({}) // { productId: { amount, unit } }
  const [form, setForm] = useState({
    country: '',
    buyerType: '',
    packaging: '',
    message: '',
    name: '',
    company: '',
    email: '',
    phone: '',
    website: '', // honeypot: real people never see or fill this
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [sent, setSent] = useState(null)

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const setQuantity = (id, patch) => setQty((q) => ({ ...q, [id]: { ...q[id], ...patch } }))

  // Props that connect an input to its error message (for screen readers)
  const fp = (id) => ({
    id,
    'aria-invalid': errors[id] ? true : undefined,
    'aria-describedby': errors[id] ? `${id}-error` : undefined,
  })

  function validate() {
    const e = {}
    items.forEach((p) => {
      if (!(Number(qty[p.id]?.amount) > 0)) e[`qty-${p.id}`] = 'Enter a quantity'
    })
    if (!form.country.trim()) e.country = 'Enter the destination country'
    if (!form.buyerType) e.buyerType = 'Choose a buyer type'
    if (!form.name.trim()) e.name = 'Enter your name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email address'
    return e
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    const found = validate()
    setErrors(found)
    const firstKey = Object.keys(found)[0]
    if (firstKey) {
      document.getElementById(firstKey)?.focus()
      return
    }
    if (form.website) return // honeypot filled: silently ignore bots

    const lines = items.map(
      (p) => `${p.name} (HS ${p.hsCode ?? 'n/a'}): ${qty[p.id].amount} ${qty[p.id].unit || UNITS[0]}`,
    )
    const payload = {
      _subject: `Quote request: ${items.length} product(s) from ${form.name}`,
      products: lines.join('\n'),
      destination_country: form.country,
      buyer_type: form.buyerType,
      packaging_preference: form.packaging,
      message: form.message,
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
    }

    setStatus('sending')
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Request failed')
      } else {
        await new Promise((r) => setTimeout(r, 600)) // demo mode: pretend to send
      }
      setSent({ lines, demo: !FORM_ENDPOINT, name: form.name })
      clear()
      setStatus('sent')
    } catch {
      setStatus('error') // basket is kept, so nothing is lost
    }
  }

  let content
  if (status === 'sent') {
    content = (
      <div className={`${card} mt-6`} role="status">
        <h2 className="text-xl font-bold text-navy">Enquiry {sent.demo ? 'prepared (demo)' : 'sent'}</h2>
        <p className="mt-2 text-slate-600">
          Thank you, {sent.name}. This is what the request contained:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          {sent.lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        {sent.demo && (
          <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
            Demo mode: no form endpoint is set, so nothing was sent.
          </p>
        )}
        <Link
          to="/products"
          className="mt-4 inline-flex min-h-11 items-center rounded-md bg-navy px-4 text-sm font-medium text-white"
        >
          Back to products
        </Link>
      </div>
    )
  } else if (items.length === 0) {
    content = (
      <div className={`${card} mt-6 text-center`}>
        <p className="font-medium text-navy">Your enquiry is empty.</p>
        <p className="mt-1 text-sm text-slate-600">Add products from the catalogue, then come back to send one request.</p>
        <Link
          to="/products"
          className="mt-4 inline-flex min-h-11 items-center rounded-md bg-navy px-4 text-sm font-medium text-white"
        >
          Browse products
        </Link>
      </div>
    )
  } else {
    content = (
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <form onSubmit={onSubmit} noValidate className="space-y-6 lg:col-span-2">
          {/* 1. Products and quantities */}
          <section className={card} aria-labelledby="h-products">
            <h2 id="h-products" className="text-lg font-bold text-navy">
              1. Products and quantities
            </h2>
            <ul className="mt-2 divide-y divide-slate-200">
              {items.map((p) => {
                const qid = `qty-${p.id}`
                return (
                  <li key={p.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-medium text-navy">{p.name}</p>
                      <p className="text-xs text-slate-500">
                        Pack sizes: {p.packSizes.length ? p.packSizes.join(', ') : 'to be confirmed'}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-start gap-2">
                      <div>
                        <label htmlFor={qid} className="sr-only">
                          Quantity for {p.name}
                        </label>
                        <input
                          {...fp(qid)}
                          type="number"
                          min="0"
                          step="any"
                          inputMode="decimal"
                          placeholder="Quantity"
                          className={`${base} w-28`}
                          value={qty[p.id]?.amount ?? ''}
                          onChange={(e) => setQuantity(p.id, { amount: e.target.value })}
                        />
                        {errors[qid] && (
                          <p id={`${qid}-error`} className="mt-1 text-xs text-brick">
                            {errors[qid]}
                          </p>
                        )}
                      </div>
                      <select
                        aria-label={`Unit for ${p.name}`}
                        className={`${base} w-36`}
                        value={qty[p.id]?.unit ?? UNITS[0]}
                        onChange={(e) => setQuantity(p.id, { unit: e.target.value })}
                      >
                        {UNITS.map((u) => (
                          <option key={u}>{u}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => remove(p.id)}
                        aria-label={`Remove ${p.name}`}
                        className="min-h-11 rounded-md px-3 text-sm text-brick underline"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
            <Link to="/products" className="text-sm font-medium text-navy underline">
              + Add more products
            </Link>
          </section>

          {/* 2. The request */}
          <section className={`${card} space-y-4`} aria-labelledby="h-request">
            <h2 id="h-request" className="text-lg font-bold text-navy">
              2. Your request
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="country" label="Destination country" required error={errors.country}>
                <input
                  {...fp('country')}
                  className={full}
                  autoComplete="country-name"
                  value={form.country}
                  onChange={(e) => setField('country', e.target.value)}
                />
              </Field>
              <Field id="buyerType" label="Buyer type" required error={errors.buyerType}>
                <select
                  {...fp('buyerType')}
                  className={full}
                  value={form.buyerType}
                  onChange={(e) => setField('buyerType', e.target.value)}
                >
                  <option value="">Choose one</option>
                  {BUYER_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field id="packaging" label="Preferred packaging (optional)">
              <input
                id="packaging"
                className={full}
                placeholder="e.g. 25 kg PP bags"
                value={form.packaging}
                onChange={(e) => setField('packaging', e.target.value)}
              />
            </Field>
            <Field id="message" label="Anything else GeoExcel should know (optional)">
              <textarea
                id="message"
                rows={3}
                className={`${full} py-2`}
                value={form.message}
                onChange={(e) => setField('message', e.target.value)}
              />
            </Field>
          </section>

          {/* 3. Contact details */}
          <section className={`${card} space-y-4`} aria-labelledby="h-contact">
            <h2 id="h-contact" className="text-lg font-bold text-navy">
              3. Your details
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Name" required error={errors.name}>
                <input
                  {...fp('name')}
                  className={full}
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setField('name', e.target.value)}
                />
              </Field>
              <Field id="company" label="Company (optional)">
                <input
                  id="company"
                  className={full}
                  autoComplete="organization"
                  value={form.company}
                  onChange={(e) => setField('company', e.target.value)}
                />
              </Field>
              <Field id="email" label="Email" required error={errors.email}>
                <input
                  {...fp('email')}
                  type="email"
                  className={full}
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                />
              </Field>
              <Field id="phone" label="Phone (optional)">
                <input
                  id="phone"
                  type="tel"
                  className={full}
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                />
              </Field>
            </div>

            {/* Honeypot: hidden from people, bots tend to fill it */}
            <div className="hidden" aria-hidden="true">
              <label>
                Website
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setField('website', e.target.value)}
                />
              </label>
            </div>
          </section>

          {status === 'error' && (
            <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-900">
              Your enquiry could not be sent. Your products are still saved. Please try again, or email
              info@geoexcel.group.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="min-h-12 w-full rounded-md bg-navy px-6 text-base font-medium text-white transition-colors hover:bg-navy/90 disabled:opacity-60 sm:w-auto"
          >
            {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          </button>
        </form>

        {/* Trust panel: facts taken from GeoExcel's own site, no claims about validity */}
        <aside className={`${card} h-fit space-y-3 text-sm lg:sticky lg:top-24`} aria-label="About this request">
          <h2 className="text-lg font-bold text-navy">Before you send</h2>
          <p>
            Your request goes to GeoExcel Production Trades Private Limited, Bengaluru, registered in November 2023
            according to the documents on its website.
          </p>
          <p>
            Registrations listed on GeoExcel&rsquo;s website: APEDA, FSSAI, Udyam and IEC.{' '}
            <Link to="/credentials" className="font-medium text-navy underline">
              See credentials
            </Link>
          </p>
          <p className="text-slate-600">
            GeoExcel receives your products, quantities, destination and contact details in one message, so it can
            start from a complete request. Response times are set by GeoExcel.
          </p>
        </aside>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-bold text-navy md:text-3xl">Your enquiry</h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Check your products, add quantities, and send one complete quote request.
      </p>
      {!FORM_ENDPOINT && status !== 'sent' && (
        <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Demo mode: no form endpoint is set in <code>src/config.js</code>, so enquiries are not sent.
        </p>
      )}
      {content}
    </div>
  )
}
