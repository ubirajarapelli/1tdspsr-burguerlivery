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
  const [bebidasOrder, setBebidassOrder] =  useState<number[]>([])
  const [sobremesasOrder, setSobremesasOrder] = useState<number[]>([])
  const [totalItems, setSetTotalItems] = useState<number>(0)

  useEffect(() => {
    setSetTotalItems(appetizerOrder.length)
  }, [appetizerOrder])

  useEffect(() => {
    setSetTotalItems(hamburgerOrder.length)
  }, [hamburgerOrder])

  useEffect(()=> {
    setSetTotalItems(bebidasOrder.length)
  }, [bebidasOrder])

  useEffect(()=> {
    setSetTotalItems(sobremesasOrder.length)
  }, [sobremesasOrder])

  return (
    <OrderContext.Provider
      value={{
        appetizerOrder,
        setAppetizerOrder,
        hamburgerOrder,
        setHamburgerOrder,
        bebidasOrder,
        setBebidassOrder,
        sobremesasOrder,
        setSobremesasOrder,
        totalItems,
        setSetTotalItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext
