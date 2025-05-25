import {
  ChangeEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Logo } from "../components";
import axios from "axios";
import { PaymentOptionsData } from "../types/paymentOptions";
import OrderContext, { OrderContextValue } from "../context/orderContext";
import { formatCurrency } from "../utils";
import { AddressInput, initialAddress } from "../components/address/Address";
import { Address } from "../types/address";

export default function Checkout() {
  const router = useRouter();
  const cepURL = "https://brasilapi.com.br/api/cep/v2";

  const { totalValue, totalItems, appetizerOrder } = useContext(
    OrderContext
  ) as OrderContextValue;

  const [paymentOptions, setPaymentOptions] = useState<PaymentOptionsData[]>([]);

  const [address, setAddress] = useState<Address>(initialAddress);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<number | null>(0);

  const baseURL = "https://burgerlivery-api.vercel.app"; // api url
  const frete = 7.9;

  const sumValues = (firstValue: number, lastValue: number) => firstValue + lastValue;

  
  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };


  const handleCepBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const rawCep = event.target.value.replace(/\D/g, "");
    if (rawCep.length === 8) {
      getAddress(rawCep);
    }
    setAddress((prev) => ({ ...prev, cep: event.target.value }));
  };


  const handleSelectPayment = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedPaymentOption(Number(value));
  };


  const getPaymentOptions = async () => {
    try {
      const response = await axios(${baseURL}/payment/options);
      setPaymentOptions(response.data);
    } catch (error) {
      console.error("Error fetching payment options:", error);
    }
  };

  
  const postCreateOrder = async () => {
    if (
      !address.cep ||
      !address.street ||
      !address.neighborhood ||
      !address.city ||
      !address.number
    ) {
      alert("Por favor, preencha todos os campos obrigatórios do endereço.");
      return;
    }
    if (!selectedPaymentOption) {
      alert("Selecione uma forma de pagamento.");
      return;
    }

    const params = {
      items: appetizerOrder.map(({ title, value }) => ({ title, value })),
      paymentOption: selectedPaymentOption,
      address: { ...address },
    };

    try {
      const response = await axios.post(
        ${baseURL}/order/create-order,
        JSON.stringify(params),
        {
          headers: {
            authorization: Bearer ${userToken},
          },
        }
      );

      if (response) {
        router.push("/pedido/finalizado");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Erro ao criar o pedido. Tente novamente.");
    }
  };

  useLayoutEffect(() => {
    const token = sessionStorage.getItem("token");
    setUserToken(token);
    if (!token) {
      router.push("/login");
    }
  }, []);

 
  const getAddress = async (cep: string) => {
    try {
      const { data } = await axios.get<Address>(${cepURL}/${cep});
      setAddress((prev) => ({
        ...prev,
        street: data.street,
        city: data.city,
        neighborhood: data.neighborhood,
      }));
    } catch (error) {
      console.error("Error fetching cep:", error);
    }
  };

  useEffect(() => {
    getPaymentOptions();
  }, []);

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
            {/* Endereço */}
            <div className="w-1/3 p-6 bg-gray-50 border-gray-500 rounded-lg shadow-xs">
              <h2 className="text-xl text-gray-700 font-bold mb-2">
                Endereço de entrega
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <AddressInput
                  name="cep"
                  placeholder="CEP"
                  value={address.cep}
                  onChange={handleAddressChange}
                  onBlur={handleCepBlur}
                  className="col-span-2 text-red-600"
                />
                <AddressInput
                  name="street"
                  placeholder="Rua"
                  value={address.street}
                  onChange={handleAddressChange}
                  className="col-span-2"
                />
                <AddressInput
                  name="neighborhood"
                  placeholder="Bairro"
                  value={address.neighborhood}
                  onChange={handleAddressChange}
                />
                <AddressInput
                  name="city"
                  placeholder="Cidade"
                  value={address.city}
                  onChange={handleAddressChange}
                />
                <input
                  name="number"
                  placeholder="Número"
                  value={address.number}
                  onChange={handleAddressChange}
                  className="text-gray-700 rounded border py-2 px-4 w-23"
                />
                <input
                  name="complement"
                  placeholder="Complemento"
                  value={address.complement}
                  onChange={handleAddressChange}
                  className="text-gray-700 rounded border py-2 px-4"
                />
              </div>
            </div>

            {/* Pagamento */}
            <div className="w-1/3 p-6 bg-gray-50 border-gray-500 rounded-lg shadow-xs">
              <h2 className="text-xl text-gray-700 font-bold mb-2">
                Formas de pagamento

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