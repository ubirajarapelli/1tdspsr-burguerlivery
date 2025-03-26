import Link from "next/link";

const routes = [
    {
        path: "/pages/hamburgers",
        name: "Hamburgers",
    },
    {
        path: "/pages/entradas",
        name: "Entradas",
    },
    {
        path: "/pages/sobremesas",
        name: "Sobremesas",
    },
    {
        path: "/pages/bebidas",
        name: "Bebidas",
    }
];

const Header = () => {
    return (
        <header className="w-full h-[100px] flex items-center justify-between px-6 py-2 bg-red-400">
            <div>
                <Link href='/'>
                    <h2 className="text-3xl font-bold text-white">Burgerlivery</h2>
                </Link>
            </div>
            
            <nav>
                <ul className="flex space-x-6 text-xl">
                    {routes.map((route, index) => (
                        <li key={index}>
                            <Link 
                                href={route.path} 
                                className="text-white hover:text-yellow-300 font-medium transition-colors"
                            >
                                {route.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
