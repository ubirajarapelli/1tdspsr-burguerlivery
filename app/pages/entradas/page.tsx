"use client"
import OrderContext from "@/app/context/orderContext"
import { useContext } from "react"

export default function Appetizers() {
  const { appetizerOrder, setAppetizerOrder } =
    useContext<unknown>(OrderContext)

  const handleClick = () => {
    setAppetizerOrder([10])
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Entradas</h1>
      <p className="mt-4 text-lg">Escolha suas entradas favoritas!</p>
      <p className="text-sm mt-4">{appetizerOrder.length}</p>
      <button onClick={handleClick}>Adicionar</button>
    </div>
  )
}
