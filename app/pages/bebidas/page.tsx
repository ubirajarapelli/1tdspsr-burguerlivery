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
import { bebidas, listaBebidas } from "@/app/types/bebidas"


export default function Bebidas() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { bebidasOrder, setBebidasOrder } =
    useContext<unknown>(OrderContext)

  const [bebidas, setBebidas] = useState<listaBebidas>([])
  const [productValue, setProductValue] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setProductValue(Number(value))
  }

  const handleClick = (id: number) => {
    if (productValue === 0) {
      return console.log("nao aqui em bebidas")
    }

    const escolherBebida = bebidas.filter((bebida) => bebida.id === id)

    const sendToCart = {
      id: escolherBebida?.id,
      title: escolherBebida?.title,
      image: escolherBebida?.image,
      value: productValue,
    }

    setBebidasOrder([...bebidasOrder, sendToCart])
    setProductValue(0)
  }

  const getbebidas = async () => {
    try {
      const response = await axios.get(`${baseURL}/beverages`)
      setBebidas(response.data)
    } catch (error) {
      console.error("Error fetching bebidas:", error)
    }
  }

  useEffect(() => {
    getbebidas()
  }, [])

  return (
    <section className="container mx-auto">
      <h1 className="text-4xl text-gray-700 font-bold mb-6">Bebidas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {bebidas.map((bebidas: bebidas) => (
          <ProductCard key={bebidas.id}>
            <ProductCardHeader>
              <ProductCardImage
                src={bebidas.image}
                alt={bebidas.title}
                width={120}
                height={120}
              />
            <ProductCardTitle>{bebidas.title}</ProductCardTitle>
              <ProductCardDescription>
                {bebidas.description}
              </ProductCardDescription>
            </ProductCardHeader>
          <ProductCardAction>
            <ProductRadioButtom
              id={`${bebidas.id}-${bebidas.values}`}
              name={bebidas.title}
              label={bebidas.title}
              onChange={handleChange}
              value={bebidas.values}
            />
            <FormButton onClick={() => handleClick(bebidas.id)}>
              Adicionar
            </FormButton>
          </ProductCardAction>
        </ProductCard>
      ))}
  </div>
</section>

  )
}
