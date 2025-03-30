//Components
import Header from "@/shared/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-layout">
      <Header />
      {children}
    </div>
  );
}
