import Image from "next/image"

interface ProductCardProps {
  children: React.ReactNode
}
export const ProductCard = ({ children }: ProductCardProps) => {
  return (
    <article className="w-1/4 flex flex-col justify-between p-4 bg-gray-50 border-gray-500 rounded-lg shadow-xs">
      {children}
    </article>
  )
}

interface ProductCardHeaderProps {
  children: React.ReactNode
}
export const ProductCardHeader = ({ children }: ProductCardHeaderProps) => {
  return <div className="mb-4">{children}</div>
}

interface ProductCardImageProps {
  src: string
  alt: string
  width: number
  height: number
}
export const ProductCardImage = ({
  src,
  alt,
  width,
  height,
}: ProductCardImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="w-full h-40 object-cover rounded-lg mb-4"
    />
  )
}

interface ProductCardTitleProps {
  children: React.ReactNode
}
export const ProductCardTitle = ({ children }: ProductCardTitleProps) => {
  return <h2 className="text-xl text-gray-700 font-bold mb-2">{children}</h2>
}

interface ProductCardDescriptionProps {
  children: React.ReactNode
}
export const ProductCardDescription = ({
  children,
}: ProductCardDescriptionProps) => {
  return <p className="text-base text-gray-700 mb-2">{children}</p>
}

interface ProductCardActionProps {
  children: React.ReactNode
}
export const ProductCardAction = ({ children }: ProductCardActionProps) => {
  return <div className="flex flex-col gap-2">{children}</div>
}

interface ProductCardValueProps {
  //children: React.ReactNode
  id: string
  value: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const ProductCardValue = ({
  id, value, onChange
}: ProductCardValueProps) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }
  return (
    <div className="flex flex-row-reverse items-center justify-between p-2 bg-gray-100 rounded-lg text-gray-700 mb-2">
    <input
      type="checkbox"
      id={id}
      value={value}
      onChange={onChange}
      className="h-4 w-4 text-amber-600 focus:ring-amber-600 border-amber-400"
    />
    <label htmlFor={id} className="w-full text-sm cursor-pointer">
      {formatCurrency(value)}
    </label>
  </div>
  )
}