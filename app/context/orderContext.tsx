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
  const [dessertOrder, setDessertOrder] = useState<number[]>([])
  const [beverageOrder, setbeverageOrder] = useState<number[]>([])

  const [totalItems, setSetTotalItems] = useState<number>(0)

useEffect(() => {const total = appetizerOrder.length + dessertOrder.length + beverageOrder.length + hamburgerOrder.length
   setSetTotalItems(total)}, [appetizerOrder, hamburgerOrder, dessertOrder, beverageOrder])

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
        setbeverageOrder,
        totalItems,
        setSetTotalItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext
