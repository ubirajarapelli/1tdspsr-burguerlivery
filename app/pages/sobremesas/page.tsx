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
import { Desserts, DessertsList } from "@/app/types/desserts";

export default function Desserts() {
  const baseURL = "https://burgerlivery-api.vercel.app";

  const { dessertsOrder, setDessertsOrder } =
    useContext<unknown>(OrderContext);

  const [desserts, setDesserts] = useState<DessertsList>([]);
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

    const selectedDesserts = desserts.find(
      (desserts) => desserts.id === id
    );

    const sendToCart = {
      id: selectedDesserts?.id,
      title: selectedDesserts?.title,
      image: selectedDesserts?.image,
      value: productValue,
    };
    console.log(selectedDesserts);
    setDessertsOrder([...dessertsOrder, sendToCart]);
    setProductValue(0);
  };

  const getDesserts = async () => {
    try {
      const response = await axios.get(`${baseURL}/desserts`);
      setDesserts(response.data);
    } catch (error) {
      console.error("Error fetching desserts:", error);
    }
  };

  useEffect(() => {
    getDesserts();
  }, []);

  return (
    <section className="container mx-auto h-screen">
      <h1 className="text-4xl text-gray-700 font-bold mb-6">Entradas</h1>
      <div className="flex gap-4">
        {desserts.map((desserts: Desserts) => (
          <ProductCard key={desserts.id}>
            <ProductCardHeader>
              <ProductCardImage
                src={desserts.image}
                alt={desserts.title}
                width={120}
                height={120}
              />
              <ProductCardTitle>{desserts.title}</ProductCardTitle>
              <ProductCardDescription>
                {desserts.description}
              </ProductCardDescription>
            </ProductCardHeader>
            <ProductCardAction>
              {desserts.value? (
                <>
                  <ProductRadioButtom
                    id={`${desserts.id}-${desserts.value}`}
                    label="Valor"
                    name={desserts.title}
                    onChange={handleChange}
                    value={desserts.value}
                  />
                </>
              ) : (
                <ProductRadioButtom
                  id={`${desserts.id}-${desserts.value}`}
                  name={desserts.title}
                  label="10 unidades"
                  onChange={handleChange}
                  value={desserts.value}
                />
              )}
              <FormButton onClick={() => handleClick(desserts.id)}>
                Adicionar
              </FormButton>
            </ProductCardAction>
          </ProductCard>
        ))}
      </div>
    </section>
  );
}