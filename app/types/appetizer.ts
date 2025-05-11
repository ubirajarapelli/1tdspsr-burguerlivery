export type Appetizer = {
  id: number
  image: string
  title: string
  description: string
  values: {
    small: number
    large: number | null
  }
}

export type AppetizerList = Appetizer[]
// export type AppetizerList = Array<Appetizer>
