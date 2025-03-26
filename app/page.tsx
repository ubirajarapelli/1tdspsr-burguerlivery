import Header from "./components/header"
import Footer from "./components/footer"
export default function Home() {
  return (
    <div className="container mx-auto">
    
      <h1 className="text-4xl font-bold text-center">Burgerlivery</h1>
      <h2><Header></Header></h2>
      <h2><Footer></Footer></h2>
     
      <p className="text-center">Faça seu pedido online</p>
    
    </div>
  )
}
