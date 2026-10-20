import type { Cafe } from "@/lib/catalog";

/** Bolsa ilustrada en SVG: sin fotos de stock. La etiqueta usa los colores de cada café. */
export default function Bolsa({ cafe, className = "" }: { cafe: Cafe; className?: string }) {
  const { fondo, tinta, marca } = cafe.bolsa;
  const id = `b-${cafe.slug}`;
  return (
    <svg viewBox="0 0 200 270" role="img" aria-label={`Bolsa de café ${cafe.nombre}, ${cafe.origen}`} className={className}>
      <defs>
        <clipPath id={id}><path d="M30 44h140l10 208q0 10-10 10H30q-10 0-10-10z" /></clipPath>
      </defs>
      <path d="M30 44h140l10 208q0 10-10 10H30q-10 0-10-10z" fill={fondo} stroke="#261710" strokeOpacity=".28" strokeWidth="1.5" />
      <g clipPath={`url(#${id})`}>
        <path d="M20 44h160v16H20z" fill="#000" opacity=".12" />
        <path d="M100 262q-60-40-70-130M100 262q60-40 70-130" stroke={marca} strokeWidth="1.2" fill="none" opacity=".35" />
      </g>
      <path d="M30 44V30l8 7 8-7 8 7 8-7 8 7 8-7 8 7 8-7 8 7 8-7 8 7 8-7 8 7 8-7v14z" fill={fondo} />
      <path d="M30 44V30l8 7 8-7 8 7 8-7 8 7 8-7 8 7 8-7 8 7 8-7 8 7 8-7 8 7 8-7v14z" fill="#000" opacity=".08" />
      <rect x="44" y="92" width="112" height="132" rx="10" fill={tinta} />
      <ellipse cx="100" cy="124" rx="12" ry="18" transform="rotate(22 100 124)" fill={marca} />
      <path d="M96 108q8 14 -2 32" stroke={tinta} strokeWidth="2.5" fill="none" strokeLinecap="round" transform="rotate(22 100 124) translate(2 -2)" />
      <text x="100" y="172" textAnchor="middle" fontFamily="'Young Serif', Georgia, serif" fontSize={cafe.nombre.length > 9 ? 17 : 22} fill={fondo}>{cafe.nombre}</text>
      <path d="M72 184h56" stroke={marca} strokeWidth="1.5" />
      <text x="100" y="202" textAnchor="middle" fontFamily="'Work Sans Variable', system-ui, sans-serif" fontSize="9" fill={fondo}>{cafe.origen.split(",")[0].replace("Mezcla de ", "")}</text>
      <text x="100" y="216" textAnchor="middle" fontFamily="'Work Sans Variable', system-ui, sans-serif" fontSize="8.5" fill={fondo} opacity=".8">250 g · {cafe.tueste.toLowerCase()}</text>
    </svg>
  );
}
