export type Burguer = {
    id: number
    image: string
    title: string
    description: string
    values: {
        single: number
        combo: number
    }

}

export type BurguerList = Burguer[]