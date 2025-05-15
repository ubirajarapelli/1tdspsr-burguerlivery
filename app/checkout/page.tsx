"use client";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "../components";
import axios from "axios";
import { PaymentOptionsData } from "../types/paymentOptions";
import { formatCurrency } from "../utils/formatCurrency";
import OrderContext, { OrderContextValue } from "../context/orderContext";

export default function Checkout() {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const { totalValue, totalItems } = useContext(
    OrderContext
  ) as OrderContextValue;

  const [userToken, setUserToken] = useState<string | null>(null);

  const [paymentOptions, setPaymentOptions] = useState<PaymentOptionsData[]>(
    []
  );

  const frete = 7.9;

  const sumValues = (firstValue: number, lastValue: number) =>
    firstValue + lastValue;

  const getPaymentOptions = async () => {
    try {
      const response = await axios(`${baseURL}/payment/options`);
      setPaymentOptions(response.data);
    } catch (error) {
      console.error("Error fetching payment options:", error);
    }
  };

  const postCreateOrder = async () => {
    const params = {
      items: [
        {
          title: "string",
          value: 1,
        },
      ],
      paymentOption: 1,
    };
    try {
      const response = await axios.post(`/${baseURL}/order/create-order`, {
        body: params,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useLayoutEffect(() => {
    const userToken = sessionStorage.getItem("token");
    setUserToken(userToken);

    // if (userToken === null) {
    if (!userToken) {
      router.push("/login");
    }
  }, []);

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
            <div className="w-1/3 p-6 bg-gray-50 border-gray-500 rounded-lg shadow-xs">
              <h2 className="text-xl text-gray-700 font-bold mb-2">
                Endereço de entrega
              </h2>
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
              className="text-gray-700 leading-tight rounded border w-full py-2 px-4"
            >
              <option value="" selected disabled>
                Selecione uma forma de pagamento
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
            <ul className="text-xl text-gray-700 font-bold mb-2">
              Subtotal:
              <span className="font-bold">
                {totalItems} - {formatCurrency(totalValue)}
              </span>
            </ul>
            <ul className="text-xl text-gray-700 font-bold mb-2">
              Frete:
              <span className="font-bold">{formatCurrency(frete)}</span>
            </ul>
            <ul className="text-xl text-gray-700 font-bold mb-2">
              Valor total
              <span className="font-bold">
                {formatCurrency(sumValues(totalValue, frete))}
              </span>
            </ul>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Link
            href="/"
            className="py-2 px-6 rounded-full bg-amber-300 text-amber-600 font-semibold border border-amber-400"
          >
            Fazer pedido
          </Link>
        </div>
      </section>
    </main>
  );
}
