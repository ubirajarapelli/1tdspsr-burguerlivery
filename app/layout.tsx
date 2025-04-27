import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./styles/globals.css"
import { OrderProvider } from "./context/orderContext"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300']
})

export const metadata: Metadata = {
  title: "Burgerlivery",
  description: "Burgerlivery faça seu pedido online",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.className} antialiased h-full`}
      >
        <OrderProvider>{children}</OrderProvider>
      </body>
    </html>
  )
}
