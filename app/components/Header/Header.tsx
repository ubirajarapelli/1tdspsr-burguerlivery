import Link from 'next/link';

export default function Header () {

    return (
        <>
        <header className='flex justify-between p-[2em] items-center bg-(--fundo-nav)'>
            <div>
                <h1 className='font-[Fredoka] text-[2em] text-(--branco)'>Burguerlivery</h1>
            </div>
            <nav>
                <Link href="./pages/Hamburguers" className='font-[Poppins] text-(--branco)'>Hamburguers</Link>
                <Link href="./pages/Entradas" className='font-[Poppins] ml-[1em] text-(--branco)'>Entradas</Link>
                <Link href="./pages/Sobremesas" className='font-[Poppins] ml-[1em] text-(--branco)'>Sobremesas</Link>
                <Link href="./pages/Bebidas" className='font-[Poppins] ml-[1em] text-(--branco)'>Bebidas</Link>
            </nav>
        </header>
        </>
    )
}