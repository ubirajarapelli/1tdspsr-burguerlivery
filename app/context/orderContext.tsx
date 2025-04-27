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

  const [totalItems, setSetTotalItems] = useState<number>(0)

  useEffect(() => {
    setSetTotalItems(appetizerOrder.length + hamburgerOrder.length)
  }, [appetizerOrder, hamburgerOrder])

  return (
    <OrderContext.Provider
      value={{
        appetizerOrder,
        setAppetizerOrder,
        hamburgerOrder,
        setHamburgerOrder,
        totalItems,
        setSetTotalItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext
