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

import { Dessert, DessertList } from "@/app/types/desserts"

export default function Desserts () {
    const baseURL = "https://burgerlivery-api.vercel.app"

    const { dessertsOrder, setDessertsOrder } =
        useContext<unknown>(OrderContext)

    const [desserts, setDesserts] = useState<DessertList>([])

    const getBevarages = async () => {
        try {
            const response = await axios.get(`${baseURL}/desserts`)
            setDesserts(response.data)
        } catch (error) {
            console.error("Error fetching desserts:", error)
        }
    }

    useEffect(() => {
        getBevarages()
    }, [])

    const handleClick = (id: number) => {

        const selectedDesserts = desserts.find(
            (desserts) => desserts.id === id
        )

        const sendToCart = {
            id: selectedDesserts?.id,
            title: selectedDesserts?.title,
            image: selectedDesserts?.image,
            description: selectedDesserts?.description,
            value: selectedDesserts?.values,
        }
        console.log("sendToCart", sendToCart)
        setDessertsOrder([...dessertsOrder, sendToCart])
    }


    return (
        <section className="container mx-auto h-screen">
                <h1 className="text-4xl text-gray-700 font-bold mb-6">Bebidas</h1>
                <div className="flex gap-4">
                {desserts.map((desserts: Dessert) => (
                    <ProductCard key={desserts.id}>
                    <ProductCardHeader>
                        <ProductCardImage
                        src={desserts.image}
                        alt={desserts.title}
                        width={120}
                        height={120}
                        />
                        <ProductCardTitle>{desserts.title}</ProductCardTitle>
                        <ProductCardDescription>
                        {desserts.description}
                        </ProductCardDescription>
                    </ProductCardHeader>
                    <ProductCardAction>
                        {desserts.values}
                        <FormButton onClick={() => handleClick(desserts.id)}>
                        Adicionar
                        </FormButton>
                    </ProductCardAction>
                    </ProductCard>
                ))}
                </div>
            </section>
    )
}
