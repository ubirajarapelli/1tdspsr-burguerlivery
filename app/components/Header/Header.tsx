import Link from "next/link";


export default function Header() {
    return (
        <>
            <header className="w-full h-20 bg-red-700 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white pl-5">BurgerLivery</h1>
                    <nav className="flex">
                        <ul className="flex gap-4 px-5 text-lg text-amber-400 font-bold ">
                            <li><Link href="/pages/Hamburguers" className="hover:text-amber-600 transition ease-in-out hover:duration-300">Hamburguers</Link></li>
                            <li><Link href="/pages/Entradas" className="hover:text-amber-600 transition ease-in-out hover:duration-300">Entradas</Link></li>
                            <li><Link href="/pages/Sobremesas" className="hover:text-amber-600 transition ease-in-out hover:duration-300">Sobremesas</Link></li>
                            <li><Link href="/pages/Bebidas" className="hover:text-amber-600 transition ease-in-out hover:duration-300">Bebidas</Link></li>
                        </ul>
                    </nav>
            </header>
        </>
    )
}