import Link from "next/link"
import { Snail } from "lucide-react"
import { CategoryItem } from "@/app/types/categories"

export async function Header() {
  const baseUrl = "https://burgerlivery-api.vercel.app"

  const response = await fetch(`${baseUrl}/categories`)
  const data = await response.json()
  const categories = data.filter((item: CategoryItem) => item.link !== "combos")

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
            {categories.map((category: CategoryItem) => (
              <li
                key={category.id}
                className="inline px-2 font-medium text-gray-700 hover:text-amber-600"
              >
                <Link href={`/${category.link}`}>{category.text}</Link>
              </li>
            ))}

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
