const TBC = 'To be confirmed by GeoExcel'

// We never show a "valid" or "verified" badge: we cannot confirm current status.
const STATUS = {
  'date-passed': {
    label: 'The validity date listed has passed. Renewal to be confirmed by GeoExcel.',
    cls: 'bg-amber-50 text-amber-900',
  },
  listed: {
    label: 'As listed on GeoExcel\u2019s website. Not independently verified.',
    cls: 'bg-slate-100 text-slate-700',
  },
}

function Row({ label, children }) {
  return (
    <div>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="text-sm font-medium">{children}</dd>
    </div>
  )
}

export default function CredentialCard({ credential: c }) {
  const status = STATUS[c.status] ?? STATUS.listed

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <div>
        <h2 className="text-lg font-bold text-navy">{c.title}</h2>
        <p className="mt-1 text-sm text-slate-600">{c.issuer}</p>
      </div>

      <p className={`rounded-md px-3 py-2 text-xs ${status.cls}`}>{status.label}</p>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-3">
        <div className="col-span-2">
          <Row label="Registration number">
            {c.number ? (
              <span className="break-all font-mono">{c.number}</span>
            ) : (
              <span className="font-normal text-slate-600">{c.numberNote ?? TBC}</span>
            )}
          </Row>
        </div>
        <div className="col-span-2">
          <Row label="Covers (as listed)">{c.scope}</Row>
        </div>
        <Row label="Issued">{c.issued ?? TBC}</Row>
        <Row label="Valid up to (as listed)">{c.validUpTo ?? TBC}</Row>
      </dl>

      {c.note && <p className="text-sm text-slate-600">{c.note}</p>}

      <a
        href={c.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex min-h-11 items-center self-start rounded-md border border-navy px-4 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-white"
      >
        {c.verifyLabel}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </article>
  )
}
