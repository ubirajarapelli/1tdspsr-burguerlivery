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
import { OrderContextType } from "@/app/types/order-context"

export default function Desserts() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { dessertOrder, setDessertOrder } =
    useContext<OrderContextType>(OrderContext)

  const [desserts, setDesserts] = useState<DessertList>([])
  const [productValue, setProductValue] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setProductValue(Number(value))
  }

  const handleClick = (id: number) => {
    if (productValue === 0) {
      return
    }

    const selectedDessert = desserts.find(
      (dessert) => dessert.id === id
    )

    const sendToCart = {
      id: selectedDessert?.id,
      title: selectedDessert?.title,
      image: selectedDessert?.image,
      value: productValue || selectedDessert?.value || 0,
    }

    setDessertOrder([...dessertOrder, sendToCart])
    setProductValue(0)
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
      <h1 className="text-4xl text-gray-700 font-bold mb-6">Sobremesas</h1>
      <div className="flex gap-4 flex-wrap">
        {desserts.map((dessert: Dessert) => (
          <ProductCard key={dessert.id} className="w-[calc(25%-1rem)]">
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
                label="Padrão"
                name={dessert.title}
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
