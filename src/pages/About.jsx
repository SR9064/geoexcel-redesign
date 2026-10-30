import { Link } from 'react-router-dom'

// Timeline summarised from geoexcel.group/about. Nothing here is added by us.
const TIMELINE = [
  {
    when: '1980s',
    title: 'Agriculture',
    text: 'The group begins as farmers, growing and harvesting rice, sugarcane and sesame.',
  },
  {
    when: '1990s',
    title: 'Cement and steel dealing',
    text: 'It diversifies into cement and steel, which becomes the base for civil contracting.',
  },
  {
    when: '1993\u20132014',
    title: 'Civil construction',
    text: 'From 1993 it builds turn-key residential projects in Bangalore. By 2014 it expands into commercial, industrial and infrastructure work, with some of its own developments under the name Anuadi Constructions.',
  },
  {
    when: '2019',
    title: 'Sustainability and CSR focus',
    text: 'The group states a focus on the UN Sustainable Development Goals and on CSR activities.',
  },
  {
    when: '2023',
    title: 'GeoExcel is born',
    text: 'The GeoExcel name, short for Geographic Excellence, is formally adopted, and the business takes up export trade of the products listed on its website.',
  },
]

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-bold text-navy md:text-3xl">About GeoExcel</h1>
      <p className="mt-3 text-slate-600">
        GeoExcel&rsquo;s website describes a group with roots in the 1980s. It grew from farming to cement and steel
        dealing, construction and trading, and today lists verticals in agriculture, automotive, construction and
        trading. The GeoExcel name was formally adopted in 2023, and this redesign covers its food and agri-product
        export range.
      </p>

      <h2 className="mt-8 text-xl font-bold text-navy">The story so far</h2>
      <ol className="mt-4 border-l-2 border-flame pl-6">
        {TIMELINE.map((item) => (
          <li key={item.when} className="relative pb-8 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-navy ring-4 ring-stone-50"
            />
            <p className="text-sm font-bold text-leaf">{item.when}</p>
            <h3 className="text-lg font-bold text-navy">{item.title}</h3>
            <p className="mt-1 text-slate-600">{item.text}</p>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-sm text-slate-500">Summarised from geoexcel.group/about.</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/certificates"
          className="inline-flex min-h-11 items-center rounded-md border border-navy px-4 text-sm font-medium text-navy hover:bg-navy hover:text-white"
        >
          See certificates
        </Link>
        <Link
          to="/products"
          className="inline-flex min-h-11 items-center rounded-md bg-navy px-4 text-sm font-medium text-white"
        >
          Browse products
        </Link>
      </div>
    </div>
  )
}