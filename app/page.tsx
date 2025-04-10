import Link from "next/link"
import { Logo } from "./components"

export default function Home() {
  return (
    <main className="bg-gray-200 h-svh">
      <div className="container mx-auto">
        <header className="py-3">
          <a href="" className="flex items-center gap-1">
            <Logo />
          </a>
        </header>
        <section className="flex flex-col justify-center items-center h-[600px] gap-2">
          <h1 className="text-4xl font-bold text-center text-gray-700">
            Burgerlivery
          </h1>
          <p className="text-center text-gray-700">Faça seu pedido online</p>
          <Link
            href="/pages/hamburgers"
            className="min-w-32 py-2 px-6 rounded-full bg-amber-300 text-amber-600 text-center font-semibold border border-amber-400"
          >
            Inciar
          </Link>
        </section>
      </div>
    </main>
  )
}
