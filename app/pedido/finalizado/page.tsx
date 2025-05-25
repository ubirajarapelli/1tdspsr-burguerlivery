"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Logo } from "@/app/components"
 
interface OrderComplete {
  orderNumber: string
  createdAt: string
  address: {
    cep: string
    street: string
    neighborhood: string
    city: string
    number: string
    complement?: string
  }
  paymentOption?: {
    id: string
    value: number
    text: string
  }
  items: { title: string; value: number }[]
  totalValue: number
  frete: number
}
 
export default function PedidoFinalizado() {
  const searchParams = useSearchParams()
 
  const orderNumber = searchParams.get("orderNumber")
  const createdAt = searchParams.get("createdAt")
 
  const [order, setOrder] = useState<OrderComplete | null>(null)
 
  useEffect(() => {
   
    const lastOrder = sessionStorage.getItem("lastOrder")
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder))
    }
  }, [])
 
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null
 
  return (
    <main className="bg-gray-200 min-h-screen">
      <section className="container mx-auto px-4 py-8">
        <header className="py-6 flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Logo />
          </span>
        </header>
 
        <h1 className="text-4xl text-gray-700 font-bold mb-6">
          Pedido realizado com sucesso
        </h1>
 
        <div className="bg-white rounded-lg shadow-md max-w-2xl p-6 space-y-6">
          <section>
            <p className="text-gray-700 text-lg mb-2">
              <span className="font-semibold">Número do pedido: </span>
              <span className="text-amber-600">{orderNumber ?? "Não informado"}</span>
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Data e hora: </span>
              <span className="text-amber-600">{formattedDate ?? "Não informado"}</span>
            </p>
          </section>
 
          {order && (
            <>
              <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-3">Endereço de entrega</h2>
                <p className="text-gray-700">
                  {order.address.street}, {order.address.number}{" "}
                  {order.address.complement && `- ${order.address.complement}`}
                </p>
                <p className="text-gray-700">
                  {order.address.neighborhood} - {order.address.city}
                </p>
                <p className="text-gray-700">CEP: {order.address.cep}</p>
              </section>
 
              <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-3">Forma de pagamento</h2>
                <p className="text-amber-600 font-semibold">
                  {order.paymentOption?.text ?? "Não informado"}
                </p>
              </section>
 
              <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-3">Itens do pedido</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.title} -{" "}
                      <span className="font-semibold">
                        {item.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
 
              <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-3">Resumo do pagamento</h2>
                <p className="text-gray-700 flex justify-between max-w-xs">
                  Subtotal:
                  <span className="font-semibold">
                    {order.totalValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </p>
                <p className="text-gray-700 flex justify-between max-w-xs">
                  Frete:
                  <span className="font-semibold">
                    {order.frete.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </p>
                <p className="text-gray-700 flex justify-between max-w-xs text-lg font-bold">
                  Total:
                  <span className="text-amber-600">
                    {(order.totalValue + order.frete).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </p>
              </section>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
 