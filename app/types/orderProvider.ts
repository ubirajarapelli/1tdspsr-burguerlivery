export interface AppetizerOrderProps {
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
