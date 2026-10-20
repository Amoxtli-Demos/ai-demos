import type { Metadata } from "next";
import "@fontsource-variable/source-serif-4";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import { Footer, Nav } from "@/components/despacho/Shell";

export const metadata: Metadata = {
  title: { default: "Garza Rivas Contadores | Contabilidad e impuestos en orden", template: "%s | Garza Rivas Contadores" },
  description: "Demo de AMOXTLI®: formulario que se convierte en un cliente gestionado en un panel. Despacho y datos ficticios.",
  robots: { index: false, follow: false },
};

export default function DespachoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-d-paper font-despachoText text-[16px] leading-[1.6] text-d-navy">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
