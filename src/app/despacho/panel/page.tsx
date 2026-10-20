import type { Metadata } from "next";
import Panel from "@/components/despacho/Panel";

export const metadata: Metadata = { title: "Panel de solicitudes", robots: { index: false, follow: false } };

export default function PanelPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <Panel />
    </div>
  );
}
