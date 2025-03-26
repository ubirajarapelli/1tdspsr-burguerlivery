import React from "react";
import Link from "next/link";

const Header = () => {
    return (

    <>
    <header className="bg-gray-800 text-white p-4 flex space-between items-center mb-4 text-right">
        <div className="flex " >BurgerLivery</div>
        <nav>
                <ul className="flex space-x-12 text-right">
                    <li>
                        <Link href="/app/pages/hamburguers/pages.tsx">Hamburguers</Link>
                    </li>

                    <li>
                        <Link href={'/app/pages/Entradas/pages.tsx'}>Entradas</Link>
                    </li>

                    <li>
                        <Link href={"/app/pages/Sobremesa/pages.tsx"}>Sobremesas</Link>
                    </li>

                    <li>
                        <Link href={"/app/pages/Bebidas/pages.tsx"}>Bebidas</Link>
                    </li>

                </ul>
        </nav>

    </header>
            
    </>
        
    );

};

export default Header