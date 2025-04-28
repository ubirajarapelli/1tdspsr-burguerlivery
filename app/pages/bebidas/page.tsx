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
import { Drinks, listaDeDrinks } from "@/app/types/drink"


export default function drink() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { drinkOrder, setDrinkOrder }:any =
    useContext(OrderContext)

  const [drink, setdrink] = useState<listaDeDrinks>([])
  const [valorProduto, setvalorProduto] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setvalorProduto(Number(value))
  }

  const handleClick = (id: number) => {
    if (valorProduto == 0) {
      return
    }

    const escolherdrink = drink.find((drink) => drink.id === id)

    const mandarprocarrinho = {
      id: escolherdrink?.id,
      title: escolherdrink?.title,
      image: escolherdrink?.image,
      value: valorProduto,
    }

    setDrinkOrder([...drinkOrder, mandarprocarrinho])
    setvalorProduto(0)
  }

  const getdrink = async () => {
    try {
      const res = await axios.get(` ${baseURL}/beverages `)
      setdrink(res.data)
    } catch (error) {
      console.error("Error fetching drink:", error)
    }
  }

  useEffect(() => {
    getdrink()
  }, [])

  return (
    <section className="container mx-auto">
      <h1 className="text-4xl text-gray-700 font-bold mb-6">drink</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {drink.map((drink: Drinks) => (
          <ProductCard key={drink.id}>
            <ProductCardHeader>
              <ProductCardImage
                src={drink.image}
                alt={drink.title}
                width={120}
                height={120}
              />
            <ProductCardTitle>{drink.title}</ProductCardTitle>
              <ProductCardDescription>
                {drink.description}
              </ProductCardDescription>
            </ProductCardHeader>
          <ProductCardAction>
            <ProductRadioButtom
              id={` ${drink.id} `}
              name={drink.title}
              label={drink.title}
              onChange={handleChange}
              value={drink.value}
            />
            <FormButton onClick={() => handleClick(drink.id)}>
              Adicionar
            </FormButton>
          </ProductCardAction>
        </ProductCard>
      ))}
  </div>
</section>

  )
}