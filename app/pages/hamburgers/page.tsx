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
import { Burguer, BurguerList } from "@/app/types/burguer"

export default function Burguers() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { hamburgerOrder, setHamburgerOrder } =
  useContext<unknown>(OrderContext)

  const [hamburguers, setHamburguer] = useState<BurguerList>([])
  const [productValue, setProductValue] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setProductValue(Number(value))
  }

  const handleClick = (id: number) => {
    if (productValue === 0) {
      // alert("Selecione um valor")
      return
    }

    const selectedHamburguer = hamburguers.find(
      (hamburguer) => hamburguer.id === id
    )

    const sendToCart = {
      id: selectedHamburguer?.id,
      title: selectedHamburguer?.title,
      image: selectedHamburguer?.image,
      value: productValue,
    }

    setHamburgerOrder([...hamburgerOrder, sendToCart])
    setProductValue(0)
  }

  const getBurguers = async () => {
    try {
      const response = await axios.get(`${baseURL}/hamburgers`)
      setHamburguer(response.data)
    } catch (error) {
      console.error("Error fetching burgers:", error)
    }
  }

  useEffect(() => {
    getBurguers()
  }, [])

  return (
    <section className="container mx-auto h-screen">
      <h1 className="text-4xl text-gray-700 font-bold mb-6">Burgers</h1>
      <div className="flex gap-4">
        {hamburguers.map((hamburguer: Burguer) => (
          <ProductCard key={hamburguer.id}>
            <ProductCardHeader>
              <ProductCardImage
                src={hamburguer.image[0]}
                alt={hamburguer.title}
                width={120}
                height={120}
              />
              <ProductCardTitle>{hamburguer.title}</ProductCardTitle>
              <ProductCardDescription>
                {hamburguer.description}
              </ProductCardDescription>
            </ProductCardHeader>
            <ProductCardAction>
              {hamburguer.values.combo ? (
                <>
                  <ProductRadioButtom
                    id={`${hamburguer.id}-${hamburguer.values.single}`}
                    label="Pequeno"
                    name={hamburguer.title}
                    onChange={handleChange}
                    value={hamburguer.values.single}
                  />

                  <ProductRadioButtom
                    id={`${hamburguer.id}-${hamburguer.values.combo}`}
                    label="Grande"
                    name={hamburguer.title}
                    onChange={handleChange}
                    value={hamburguer.values.combo}
                  />
                </>
              ) : (
                <ProductRadioButtom
                  id={`${hamburguer.id}-${hamburguer.values.single}`}
                  name={hamburguer.title}
                  label="Single"
                  onChange={handleChange}
                  value={hamburguer.values.single}
                />
              )}
              <FormButton onClick={() => handleClick(hamburguer.id)}>
                Adicionar
              </FormButton>
            </ProductCardAction>
          </ProductCard>
        ))}
      </div>
    </section>
  )
}
