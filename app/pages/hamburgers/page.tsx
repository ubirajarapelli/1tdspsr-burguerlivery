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
import { OrderContextType } from "@/app/types/order-context"

export default function Hamburgers() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { hamburgerOrder, setHamburgerOrder } =
    useContext<OrderContextType>(OrderContext)

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

    const selectedHamburger = hamburgers.find(
      (hamburger) => hamburger.id === id
    )

    const sendToCart = {
      id: selectedHamburger?.id,
      title: selectedHamburger?.title,
      image: selectedHamburger?.image[0],
      value: productValue,
    }

    setHamburgerOrder([...hamburgerOrder, sendToCart])
    setProductValue(0)
  }

  const getHamburgers = async () => {
    try {
      const response = await axios.get(`${baseURL}/hamburgers`)
      setHamburgers(response.data)
    } catch (error) {
      console.error("Error fetching hamburgers:", error)
    }
  }

  useEffect(() => {
    getHamburgers()
  }, [])

  return (
    <section className="container mx-auto h-screen">
      <h1 className="text-4xl text-gray-700 font-bold mb-6">Hamburgers</h1>
      <div className="flex gap-4 flex-wrap">
        {hamburgers.map((hamburger: Hamburger) => (
          <ProductCard key={hamburger.id} className="w-[calc(25%-1rem)]">
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
                label="Individual"
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
