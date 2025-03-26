import Link from "next/link";

export default function Header() {
    return (
      <header style={{ padding: "10px", background: "#333", color: "#fff", textAlign: "center" }}>
        <Link href="pages/bebidas">Bebidas</Link>
        <Link href="pages/entradas">Entradas</Link>
        <Link href="pages/hamburguers">Entradas</Link>
        <Link href="pages/sobremesas">Sobremesas</Link>
        <h1>Burgerlivery</h1>
      </header>
    );
}