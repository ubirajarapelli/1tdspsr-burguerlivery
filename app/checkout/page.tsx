'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface PaymentOption {
  id: number;
  name: string;
}

interface Address {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

export default function Checkout() {
  const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>([]);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<number | null>(null);
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cepError, setCepError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function getPaymentOptions() {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/options`);
        setPaymentOptions(data);
      } catch (error) {
        console.error('Erro ao buscar formas de pagamento:', error);
      }
    }
    getPaymentOptions();
  }, []);

  async function handleCepBlur() {
    if (cep.length !== 8) {
      setCepError('CEP deve ter 8 dígitos');
      setAddress(null);
      return;
    }

    try {
      const { data } = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
      setAddress({
        street: data.street,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state
      });
      setCepError('');
    } catch (error) {
      console.error(error);
      setCepError('CEP inválido ou não encontrado');
      setAddress(null);
    }
  }

  const isFormValid = selectedPaymentOption && cep && address && numero;

  function handleSubmit() {
    if (!isFormValid) return;
    setIsSubmitting(true);

    alert('Pedido enviado com sucesso!');
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Finalizar Pedido</h2>


      <div>
        <label htmlFor="payment" className="block text-sm font-medium mb-1">Forma de pagamento</label>
        <select
          id="payment"
          name="payment"
          value={selectedPaymentOption ?? ''}
          onChange={(e) => setSelectedPaymentOption(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
        >
          <option value="" disabled>Selecione</option>
          {paymentOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>{opt.name}</option>
          ))}
        </select>
      </div>


      <div>
        <label htmlFor="cep" className="block text-sm font-medium mb-1">CEP</label>
        <input
          type="text"
          id="cep"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
          onBlur={handleCepBlur}
          className="w-full border rounded px-3 py-2"
          placeholder="Digite o CEP (somente números)"
        />
        {cepError && <p className="text-red-500 text-sm mt-1">{cepError}</p>}
      </div>


      {address && (
        <div className="space-y-1 text-sm bg-gray-100 p-3 rounded">
          <p><strong>Rua:</strong> {address.street}</p>
          <p><strong>Bairro:</strong> {address.neighborhood}</p>
          <p><strong>Cidade:</strong> {address.city} - {address.state}</p>
        </div>
      )}


      <div>
        <label htmlFor="numero" className="block text-sm font-medium mb-1">Número</label>
        <input
          type="text"
          id="numero"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Número da residência"
        />
      </div>

      <div>
        <label htmlFor="complemento" className="block text-sm font-medium mb-1">Complemento (opcional)</label>
        <input
          type="text"
          id="complemento"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFormValid || isSubmitting}
        className={`w-full py-2 rounded text-white font-semibold transition ${
          isFormValid ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Fazer pedido
      </button>
    </div>
  );
}
