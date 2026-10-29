import { products } from './data/products.js'

export default function App() {
  return (
    <h1 className="p-6 text-2xl font-bold text-green-700">
      {products.length} products loaded
    </h1>
  )
}