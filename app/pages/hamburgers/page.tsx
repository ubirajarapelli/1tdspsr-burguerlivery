"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import OrderContext from "@/app/context/orderContext";
import {
  FormButton,
  ProductCard,
  ProductCardAction,
  ProductCardDescription,
  ProductCardHeader,
  ProductCardImage,
  ProductCardTitle,
  ProductRadioButtom,
} from "@/app/components";
import { Burger, BurgerList } from "@/app/types/burger";

export default function Burger() {
  const baseURL = "https://burgerlivery-api.vercel.app";

  const { burgerOrder, setBurgerOrder } = useContext<unknown>(OrderContext);

  const [burgers, setBurgers] = useState<BurgerList>([]);
  const [productValue, setProductValue] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setProductValue(Number(value));
  };

  const handleClick = (id: number) => {
    if (productValue === 0) {
      // alert("Selecione um valor")
      return;
    }

    const selectedBurger = burgers.find((burger) => burger.id === id);

    const sendToCart = {
      id: selectedBurger?.id,
      title: selectedBurger?.title,
      image: selectedBurger?.image,
      value: productValue,
    };

    setBurgerOrder([...burgerOrder, sendToCart]);
    setProductValue(0);
  };

  const getBurgers = async () => {
    try {
      const response = await axios.get(`${baseURL}/burgers`);
      setBurgers(response.data);
    } catch (error) {
      console.error("Error fetching burgers:", error);
    }
  };

  useEffect(() => {
    getBurgers();
  }, []);

  return (
    <section className="container mx-auto h-screen">
      <h1 className="text-4xl text-gray-700 font-bold mb-6">Burgers</h1>
      <div className="flex gap-4">
        {burgers.map((burger: Burger) => (
          <ProductCard key={burger.id}>
            <ProductCardHeader>
              <ProductCardImage
                src={burger.image}
                alt={burger.title}
                width={120}
                height={120}
              />
              <ProductCardTitle>{burger.title}</ProductCardTitle>
              <ProductCardDescription>
                {burger.description}
              </ProductCardDescription>
            </ProductCardHeader>
            <ProductCardAction>
              {burger.values.large ? (
                <>
                  <ProductRadioButtom
                    id={`${burger.id}-${burger.values.small}`}
                    label="Pequeno"
                    name={burger.title}
                    onChange={handleChange}
                    value={burger.values.small}
                  />

                  <ProductRadioButtom
                    id={`${burger.id}-${burger.values.large}`}
                    label="Grande"
                    name={burger.title}
                    onChange={handleChange}
                    value={burger.values.large}
                  />
                </>
              ) : (
                <ProductRadioButtom
                  id={`${burger.id}-${burger.values.small}`}
                  name={burger.title}
                  label="10 unidades"
                  onChange={handleChange}
                  value={burger.values.small}
                />
              )}
              <FormButton onClick={() => handleClick(burger.id)}>
                Adicionar
              </FormButton>
            </ProductCardAction>
          </ProductCard>
        ))}
      </div>
    </section>
  );
}
