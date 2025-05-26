"use client"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import OrderContext, { OrderContextValue } from "../context/orderContext"
import { formatCurrency } from "../utils"
import { Trash2 } from "lucide-react"
import Notification from "../components/notification/notification"
import { useRouter } from "next/navigation"

export default function Resumo() {
  const { totalValue, totalItems, appetizerOrder, setAppetizerOrder } =
    useContext(OrderContext) as OrderContextValue

  const router = useRouter()

  const [notificationType, setNotificationType] = useState({
    type: "",
    title: "",
    description: "",
  })
  const [showNotification, setShowNotification] = useState<boolean>(false)

  useEffect(() => {
    if (showNotification) {
      const timeout = setTimeout(() => {
        setShowNotification(false)
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [showNotification])

  const handleDelete = (id: number) => {
    const newAppetizer = appetizerOrder.filter(
      (appetizer) => appetizer.id !== id
    )
    setAppetizerOrder(newAppetizer)
  }

  const handleCheckout = () => {
    if (appetizerOrder.length === 0) {
      setNotificationType({
        type: "danger",
        title: "Carrinho vazio",
        description: "Por favor adicione algo para ir para o pagamento",
      })
      setShowNotification(true)
      return
    }

    setNotificationType({
      type: "success",
      title: "Tudo certo!",
      description: "Redirecionando para o pagamento...",
    })
    setShowNotification(true)

    setTimeout(() => {
      router.push("/checkout")
    }, 3000)
  }

  return (
    <>
      <div className="container mx-auto">
        {showNotification && (
          <Notification
            title={notificationType.title}
            type={notificationType.type as "success" | "danger"}
            description={notificationType.description}
            onClose={() => setShowNotification(false)}
          />
        )}

        <h1 className="text-4xl text-gray-700 font-bold mb-6">
          Resumo do pedido
        </h1>
        <p className="text-2xl text-gray-700 font-bold mb-2">
          Quantidade de itens {totalItems}
        </p>

        <div className="min-h-96">
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

        <p className="w-full text-2xl text-gray-700 text-right font-bold mb-6">
          Valor total {formatCurrency(totalValue)}
        </p>

        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => router.push("/pages/entradas")}
            className="py-2 px-6 rounded-full bg-gray-300 text-gray-600 font-semibold border border-gray-400 hover:bg-gray-400 hover:text-white transition"
          >
            Continuar comprando
          </button>
          <button
            onClick={handleCheckout}
            className="py-2 px-6 rounded-full bg-amber-300 text-amber-600 font-semibold border border-amber-400 hover:bg-amber-400 hover:text-white transition"
          >
            Ir para o pagamento
          </button>
        </div>
      </div>
    </>
  )
}
