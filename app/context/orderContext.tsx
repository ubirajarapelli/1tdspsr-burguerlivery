"use client"
import { createContext, useEffect, useState } from "react"
import { OrderContextType, OrderItem } from "@/app/types/orderContext"

interface OrderProviderProps {
  children: React.ReactNode
}

// Cria o contexto
const OrderContext = createContext<OrderContextType | null>(null)

// Provedor de contexto
// O Provedor de contexto é um componente que envolve a aplicação
// e fornece o contexto para todos os componentes filhos
export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [appetizerOrder, setAppetizerOrder] = useState<OrderItem[]>([])
  const [hamburgerOrder, setHamburgerOrder] = useState<OrderItem[]>([])
  const [dessertOrder, setDessertOrder] = useState<OrderItem[]>([])
  const [beverageOrder, setBeverageOrder] = useState<OrderItem[]>([])

  const [totalItems, setSetTotalItems] = useState<number>(0)

  // Atualiza o total de itens sempre que algum pedido muda
  useEffect(() => {
    const total =
      appetizerOrder.length +
      hamburgerOrder.length +
      dessertOrder.length +
      beverageOrder.length
    setSetTotalItems(total)
  }, [appetizerOrder, hamburgerOrder, dessertOrder, beverageOrder])

  return (
    <OrderContext.Provider
      value={{
        appetizerOrder,
        setAppetizerOrder,
        hamburgerOrder,
        setHamburgerOrder,
        dessertOrder,
        setDessertOrder,
        beverageOrder,
        setBeverageOrder,
        totalItems,
        setSetTotalItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext
