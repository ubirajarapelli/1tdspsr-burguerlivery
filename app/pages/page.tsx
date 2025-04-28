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
import { Dessert, DessertList } from "@/app/types/beverage";

export default function Desserts() {
  const baseURL = "https://burgerlivery-api.vercel.app";

  const { beverageOrder, setDessertOrder } = useContext<unknown>(OrderContext);

  const [beverages, setDesserts] = useState<DessertList>([]);
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

    const selectedDessert = beverages.find((beverage) => beverage.id === id);

    const sendToCart = {
      id: selectedDessert?.id,
      title: selectedDessert?.title,
      image: selectedDessert?.image,
      value: productValue,
    };

    setDessertOrder([...beverageOrder, sendToCart]);
    setProductValue(0);
  };

  const getDesserts = async () => {
    try {
      const response = await axios.get(`${baseURL}/beverages`);
      setDesserts(response.data);
    } catch (error) {
      console.error("Error fetching beverages:", error);
    }
  };

  useEffect(() => {
    getBeverages();
  }, []);

  return (
    <section className="container mx-auto h-screen">
      <h1 className="text-4xl text-gray-700 font-bold mb-6">Entradas</h1>
      <div className="flex gap-4">
        {beverages.map((beverage: Beverage) => (
          <ProductCard key={beverage.id}>
            <ProductCardHeader>
              <ProductCardImage
                src={beverage.image}
                alt={beverage.title}
                width={120}
                height={120}
              />
              <ProductCardTitle>{beverage.title}</ProductCardTitle>
              <ProductCardDescription>
                {beverage.description}
              </ProductCardDescription>
            </ProductCardHeader>
            <ProductCardAction>
              <ProductRadioButtom
                id={`${beverage.id}-${beverage.value}`}
                name={beverage.title}
                label={beverage.description}
                onChange={handleChange}
                value={beverage.value}
              />
              <FormButton onClick={() => handleClick(beverage.id)}>
                Adicionar
              </FormButton>
            </ProductCardAction>
          </ProductCard>
        ))}
      </div>
    </section>
  );
}
