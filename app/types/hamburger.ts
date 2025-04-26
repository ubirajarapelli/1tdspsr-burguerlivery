export type Hamburguer= {
    id: number,
    image: Array<string>
    title: string,
    description: string
    values: {
      single: number,
      combo: number,
    }
}

export type HamburguerList = Hamburguer[]