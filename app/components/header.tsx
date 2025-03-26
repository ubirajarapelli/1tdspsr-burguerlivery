import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-yellow-500 text-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link href="/" className="text-4xl font-bold tracking-wide">
          BurguerDelivery
        </Link>
        
        <nav className="flex space-x-6 text-lg font-medium">
          <Link href="/hamburguers" className="hover:text-gray-800 transition">Hamburguer</Link>
          <Link href="/entrada" className="hover:text-gray-800 transition">Entradas</Link>
          <Link href="/sobremesas" className="hover:text-gray-800 transition">Sobremesas</Link>
          <Link href="/bebidas" className="hover:text-gray-800 transition">Bebidas</Link>
        </nav>
      </div>
    </header>
  );
}