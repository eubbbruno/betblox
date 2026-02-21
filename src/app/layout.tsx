import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BetBlox - O Cassino que Paga de Verdade",
  description: "Cassino online premium com saque via PIX em 5 minutos. Jogos dos melhores provedores do mundo!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: 'Inter, Arial, sans-serif', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
