import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function Bebidas() {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-4 md:p-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Bebidas
          </h2>
        </main>
        <Footer />
      </div>
    );
  }