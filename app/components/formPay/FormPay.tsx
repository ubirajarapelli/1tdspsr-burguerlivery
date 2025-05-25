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
 
export function FormPay({
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
  const handleInput =
    (setter: (value: string) => void) =>
    (event: ChangeEvent<HTMLInputElement>) =>
      setter(event.target.value)
 
  return (
    <div className="flex flex-col gap-2">
      <div>
        <label className="text-sm font-semibold text-gray-700">CEP</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-amber-700"
            value={cep}
            onChange={handleInput(setCep)}
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
          className="w-full border px-3 py-2 rounded text-amber-700"
          value={rua}
          onChange={handleInput(setRua)}
        />
      </div>
 
      <div>
        <label className="text-sm font-semibold text-gray-700">Bairro</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded text-amber-700"
          value={bairro}
          onChange={handleInput(setBairro)}
        />
      </div>
 
      <div>
        <label className="text-sm font-semibold text-gray-700">Cidade</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded text-amber-700"
          value={cidade}
          onChange={handleInput(setCidade)}
        />
      </div>
 
      <div>
        <label className="text-sm font-semibold text-gray-700">Número</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded text-amber-700"
          value={numero}
          onChange={handleInput(setNumero)}
        />
      </div>
 
      <div>
        <label className="text-sm font-semibold text-gray-700">Complemento</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded text-amber-700"
          value={complemento}
          onChange={handleInput(setComplemento)}
        />
      </div>
    </div>
  )
}
 
 