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
import { Hamburger, HamburgerList } from "@/app/types/hamburger"

export default function Hamburgers() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const {hamburgerOrder, setHamburgerOrder} =
    useContext<unknown>(OrderContext)

  const [hamburgers, setHamburgers] = useState<HamburgerList>([])
  const [productValue, setProductValue] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setProductValue(Number(value))
  }

  const handleClick = (id: number) => {
    if (productValue === 0) {
      return
    }

    const selectedApperizer = hamburgers.find(
      (hamburger) => hamburger.id === id
    )

    const sendToCart = {
      id: selectedApperizer?.id,
      title: selectedApperizer?.title,
      image: selectedApperizer?.image,
      value: productValue,
    }

    setHamburgerOrder([...hamburgerOrder, sendToCart])
    setProductValue(0)
  }

  const getAppetizers = async () => {
    try {
      const response = await axios.get(`${baseURL}/hamburgers`)
      setHamburgers(response.data)
    } catch (error) {
      console.error("Error fetching appetizers:", error)
    }
  }

  useEffect(() => {
    getAppetizers()
  }, [])

  return (
    <section className="container mx-auto h-screen">
      <h1 className="text-4xl text-gray-700 font-bold mb-6">Entradas</h1>
      <div className="flex gap-4">
        {hamburgers.map((hamburger: Hamburger) => (
          <ProductCard key={hamburger.id}>
            <ProductCardHeader>
              <ProductCardImage
                src={hamburger.image[0]}
                alt={hamburger.title}
                width={120}
                height={120}
              />
              <ProductCardTitle>{hamburger.title}</ProductCardTitle>
              <ProductCardDescription>
                {hamburger.description}
              </ProductCardDescription>
            </ProductCardHeader>
            <ProductCardAction>
                  <ProductRadioButtom
                    id={`${hamburger.id}-${hamburger.values.single}`}
                    label="Apenas lanche"
                    name={hamburger.title}
                    onChange={handleChange}
                    value={hamburger.values.single}
                  />
                  <ProductRadioButtom
                    id={`${hamburger.id}-${hamburger.values.combo}`}
                    label="Combo"
                    name={hamburger.title}
                    onChange={handleChange}
                    value={hamburger.values.combo}
                  />
              <FormButton onClick={() => handleClick(hamburger.id)}>
                Adicionar
              </FormButton>
            </ProductCardAction>
          </ProductCard>
        ))}
      </div>
    </section>
  )
}
