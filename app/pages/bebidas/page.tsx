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
} from "@/app/components"

import { Beverage, BeverageList } from "@/app/types/beverage"

export default function Beverages () {
    const baseURL = "https://burgerlivery-api.vercel.app"

    const { bevarageOrder, setBevarageOrder } =
        useContext<unknown>(OrderContext)

    const [beverage, setBeverage] = useState<BeverageList>([])

    const getBevarages = async () => {
        try {
            const response = await axios.get(`${baseURL}/beverages`)
            setBeverage(response.data)
        } catch (error) {
            console.error("Error fetching bevarages:", error)
        }
    }

    useEffect(() => {
        getBevarages()
    }, [])

    const handleClick = (id: number) => {

        const selectedBeverage = beverage.find(
            (beverage) => beverage.id === id
        )

        const sendToCart = {
            id: selectedBeverage?.id,
            title: selectedBeverage?.title,
            image: selectedBeverage?.image,
            description: selectedBeverage?.description,
            value: selectedBeverage?.values,
        }
        console.log("sendToCart", sendToCart)
        setBevarageOrder([...bevarageOrder, sendToCart])
    }


    return (
        <section className="container mx-auto h-screen">
                <h1 className="text-4xl text-gray-700 font-bold mb-6">Bebidas</h1>
                <div className="flex gap-4">
                {beverage.map((bevarage: Beverage) => (
                    <ProductCard key={bevarage.id}>
                    <ProductCardHeader>
                        <ProductCardImage
                        src={bevarage.image}
                        alt={bevarage.title}
                        width={120}
                        height={120}
                        />
                        <ProductCardTitle>{bevarage.title}</ProductCardTitle>
                        <ProductCardDescription>
                        {bevarage.description}
                        </ProductCardDescription>
                    </ProductCardHeader>
                    <ProductCardAction>
                        {bevarage.values}
                        <FormButton onClick={() => handleClick(bevarage.id)}>
                        Adicionar
                        </FormButton>
                    </ProductCardAction>
                    </ProductCard>
                ))}
                </div>
            </section>
    )
}
