import { Link, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Products from './pages/Products.jsx'
import Enquiry from './pages/Enquiry.jsx'
import Credentials from './pages/Credentials.jsx'
// Temporary page used until we build the real Home, Enquiry and Credentials pages.
function Placeholder({ title, children }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-navy">{title}</h1>
      <p className="mt-2 text-slate-600">{children}</p>
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
    <div className="min-h-screen bg-stone-50 text-slate-800">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Placeholder title="Home">Home page coming next.</Placeholder>} />
          <Route path="/products" element={<Products />} />
          <Route path="/enquiry" element={<Enquiry />} /> element={<Placeholder title="Your enquiry">Quote form coming next.</Placeholder>} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="*" element={<Placeholder title="Page not found">That page does not exist.</Placeholder>} />
        </Routes>
      </main>
    </div>
  )
}
