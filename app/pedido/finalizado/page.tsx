import { Logo } from "@/app/components"

export default function PedidoFinalizado() {
  return (
    <main className="bg-gray-200 h-screen">
      <section className="container mx-auto">
        <header className="py-6 flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Logo />
          </span>
        </header>
        <h1 className="text-4xl text-gray-700 font-bold mb-6">
          Pedido realizado com sucesso
        </h1>
        <div className="min-h-96"></div>
      </section>
    </main>
  )
}
