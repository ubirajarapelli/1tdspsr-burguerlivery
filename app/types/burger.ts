export type Burger = {
  id: number;
  image: string;
  title: string;
  description: string;
  values: {
    small: number;
    large: number | null;
  };
};

export type BurgerList = Burger[];
// export type BurgerList = Array<Burger>
