import type { Metadata } from "next";
import "@fontsource-variable/schibsted-grotesk";
import "@fontsource-variable/public-sans";
import { Footer, Nav } from "@/components/clinica/Shell";

export const metadata: Metadata = {
  title: { default: "Clínica Dental Aralia | Agenda tu cita en un minuto", template: "%s | Clínica Dental Aralia" },
  description: "Demo de AMOXTLI®: chatbot que atiende dudas y agenda citas dentales. Marca y datos ficticios.",
  robots: { index: false, follow: false },
};

export default function ClinicaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-c-bg font-clinicaText text-[17px] leading-[1.65] text-c-ink">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
