"use client"
import { createContext, useEffect, useMemo, useState } from "react"

interface ProductOrderProps {
  id: number
  title: string
  image: string
  value: number
}

interface AddressProps {
  cep: string,
  city: string,
  neighborhood: string,
  street: string
  number?: string
  complement?: string
}

export interface OrderContextValue {
  appetizerOrder: ProductOrderProps[]
  setAppetizerOrder: React.Dispatch<React.SetStateAction<ProductOrderProps[]>>
  hamburgerOrder: ProductOrderProps[]
  setHamburgerOrder: React.Dispatch<React.SetStateAction<ProductOrderProps[]>>
  totalItems: number
  setTotalItems: React.Dispatch<React.SetStateAction<number>>
  totalValue: number

  address: AddressProps | null
  setAddress: React.Dispatch<React.SetStateAction<AddressProps | null>>
  selectedPaymentOption: string | null
  setSelectedPaymentOption: React.Dispatch<React.SetStateAction<string>>
}

interface OrderProviderProps {
  children: React.ReactNode
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined)

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [appetizerOrder, setAppetizerOrder] = useState<ProductOrderProps[]>([])
  const [hamburgerOrder, setHamburgerOrder] = useState<ProductOrderProps[]>([])

  const [totalItems, setTotalItems] = useState<number>(0)
  const [address, setAddress] = useState<AddressProps | null>(null)
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<string>("")

  useEffect(() => {
    setTotalItems(appetizerOrder.length)
  }, [appetizerOrder])

  useEffect(() => {
    setTotalItems(hamburgerOrder.length)
  }, [hamburgerOrder])

  const totalValue = useMemo(() => {
    const sumValues = (items: ProductOrderProps[]) =>
      items.reduce(
        (sum: number, item: { value: number }) => sum + item.value,
        0
      )

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
        setTotalItems,
        address,
        setAddress,
        selectedPaymentOption,
        setSelectedPaymentOption
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext
