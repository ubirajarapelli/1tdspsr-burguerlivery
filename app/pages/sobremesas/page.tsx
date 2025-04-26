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
import { Dessert, DessertList } from "@/app/types/dessert"

export default function Desserts() {
  const baseURL = "https://burgerlivery-api.vercel.app"

  const { dessertOrder, setDessertOrder } =
    useContext<any>(OrderContext)

  const [desserts, setDesserts] = useState<DessertList>([])
  const [productValue, setProductValue] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductValue(Number(event.target.value))
  }

  const handleClick = (id: number) => {
    if (productValue === 0) {
      alert("Selecione uma opção antes de adicionar.")
      return
    }

    const selected = desserts.find(dessert => dessert
