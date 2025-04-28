"use client"

import { FormButton, ProductCard, ProductCardAction, ProductCardDescription, ProductCardHeader, ProductCardImage, ProductCardTitle, ProductCardValue } from "@/app/components"
import OrderContext from "@/app/context/orderContext"
import { Beverage, Beveragelist } from "@/app/types/beverage"
import axios from "axios"
import { useContext, useEffect, useState } from "react"

export default function Beverages() {
    const baseURL = "https://burgerlivery-api.vercel.app"

    const { beveragesOrder, setBeveragesOrder } =
    useContext<unknown>(OrderContext)

    const [beverages, setBeverages] = useState<Beveragelist>([])
    const [productValue, setProductValue] = useState<number>(0)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setProductValue(Number(value))
    }

    const handleClick = (id: number) => {
        if (productValue === 0) {
            return
        }

        const selectedBeverage = beverages.find(
            (beverage) => beverage.id === id
        )
    
        const sendToCart = {
            id: selectedBeverage?.id,
            image: selectedBeverage?.image,
            title: selectedBeverage?.title,
            description: selectedBeverage?.description,
            value: selectedBeverage?.value
        }

        setBeveragesOrder([...beveragesOrder, sendToCart])
        setProductValue(0)
    }

    const getBeverages = async () => {
        try {
          const response = await axios.get(`${baseURL}/beverages`)
          setBeverages(response.data)
        } catch (error) {
          console.error("Error fetching beverages:", error)
        }
      }

    useEffect(() => {
        getBeverages()
    }, [])

    return (
        <section className="container mx-auto h-screen">
            <h1 className="text-4xl text-gray-700 font-bold mb-6">Bebidas</h1>
            <div className="flex gap-4">
                {beverages.map((beverages: Beverage) => (
                    <ProductCard key={beverages.id}>
                        <ProductCardHeader>
                            <ProductCardImage
                                src={beverages.image}
                                alt={beverages.title}
                                width={120}
                                height={120}
                            />
                            <ProductCardTitle>{beverages.title}</ProductCardTitle>
                            <ProductCardDescription>{beverages.description}</ProductCardDescription>
                            <ProductCardValue id={`${beverages.id}-${beverages.value}`} value={beverages.value} onChange={handleChange}/>
                        </ProductCardHeader>
                        <FormButton onClick={() => handleClick(beverages.id)}>Adicionar</FormButton>
                    </ProductCard>
                ))}
            </div>
        </section>
    )
}