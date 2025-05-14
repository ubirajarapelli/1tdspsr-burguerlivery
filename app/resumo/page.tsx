"use client"
import Image from "next/image"
import { useContext } from "react"
import OrderContext, { OrderContextValue } from "../context/orderContext"
import { formatCurrency } from "../utils"
import { Trash2 } from "lucide-react"
import Link from "next/link"

export default function Resumo() {
  const { totalValue, totalItems, appetizerOrder, setAppetizerOrder } =
    useContext(OrderContext) as OrderContextValue

  const handleDelete = (id: number) => {
    const newAppetizer = appetizerOrder.filter(
      (appetizer) => appetizer.id !== id
    )

    setAppetizerOrder(newAppetizer)
  }

  return (
    <>
      <section className="container mx-auto">
        <h1 className="text-4xl text-gray-700 font-bold mb-6">
          Resumo do pedido
        </h1>
        <p className="text-2xl text-gray-700 font-bold mb-2">
          Quantidade de itens {totalItems}
        </p>
        <div className="min-h-96">
          <div>
            <h2 className="text-2xl text-gray-700 font-bold mb-2">Entradas</h2>
            {appetizerOrder.map((appetizer) => (
              <div
                key={appetizer.id}
                className="my-4 p-6 bg-gray-50 border-gray-500 rounded-lg shadow-xs"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={appetizer.image}
                    alt={appetizer.title}
                    width={180}
                    height={180}
                    className="object-cover rounded-lg"
                  />
                  <div className="h-full flex flex-col justify-between grow">
                    <p className="text-xl text-gray-700 font-semibold mb-6">
                      {appetizer.title}
                    </p>
                    <p className="text-xl text-gray-700 font-bold mb-6">
                      {formatCurrency(appetizer.value)}
                    </p>
                  </div>
                  <button
                    className="p-4 self-center text-red-700 hover:text-red-500 hover:bg-gray-200 rounded-lg transition-colors duration-200 cursor-pointer"
                    type="button"
                    aria-label="excluir"
                    onClick={() => handleDelete(appetizer.id)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <p className="w-full text-2xl text-gray-700 text-right font-bold mb-6">
        Valor total {formatCurrency(totalValue)}
      </p>
      <div className="w-full flex justify-between items-center">
        <Link
          href="/pages/entradas"
          className="py-2 px-6 rounded-full bg-gray-300 text-gray-600 font-semibold border border-gray-400"
        >
          Continuar comprando
        </Link>
        <Link
          href="/checkout"
          className="py-2 px-6 rounded-full bg-amber-300 text-amber-600 font-semibold border border-amber-400"
        >
          Ir para o pagamento
        </Link>
      </div>
    </>
  )
}
