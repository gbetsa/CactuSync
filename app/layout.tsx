import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Conexão e injeção eficiente das fontes do Google via Next/Font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadados Globais (para SEO, título da aba do navegador, etc)
export const metadata: Metadata = {
  title: "CactuSync | Gestão de Patrimônio",
  description: "Plataforma exclusiva de gestão de capital.",
};

/**
 * RootLayout (Layout Principal / Raiz)
 * Onde injetamos a linguagem (pt-BR) da engine de acessibilidade, fontes e os estilos globais de sistema.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
