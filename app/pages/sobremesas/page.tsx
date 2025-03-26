import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

export default function Sobremesas() {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px", textAlign: "center" }}>
        <h2>Sobremesas</h2>
        <p>Doces incríveis para você aproveitar!</p>
      </main>
      <Footer />
    </div>
  );
}