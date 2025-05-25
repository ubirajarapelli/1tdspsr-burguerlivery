"use client"
import { useSearchParams } from "next/navigation"
import { Logo } from "@/app/components"

export default function PedidoFinalizado() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("orderNumber")
  const createdAt = searchParams.get("createdAt")

  return (
    <main className="bg-gray-200 min-h-screen">
      <section className="container mx-auto">
        <header className="py-6 flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Logo />
          </span>
        </header>

        <h1 className="text-4xl text-gray-700 font-bold mb-6">
          Pedido realizado com sucesso!
        </h1>

        <div className="bg-white p-6 rounded shadow-md w-full max-w-xl mx-auto space-y-4">
          <p className="text-lg text-gray-700">
            <strong>Número do pedido:</strong> {orderNumber}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Data e hora:</strong> {createdAt}
          </p>
          <p className="text-gray-600">
            Obrigado por comprar conosco! Seu pedido está sendo processado.
          </p>
        </div>
      </section>
    </main>
  )
}
