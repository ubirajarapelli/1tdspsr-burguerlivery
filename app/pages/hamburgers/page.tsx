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

  const { hamburgerOrder, setHamburgerOrder } =
    useContext<unknown>(OrderContext)

  const [hamburgers, setHamburgers] = useState<HamburgerList>([])
  const [productValue, setProductValue] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductValue(Number(event.target.value))
  }

  const handleClick = (id: number) => {
    if (productValue === 0) return

    const selected = hamburgers.find(hamburger => hamburger.id === id)

    const sendToCart = {
      id: selected?.id,
      title: selected?.title,
      image: selected?.image[0],
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
    <section className="container mx-auto h-full">
      <h1 className="text-4xl font-bold text-gray-700 mb-6">Hambúrgueres</h1>
      <p className="text-gray-500 mb-10">Escolha o seu lanche </p>

      <div className="flex gap-4 flex-wrap">
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
                id={`${hamburger.id}-single`}
                name={hamburger.title}
                label="Simples"
                onChange={handleChange}
                value={hamburger.values.single}
              />

              <ProductRadioButtom
                id={`${hamburger.id}-combo`}
                name={hamburger.title}
                label="Combo"
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