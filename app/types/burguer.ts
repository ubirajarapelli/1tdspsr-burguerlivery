export type Burguer = {
  id: number
  image: string
  title: string
  description: string
  values: {
    small: number
    large: number | null
  }
}

export type AppetizerList = Burguer[]
// export type AppetizerList = Array<Appetizer>
