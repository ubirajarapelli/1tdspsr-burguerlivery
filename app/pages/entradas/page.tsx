"use client"

import { useContext, useEffect, useState } from "react"
import axios from "axios"
import OrderContext, { OrderContextValue } from "@/app/context/orderContext"
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
import { Appetizer, AppetizerList } from "@/app/types/appetizer"

export default function Appetizers() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { appetizerOrder, setAppetizerOrder } = useContext(
    OrderContext
  ) as OrderContextValue

  const [appetizers, setAppetizers] = useState<AppetizerList>([])
  const [productValue, setProductValue] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setProductValue(Number(value))
  }

  const handleClick = (id: number) => {
    if (productValue === 0) {
      return
    }

    const selectedApperizer = appetizers.find(
      (appetizer) => appetizer.id === id
    ) as Appetizer

    const sendToCart = {
      id: selectedApperizer?.id,
      title: selectedApperizer?.title,
      image: selectedApperizer?.image,
      value: productValue,
    }

    setAppetizerOrder([...appetizerOrder, sendToCart])
    setProductValue(0)
  }

  const getAppetizers = async () => {
    try {
      const response = await axios.get(`${baseURL}/appetizers`)
      setAppetizers(response.data)
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
        {appetizers.map((appetizer: Appetizer) => (
          <ProductCard key={appetizer.id}>
            <ProductCardHeader>
              <ProductCardImage
                src={appetizer.image}
                alt={appetizer.title}
                width={120}
                height={120}
              />
              <ProductCardTitle>{appetizer.title}</ProductCardTitle>
              <ProductCardDescription>
                {appetizer.description}
              </ProductCardDescription>
            </ProductCardHeader>
            <ProductCardAction>
              {appetizer.values.large ? (
                <>
                  <ProductRadioButtom
                    id={`${appetizer.id}-${appetizer.values.small}`}
                    label="Pequeno"
                    name={appetizer.title}
                    onChange={handleChange}
                    value={appetizer.values.small}
                  />

                  <ProductRadioButtom
                    id={`${appetizer.id}-${appetizer.values.large}`}
                    label="Grande"
                    name={appetizer.title}
                    onChange={handleChange}
                    value={appetizer.values.large}
                  />
                </>
              ) : (
                <ProductRadioButtom
                  id={`${appetizer.id}-${appetizer.values.small}`}
                  name={appetizer.title}
                  label="10 unidades"
                  onChange={handleChange}
                  value={appetizer.values.small}
                />
              )}
              <FormButton onClick={() => handleClick(appetizer.id)}>
                Adicionar
              </FormButton>
            </ProductCardAction>
          </ProductCard>
        ))}
      </div>
    </section>
  )
}
