import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-amber-400 text-gray-900 py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="font-bold">BurgerLivery</h1>

        <nav className="flex space-x-4">
          <Link
            href="/"
            className="hover:scale-105 hover:font-bold transition-transform"
          >
            Home
          </Link>

          <Link
            href="/pages/hamburgers"
            className="hover:scale-105 hover:font-bold transition-transform"
          >
            Hamburguer
          </Link>
          <Link
            href="/pages/entradas"
            className="hover:scale-105 hover:font-bold transition-transform"
          >
            Entradas
          </Link>
          <Link
            href="/pages/sobremesas"
            className="hover:scale-105 hover:font-bold transition-transform"
          >
            Sobremesas
          </Link>
          <Link
            href="/pages/bebidas"
            className="hover:scale-105 hover:font-bold transition-transform"
          >
            Bebidas
          </Link>
        </nav>
      </div>
    </header>
  );
}
