import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/style.scss";

import MenuOne from "@/components/Header/Menu/MenuOne";

import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hamilcar",
  description: "Hamilcar, services et solutions Inc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MenuOne /> {/* Menu intégré ici */}
        <main>{children}</main>
        <Footer /> {/* Footer intégré ici */}
      </body>
    </html>
  );
}
