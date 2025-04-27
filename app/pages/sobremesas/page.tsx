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
} from "@/app/components"
import { Dessert, DessertList } from "@/app/types/dessert"

export default function Desserts() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { dessertOrder, setDessertOrder } =
  useContext<unknown>(OrderContext)

  const [desserts, setDesserts] = useState<DessertList>([])

  const handleClick = (id: number) => {

    const selectedDessert = desserts.find(
      (dessert) => dessert.id === id
    )

    const sendToCart = {
      id: selectedDessert?.id,
      title: selectedDessert?.title,
      image: selectedDessert?.image,
      description: selectedDessert?.description,
      value: selectedDessert?.values,
    }

    setDessertOrder([...dessertOrder, sendToCart])
  }

  const getDesserts = async () => {
    try {
      const response = await axios.get(`${baseURL}/desserts`)
      setDesserts(response.data)
    } catch (error) {
      console.error("Error fetching desserts:", error)
    }
  }

  useEffect(() => {
    getDesserts()
  }, [])

  return (
    <section className="container mx-auto h-screen">
      <h1 className="text-4xl text-gray-700 font-bold mb-6">Sobremesa</h1>
      <div className="flex gap-4">
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
              {dessert.values}
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
