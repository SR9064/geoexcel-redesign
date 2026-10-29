import { Link } from 'react-router-dom'
import CredentialCard from '../components/CredentialCard.jsx'
import { credentials, entity } from '../data/credentials.js'

export default function Credentials() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-bold text-navy md:text-3xl">Credentials</h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        The registrations {entity.legalName} lists on its website, incorporated {entity.incorporated}. Check each one
        on the issuing authority&rsquo;s own portal before you place an order.
      </p>

      <p className="mt-3 max-w-3xl rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">
        These summaries come from the documents on geoexcel.group (reviewed {entity.reviewedOn}). The original scans
        are not reproduced here because they show tax identifiers and personal contact details.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {credentials.map((c) => (
          <CredentialCard key={c.id} credential={c} />
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-4 md:p-6">
        <h2 className="text-lg font-bold text-navy">Ready to ask for a quote?</h2>
        <p className="mt-1 text-sm text-slate-600">Pick your products and send one complete request.</p>
        <Link
          to="/products"
          className="mt-3 inline-flex min-h-11 items-center rounded-md bg-navy px-4 text-sm font-medium text-white"
        >
          Browse products
        </Link>
      </div>
    </div>
  )
}
