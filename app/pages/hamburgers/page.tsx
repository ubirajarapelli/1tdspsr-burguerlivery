"use client"
import { FormButton, ProductCard, ProductCardAction, ProductCardDescription, ProductCardHeader, ProductCardImage, ProductCardTitle, ProductRadioButtom } from "@/app/components"
import OrderContext from "@/app/context/orderContext"
import { Hamburger, HamburgerList } from "@/app/types/hamburgers"
import axios from "axios"
import { useContext, useEffect, useState } from "react"

export default function Hamburgers() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { hamburgerOrder, setHamburgerOrder } = useContext<unknown>(OrderContext)

  const [hamburgers, setHamburgers] = useState<HamburgerList>([])
  const [productValue, setProductValue] = useState<number>(0)
  const [hamburgerImages, setCurrentImages] = useState<Record<number, string>>({})


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number, imageIndex: number) => {
    const { value } = event.target
    setProductValue(Number(value))
    setCurrentImages((prev) => ({
      ...prev,
      [id]: hamburgers.find(h => h.id === id)?.image[imageIndex] || ""
    }))
  }

  const handleClick = (id: number) => {
    if (productValue === 0) {
      return
    }

    const selectedHamburger = hamburgers.find(
      (hamburger) => hamburger.id === id
    )

    const sendToCart = {
      id: selectedHamburger?.id,
      image: selectedHamburger?.image,
      title: selectedHamburger?.title,
      description: selectedHamburger?.description,
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
    <section className="container mx-auto h-screen">
          <h1 className="text-4xl text-gray-700 font-bold mb-6">Hamburgers</h1>
          <div className="flex gap-4">
            {hamburgers.map((hamburger: Hamburger) => (
              <ProductCard key={hamburger.id}>
                <ProductCardHeader>
                  <ProductCardImage
                    src={hamburgerImages[hamburger.id] || hamburger.image[0]}
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
                  label="Simples"
                  name={hamburger.title}
                  onChange={(e) => handleChange(e, hamburger.id, 0)}
                  value={hamburger.values.single}
                />
                <ProductRadioButtom
                  id={`${hamburger.id}-combo`}
                  label="Combo"
                  name={hamburger.title}
                  onChange={(e) => handleChange(e, hamburger.id, 1)}
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
