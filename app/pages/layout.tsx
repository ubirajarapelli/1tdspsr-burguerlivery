import { Footer } from "../components/footer/footer"
import { Header } from "../components/header/header"

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="bg-gray-200">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
