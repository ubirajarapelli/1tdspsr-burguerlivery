"use client"

import {
  ChangeEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

import { Logo } from "../components"
import { PaymentOptionsData } from "../types/paymentOptions"
import OrderContext, { OrderContextValue } from "../context/orderContext"
import { formatCurrency } from "../utils"
import { formatCEP, isValidNumber } from "../utils/NumberCEPValidation"

export default function Checkout() {
  const router = useRouter()
  const { totalValue, totalItems, appetizerOrder } = useContext(OrderContext) as OrderContextValue

  const [paymentOptions, setPaymentOptions] = useState<PaymentOptionsData[]>([])
  const [userToken, setUserToken] = useState<string | null>(null)
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<number | null>(0)

  const [cep, setCep] = useState("")
  const [addressData, setAddressData] = useState({
    rua: "",
    bairro: "",
    cidade: "",
  })
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")

  const baseURL = process.env.NEXT_PUBLIC_API_URL
  const frete = 7.9

  const sumValues = (firstValue: number, lastValue: number) => firstValue + lastValue

  const handleSelectPayment = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPaymentOption(Number(event.target.value))
  }

  const handleCepChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCep(e.target.value)
  }

  const fetchAddressByCEP = async () => {
    if (!cep) return
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      const { logradouro, bairro, localidade } = response.data
      setAddressData({
        rua: logradouro,
        bairro,
        cidade: localidade,
      })
    } catch (error) {
      console.error("Erro ao buscar endereço:", error)
    }
  }

  const postCreateOrder = async () => {
    if (!selectedPaymentOption || !numero.trim()) {
      alert("Selecione uma forma de pagamento e informe o número da residência.")
      return
    }

    const params = {
      items: appetizerOrder.map(({ title, value }) => ({ title, value })),
      paymentOption: selectedPaymentOption,
      endereco: {
        cep,
        rua: addressData.rua,
        bairro: addressData.bairro,
        cidade: addressData.cidade,
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
            "Content-Type": "application/json",
          },
        }
      )

      if (response?.data?.orderNumber) {
        const { orderNumber, createdAt } = response.data
        router.push(
          `/pedido/finalizado?orderNumber=${orderNumber}&createdAt=${encodeURIComponent(
            createdAt
          )}`
        )
      }
    } catch (error) {
      console.error("Erro ao criar pedido:", error)
    }
  }

  const getPaymentOptions = async () => {
    try {
      const response = await axios(`${baseURL}/payment/options`)
      setPaymentOptions(response.data)
    } catch (error) {
      console.error("Erro ao buscar opções de pagamento:", error)
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
      <section className="container mx-auto px-4">
        <header className="py-6 flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Logo />
          </span>
        </header>

        <h1 className="text-4xl text-gray-700 font-bold mb-6">Checkout</h1>

        <div className="flex flex-wrap gap-4">
          {/* Endereço */}
          <div className="w-full md:w-1/3 p-6 bg-white border rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Endereço de entrega</h2>

            <input
              type="text"
              placeholder="Digite o CEP"
              value={cep}
              onChange={handleCepChange}
              className="w-full p-2 mb-2 text-sm rounded border"
            />
            <button
              type="button"
              onClick={fetchAddressByCEP}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Buscar CEP
            </button>

            <input
              type="text"
              value={addressData.rua}
              readOnly
              placeholder="Rua"
              className="w-full p-2 mb-2 text-sm rounded border bg-gray-100"
            />
            <input
              type="text"
              value={addressData.bairro}
              readOnly
              placeholder="Bairro"
              className="w-full p-2 mb-2 text-sm rounded border bg-gray-100"
            />
            <input
              type="text"
              value={addressData.cidade}
              readOnly
              placeholder="Cidade"
              className="w-full p-2 mb-2 text-sm rounded border bg-gray-100"
            />
            <input
              type="text"
              placeholder="Número"
              value={numero}
              onChange={(e) => {
                const formatted = formatCEP(e.target.value)
                setNumero(isValidNumber(Number(formatted)) ? e.target.value : "")
              }}
              className="w-full p-2 mb-2 text-sm rounded border"
            />
            <input
              type="text"
              placeholder="Complemento"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              className="w-full p-2 mb-2 text-sm rounded border"
            />
          </div>

          <div className="w-full md:w-1/3 p-6 bg-white border rounded-lg shadow-sm">
            <h2 className="text-xl text-gray-700 font-bold mb-2">Formas de pagamento</h2>
            <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-2">
              Escolha uma forma de pagamento
            </label>
            <select
              name="payment"
              id="payment"
              onChange={handleSelectPayment}
              className="text-gray-700 leading-tight rounded border w-full py-2 px-4"
              value={selectedPaymentOption || ""}
            >
              <option value="" disabled>
                Selecione
              </option>
              {paymentOptions.map((payment) => (
                <option key={payment.id} value={payment.value}>
                  {payment.text}
                </option>
              ))}
            </select>
          </div>

          {/* Total */}
          <div className="w-full md:w-1/3 p-6 bg-white border rounded-lg shadow-sm">
            <h2 className="text-xl text-gray-700 font-bold mb-2">Total a pagar</h2>
            <ul>
              <li className="flex justify-between text-gray-700 mb-2">
                Subtotal:{" "}
                <span className="font-bold">
                  {totalItems} itens - {formatCurrency(totalValue)}
                </span>
              </li>
              <li className="flex justify-between text-gray-700 mb-2">
                Frete: <span className="font-bold">{formatCurrency(frete)}</span>
              </li>
              <li className="flex justify-between text-gray-700">
                Total:{" "}
                <span className="font-bold">
                  {formatCurrency(sumValues(totalValue, frete))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={postCreateOrder}
            disabled={!selectedPaymentOption || !numero}
            className={`py-2 px-6 rounded-full font-semibold border ${
              !selectedPaymentOption || !numero
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-amber-300 text-amber-600 border-amber-400"
            }`}
          >
            Fazer pedido
          </button>
        </div>
      </section>
    </main>
  )
}
