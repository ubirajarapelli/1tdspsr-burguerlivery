export type Dessert = {
    id: number
    image: string
    title: string
    description: string
    value: {
      small: number
      large: number | null
    }
  }
  
  export type DessertList = Dessert[]
 
  