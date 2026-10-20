/** Catálogo ficticio de Tostaduría Ceniza (demo de AMOXTLI®). */
export type Metodo = "espresso" | "moka" | "prensa francesa" | "filtro (V60 o Chemex)" | "cafetera de goteo" | "cold brew";

export interface Cafe {
  slug: string;
  nombre: string;
  origen: string;
  proceso: "Lavado" | "Natural" | "Honey" | "Mezcla" | "Descafeinado";
  tueste: "Claro" | "Medio" | "Oscuro";
  notas: string[];
  cuerpo: 1 | 2 | 3 | 4 | 5;
  acidez: 1 | 2 | 3 | 4 | 5;
  metodos: Metodo[];
  precio: number; // MXN, bolsa de 250 g
  historia: string;
  bolsa: { fondo: string; tinta: string; marca: string };
}

export const CAFES: Cafe[] = [
  {
    slug: "niebla",
    nombre: "Niebla",
    origen: "Chiapas",
    proceso: "Lavado",
    tueste: "Medio",
    notas: ["chocolate amargo", "nuez", "naranja"],
    cuerpo: 4,
    acidez: 2,
    metodos: ["cafetera de goteo", "prensa francesa", "moka"],
    precio: 165,
    historia: "El café de diario de la casa. Cuerpo redondo y poca acidez: sabe a café y no pide explicaciones.",
    bolsa: { fondo: "#4D5A2F", tinta: "#FBF4E6", marca: "#C4501F" },
  },
  {
    slug: "pico-verde",
    nombre: "Pico Verde",
    origen: "Coatepec, Veracruz",
    proceso: "Lavado",
    tueste: "Medio",
    notas: ["caramelo", "nuez", "manzana verde"],
    cuerpo: 3,
    acidez: 3,
    metodos: ["filtro (V60 o Chemex)", "cafetera de goteo", "prensa francesa"],
    precio: 175,
    historia: "Dulce al principio y con una acidez limpia al final. Buen primer paso si quieres salir del café oscuro.",
    bolsa: { fondo: "#F1E4CF", tinta: "#261710", marca: "#4D5A2F" },
  },
  {
    slug: "barranca",
    nombre: "Barranca",
    origen: "Pluma Hidalgo, Oaxaca",
    proceso: "Natural",
    tueste: "Medio",
    notas: ["frutos rojos", "mango", "vino tinto"],
    cuerpo: 3,
    acidez: 4,
    metodos: ["filtro (V60 o Chemex)", "cold brew"],
    precio: 210,
    historia: "Secado con la fruta, por eso huele a mermelada antes de moler. Frío, con hielo, es el más fácil de querer.",
    bolsa: { fondo: "#9E3B12", tinta: "#FBF4E6", marca: "#F1E4CF" },
  },
  {
    slug: "humo-suave",
    nombre: "Humo Suave",
    origen: "Guerrero",
    proceso: "Honey",
    tueste: "Medio",
    notas: ["miel de piloncillo", "durazno", "canela"],
    cuerpo: 4,
    acidez: 2,
    metodos: ["prensa francesa", "cafetera de goteo", "cold brew"],
    precio: 195,
    historia: "Dulzor de panadería sin azúcar. Va bien con leche y aguanta el cold brew sin amargarse.",
    bolsa: { fondo: "#C4501F", tinta: "#FBF4E6", marca: "#261710" },
  },
  {
    slug: "casa-ceniza",
    nombre: "Casa Ceniza",
    origen: "Mezcla de Chiapas y Veracruz",
    proceso: "Mezcla",
    tueste: "Oscuro",
    notas: ["cacao", "tostado", "caramelo quemado"],
    cuerpo: 5,
    acidez: 1,
    metodos: ["espresso", "moka"],
    precio: 155,
    historia: "La mezcla para espresso y cafetera italiana. Crema espesa, sabor largo y casi nada de acidez.",
    bolsa: { fondo: "#261710", tinta: "#F1E4CF", marca: "#C4501F" },
  },
  {
    slug: "flor-de-tarde",
    nombre: "Flor de Tarde",
    origen: "Cuetzalan, Puebla",
    proceso: "Lavado",
    tueste: "Claro",
    notas: ["jazmín", "limón", "té negro"],
    cuerpo: 2,
    acidez: 5,
    metodos: ["filtro (V60 o Chemex)"],
    precio: 225,
    historia: "Ligero y aromático, parecido a un té. Pide agua limpia y paciencia en el filtro; no es para quien busca algo intenso.",
    bolsa: { fondo: "#FBF4E6", tinta: "#261710", marca: "#4D5A2F" },
  },
  {
    slug: "marea",
    nombre: "Marea",
    origen: "Chiapas",
    proceso: "Descafeinado",
    tueste: "Medio",
    notas: ["chocolate con leche", "avellana", "galleta"],
    cuerpo: 3,
    acidez: 2,
    metodos: ["cafetera de goteo", "prensa francesa", "moka"],
    precio: 215,
    historia: "Descafeinado con agua, sin solventes. Para la taza de la noche sin quedarte despierto.",
    bolsa: { fondo: "#7A5A45", tinta: "#FBF4E6", marca: "#F1E4CF" },
  },
];

export const getCafe = (slug: string) => CAFES.find((c) => c.slug === slug);

export const catalogoComoTexto = () =>
  CAFES.map(
    (c) =>
      `- ${c.nombre} (${c.slug}): ${c.origen}; proceso ${c.proceso}; tueste ${c.tueste}; notas ${c.notas.join(", ")}; cuerpo ${c.cuerpo}/5; acidez ${c.acidez}/5; ideal para ${c.metodos.join(", ")}; $${c.precio} MXN por 250 g. ${c.historia}`,
  ).join("\n");

/** Respuesta guionada cuando no hay clave de Claude: recomienda con reglas sobre el mismo catálogo. */
export function recomendarLocal(pregunta: string): string {
  const q = pregunta.toLowerCase();
  const pick = (slug: string, porque: string) => {
    const c = getCafe(slug)!;
    return `Te recomiendo ${c.nombre} (${c.origen}, $${c.precio} MXN por 250 g). ${porque} Notas: ${c.notas.join(", ")}.`;
  };
  if (/espresso|italiana|moka/.test(q)) return pick("casa-ceniza", "Es nuestra mezcla pensada para espresso y cafetera italiana, con cuerpo alto y casi sin acidez.");
  if (/descafe|noche|cafe[ií]na|dormir/.test(q)) return pick("marea", "Es el descafeinado, procesado con agua, y sabe a chocolate con leche.");
  if (/frío|frio|hielo|cold/.test(q)) return pick("barranca", "En cold brew resalta la fruta roja y se siente casi como una bebida de frutas.");
  if (/leche|dulce|postre/.test(q)) return pick("humo-suave", "Su dulzor de piloncillo se lleva muy bien con leche.");
  if (/ligero|té|te |floral|ácido|acido|filtro|v60|chemex/.test(q)) return pick("flor-de-tarde", "Es el más ligero y floral; funciona mejor en filtro.");
  if (/fuerte|intenso|oscuro|amargo/.test(q)) return pick("niebla", "Tiene cuerpo alto y poca acidez, con chocolate amargo al fondo.");
  if (/regalo|primer|empezar|nuevo/.test(q)) return pick("pico-verde", "Es dulce y fácil de tomar, buen primer paso fuera del café oscuro.");
  return pick("niebla", "Es el café de diario de la casa: redondo, poca acidez y se adapta a casi cualquier cafetera.") + " Si me dices cómo lo preparas (goteo, prensa, espresso, filtro) afino la recomendación.";
}
