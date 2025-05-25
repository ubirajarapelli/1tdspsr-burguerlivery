"use client"
import { Logo } from "@/app/components"
import OrderContext, { OrderContextValue } from "@/app/context/orderContext"
import { useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect } from "react"

export default function PedidoFinalizado() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const { totalValue, totalItems, appetizerOrder, address, selectedPaymentOption } =
    useContext(OrderContext) as OrderContextValue

  const orderNumber = searchParams.get("order")
  const createdAt = searchParams.get("date")

  useEffect(() => {}, [orderNumber, createdAt, router]) 

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
         <div className="min-h-96 flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-md">
          <p className="text-xl text-gray-700 mb-4">
            <span className="font-semibold">Número do pedido:</span> 
            #{orderNumber}
          </p>
          <p className="text-xl text-gray-700 mb-8">
            <span className="font-semibold">Criado em:</span>
            {createdAt}

          </p>
           {address && (
            <div className="text-gray-700">
              <h2 className="text-lg font-semibold mb-2">Endereço de Entrega</h2>
              <p>{address.street}, {address.number}</p>
              <p>{address.neighborhood} - {address.city}</p>
              <p>CEP: {address.cep}</p>
              {address.complement && <p>Complemento: {address.complement}</p>}
            </div>
          )}

          <div className="text-gray-700">
            <h2 className="text-lg font-semibold mb-2">Método de Pagamento</h2>
            <p>{selectedPaymentOption || "Não informado"}</p>
          </div>

          <div className="text-gray-700">
            <h2 className="text-lg font-semibold mb-2">Itens do Pedido</h2>
            <ul className="list-disc pl-5 space-y-1">
              {[...appetizerOrder].map((item) => (
                <li key={item.id}>
                  {item.title} — R$ {item.value.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-gray-700 font-medium text-lg">
            <p>Total de Itens: {totalItems}</p>
            <p>Valor Total: R$ {totalValue.toFixed(2)}</p>
          </div>
          </div>
      </section>
    </main>
  )
}
