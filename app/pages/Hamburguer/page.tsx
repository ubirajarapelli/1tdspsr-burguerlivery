import Footer from "@/app/components/Footer/page";
import Header from "@/app/components/Header/page";

export default function Hamburguer() {
  return (
    <>
    <Header></Header>
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center">Burgerlivery</h1>
      <p className="text-center mb-[100%]">Hamburguers</p>
    </div>
    <Footer></Footer>
    </>
  )
}