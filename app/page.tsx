import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col justify-between h-screen">
      <Header />
      <Footer />
    </div>
  )
}