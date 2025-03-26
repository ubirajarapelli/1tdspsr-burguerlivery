import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";


export default function Home() {
  return (
    <div className="container mx-auto bg-red-600 text-white">
      <Header/>
      <h1 className="text-4xl font-bold text-center ">Burgerlivery</h1>
      <p className="text-center">Faça seu pedido online</p>
      <Footer/>
    </div>
  )
}
