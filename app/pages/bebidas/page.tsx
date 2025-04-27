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
import { beverages_desserts, beverages_dessertsList } from "@/app/types/beverages-desserts"


export default function Beverages() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { beveragesOrder, setBeveragesOrder } :any =
    useContext<unknown>(OrderContext)

  const [beverages, setbeverages] = useState<beverages_dessertsList>([])
  const [productValue, setProductValue] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setProductValue(Number(value))
  }

  const handleClick = (id: number) => {
    if (productValue === 0) {
      alert("Por gentileza, selecione um valor")
      return
    }

    const selectedBeverages = beverages.find(
      (beverages) => beverages.id === id
    )

    const sendToCart = {
      id: selectedBeverages?.id,
      title: selectedBeverages?.title,
      image: selectedBeverages?.image,
      value: productValue,
    }

    setBeveragesOrder([...beveragesOrder, sendToCart])
    setProductValue(0)
  }

  const getBeverages = async () => {
    try {
      const response = await axios.get(`${baseURL}/beverages`)
      setbeverages(response.data)
    } catch (error) {
      console.error("Error fetching beverages:", error)
    }
  }

  useEffect(() => {
    getBeverages()
  }, [])

  return (
    <section className="container mx-auto">
      <h1 className="text-4xl text-gray-700 font-bold mb-6">Bebidas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {beverages.map((beverages: beverages_desserts) => (
          <ProductCard key={beverages.id}>
            <ProductCardHeader>
              <ProductCardImage
                src={beverages.image}
                alt={beverages.title}
                width={120}
                height={120}
              />
            <ProductCardTitle>{beverages.title}</ProductCardTitle>
              <ProductCardDescription>
                {beverages.description}
              </ProductCardDescription>
            </ProductCardHeader>
          <ProductCardAction>
            <ProductRadioButtom
              id={`${beverages.id}-${beverages.value}`}
              name={beverages.title}
              label={beverages.title}
              onChange={handleChange}
              value={beverages.value}
            />
            <FormButton onClick={() => handleClick(beverages.id)}>
              Adicionar
            </FormButton>
          </ProductCardAction>
        </ProductCard>
      ))}
  </div>
</section>

  )
}
