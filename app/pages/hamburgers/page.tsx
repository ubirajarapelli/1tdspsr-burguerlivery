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
import { Hamburgers, HamburgersList } from "@/app/types/hamburgers";

export default function Hamburgers() {
  const baseURL = "https://burgerlivery-api.vercel.app";

  const { hamburgersOrder, setHamburgersOrder } =
    useContext<unknown>(OrderContext);

  const [hamburgers, setHamburgers] = useState<HamburgersList>([]);
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

    const selectedHamburgers = hamburgers.find(
      (hamburgers) => hamburgers.id === id
    );

    const sendToCart = {
      id: selectedHamburgers?.id,
      title: selectedHamburgers?.title,
      image: selectedHamburgers?.image,
      value: productValue,
    };
    console.log(selectedHamburgers);
    setHamburgersOrder([...hamburgersOrder, sendToCart]);
    setProductValue(0);
  };

  const getHamburgers = async () => {
    try {
      const response = await axios.get(`${baseURL}/hamburgers`);
      setHamburgers(response.data);
    } catch (error) {
      console.error("Error fetching hamburgers:", error);
    }
  };

  useEffect(() => {
    getHamburgers();
  }, []);

  return (
    <section className="container mx-auto h-screen">
      <h1 className="text-4xl text-gray-700 font-bold mb-6">Hamburgers</h1>
      <div className="flex gap-8">
        {hamburgers.map((hamburgers: Hamburgers) => (
          <ProductCard key={hamburgers.id}>
            <ProductCardHeader>
              <ProductCardImage
                src={hamburgers.image}
                alt={hamburgers.title}
                width={120}
                height={120}
              />
              <ProductCardTitle>{hamburgers.title}</ProductCardTitle>
              <ProductCardDescription>
                {hamburgers.description}
              </ProductCardDescription>
            </ProductCardHeader>
            <ProductCardAction>
              {hamburgers.values.combo ? (
                <>
                  <ProductRadioButtom
                    id={`${hamburgers.id}-${hamburgers.values.single}`}
                    label="Pequeno"
                    name={hamburgers.title}
                    onChange={handleChange}
                    value={hamburgers.values.single}
                  />

                  <ProductRadioButtom
                    id={`${hamburgers.id}-${hamburgers.values.combo}`}
                    label="Grande"
                    name={hamburgers.title}
                    onChange={handleChange}
                    value={hamburgers.values.combo}
                  />
                </>
              ) : (
                <ProductRadioButtom
                  id={`${hamburgers.id}-${hamburgers.values.single}`}
                  name={hamburgers.title}
                  label="10 unidades"
                  onChange={handleChange}
                  value={hamburgers.values.single}
                />
              )}
              <FormButton onClick={() => handleClick(hamburgers.id)}>
                Adicionar
              </FormButton>
            </ProductCardAction>
          </ProductCard>
        ))}
      </div>
    </section>
  );
}
