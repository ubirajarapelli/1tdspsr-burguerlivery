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
import { sobremesas, listaSobremesas } from "@/app/types/sobremesas"


export default function Sobremesa() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { sobremesaOrder, setSobremesaOrder } =
    useContext<unknown>(OrderContext)

  const [sobremesas, setSobremesas] = useState<listaSobremesas>([])
  const [productValue, setProductValue] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setProductValue(Number(value))
  }

  const handleClick = (id: number) => {
    if (productValue === 0) {
      return console.log("nao aqui em sobremesa")
    }

    const escolherSobremesa = sobremesas.filter((sobremesa) => sobremesa.id === id)

    const sendToCart = {
      id: escolherSobremesa?.id,
      title: escolherSobremesa?.title,
      image: escolherSobremesa?.image,
      value: productValue,
    }

    setSobremesaOrder([...sobremesaOrder, sendToCart])
    setProductValue(0)
  }

  const getsobremesa = async () => {
    try {
      const response = await axios.get(`${baseURL}/desserts`)
      console.log("API data:", response.data)
      setSobremesas(response.data)
    } catch (error) {
      console.error("Error fetching sobremesa:", error)
    }
  }

  useEffect(() => {
    getsobremesa()
  }, [])

  return (
    <section className="container mx-auto">
      <h1 className="text-4xl text-gray-700 font-bold mb-6">sobremesa</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {sobremesas.map((sobremesa: sobremesas) => (
          <ProductCard key={`${sobremesa.id}-${sobremesa.values}`}>
            <ProductCardHeader>
              <ProductCardImage
                src={sobremesa.image}
                alt={sobremesa.title}
                width={120}
                height={120}
              />
            <ProductCardTitle>{sobremesa.title}</ProductCardTitle>
              <ProductCardDescription>
                {sobremesa.description}
              </ProductCardDescription>
            </ProductCardHeader>
          <ProductCardAction>
            <ProductRadioButtom
              id={`${sobremesa.id}-${sobremesa.value}`}
              name={sobremesa.title}
              label={sobremesa.title}
              onChange={handleChange}
              value={sobremesa.value}
            />
            <FormButton onClick={() => handleClick(sobremesa.id)}>
              Adicionar
            </FormButton>
          </ProductCardAction>
        </ProductCard>
      ))}
  </div>
</section>

  )
}
