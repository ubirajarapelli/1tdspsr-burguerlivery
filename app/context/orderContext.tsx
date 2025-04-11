"use client"
import { createContext, useState } from "react"

interface OrderProviderProps {
  children: React.ReactNode
}

const OrderContext = createContext<unknown>({})

// Provedor de contexto
// O Provedor de contexto é um componente que envolve a aplicação e fornece o contexto para todos os componentes filhos
export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [appetizerOrder, setAppetizerOrder] = useState<number[]>([])
  const [hamburgerOrder, setHamburgerOrder] = useState<number[]>([])

  return (
    <OrderContext.Provider
      value={{
        appetizerOrder,
        setAppetizerOrder,
        hamburgerOrder,
        setHamburgerOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext
