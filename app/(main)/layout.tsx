//Components
import Footer from "@/shared/components/Footer";
import Header from "@/shared/components/Header";
import { AuthProvider } from "@/shared/providers/AuthProvider";
import { CartProvider } from "@/shared/providers/CartProvider";
import { WishlistProvider } from "@/shared/providers/WishlistProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <div className="main-layout">
            <Header />
            {children}
            <Footer />
          </div>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
