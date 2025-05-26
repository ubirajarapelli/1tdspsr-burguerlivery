"use client"

import { useSearchParams } from "next/navigation"

export default function PedidoFinalizado() {
  const searchParams = useSearchParams()

  const orderNumber = searchParams.get("orderNumber")
  const createdAt = searchParams.get("createdAt")

  return (
    <main className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Pedido Finalizado!
        </h1>
        <p className="text-gray-700 mb-2">
          Número do pedido: <span className="font-semibold">{orderNumber}</span>
        </p>
        <p className="text-gray-700 mb-2">
          Data e hora da criação:{" "}
          <span className="font-semibold">{new Date(createdAt || "").toLocaleString("pt-BR")}</span>
        </p>
        <p className="text-sm text-gray-500 mt-6">Agradecemos pela preferência!</p>
      </div>
    </main>
  )
}
