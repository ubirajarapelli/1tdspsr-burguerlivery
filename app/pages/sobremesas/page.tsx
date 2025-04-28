"use client"

import { FormButton, ProductCard, ProductCardDescription, ProductCardHeader, ProductCardImage, ProductCardTitle, ProductCardValue } from "@/app/components"
import OrderContext from "@/app/context/orderContext"
import { DessertList, Desserts } from "@/app/types/desserts"
import axios from "axios"
import { useContext, useEffect, useState } from "react"

export default function Desserts() {
    const baseURL = "https://burgerlivery-api.vercel.app"
  
    const { dessertOrder, setDessertOrder } = useContext<unknown>(OrderContext)
  
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
        value: selectedDessert?.value,
      }
  
      setDessertOrder([...dessertOrder, sendToCart])
      setProductValue(0)
    }
  
    const getAppetizers = async () => {
      try {
        const response = await axios.get(`${baseURL}/desserts`)
        setDesserts(response.data)
      } catch (error) {
        console.error("Error fetching desserts:", error)
      }
    }
  
    useEffect(() => {
      getAppetizers()
    }, [])
  
    return (
      <section className="container mx-auto h-screen">
        <h1 className="text-4xl text-gray-700 font-bold mb-6">Sobremesas</h1>
        <div className="flex gap-4">
          {desserts.map((dessert: Desserts) => (
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
              <ProductCardValue id={`${dessert.id}-${dessert.value}`} value={dessert.value} onChange={handleChange}/>
              <FormButton onClick={() => handleClick(dessert.id)}>
                Adicionar
              </FormButton>
            </ProductCard>
          ))}
        </div>
      </section>
    )
  }