import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./styles/globals.css"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700']
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
        className={`${poppins.className} antialiased overflow-x-hidden overflow-y-hidden`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
