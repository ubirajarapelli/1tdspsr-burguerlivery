import Link from "next/link"
import { Logo } from "../components"

export default function Checkout() {
  return (
    <main className="bg-gray-200 h-screen">
      <section className="container mx-auto">
        <header className="py-6 flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Logo />
          </span>
        </header>
        <h1 className="text-4xl text-gray-700 font-bold mb-6">Checkout</h1>
        <div className="min-h-96">
          <div className="flex items-start gap-4">
            <div className="w-1/3 p-6 bg-gray-50 border-gray-500 rounded-lg shadow-xs">
              <h2 className="text-xl text-gray-700 font-bold mb-2">
                Endereço de entrega
              </h2>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Link
            href="/"
            className="py-2 px-6 rounded-full bg-amber-300 text-amber-600 font-semibold border border-amber-400"
          >
            Fazer pedido
          </Link>
        </div>
      </section>
    </main>
  )
}
