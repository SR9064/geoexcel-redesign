import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  { to: '/credentials', label: 'Credentials' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { count } = useEnquiry()

  const linkClass = ({ isActive }) =>
    `block rounded-md px-3 py-3 text-base font-medium md:py-2 ${
      isActive
        ? 'text-navy underline decoration-flame decoration-2 underline-offset-8'
        : 'text-slate-600 hover:text-navy'
    }`

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          {/* Save the logo as public/images/logo.png. Hidden if the file is missing. */}
          <img
            src="/images/logo.png"
            alt=""
            className="h-9 w-auto"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <span className="text-lg font-bold tracking-wide text-navy">GEO EXCEL</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Desktop links */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/enquiry"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-navy px-4 text-sm font-medium text-white transition-colors hover:bg-navy/90"
          >
            Enquiry
            <span
              className="rounded-full bg-flame px-2 text-xs font-bold text-navy"
              aria-label={`${count} products in enquiry`}
            >
              {count}
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-slate-300 text-lg md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile links */}
      {open && (
        <nav id="mobile-menu" className="border-t border-slate-200 px-4 pb-3 md:hidden" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
