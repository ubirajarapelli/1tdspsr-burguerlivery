import { Address } from "@/app/types/address"

export const initialAddress: Address = {
    cep: "",
    city: "",
    neighborhood: "",
    street: "",
}

interface AddressInputProps {
    name: string
    placeholder: string
    value?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
}

export const AddressInput = ({ name, placeholder, value, onChange, onBlur, className }: AddressInputProps) => {
    return (
        <input 
            type="text" 
            name={name} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange} 
            onBlur={onBlur}
            className={`text-gray-700 rounded border py-2 px-4 ${className}`} />
    )
}