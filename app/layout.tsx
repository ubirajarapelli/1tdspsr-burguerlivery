import "./styles/globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <title>BurgerLivery</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body>
        <Header />
        <main className="h-[84vh] content-center">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
