"use client";
import { createContext, useEffect, useState } from "react";

interface OrderProviderProps {
  children: React.ReactNode;
}

const OrderContext = createContext<unknown>({});

// Provedor de contexto
// O Provedor de contexto é um componente que envolve a aplicação e fornece o contexto para todos os componentes filhos
export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [beveragesOrder, setBeveragesOrder] = useState<number[]>([]);
  const [appetizerOrder, setAppetizerOrder] = useState<number[]>([]);
  const [hamburgerOrder, setHamburgerOrder] = useState<number[]>([]);
  const [dessertsOrder, setDessertsOrder] = useState<number[]>([]);
  const [totalItems, setSetTotalItems] = useState<number>(0);

  useEffect(() => {
    setSetTotalItems(dessertsOrder.length + beveragesOrder.length + appetizerOrder.length + hamburgerOrder.length);
  }, [appetizerOrder, hamburgerOrder, beveragesOrder, dessertsOrder]);

  return (
    <OrderContext.Provider
      value={{
        dessertsOrder,
        setDessertsOrder,
        beveragesOrder,
        setBeveragesOrder,
        appetizerOrder,
        setAppetizerOrder,
        hamburgerOrder,
        setHamburgerOrder,
        totalItems,
        setSetTotalItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
