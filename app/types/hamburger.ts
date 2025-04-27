export type Hamburger = {
  id: number;
  image: string[];
  title: string;
  description: string;
  values: {
    single: number;
    combo: number | null;
  };
};

export type HamburgerList = Hamburger[];
