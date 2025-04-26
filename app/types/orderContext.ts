export type OrderItem = {
    id: number
    title: string
    image: string
    value: number
  }
  
  export interface OrderContextType {
    appetizerOrder: OrderItem[]
    setAppetizerOrder: React.Dispatch<React.SetStateAction<OrderItem[]>>
  
    hamburgerOrder: OrderItem[]
    setHamburgerOrder: React.Dispatch<React.SetStateAction<OrderItem[]>>
  
    dessertOrder: OrderItem[]
    setDessertOrder: React.Dispatch<React.SetStateAction<OrderItem[]>>
  
    beverageOrder: OrderItem[]
    setBeverageOrder: React.Dispatch<React.SetStateAction<OrderItem[]>>
  
    totalItems: number
    setSetTotalItems: React.Dispatch<React.SetStateAction<number>>
  }
  