"use client"
import { createContext, useEffect, useMemo, useState } from "react"

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
  totalValue: number
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
  // const [totalValue, setTotalValue] = useState<number>(0)

  useEffect(() => {
    setSetTotalItems(appetizerOrder.length)
  }, [appetizerOrder])

  // useEffect(() => {
  //   const total = appetizerOrder.reduce(
  //     (soma, appetizer) => soma + appetizer.value,
  //     0
  //   )
  //   setTotalValue(total)
  // }, [appetizerOrder])

  // const totalValue = useMemo(() => {
  //   const total = appetizerOrder.reduce(
  //     (soma, appetizer) => soma + appetizer.value,
  //     0
  //   )
  //   return total
  // }, [appetizerOrder])

  const totalValue = useMemo(() => {
    const sumValues = (items: any) =>
      items.reduce((sum, item) => sum + item.value, 0)

    return sumValues(appetizerOrder) + sumValues(hamburgerOrder)
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
        setSetTotalItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext
