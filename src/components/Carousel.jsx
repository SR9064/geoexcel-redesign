import { useEffect, useState } from 'react'

// Image carousel: each click swaps straight to the next image (no slow slide
// animation, which was one of the problems on the current site).
// Works with buttons, the left/right arrow keys, and screen readers.

export default function Carousel({ images, label }) {
  const [index, setIndex] = useState(0)
  const [broken, setBroken] = useState({}) // images that failed to load
  const total = images.length

  const go = (n) => setIndex((n + total) % total)

  // Preload the neighbouring images so the next click feels instant
  useEffect(() => {
    if (total < 2) return
    ;[index + 1, index - 1].forEach((n) => {
      const img = new Image()
      img.src = images[(n + total) % total]
    })
  }, [index, images, total])

  function onKeyDown(e) {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(index + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(index - 1)
    }
  }

  const current = images[index]
  const btn =
    'min-h-11 min-w-11 rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-navy transition-colors hover:bg-slate-50'

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="rounded-xl border border-slate-200 bg-white p-3 focus-visible:outline-2 focus-visible:outline-navy"
    >
      <div className="flex min-h-64 items-center justify-center rounded-md bg-slate-50">
        {broken[current] ? (
          <p className="p-6 text-center text-sm text-slate-500">
            Image not found. Add the file <code>{current}</code> (inside the <code>public</code> folder).
          </p>
        ) : (
          <img
            key={current}
            src={current}
            alt={`${label}, page ${index + 1} of ${total}`}
            className="max-h-[70vh] w-auto max-w-full object-contain"
            onError={() => setBroken((b) => ({ ...b, [current]: true }))}
          />
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        {total > 1 ? (
          <>
            <button type="button" className={btn} onClick={() => go(index - 1)} aria-label="Previous page">
              ← Prev
            </button>
            <p className="text-sm text-slate-600" aria-live="polite">
              Page {index + 1} of {total}
            </p>
            <button type="button" className={btn} onClick={() => go(index + 1)} aria-label="Next page">
              Next →
            </button>
          </>
        ) : (
          <p className="text-sm text-slate-600">Single page</p>
        )}
      </div>

      <a
        href={current}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex min-h-11 items-center text-sm font-medium text-navy underline"
      >
        Open full size
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  )
}
