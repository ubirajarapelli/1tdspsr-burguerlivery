import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

export default function Home() {
  return (

    <>
    <div>
      <Header/>
    </div>
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center">Burgerlivery</h1>
      <p className="text-center">Faça seu pedido online</p>
    </div>

    <div>
      <Footer/>
    </div>
    
    
    </>
  )
}
