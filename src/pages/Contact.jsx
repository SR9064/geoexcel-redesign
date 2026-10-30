import { Link } from 'react-router-dom'
import { contact } from '../data/contact.js'

const { lat, lon } = contact.map
const bbox = `${lon - 0.004},${lat - 0.003},${lon + 0.004},${lat + 0.003}`
const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`
const bigMapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`

const card = 'rounded-xl border border-slate-200 bg-white p-4 md:p-6'

export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-bold text-navy md:text-3xl">Contact</h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        For product and price requests, the enquiry form is the fastest way: GeoExcel gets your products, quantities and
        destination in one message.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <section className={card}>
            <h2 className="text-lg font-bold text-navy">Send an enquiry</h2>
            <p className="mt-1 text-sm text-slate-600">Pick your products and send one complete request.</p>
            <Link
              to="/products"
              className="mt-3 inline-flex min-h-11 items-center rounded-md bg-navy px-4 text-sm font-medium text-white"
            >
              Browse products
            </Link>
          </section>

          <section className={card}>
            <h2 className="text-lg font-bold text-navy">Office</h2>
            <address className="mt-2 text-sm not-italic">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-3 text-sm">
              <span className="text-slate-500">Phone: </span>
              <a href={contact.phoneHref} className="inline-flex min-h-11 items-center font-medium text-navy underline">
                {contact.phone}
              </a>
            </p>
            <p className="text-sm">
              <span className="text-slate-500">Email: </span>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-11 items-center font-medium text-navy underline"
              >
                {contact.email}
              </a>
            </p>
          </section>
        </div>

        <section className={card} aria-labelledby="h-map">
          <h2 id="h-map" className="text-lg font-bold text-navy">
            Find us
          </h2>
          <iframe
            title="Map showing the GeoExcel office location in Bangalore"
            src={embedUrl}
            loading="lazy"
            className="mt-3 h-72 w-full rounded-md border border-slate-200 md:h-96"
          />
          <a
            href={bigMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-navy underline"
          >
            Open a larger map
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>
      </div>
    </div>
  )
}
