"use client"
import { useEffect, useState } from "react"
import { Logo } from "@/app/components"

export default function PedidoFinalizado() {
  const [orderInfo, setOrderInfo] = useState({
    orderNumber: "",
    createdAt: "",
  })

  useEffect(() => {
    const savedOrder = sessionStorage.getItem("orderInfo")
    if (savedOrder) {
      setOrderInfo(JSON.parse(savedOrder))
    }
  }, [])

  return (
    <main className="bg-gray-200 h-screen">
      <section className="container mx-auto">
        <header className="py-6 flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Logo />
          </span>
        </header>
        <h1 className="text-4xl text-gray-700 font-bold mb-6">
          Pedido realizado com sucesso
        </h1>
        <div className="p-6 bg-white rounded shadow-md">
          <p className="text-lg text-gray-700">
            <strong>Número do Pedido:</strong> {orderInfo.orderNumber}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Data da criação:</strong> {orderInfo.createdAt}
          </p>
        </div>
      </section>
    </main>
  )
}