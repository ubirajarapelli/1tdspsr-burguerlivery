import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

export default function Hamburguers() {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px", textAlign: "center" }}>
        <h2>Hambúrgueres</h2>
        <p>Lista de hambúrgueres deliciosos!</p>
      </main>
      <Footer />
    </div>
  );
}
