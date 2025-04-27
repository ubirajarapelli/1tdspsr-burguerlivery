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
import { hamburgers, hamburgersList } from "@/app/types/hamburger"


export default function Hamburgers() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { hamburgerOrder, setHamburgerOrder }:any = useContext<unknown>(OrderContext)
  const [productValue, setProductValue] = useState<number>(0)
  const [hamburguers, setHamburgers] = useState<hamburgersList>([])



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setProductValue(Number(value))
  }

  const handleClick = (id: number) => {
    if (productValue === 0) {
      // alert("Selecione um valor")
      return 
    }

    const selectHamburger = hamburguers.find((hamburger) => hamburger.id === id) 

    const sendToCart = {
      id: selectHamburger?.id,
      title: selectHamburger?.title,
      image: selectHamburger?.image,
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
    <section className="container mx-auto">
  <h1 className="text-4xl text-gray-700 font-bold mb-6">Hamburguers</h1>
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {hamburguers.map((hamburger: hamburgers) => (
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
            label="apenas o hamburguer"
            name={hamburger.title}
            onChange={handleChange}
            value={hamburger.values.single}
          />

          <ProductRadioButtom
            id={`${hamburger.id}-${hamburger.values.combo}`}
            label={`combo do ${hamburger.title}`}
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
