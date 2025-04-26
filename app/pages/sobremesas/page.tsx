"use client"

import { useContext, useEffect, useState } from "react"
import axios from "axios"
import OrderContext from "@/app/context/orderContext"
import {
  FormButton,
  ProductCard,
  ProductCardAction,
  ProductCardDescription,
  ProductCardHeader,
  ProductCardImage,
  ProductCardTitle,
  ProductRadioButtom,
} from "@/app/components"
import { Dessert, DessertList } from "@/app/types/dessert"

export default function Desserts() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { dessertOrder, setDessertOrder } =
    useContext<any>(OrderContext)

  const [desserts, setDesserts] = useState<DessertList>([])
  const [productValue, setProductValue] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductValue(Number(event.target.value))
  }

  const handleClick = (id: number) => {
    if (productValue === 0) {
      alert("Selecione uma opção antes de adicionar.")
      return
    }

    const selected = desserts.find(dessert => dessert.id === id)

    const sendToCart = {
      id: selected?.id,
      title: selected?.title,
      image: selected?.image,
      value: productValue,
    }

    setDessertOrder([...dessertOrder, sendToCart])
    setProductValue(0)
  }

  const getDesserts = async () => {
    try {
      const response = await axios.get(`${baseURL}/desserts`)
      setDesserts(response.data)
    } catch (error) {
      console.error("Erro ao buscar sobremesas:", error)
    }
  }

  useEffect(() => {
    getDesserts()
  }, [])

  return (
    <section className="container mx-auto h-screen overflow-y-auto pb-10">
      <h1 className="text-4xl text-gray-700 font-bold mb-6">Sobremesas</h1>
      <div className="flex gap-4 flex-wrap">
        {desserts.map((dessert: Dessert) => (
          <ProductCard key={dessert.id}>
            <ProductCardHeader>
              <ProductCardImage
                src={dessert.image}
                alt={dessert.title}
                width={120}
                height={120}
              />
              <ProductCardTitle>{dessert.title}</ProductCardTitle>
              <ProductCardDescription>
                {dessert.description}
              </ProductCardDescription>
            </ProductCardHeader>
            <ProductCardAction>
              <ProductRadioButtom
                id={`${dessert.id}-${dessert.value}`}
                name={dessert.title}
                label={`R$ ${dessert.value.toFixed(2)}`}
                onChange={handleChange}
                value={dessert.value}
              />
              <FormButton onClick={() => handleClick(dessert.id)}>
                Adicionar
              </FormButton>
            </ProductCardAction>
          </ProductCard>
        ))}
      </div>
    </section>
  )
}
