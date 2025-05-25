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
  const [address, setAddress] = useState({
    street: "",
    neighborhood: "",
    city: "",
  })
  const [residenceNumber, setResidenceNumber] = useState("")
  const [complement, setComplement] = useState("")

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

  const fetchAddressByCep = async () => {
    const cleanCep = cep.replace(/\D/g, "")
    if (cleanCep.length !== 8) {
      alert("Digite um CEP válido com 8 dígitos.")
      return
    }

    try {
      const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cleanCep}`)
      const data = response.data
      setAddress({
        street: data.street,
        neighborhood: data.neighborhood,
        city: data.city,
      })
    } catch (error) {
      alert("Erro ao buscar o CEP. Verifique se está correto.")
      console.error(error)
    }
  }

  const postCreateOrder = async () => {
  const params = {
    items: appetizerOrder.map(({ title, value }) => ({ title, value })),
    paymentOption: selectedPaymentOption,
    address: {
      cep,
      street: address.street,
      neighborhood: address.neighborhood,
      city: address.city,
      number: residenceNumber,
      complement,
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

  if (response?.data) {
      const { orderNumber, createdAt } = response.data

      // Salve o pedido completo no sessionStorage antes de redirecionar:
      const orderComplete = {
        orderNumber,
        createdAt,
        address: params.address,
        paymentOption: paymentOptions.find(p => p.value === selectedPaymentOption),
        items: params.items,
        totalValue,
        frete,
      }
      sessionStorage.setItem("lastOrder", JSON.stringify(orderComplete))

      router.push(`/pedido/finalizado?orderNumber=${orderNumber}&createdAt=${createdAt}`)
    }
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
      <section className="container mx-auto px-4 py-8">
        <header className="py-6 flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Logo />
          </span>
        </header>
        <h1 className="text-4xl text-gray-700 font-bold mb-6">Checkout</h1>
        <div className="min-h-96">
          <div className="flex flex-wrap gap-4">
           
            <div className="w-full md:w-1/3 p-6 bg-gray-50 border-gray-500 rounded-lg shadow-xs">
              <h2 className="text-xl text-gray-700 font-bold mb-4">Endereço de entrega</h2>

              <label className="block text-gray-700 text-sm font-bold mb-1">CEP</label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="Digite o CEP"
                  className="flex-1 border rounded px-4 py-2 text-gray-700"
                />
                <button
                  onClick={fetchAddressByCep}
                  type="button"
                  className="py-2 px-6 rounded-full bg-amber-300 text-amber-600 font-semibold border border-amber-400"
                >
                  Buscar
                </button>
              </div>

              <label className="block text-gray-700 text-sm font-bold mb-1">Rua</label>
              <input
                type="text"
                value={address.street}
                disabled
                className="w-full mb-4 border rounded px-4 py-2 text-gray-700 bg-gray-100"
              />

              <label className="block text-gray-700 text-sm font-bold mb-1">Bairro</label>
              <input
                type="text"
                value={address.neighborhood}
                disabled
                className="w-full mb-4 border rounded px-4 py-2 text-gray-700 bg-gray-100"
              />

              <label className="block text-gray-700 text-sm font-bold mb-1">Cidade</label>
              <input
                type="text"
                value={address.city}
                disabled
                className="w-full mb-4 border rounded px-4 py-2 text-gray-700 bg-gray-100"
              />

              <label className="block text-gray-700 text-sm font-bold mb-1">Número</label>
              <input
                type="text"
                value={residenceNumber}
                onChange={(e) => setResidenceNumber(e.target.value)}
                className="w-full mb-4 border rounded px-4 py-2 text-gray-700"
              />

              <label className="block text-gray-700 text-sm font-bold mb-1">Complemento (Opcional)</label>
              <input
                type="text"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                className="w-full border rounded px-4 py-2 text-gray-700"
              />
            </div>

          
            <div className="w-full md:w-1/3 p-6 bg-gray-50 border-gray-500 rounded-lg shadow-xs">
              <h2 className="text-xl text-gray-700 font-bold mb-2">Formas de pagamento</h2>
              <label
                htmlFor="payment"
                className="block text-gray-700 text-sm font-bold mb-4"
              >
                Escolha uma forma de pagamento
              </label>
              <select
                name="payment"
                id="payment"
                onChange={handleSelectPayment}
                className="text-gray-700 leading-tight rounded border w-full py-2 px-4"
              >
                <option value={0} disabled selected>
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
              <h2 className="text-xl text-gray-700 font-bold mb-2">Total a pagar</h2>
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
            onClick={() => {
              if (!selectedPaymentOption || !residenceNumber) {
                alert("Selecione a forma de pagamento e preencha o número da residência.")
                return
              }
              postCreateOrder()
            }}
            className="py-2 px-6 rounded-full bg-amber-300 text-amber-600 font-semibold border border-amber-400"
          >
            Fazer pedido
          </button>
        </div>
      </section>
    </main>
  )
}
