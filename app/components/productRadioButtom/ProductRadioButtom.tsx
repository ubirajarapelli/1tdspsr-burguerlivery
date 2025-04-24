interface ProductRadioButtomProps {
  label: string
  id: string
  name: string
  value: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const ProductRadioButtom = ({
  label,
  id,
  name,
  value,
  onChange,
}: ProductRadioButtomProps) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }
  return (
    <div className="flex flex-row-reverse items-center justify-between p-2 bg-gray-100 rounded-lg text-gray-700 mb-2">
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="h-4 w-4 text-amber-600 focus:ring-amber-600 border-amber-400"
      />
      <label htmlFor={id} className="w-full text-sm cursor-pointer">
        {label} - {formatCurrency(value)}
      </label>
    </div>
  )
}
