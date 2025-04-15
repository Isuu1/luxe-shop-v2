//Components
import Footer from "@/shared/components/Footer";
import Header from "@/shared/components/Header";
import { CartProvider } from "@/shared/providers/CartProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="main-layout">
        <Header />
        {children}
        <Footer />
      </div>
    </CartProvider>
  );
}
