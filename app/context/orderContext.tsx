"use client"
import { createContext, useEffect, useState } from "react"
import { OrderContextType } from "../types/order-context"

interface OrderProviderProps {
  children: React.ReactNode
}

interface OrderItem {
  id?: number
  title?: string
  image?: string | string[]
  value: number
}

const OrderContext = createContext<OrderContextType>({} as OrderContextType)

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [appetizerOrder, setAppetizerOrder] = useState<OrderItem[]>([])
  const [hamburgerOrder, setHamburgerOrder] = useState<OrderItem[]>([])
  const [beverageOrder, setBeverageOrder] = useState<OrderItem[]>([])
  const [dessertOrder, setDessertOrder] = useState<OrderItem[]>([])

  const [totalItems, setSetTotalItems] = useState<number>(0)

  useEffect(() => {
    setSetTotalItems(appetizerOrder.length + hamburgerOrder.length + beverageOrder.length + dessertOrder.length)
  }, [appetizerOrder, hamburgerOrder, beverageOrder, dessertOrder])

  return (
    <OrderContext.Provider
      value={{
        appetizerOrder,
        setAppetizerOrder,
        hamburgerOrder,
        setHamburgerOrder,
        beverageOrder,
        setBeverageOrder,
        dessertOrder,
        setDessertOrder,
        totalItems,
        setSetTotalItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext
