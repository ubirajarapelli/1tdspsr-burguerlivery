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
import { Appetizer, AppetizerList } from "@/app/types/appetizer"

export default function Appetizers() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { appetizerOrder, setAppetizerOrder } =
    useContext<unknown>(OrderContext)

  const [appetizers, setAppetizers] = useState<AppetizerList>([])
  const [productValue, setProductValue] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setProductValue(Number(value))
  }

  const handleClick = (id: number) => {
    console.log("ID do produto:", id)
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
                // <div className="flex flex-row-reverse items-center justify-between p-2 bg-gray-100 rounded-lg mb-4 text-gray-700">
                //   <input
                //     type="radio"
                //     id=
                //     name={appetizer.id}
                //     value={appetizer.values.small}
                //     onChange={handleChange}
                //     className="h-4 w-4 text-amber-600 focus:ring-amber-600 border-amber-400"
                //   />
                //   <label
                //     htmlFor={`${appetizer.id}-${appetizer.values.small}`}
                //     className="w-full text-sm cursor-pointer"
                //   >
                //     {formatCurrency(appetizer.values.small)}
                //   </label>
                // </div>
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
