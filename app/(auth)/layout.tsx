export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-layout">
      <div style={{ flex: "0 1 50%" }}></div>
      {children}
    </div>
  );
}
