// import { Link } from 'react-router-dom'
// import Carousel from '../components/Carousel.jsx'
// import CredentialCard from '../components/CredentialCard.jsx'
// import { credentials, entity } from '../data/credentials.js'

// // How many page images each certificate has. The numbers come from the page
// // counters on the current site (APEDA 1/3, FSSAI 1/7, CLE 1/2, Udyam 1/4).
// // If your downloaded set differs, change the numbers here.
// //
// // Files go in public/images/certificates/ and are named like:
// //   apeda-1.png, apeda-2.png, apeda-3.png, fssai-1.png ... fssai-7.png, etc.
// const PAGE_COUNTS = { apeda: 3, fssai: 7, udyam: 4, iec: 1, cle: 2 }

// const pagesFor = (id) =>
//   Array.from({ length: PAGE_COUNTS[id] ?? 1 }, (_, n) => `/images/certificates/${id}-${n + 1}.png`)

// export default function Certificates() {
//   return (
//     <div className="mx-auto max-w-6xl px-4 py-6">
//       <h1 className="text-2xl font-bold text-navy md:text-3xl">Certificates</h1>
//       <p className="mt-2 max-w-3xl text-slate-600">
//         The registrations {entity.legalName} lists on its website. Page through each original document, read the summary
//         beside it, and check it on the issuing authority&rsquo;s own portal before you place an order.
//       </p>
//       <p className="mt-3 max-w-3xl rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">
//         Documents and summaries come from geoexcel.group (reviewed {entity.reviewedOn}). Summaries are not an
//         independent verification.
//       </p>

//       <div className="mt-6 space-y-8">
//         {credentials.map((c) => (
//           <section key={c.id} aria-label={c.title} className="grid gap-4 lg:grid-cols-5">
//             <div className="lg:col-span-3">
//               <Carousel images={pagesFor(c.id)} label={c.title} />
//             </div>
//             <div className="lg:col-span-2">
//               <CredentialCard credential={c} />
//             </div>
//           </section>
//         ))}
//       </div>

//       <div className="mt-10 rounded-xl border border-slate-200 bg-white p-4 md:p-6">
//         <h2 className="text-lg font-bold text-navy">Ready to ask for a quote?</h2>
//         <p className="mt-1 text-sm text-slate-600">Pick your products and send one complete request.</p>
//         <Link
//           to="/products"
//           className="mt-3 inline-flex min-h-11 items-center rounded-md bg-navy px-4 text-sm font-medium text-white"
//         >
//           Browse products
//         </Link>
//       </div>
//     </div>
//   )
// }

import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel.jsx'
import CredentialCard from '../components/CredentialCard.jsx'
import { credentials, entity } from '../data/credentials.js'

// Set to false to show only the document carousels (no summary box beside them).
const SHOW_SUMMARY = true

// How many page images each certificate has. The numbers come from the page
// counters on the current site (APEDA 1/3, FSSAI 1/7, CLE 1/2, Udyam 1/4).
// If your downloaded set differs, change the numbers here.
//
// Files go in public/images/certificates/ and are named like:
//   apeda-1.png, apeda-2.png, apeda-3.png, fssai-1.png ... fssai-7.png, etc.
const PAGE_COUNTS = { apeda: 3, fssai: 7, udyam: 4, iec: 1, cle: 2 }

const pagesFor = (id) =>
  Array.from({ length: PAGE_COUNTS[id] ?? 1 }, (_, n) => `/images/certificates/${id}-${n + 1}.png`)

export default function Certificates() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-bold text-navy md:text-3xl">Certificates</h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        The registrations {entity.legalName} lists on its website. Page through each original document
        {SHOW_SUMMARY ? ', read the summary beside it,' : ''} and check it on the issuing authority&rsquo;s own portal
        before you place an order.
      </p>
      <p className="mt-3 max-w-3xl rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">
        Documents{SHOW_SUMMARY ? ' and summaries' : ''} come from geoexcel.group (reviewed {entity.reviewedOn}).
        {SHOW_SUMMARY ? ' Summaries are not an independent verification.' : ''}
      </p>

      <div className="mt-6 space-y-8">
        {credentials.map((c) => (
          <section
            key={c.id}
            aria-label={c.title}
            className={SHOW_SUMMARY ? 'grid gap-4 lg:grid-cols-5' : 'max-w-3xl'}
          >
            {!SHOW_SUMMARY && <h2 className="mb-2 text-lg font-bold text-navy">{c.title}</h2>}
            <div className={SHOW_SUMMARY ? 'lg:col-span-3' : ''}>
              <Carousel images={pagesFor(c.id)} label={c.title} />
            </div>
            {SHOW_SUMMARY && (
              <div className="lg:col-span-2">
                <CredentialCard credential={c} />
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-4 md:p-6">
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
