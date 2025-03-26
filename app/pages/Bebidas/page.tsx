import Header from "@/app/components/Header/Header"
import Footer from "@/app/components/Footer/Footer"

export default function Hamburguer () {
    return (
        <>
        <div className="container mx-auto flex flex-col justify-between h-screen">
            <Header />
            <Footer />
        </div>
        </>
    )
}