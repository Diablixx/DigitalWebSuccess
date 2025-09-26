import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Optimus SAAS - Dashboard Admin",
  description: "Interface d'administration pour la génération d'articles IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}