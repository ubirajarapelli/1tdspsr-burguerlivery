import Image from "next/image"

interface ProductCardProps {
  children: React.ReactNode
  className?: string
}
export const ProductCard = ({ children, className }: ProductCardProps) => {
  return (
    <article className={`w-1/4 flex flex-col justify-between p-4 bg-gray-50 border-gray-500 rounded-lg shadow-xs ${className}`}>
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
