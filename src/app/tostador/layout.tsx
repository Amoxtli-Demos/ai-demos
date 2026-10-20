import type { Metadata } from "next";
import "@fontsource/young-serif";
import "@fontsource-variable/work-sans";
import { Footer, Nav } from "@/components/tostador/Shell";

export const metadata: Metadata = {
  title: { default: "Tostaduría Ceniza | Elige tu café con ayuda", template: "%s | Tostaduría Ceniza" },
  description: "Demo de AMOXTLI®: asistente de IA que solo recomienda cafés del catálogo. Marca y datos ficticios.",
  robots: { index: false, follow: false },
};

export default function TostadorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-t-dough font-tostadorText text-[17px] leading-[1.65] text-t-roast">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
