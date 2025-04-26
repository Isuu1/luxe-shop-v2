import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
//Fonts
import { Rubik } from "next/font/google";
import { siteMetadata } from "@/shared/config/metadata.config";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rubik.className}`} id="modal-root">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
