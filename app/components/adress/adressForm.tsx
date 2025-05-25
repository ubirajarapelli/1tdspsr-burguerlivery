"use client"
import { useState } from "react"
import axios from "axios"
import { AddressData } from "../types/address"

interface AddressFormProps {
  values: AddressData
  onChange: (field: keyof AddressData, value: string) => void
}

export default function AddressForm({ values, onChange }: AddressFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCepSearch = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await axios.get(
        `https://brasilapi.com.br/api/cep/v2/${values.cep}`
      )
      const { street, neighborhood, city } = response.data
      onChange("rua", street)
      onChange("bairro", neighborhood)
      onChange("cidade", city)
    } catch (err) {
      setError("CEP não encontrado.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">CEP</label>
        <div className="flex gap-2">
          <input
            className="border rounded p-2 w-full"
            value={values.cep}
            onChange={(e) => onChange("cep", e.target.value)}
            placeholder="Digite o CEP"
          />
          <button
            className="bg-blue-600 text-white px-4 rounded"
            onClick={handleCepSearch}
            disabled={loading}
          >
            {loading ? "..." : "Buscar"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <div className="mb-2">
        <label className="block text-sm font-semibold">Rua</label>
        <input className="border p-2 w-full bg-gray-100" value={values.rua} readOnly />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-semibold">Bairro</label>
        <input className="border p-2 w-full bg-gray-100" value={values.bairro} readOnly />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-semibold">Cidade</label>
        <input className="border p-2 w-full bg-gray-100" value={values.cidade} readOnly />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-semibold">Número</label>
        <input
          className="border p-2 w-full"
          value={values.numero}
          onChange={(e) => onChange("numero", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold">Complemento</label>
        <input
          className="border p-2 w-full"
          value={values.complemento}
          onChange={(e) => onChange("complemento", e.target.value)}
        />
      </div>
    </div>
  )
}
