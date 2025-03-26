import Image from "next/image";


export default function Home() {
  return (
    <>
      <main className="min-h-screen flex items-start justify-start mt-10">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="flex justify-start">
            <Image
              src="/hamburguer.jpg"
              alt="foto de hamburguer"
              width={400}
              height={400}/>
          </div>
          <div className="flex flex-col justify-start mt-4 text-center md:text-left">
            <h1 className="text-2xl font-bold">Duplo Smash Burguer</h1>
            <p className="text-xl font-medium">O <strong>Duplo Smash Burguer</strong>é a combinação perfeita de sabor e suculência! Com dois smash burgers super crocantes por fora e incrivelmente macios por dentro, queijo derretido em camadas generosas, cebola caramelizada, molho especial da casa e um pão macio e levemente tostado, cada mordida é uma explosão de sabor. Uma experiência irresistível para os verdadeiros amantes de hambúrguer! 🍔🔥</p>
          </div>
        </section>
      </main>
    </>
  )
}
