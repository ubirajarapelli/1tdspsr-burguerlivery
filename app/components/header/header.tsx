"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Logo } from "../logo/Logo"
import { MenuItem } from "../menuItem/Menuitem"
import OrderContext, { OrderProviderProps } from "@/app/context/orderContext"
import { useContext } from "react"
import { LogOut, ShoppingBasket } from "lucide-react"

export const Header = () => {
  const router = useRouter()
  const userToken = sessionStorage.getItem("token")

  const userData = JSON.parse(sessionStorage.getItem("user"))

  const { totalItems } = useContext<OrderProviderProps>(OrderContext)

  const handleLogout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    router.push("/")
  }

  return (
    <header>
      <div className="container mx-auto flex justify-between items-center py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-1">
            <Logo />
          </Link>
          <nav>
            <ul className="py-3">
              <MenuItem link="/pages/entradas">Entradas</MenuItem>
              <MenuItem link="/pages/hamburgers">Burgers</MenuItem>
              <MenuItem link="/pages/bebidas">Bebidas</MenuItem>
              <MenuItem link="/pages/sobremesas">Sobremesas</MenuItem>
            </ul>
          </nav>
        </div>
        <ul className="py-3 flex items-center gap-6">
          {userToken ? (
            <>
              <li className="text-gray-700">Olá: {userData.name}</li>
              <li>
                <Link
                  href=""
                  className="cursor-pointer text-gray-700 hover:text-amber-600"
                  onClick={handleLogout}
                >
                  <LogOut />
                </Link>
              </li>
            </>
          ) : (
            <li className="inline px-2 font-medium text-gray-700 hover:text-amber-600">
              <Link
                href="/login"
                className="py-2 px-6 rounded-full bg-amber-300 text-amber-600 font-semibold border border-amber-400"
              >
                Login
              </Link>
            </li>
          )}
          <li>
            <Link href="/resumo">
              <span className="flex items-center gap-1 text-gray-700 hover:text-amber-600">
                <ShoppingBasket />
                {totalItems}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
