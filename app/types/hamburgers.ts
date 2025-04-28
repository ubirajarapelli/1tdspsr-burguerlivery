export type Hamburger = { 
    id: number,
    image: Array<string>
    title: string,
    description: string
    values: {
      single: number,
      combo: number,
    }
}

export type HamburgerList = Hamburger[]
