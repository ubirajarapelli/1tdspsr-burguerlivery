"use client"
import { createContext, useEffect, useMemo, useState } from "react"

interface ProductOrderProps {
  id: number
  title: string
  image: string
  value: number
}

export interface OrderContextValue {
  appetizerOrder: ProductOrderProps[]
  setAppetizerOrder: React.Dispatch<React.SetStateAction<ProductOrderProps[]>>
  hamburgerOrder: ProductOrderProps[]
  setHamburgerOrder: React.Dispatch<React.SetStateAction<ProductOrderProps[]>>
  totalItems: number
  setTotalItems: React.Dispatch<React.SetStateAction<number>>
  totalValue: number
}

interface OrderProviderProps {
  children: React.ReactNode
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined)

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [appetizerOrder, setAppetizerOrder] = useState<ProductOrderProps[]>([])
  const [hamburgerOrder, setHamburgerOrder] = useState<ProductOrderProps[]>([])
  const [totalItems, setTotalItems] = useState<number>(0)

  useEffect(() => {
    const appetizerCount = appetizerOrder.length
    const hamburgerCount = hamburgerOrder.length
    setTotalItems(appetizerCount + hamburgerCount)
  }, [appetizerOrder, hamburgerOrder])

  const totalValue = useMemo(() => {
    const sum = (items: ProductOrderProps[]) =>
      items.reduce((acc, item) => acc + item.value, 0)

    return sum(appetizerOrder) + sum(hamburgerOrder)
  }, [appetizerOrder, hamburgerOrder])

  return (
    <OrderContext.Provider
      value={{
        totalValue,
        appetizerOrder,
        setAppetizerOrder,
        hamburgerOrder,
        setHamburgerOrder,
        totalItems,
        setTotalItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext

