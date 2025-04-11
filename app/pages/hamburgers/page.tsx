"use client"
import OrderContext from "@/app/context/orderContext"
import { useContext } from "react"

export default function Hamburgers() {
  const { appetizerOrder } = useContext<unknown>(OrderContext)

  return (
    <div className="container mx-auto h-svh">
      <h1 className="text-4xl font-bold text-center">Hamburgers</h1>
      <p className="text-center">Faça seu pedido online</p>

      <p>{appetizerOrder.length}</p>
    </div>
  )
}
