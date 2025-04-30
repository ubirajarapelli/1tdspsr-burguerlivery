"use client"
import { createContext, useEffect, useState } from "react"

interface AppetizerOrderProps {
  id: number
  title: string
  image: string
  value: number
}

export interface OrderProviderProps {
  children: React.ReactNode
  appetizerOrder: AppetizerOrderProps[]
  setAppetizerOrder: React.Dispatch<React.SetStateAction<AppetizerOrderProps[]>>
  totalItems: number
  setSetTotalItems: React.Dispatch<React.SetStateAction<number>>
}

const OrderContext = createContext<OrderProviderProps | undefined>(undefined)

// Provedor de contexto
// O Provedor de contexto é um componente que envolve a aplicação e fornece o contexto para todos os componentes filhos
export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [appetizerOrder, setAppetizerOrder] = useState<AppetizerOrderProps[]>(
    []
  )
  const [hamburgerOrder, setHamburgerOrder] = useState<number[]>([])

  const [totalItems, setSetTotalItems] = useState<number>(0)

  useEffect(() => {
    setSetTotalItems(appetizerOrder.length)
  }, [appetizerOrder])

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
