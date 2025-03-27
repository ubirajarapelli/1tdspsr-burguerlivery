import { Snail } from "lucide-react"
import Link from "next/link"

export const Header = () => {
  return (
    <header>
      <div className="container mx-auto flex justify-between items-center py-3">
        <div>
          <Link href="/" className="flex items-center gap-1">
            <Snail className="text-amber-400" />
            <span className="text-gray-700 font-bold text-xl">
              Burguerlivery
            </span>
          </Link>
        </div>
        <nav>
          <ul className="py-3">
            <li className="inline px-2 font-medium text-gray-700 hover:text-amber-600">
              <Link href="/pages/entradas">Entradas</Link>
            </li>
            <li className="inline px-2 font-medium text-gray-700 hover:text-amber-600">
              <Link href="/pages/hamburgers">Burgers</Link>
            </li>
            <li className="inline px-2 font-medium text-gray-700 hover:text-amber-600">
              <Link href="/pages/bebidas">Bebidas</Link>
            </li>
            <li className="inline px-2 font-medium text-gray-700 hover:text-amber-600">
              <Link href="/pages/sobremesas">Sobremesas</Link>
            </li>
            <li className="inline px-2 font-medium text-gray-700 hover:text-amber-600">
              <Link
                href=""
                className="py-2 px-6 rounded-full bg-amber-300 text-amber-600 font-semibold border border-amber-400"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
