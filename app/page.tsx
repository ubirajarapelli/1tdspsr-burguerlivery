import Footer from "./components/Footer/page";
import Header from "./components/Header/page";

export default function Home() {
  return (
    <>
    <Header></Header>
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center">Burgerlivery</h1>
      <p className="text-center ">Faça seu pedido online</p>
    </div>
    <Footer></Footer>
    </>
  )
}
