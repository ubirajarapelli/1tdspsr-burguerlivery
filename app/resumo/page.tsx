"use client"
import Image from "next/image"
import { useContext } from "react"
import OrderContext, { OrderProviderProps } from "../context/orderContext"
import { formatCurrency } from "../utils"
import { Trash2 } from "lucide-react"

export default function Resumo() {
  const { totalValue, totalItems, appetizerOrder, setAppetizerOrder } =
    useContext<OrderProviderProps>(OrderContext)

  const handleDelete = (id: number) => {
    const newAppetizer = appetizerOrder.filter(
      (appetizer) => appetizer.id !== id
    )

    setAppetizerOrder(newAppetizer)
  }

  return (
    <section className="container mx-auto h-screen">
      <h1 className="text-4xl text-gray-700 font-bold mb-6">
        Resumo do pedido
      </h1>
      <p className="text-2xl text-gray-700 font-bold">
        Quantidade de itens {totalItems}
      </p>

      <div>
        <h2 className="text-2xl text-gray-700 font-bold">Entradas</h2>
        {appetizerOrder.map((appetizer) => (
          <div key={appetizer.id}>
            <Image
              src={appetizer.image}
              alt={appetizer.title}
              width={60}
              height={60}
            />
            <p>{appetizer.title}</p>
            <p>{formatCurrency(appetizer.value)}</p>

            <button
              type="button"
              aria-label="excluir"
              onClick={() => handleDelete(appetizer.id)}
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>
      <p>{formatCurrency(totalValue)}</p>
    </section>
  )
}
