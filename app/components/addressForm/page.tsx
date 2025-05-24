import { ChangeEvent } from "react"

type Props = {
  cep: string
  rua: string
  bairro: string
  cidade: string
  numero: string
  complemento: string
  setCep: (value: string) => void
  setRua: (value: string) => void
  setBairro: (value: string) => void
  setCidade: (value: string) => void
  setNumero: (value: string) => void
  setComplemento: (value: string) => void
  buscarCep: () => void
}

export function AddressForm({
  cep,
  rua,
  bairro,
  cidade,
  numero,
  complemento,
  setCep,
  setRua,
  setBairro,
  setCidade,
  setNumero,
  setComplemento,
  buscarCep,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <label className="text-sm font-semibold text-gray-700">CEP</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={buscarCep}
          >
            Buscar
          </button>
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Rua</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Bairro</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Cidade</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Número</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Complemento</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
        />
      </div>
    </div>
  )
}
