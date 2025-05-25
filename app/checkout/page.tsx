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

  // const [paymentOptions, setPaymentOptions] = useState<PaymentOptionsData[]>([])
  const [paymentOptions, setPaymentOptions] = useState<
    Array<PaymentOptionsData>
  >([])

  const [userToken, setUserToken] = useState<string | null>(null)
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<
    number | null
  >(0)

  const baseURL = process.env.NEXT_PUBLIC_API_URL
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

  const postCreateOrder = async () => {
    const params = {
      items: appetizerOrder.map(({ title, value }) => ({ title, value })),
      paymentOption: selectedPaymentOption,
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

      if (response) {
        router.push("/pedido/finalizado")
      }
    } catch (error) {
      console.error("Error creating order:", error)
    }
  }

  useLayoutEffect(() => {
    const token = sessionStorage.getItem("token")
    setUserToken(token)

    // if (token === null) {
    if (!token) {
      router.push("/login")
    }
  }, [])

  // useEffect(() => {
  //   if (totalItems === 0) {
  //     router.push("/pages/hamburgers")
  //   }
  // }, [])

  useEffect(() => {
    getPaymentOptions()
  }, [])

  const [cep, setCep] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")
  const [endereco, setEndereco] = useState({
    rua: "",
    bairro: "",
    cidade: ""
})

  const buscarCEP = async () => {
    if (!cep || cep.length < 8) return alert("Digite um CEP válido")
      try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      const data = response.data

          setEndereco({
            rua: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || ""
          })
        } catch (error) {
          alert("Erro ao buscar o CEP")
          console.error(error)
        }
      }



  return (
    <main className="bg-gray-200 h-screen">
      <section className="container mx-auto">
        <header className="py-6 flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Logo />
          </span>
        </header>
        <h1 className="text-4xl text-gray-700 font-bold mb-6">Checkout</h1>


        <div className="min-h-96">
          <div className="flex items-start gap-4">
          <div className="w-1/3 p-6 bg-gray-50 border-gray-500 rounded-lg shadow-xs">
          <h2 className="text-xl text-gray-700 font-bold mb-4">Endereço de entrega</h2>

        <input
          type="text"
          placeholder="Digite seu CEP"
          className="border border-gray-300 rounded p-2 w-full mb-2"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white rounded px-4 py-2 mb-4 hover:bg-blue-700 transition w-full"
          onClick={buscarCEP}
        >
          Buscar CEP
        </button>

        <input
          type="text"
          placeholder="Rua"
          className="border border-gray-300 rounded p-2 w-full mb-2 bg-gray-100"
          value={endereco.rua}
          readOnly
        />
        <input
          type="text"
          placeholder="Bairro"
          className="border border-gray-300 rounded p-2 w-full mb-2 bg-gray-100"
          value={endereco.bairro}
          readOnly
        />
        <input
          type="text"
          placeholder="Cidade"
          className="border border-gray-300 rounded p-2 w-full mb-2 bg-gray-100"
          value={endereco.cidade}
          readOnly
        />

        <input
          type="text"
          placeholder="Número da residência"
          className="border border-gray-300 rounded p-2 w-full mb-2"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        <input
          type="text"
          placeholder="Complemento (opcional)"
          className="border border-gray-300 rounded p-2 w-full mb-2"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
        />
      </div>

            </div>

            

            <div className="w-1/3 p-6 bg-gray-50 border-gray-500 rounded-lg shadow-xs">
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

            <div className="w-1/3 p-6 bg-gray-50 border-gray-500 rounded-lg shadow-xs">
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
