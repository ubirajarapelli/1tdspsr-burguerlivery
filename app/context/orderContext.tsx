"use client";
import { createContext, useEffect, useState } from "react";

interface OrderProviderProps {
  children: React.ReactNode;
}

const OrderContext = createContext<unknown>({});

// Provedor de contexto
// O Provedor de contexto é um componente que envolve a aplicação e fornece o contexto para todos os componentes filhos
export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [appetizerOrder, setAppetizerOrder] = useState<number[]>([]);
  const [hamburgerOrder, setHamburgerOrder] = useState<number[]>([]);
  const [beverageOrder, setBeverageOrder] = useState<number[]>([]);

  const [totalItems, setSetTotalItems] = useState<number>(0);

  useEffect(() => {
    setSetTotalItems(
      appetizerOrder.length + hamburgerOrder.length + beverageOrder.length
    );
  }, [appetizerOrder, hamburgerOrder, beverageOrder]);

  return (
    <OrderContext.Provider
      value={{
        appetizerOrder,
        setAppetizerOrder,
        hamburgerOrder,
        setHamburgerOrder,
        beverageOrder,
        setBeverageOrder,
        totalItems,
        setSetTotalItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
