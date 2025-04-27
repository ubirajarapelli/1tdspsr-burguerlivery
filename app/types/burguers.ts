export type Burguer = {
    id: number
    image: Array<string>
    title: string
    description: string
    values: {
        small: any
        large: any
        single: number
        combo: number
    }
}

export type BurguerList = Burguer[]