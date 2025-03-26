import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-amber-400 text-white p-4">
      <h1 className="text-xl font-bold">Burgerlivery</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><Link href="../pages/hamburgers" className="hover:text-yellow-400">Hamburgers</Link></li>
          <li><Link href="../pages/entradas" className="hover:text-yellow-400">Entradas</Link></li>
          <li><Link href="../pages/sobremesas" className="hover:text-yellow-400">Sobremesas</Link></li>
          <li><Link href="../pages/bebidas" className="hover:text-yellow-400">Bebidas</Link></li>
        </ul>
      </nav>
    </header>
  );
}