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
import { desserts, dessertsList } from "@/app/types/desserts"


export default function Desserts() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { dessertsOrder, setDessertsOrder }:any = useContext<unknown>(OrderContext)
  const [ productValue, setProductValue ] = useState<number>(0)
  const [ desserts, setdesserts ] = useState<dessertsList>([])



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setProductValue(Number(value))
  }

  const handleClick = (id: number) => {
    if (productValue === 0) {
      alert("Por gentileza, selecione um valor")
      return 
    }

    const selectdesserts = desserts.find((desserts) => desserts.id === id) 

    const sendToCart = {
      id: selectdesserts?.id,
      title: selectdesserts?.title,
      image: selectdesserts?.image,
      value: productValue,
    }

    setDessertsOrder([...dessertsOrder, sendToCart])
    setProductValue(0)

  }

  const getDesserts = async () => {
    try {
      const response = await axios.get(`${baseURL}/desserts`)
      setdesserts(response.data)
    } catch (error) {
      console.error("Error fetching dessertss:", error)
    }
  }

  useEffect(() => {
    getDesserts()
  }, [])


  return (
        <section className="container mx-auto h-screen">
          <h1 className="text-4xl text-gray-700 font-bold mb-6">Hamburguers</h1>
          <div className="flex gap-4">
            {desserts.map((desserts: desserts) => (
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
                  <ProductRadioButtom
                    id={`${desserts.id}-${desserts.value}`}
                    label={desserts.description}
                    name={desserts.title}
                    onChange={handleChange}
                    value={desserts.value}/>
                  <FormButton onClick={() => handleClick(desserts.id)}>
                    Adicionar
                  </FormButton>
                </ProductCardAction>
              </ProductCard>
            ))}
          </div>
        </section>
  )
}