export type OrderContextType = {
    appetizerOrder: Array<{
      id?: number;
      title?: string;
      image?: string | string[];
      value: number;
    }>;
    setAppetizerOrder: React.Dispatch<React.SetStateAction<Array<{
      id?: number;
      title?: string;
      image?: string | string[];
      value: number;
    }>>>;
    hamburgerOrder: Array<{
      id?: number;
      title?: string;
      image?: string | string[];
      value: number;
    }>;
    setHamburgerOrder: React.Dispatch<React.SetStateAction<Array<{
      id?: number;
      title?: string;
      image?: string | string[];
      value: number;
    }>>>;
    totalItems: number;
    setSetTotalItems: React.Dispatch<React.SetStateAction<number>>;
  }
  