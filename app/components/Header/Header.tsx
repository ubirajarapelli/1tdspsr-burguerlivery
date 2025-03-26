import Link from "next/link"

export const Header = () => {
    return (
        <header className="flex justify-between p-4 bg-yellow-400 text-black">
            <p>Burgerlivery</p>
            <ul className="flex gap-8">
                <li>
                    <Link href="../pages/hamburgers">HAMBURGERS</Link>
                </li>
                <li><Link href="../page/entradas">ENTRADAS</Link></li>
                <li><Link href="../pages/sobremesas">SOBREMESAS</Link></li>
                <li><Link href="../pages/bebidas">BEBIDAS</Link></li>
            </ul>
        </header>
    )
}