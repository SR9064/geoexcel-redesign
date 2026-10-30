import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Products from './pages/Products.jsx'
import Enquiry from './pages/Enquiry.jsx'
import Certificates from './pages/Certificates.jsx'
import Sustainability from './pages/Sustainability.jsx'
import Contact from './pages/Contact.jsx'

function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-navy">Page not found</h1>
      <p className="mt-2 text-slate-600">That page does not exist.</p>
      <Link
        to="/products"
        className="mt-4 inline-flex min-h-11 items-center rounded-md bg-navy px-4 text-sm font-medium text-white"
      >
        Browse products
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-slate-800">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/credentials" element={<Navigate to="/certificates" replace />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
