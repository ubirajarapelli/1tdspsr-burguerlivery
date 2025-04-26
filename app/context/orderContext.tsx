"use client"
import { createContext, useEffect, useState } from "react"

interface OrderProviderProps {
  children: React.ReactNode
}

const OrderContext = createContext<unknown>({})

// Provedor de contexto
// O Provedor de contexto é um componente que envolve a aplicação e fornece o contexto para todos os componentes filhos
export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [appetizerOrder, setAppetizerOrder] = useState<number[]>([])
  const [hamburgerOrder, setHamburgerOrder] = useState<number[]>([])
  const [bevarageOrder, setBevarageOrder] = useState<number[]>([])

  const [totalItems, setSetTotalItems] = useState<number>(0)

  useEffect(() => {
    setSetTotalItems(
      appetizerOrder.length + bevarageOrder.length
    )
  }, [appetizerOrder, bevarageOrder])

  return (
    <OrderContext.Provider
      value={{
        bevarageOrder,
        setBevarageOrder,
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
