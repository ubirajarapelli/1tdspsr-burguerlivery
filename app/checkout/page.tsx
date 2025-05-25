"use client"

import {
  ChangeEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react"
import { useRouter } from "next/navigation"
import { Logo } from "../components"
import { FormPayment } from "../components/formPayment/FormPayment"
import axios from "axios"
import { PaymentOptionsData } from "../types/paymentOptions"
import OrderContext, { OrderContextValue } from "../context/orderContext"
import { formatCurrency } from "../utils"

export default function Checkout() {
  const router = useRouter()

  const { totalValue, totalItems, appetizerOrder } = useContext(
    OrderContext
  ) as OrderContextValue

  const [paymentOptions, setPaymentOptions] = useState<PaymentOptionsData[]>([])
  const [userToken, setUserToken] = useState<string | null>(null)
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<number | null>(0)

  const [cep, setCep] = useState("")
  const [rua, setRua] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")

  const baseURL = "https://burgerlivery-api.vercel.app"
  const frete = 7.9

  const sumValues = (firstValue: number, lastValue: number) => {
    return firstValue + lastValue
  }

  const handleSelectPayment = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setSelectedPaymentOption(Number(value))
  }

  const getPaymentOptions = async () => {
    try {
      const response = await axios(`${baseURL}/payment/options`)
      setPaymentOptions(response.data)
    } catch (error) {
      console.error("Error fetching payment options:", error)
    }
  }

  const buscarCep = async () => {
    try {
      const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)
      const data = response.data
      setRua(data.street)
      setBairro(data.neighborhood)
      setCidade(data.city)
    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
    }
  }

  const postCreateOrder = async () => {
    if (!selectedPaymentOption || numero.trim() === "") {
      alert("Preencha a forma de pagamento e o número da residência.")
      return
    }

    const params = {
      items: appetizerOrder.map(({ title, value }) => ({ title, value })),
      paymentOption: selectedPaymentOption,
      endereco: {
        cep,
        rua,
        bairro,
        cidade,
        numero,
        complemento,
      },
    }

    try {
      const response = await axios.post(
        `${baseURL}/order/create-order`,
        JSON.stringify(params),
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      )

      const orderData = response.data
      
      sessionStorage.setItem(
        "lastOrder",
        JSON.stringify({
          orderNumber: orderData.orderNumber || orderData.id || "Desconhecido",
          createdAt: new Date().toISOString(),
          address: params.endereco,
          paymentOption: paymentOptions.find(p => p.value === selectedPaymentOption),
          items: params.items,
          totalValue,
          frete,
        })
      )

      const queryParams = new URLSearchParams({
        orderNumber: orderData.orderNumber || orderData.id || "",
        createdAt: new Date().toISOString(),
      }).toString()

      router.push(`/pedido/finalizado?${queryParams}`)
    } catch (error) {
      console.error("Error creating order:", error)
    }
  }

  useLayoutEffect(() => {
    const token = sessionStorage.getItem("token")
    setUserToken(token)

    if (!token) {
      router.push("/login")
    }
  }, [])

  useEffect(() => {
    getPaymentOptions()
  }, [])

  return (
    <main className="bg-gray-200 min-h-screen">
      <section className="container mx-auto">
        <header className="py-6 flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Logo />
          </span>
        </header>
        <h1 className="text-4xl text-gray-700 font-bold mb-6">Checkout</h1>
        <div className="min-h-96">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="w-full md:w-1/3 p-6 bg-gray-50 border-gray-500 rounded-lg shadow-xs">
              <h2 className="text-xl text-gray-700 font-bold mb-2">
                Endereço de entrega
              </h2>
              <FormPayment
                cep={cep}
                rua={rua}
                bairro={bairro}
                cidade={cidade}
                numero={numero}
                complemento={complemento}
                setCep={setCep}
                setRua={setRua}
                setBairro={setBairro}
                setCidade={setCidade}
                setNumero={setNumero}
                setComplemento={setComplemento}
                buscarCep={buscarCep}
              />
            </div>

            <div className="w-full md:w-1/3 p-6 bg-gray-50 border-gray-500 rounded-lg shadow-xs">
              <h2 className="text-xl text-gray-700 font-bold mb-2">
                Formas de pagamento
              </h2>
              <label
                htmlFor="payment"
                className="block text-gray-700 text-sm font-bold mb-4"
              >
                Escolha uma forma de pagamento
              </label>
              <select
                name="payment"
                id="payment"
                value={selectedPaymentOption ?? 0}
                onChange={handleSelectPayment}
                className="text-gray-700 leading-tight rounded border w-full py-2 px-4"
              >
                <option value={0} disabled>
                  Selecione
                </option>
                {paymentOptions.map((payment) => (
                  <option key={payment.id} value={payment.value}>
                    {payment.text}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-1/3 p-6 bg-gray-50 border-gray-500 rounded-lg shadow-xs">
              <h2 className="text-xl text-gray-700 font-bold mb-2">
                Total a pagar
              </h2>
              <ul>
                <li className="text-gray-700 flex justify-between">
                  Subtotal:
                  <span className="font-bold">
                    {totalItems} items - {formatCurrency(totalValue)}
                  </span>
                </li>
                <li className="text-gray-700 flex justify-between">
                  Frete
                  <span className="font-bold">{formatCurrency(frete)}</span>
                </li>
                <li className="text-gray-700 flex justify-between">
                  Valor total
                  <span className="font-bold">
                    {formatCurrency(sumValues(totalValue, frete))}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={postCreateOrder}
            className="py-2 px-6 rounded-full bg-amber-300 text-amber-600 font-semibold border border-amber-400"
          >
            Fazer pedido
          </button>
        </div>
      </section>
    </main>
  )
}
