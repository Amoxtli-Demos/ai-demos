import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demos de IA y automatización | AMOXTLI®",
  description: "Tres sitios de ejemplo con chatbot, asistente de IA y automatización funcionando. Marcas y datos ficticios.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
