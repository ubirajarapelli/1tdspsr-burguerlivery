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
import { Sobremesas, listaSobremesas } from "@/app/types/sobremesas"


export default function sobremesas() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { sobremesasOrder, setSobremesasOrder }:any = useContext<unknown>(OrderContext)
  const [ valorProduto, setValorProduto ] = useState<number>(0)
  const [ sobremesas, setsobremesas ] = useState<listaSobremesas>([])



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValorProduto(Number(value))
  }

  const handleClick = (id: number) => {
    if (valorProduto === 0) {
      return 
    }

    const escolherSobremesa = sobremesas.filter((sobremesa) => sobremesa.id === id) 

    const mandarProCarrinho = {
      id: escolherSobremesa.id,
      title: escolherSobremesa.title,
      image: escolherSobremesa.image,
      value: valorProduto,
    }

    setSobremesasOrder([...sobremesasOrder, mandarProCarrinho])
    setValorProduto(0)

  }

  const getsobremesas = async () => {
    try {
      const response = await axios.get(` ${baseURL}/desserts `)
      setsobremesas(response.data)
    } catch (error) {
      console.error("Error fetching sobremesass:", error)
    }
  }

  useEffect(() => {
    getsobremesas()
  }, [])


  return (
        <section className="container mx-auto h-screen">
          <h1 className="text-4xl text-gray-700 font-bold mb-6">Hamburguers</h1>
          <div className="flex gap-4">
            {sobremesas.map((sobremesas: Sobremesas) => (
              <ProductCard key={sobremesas.id}>
                <ProductCardHeader>
                  <ProductCardImage
                    src={sobremesas.image}
                    alt={sobremesas.title}
                    width={120}
                    height={120}
                  />
                  <ProductCardTitle>{sobremesas.title}</ProductCardTitle>
                  <ProductCardDescription>
                    {sobremesas.description}
                  </ProductCardDescription>
                </ProductCardHeader>
                <ProductCardAction>
                  <ProductRadioButtom
                    id={` ${sobremesas.id}-${sobremesas.value} `}
                    label={sobremesas.description}
                    name={sobremesas.title}
                    onChange={handleChange}
                    value={sobremesas.value}/>
                  <FormButton onClick={() => handleClick(sobremesas.id)}>
                    Adicionar
                  </FormButton>
                </ProductCardAction>
              </ProductCard>
            ))}
          </div>
        </section>
  )
}