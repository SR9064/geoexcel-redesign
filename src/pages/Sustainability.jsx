import { Link } from 'react-router-dom'

// Statements below are GeoExcel's own, from geoexcel.group/about-1 (reviewed
// 30 Oct 2026), lightly edited for spelling. Nothing is added or verified by us.

const APPROACH = [
  'Uplifting livelihoods and ensuring good working conditions',
  'Implementing living wages for all stakeholders',
  'Climate change',
  'Building an environmentally sustainable business',
]

const PRINCIPLES = [
  'Following sustainable agricultural methods when collecting natural raw materials',
  'Sourcing natural raw materials with proper harvesting methods, at the right time and the right price',
  'Supporting the preservation of endangered plant species and avoiding their use',
  'Practising organic farming and avoiding pesticides and chemicals',
  'Avoiding raw materials that may affect climate conditions',
]

const card = 'rounded-xl border border-slate-200 bg-white p-4 md:p-6'

function List({ items }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default function Sustainability() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="text-2xl font-bold text-navy md:text-3xl">Sustainability</h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        What GeoExcel says about how it works, as published on its website. These are GeoExcel&rsquo;s own statements.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section className={card} aria-labelledby="h-approach">
          <h2 id="h-approach" className="text-lg font-bold text-navy">
            Our approach
          </h2>
          <List items={APPROACH} />
        </section>

        <section className={card} aria-labelledby="h-principles">
          <h2 id="h-principles" className="text-lg font-bold text-navy">
            Principles we follow
          </h2>
          <List items={PRINCIPLES} />
        </section>
      </div>

      <section className={`${card} mt-4`} aria-labelledby="h-sdg">
        <h2 id="h-sdg" className="text-lg font-bold text-navy">
          UN Sustainable Development Goals
        </h2>
        <p className="mt-2 text-slate-700">
          GeoExcel&rsquo;s site shows the UN&rsquo;s 17 Sustainable Development Goals, and its group history mentions a
          focus on them and on CSR activities from 2019. The site does not say which goals its work addresses.
        </p>
        <figure className="mt-4">
          <img
            src="/images/sdg-goals.png"
            alt="The United Nations' 17 Sustainable Development Goals, shown as a grid of coloured tiles"
            loading="lazy"
            className="mx-auto h-auto w-full max-w-4xl"
            onError={(e) => {
              e.currentTarget.parentElement.style.display = 'none'
            }}
          />
          <figcaption className="mt-2 text-center text-xs text-slate-500">
            United Nations Sustainable Development Goals, shown as on geoexcel.group. This does not imply endorsement by
            the United Nations.
          </figcaption>
        </figure>
        <a
          href="https://sdgs.un.org/goals"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-navy underline"
        >
          Read about the 17 goals on the UN website
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </section>

      <section className="mt-4 rounded-xl bg-amber-50 p-4 text-amber-900 md:p-6" aria-labelledby="h-evidence">
        <h2 id="h-evidence" className="text-lg font-bold">
          For buyers who need proof
        </h2>
        <p className="mt-2 text-sm">
          The current website does not link these statements to certificates, audits or reports. No organic
          certification appears among the registrations it lists. If organic or sustainability credentials matter for
          your order, ask GeoExcel for supporting documents when you send your enquiry.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link
            to="/certificates"
            className="inline-flex min-h-11 items-center rounded-md border border-amber-900 px-4 text-sm font-medium hover:bg-amber-100"
          >
            See listed certificates
          </Link>
          <Link
            to="/products"
            className="inline-flex min-h-11 items-center rounded-md bg-navy px-4 text-sm font-medium text-white"
          >
            Start an enquiry
          </Link>
        </div>
      </section>
    </div>
  )
}
