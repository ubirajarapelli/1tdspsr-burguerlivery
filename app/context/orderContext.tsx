"use client"

import { createContext, useEffect, useState } from "react"

interface OrderProviderProps {
  children: React.ReactNode
}

interface OrderItem {
  id: number
  title: string
  image: string | string[]
  value: number
}


interface OrderContextType {
  appetizerOrder: OrderItem[]
  setAppetizerOrder: (items: OrderItem[]) => void
  hamburgerOrder: OrderItem[]
  setHamburgerOrder: (items: OrderItem[]) => void
  beverageOrder: OrderItem[]
  setBeverageOrder: (items: OrderItem[]) => void
  dessertOrder: OrderItem[]
  setDessertOrder: (items: OrderItem[]) => void
  totalItems: number
}

const OrderContext = createContext<OrderContextType>({} as OrderContextType)

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [appetizerOrder, setAppetizerOrder] = useState<OrderItem[]>([])
  const [hamburgerOrder, setHamburgerOrder] = useState<OrderItem[]>([])
  const [beverageOrder, setBeverageOrder] = useState<OrderItem[]>([])
  const [dessertOrder, setDessertOrder] = useState<OrderItem[]>([])
  const [totalItems, setTotalItems] = useState<number>(0)

  useEffect(() => {
    const total =
      appetizerOrder.length +
      hamburgerOrder.length +
      beverageOrder.length +
      dessertOrder.length

    setTotalItems(total)
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
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext
