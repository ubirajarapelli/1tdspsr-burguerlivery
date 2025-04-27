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
 
export default function Hamburgers() {
  const baseURL = "https://burgerlivery-api.vercel.app"
 
  const { burguerOrder, setBurguerOrder } =
    useContext<unknown>(OrderContext)
 
  const [burguers, setBurguers] = useState<BurguerList>([])
  const [productValue, setProductValue] = useState<number>(0)
 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setProductValue(Number(value))
  }
 
  const handleClick = (id: number) => {
    if (productValue === 0) {
      return
    }
 
    const selectedBurguer = burguers.find(
      (burguer) => burguer.id === id
    )
 
    const sendToCart = {
      id: selectedBurguer?.id,
      title: selectedBurguer?.title,
      image: selectedBurguer?.image,
      value: productValue,
    }
 
    setBurguerOrder([...burguerOrder, sendToCart])
    setProductValue(0)
  }
 
  const getBurguers = async () => {
    try {
      const response = await axios.get(`${baseURL}/hamburgers`)
      setBurguers(response.data)
    } catch (error) {
      console.error("Error fetching burguers:", error)
    }
  }
 
  useEffect(() => {
    getBurguers()
  }, [])
 
  return (
    <section className="container mx-auto h-screen">
      <h1 className="text-4xl text-gray-700 font-bold mb-6">Hamburguers</h1>
      <div className="flex gap-4">
        {burguers.map((burguer: Burguer) => (
          <ProductCard key={burguer.id}>
            <ProductCardHeader>
              <ProductCardImage
                src={burguer.image}
                alt={burguer.title}
                width={120}
                height={120}
              />
              <ProductCardTitle>{burguer.title}</ProductCardTitle>
              <ProductCardDescription>
                {burguer.description}
              </ProductCardDescription>
            </ProductCardHeader>
            <ProductCardAction>
                <>
                  <ProductRadioButtom
                    id={`${burguer.id}-${burguer.values.single}`}
                    label="Só o Hamburguer"
                    name={burguer.title}
                    onChange={handleChange}
                    value={burguer.values.single}
                  />
 
                  <ProductRadioButtom
                    id={`${burguer.id}-${burguer.values.combo}`}
                    label="Combo"
                    name={burguer.title}
                    onChange={handleChange}
                    value={burguer.values.combo}
                  />
                </>
   
              <FormButton onClick={() => handleClick(burguer.id)}>
                Adicionar
              </FormButton>
            </ProductCardAction>
          </ProductCard>
        ))}
      </div>
    </section>
  )
}
 
 