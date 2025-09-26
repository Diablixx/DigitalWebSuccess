import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Optimus - Solutions d'Intelligence Artificielle",
  description: "Découvrez nos solutions d'IA avancées pour transformer votre entreprise",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}