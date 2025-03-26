import Link from "next/link";


export default function Header() {
    
    return (
    <div className="flex flex-row bg-yellow-500 text-white">
        
        <header className="py-6 text-2xl flex flex-row items-center justify-between w-full">

          <a className="text-4xl ml-4">Burguerdelivery</a>

          <nav className="mt-4 flex flex-row gap-4 mr-14 ml-auto space-y-2">
            <Link href="/pages/hamburgues" legacyBehavior>
              <a className="hover:text-black">Hamburgues</a>
            </Link>
            <Link href="/pages/entradas" legacyBehavior>
              <a className="hover:text-black">Entrada</a>
            </Link>
            <Link href="/pages/sobremesas" legacyBehavior>
              <a className="hover:text-black">Sobremesas</a>
            </Link>
            <Link href="/pages/bebidas" legacyBehavior>
              <a className="hover:text-black">Bebidas</a>
            </Link>
          </nav>

        </header>
      </div>
      
    );
}
