import UserLayoutWrapper from "@/features/user/components/UserLayoutWrapper";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserLayoutWrapper>{children}</UserLayoutWrapper>;
}
