import { Link } from 'react-router-dom'
import { contact } from '../data/contact.js'

const links = [
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/sustainability', label: 'Sustainability' },
  { to: '/contact', label: 'Contact' },
  { to: '/enquiry', label: 'Your enquiry' },
]

export default function Footer() {
  return (
    <footer className="mt-10 bg-navy text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold tracking-wide text-white">GEO EXCEL</p>
          <p className="mt-2 text-sm">{contact.legalName}</p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-bold text-white">Explore</p>
          <ul className="mt-2 space-y-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="inline-flex min-h-11 items-center text-sm underline-offset-4 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="text-sm not-italic">
          <p className="font-bold text-white">Contact</p>
          <p className="mt-2">
            {contact.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <p className="mt-2">
            <a href={contact.phoneHref} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
              {contact.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
              {contact.email}
            </a>
          </p>
        </address>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-300">
        A redesign prepared for the GeoExcel 48-hour website challenge. This is not GeoExcel&rsquo;s official site.
        Product details come from geoexcel.group and are to be confirmed by GeoExcel.
      </div>
    </footer>
  )
}
