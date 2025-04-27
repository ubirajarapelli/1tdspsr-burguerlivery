export type Burguer = {
    id: number
    image: Array<string>
    title: string
    description: string
    values: {
      single: number
      combo: number | null
    }
  }
  
  export type BurguerList = Burguer[]
  
  