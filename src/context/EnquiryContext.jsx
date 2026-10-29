import { createContext, useContext, useEffect, useState } from 'react'

// The enquiry basket. We store only product ids, so product data stays in one place.
// The basket is saved in localStorage so it survives a page refresh.

const EnquiryContext = createContext(null)
const STORAGE_KEY = 'geoexcel-enquiry'

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return [] // storage blocked or corrupted: start with an empty basket
  }
}

export function EnquiryProvider({ children }) {
  const [ids, setIds] = useState(loadSaved)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // ignore: the basket still works in memory
    }
  }, [ids])

  const value = {
    ids,
    count: ids.length,
    has: (id) => ids.includes(id),
    add: (id) => setIds((current) => (current.includes(id) ? current : [...current, id])),
    remove: (id) => setIds((current) => current.filter((x) => x !== id)),
    clear: () => setIds([]),
  }

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>
}

export function useEnquiry() {
  const context = useContext(EnquiryContext)
  if (!context) throw new Error('useEnquiry must be used inside <EnquiryProvider>')
  return context
}
