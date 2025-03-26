import Link from "next/link";


function Header (){
    return(
        <>
            <header className="flex justify-between p-[1.5em] mb-[2%] bg-red-400 text-white">
                <div className="mb-[2%] font-bold uppercase">
                    <h2>BurguerLivery</h2>
                </div>
                <nav id="lista_nav">
                    <ul className="flex justify-between text-[16px] hover:text-yellow-950">
                        <li>
                            <Link href='./Hamburguer' className="mr-[1em]">Hamburguer</Link>
                        </li>
                        <li>
                            <Link href="./Entradas" className="mr-[1em]">Entradas</Link>
                        </li>
                        <li>
                            <Link href="./Sobremesas" className="mr-[1em]">Sobremesas</Link>
                        </li>
                        <li>
                            <Link href="./Bebidas" className="mr-[1em]">Bebidas</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;