import { BlogPost } from "../types";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    titulo: "Por qué la proteína es el nutriente más importante de tu día",
    extracto:
      "Descubrí cómo la proteína impacta tu energía, saciedad y composición corporal. Guía completa para saber cuánta necesitás.",
    contenido: `La proteína es mucho más que el nutriente favorito de los deportistas. Es el bloque fundamental de cada célula de tu cuerpo, desde los músculos hasta las enzimas digestivas y las hormonas que regulan tu humor.

## ¿Cuánta proteína necesitás?

La recomendación general es de 0,8g por kilo de peso corporal para una persona sedentaria. Pero si hacés ejercicio regularmente, esto puede subir a 1,6-2,2g por kilo. Una persona de 65kg activa necesitaría entre 104g y 143g de proteína diaria.

## Fuentes de proteína real (sin procesar)

No toda proteína es igual. Priorizá fuentes completas:
- **Pasta de maní y frutos secos**: entre 20-25g por cada 100g
- **Legumbres (lentejas, garbanzos)**: 9-18g cada 100g
- **Quinoa**: la única proteína vegetal completa, 8g cada 100g
- **Huevos**: 13g por 100g, con todos los aminoácidos esenciales
- **Yogur natural griego**: 10g por 100g

## El mito del exceso de proteína

Durante años se dijo que comer mucha proteína era malo para los riñones. Esto solo aplica en personas con enfermedad renal preexistente. Para la población general sana, las dietas altas en proteína son seguras y beneficiosas.

## Cómo distribuir la proteína en el día

Lo más eficiente es distribuirla en 3-4 comidas de 25-40g cada una. Esto maximiza la síntesis proteica muscular y te mantiene saciado durante más tiempo.

**Ejemplo de día proteico con CHÍA:**
- Desayuno: Bowl de granola + yogur (28g)
- Almuerzo: Ensalada de quinoa con garbanzos (32g)
- Merienda: Energy balls de maní (12g)
- Cena: Proteína animal o vegetal + semillas (35g)`,
    autor: "Dra. Valentina Moreno",
    fecha: "2026-04-15",
    imagen: "https://picsum.photos/seed/blog-protein/800/500",
    categoria: "nutricion",
    tags: ["proteína", "nutrición", "salud", "dieta"],
  },
  {
    id: "post-2",
    titulo: "Guía definitiva para leer etiquetas nutricionales",
    extracto:
      "Aprendé a descifrar las letras pequeñas de los productos que comprás. Lo que los fabricantes no quieren que veas.",
    contenido: `El 80% de los consumidores mira las etiquetas pero no sabe interpretarlas correctamente. Esta guía te da las herramientas para tomar decisiones informadas.

## Lo primero: el tamaño de porción

Es el truco más viejo del libro. El tamaño de porción puede ser artificialmente pequeño para que los números parezcan mejores. Siempre multiplicá los valores por las porciones que vas a comer realmente.

## Los ingredientes: el orden importa

Los ingredientes se listan de mayor a menor cantidad. Si el azúcar aparece en los primeros 3 lugares, ese producto tiene mucha azúcar, sin importar lo que diga el frente del envase.

## Los nombres del azúcar

El azúcar se esconde bajo más de 60 nombres diferentes. Los más comunes:
- Jarabe de maíz de alta fructosa
- Dextrosa, maltosa, lactosa
- Concentrado de jugo de fruta
- Azúcar invertido
- Melaza, miel, agave

## Grasas: las buenas vs las malas

Evitá grasas trans (aceites parcialmente hidrogenados). Las grasas saturadas no son el demonio que se creía — en cantidades moderadas son parte de una dieta equilibrada. Las grasas insaturadas (omega-3, omega-6) son tus aliadas.

## El sello "Sin sellos" en Argentina

Desde 2023, los productos en Argentina que superan ciertos umbrales de grasas saturadas, sodio, azúcares y calorías deben llevar sellos de advertencia. Un producto SIN sellos cumple con todos los parámetros saludables. En CHÍA, todos nuestros productos sin-sellos están claramente identificados.`,
    autor: "Lic. Camila Rodríguez",
    fecha: "2026-03-28",
    imagen: "https://picsum.photos/seed/blog-labels/800/500",
    categoria: "nutricion",
    tags: ["etiquetas", "consumo consciente", "sin sellos", "salud"],
  },
  {
    id: "post-3",
    titulo: "Meal prep saludable: cómo organizarte para la semana",
    extracto:
      "Preparar tu comida de la semana los domingos no es solo para fitness influencers. Te enseñamos cómo hacerlo realista y delicioso.",
    contenido: `El meal prep no tiene que ser una carga. Con la estrategia correcta, podés preparar la base de 10-15 comidas en 2 horas de domingo.

## El principio del componente

En lugar de preparar platos completos, preparás componentes que se combinan de diferentes formas:

**Proteínas base (elegí 2)**
- Pollo al horno con especias
- Lentejas cocidas
- Huevos duros
- Garbanzos asados

**Carbohidratos complejos (elegí 2)**
- Quinoa cocida
- Batata asada
- Arroz integral

**Grasas saludables (siempre disponibles)**
- Pasta de frutos secos CHÍA
- Palta fresca
- Semillas activadas

## La regla del batch

Cocinás el triple de lo que necesitás para una comida. El freezer es tu mejor amigo.

## Desayunos sin pensar

Preparate 5 porciones de overnight oats el domingo y tenés el desayuno listo toda la semana. Solo necesitás:
- Avena
- Leche de almendras
- Frutas congeladas
- 1 cda de granola CHÍA para agregar al momento

## Snacks pre-armados

Dividí en porciones individuales:
- 30g de mix de frutos secos
- Energy balls (duran 7 días en heladera)
- Bastones de vegetales con hummus`,
    autor: "María Fernanda Lopéz",
    fecha: "2026-03-10",
    imagen: "https://picsum.photos/seed/blog-mealprep/800/500",
    categoria: "lifestyle",
    tags: ["meal prep", "organización", "lifestyle", "batch cooking"],
  },
  {
    id: "post-4",
    titulo: "Sin TACC: vivir sin gluten sin perder el sabor",
    extracto:
      "Una guía práctica para quienes tienen celiaquía o sensibilidad al gluten. Desde qué evitar hasta las mejores alternativas.",
    contenido: `Argentina tiene una de las tasas más altas de celiaquía del mundo: 1 en 100 personas. Pero vivir sin gluten hoy es más sencillo y delicioso que nunca.

## ¿Qué es realmente el gluten?

El gluten es una proteína presente en trigo, centeno, cebada y avena (por contaminación cruzada). En personas celíacas, su consumo genera una respuesta autoinmune que daña el intestino delgado.

## Lo que tenés que eliminar completamente

- Pan, pasta y galletas de trigo
- Cerveza (con excepciones sin TACC)
- Salsas de soja convencionales
- Embutidos con aditivos de gluten
- Alimentos con trazas de TACC

## Las mejores alternativas naturales

La naturaleza ya ofrece ingredientes 100% sin gluten:
- **Quinoa**: la más completa nutricionalmente
- **Arroz y maíz**: bases versátiles
- **Mijo y sorgo**: menos conocidos pero excelentes
- **Frutos secos y semillas**: todos libres de gluten
- **Legumbres**: lentejas, garbanzos, porotos

## Contaminación cruzada: el riesgo invisible

Una miga de pan convencional puede generar reacción en un celíaco. En casa, tenés un toaster, colador y tabla exclusivos. Fuera de casa, preguntá siempre por los protocolos de cocina.

## El sello sin TACC en Argentina

En Argentina, los productos sin TACC certificados llevan el símbolo de la espiga barrada. CHÍA trabaja con proveedores certificados y muchos de nuestros productos tienen esta certificación.`,
    autor: "Lic. Santiago Gutiérrez",
    fecha: "2026-02-20",
    imagen: "https://picsum.photos/seed/blog-tacc/800/500",
    categoria: "lifestyle",
    tags: ["sin TACC", "celiaquía", "gluten", "alimentación"],
  },
  {
    id: "post-5",
    titulo: "La kombucha y la salud intestinal: lo que dice la ciencia",
    extracto:
      "¿Es realmente la kombucha el superalimento que dicen? Revisamos la evidencia científica detrás de la bebida fermentada más popular.",
    contenido: `La kombucha es hoy uno de los alimentos fermentados más populares del mundo. Pero ¿qué dice realmente la ciencia sobre sus beneficios?

## Qué es y cómo se hace

La kombucha es té negro o verde fermentado con un cultivo simbiótico de bacterias y levaduras (SCOBY). La fermentación dura entre 7 y 30 días y produce:
- Ácidos orgánicos (acético, glucónico)
- Vitaminas del grupo B
- Enzimas digestivas
- Probióticos

## Los beneficios que tienen evidencia

**Microbiota intestinal**: Los estudios muestran que los probióticos de la kombucha pueden aumentar la diversidad bacteriana del intestino, lo cual se asocia con mejor salud general.

**Antioxidantes**: Al derivar del té, mantiene parte de sus polifenoles antioxidantes, incluso después de la fermentación.

**Digestión**: Los ácidos orgánicos y enzimas pueden facilitar la digestión en algunas personas.

## Lo que todavía no está probado

La mayoría de los estudios son en animales o in vitro. Los estudios en humanos son pequeños. No hay evidencia sólida de que cure enfermedades ni que sea un "superalimento" en el sentido marketinero.

## Cuánta tomar y cuándo

200-400ml diarios es una cantidad razonable para empezar. Tomarla antes de las comidas puede mejorar la digestión. Empezá de a poco si no estás acostumbrado a los fermentados.

## Nuestra kombucha

En CHÍA seleccionamos la Kombucha Original con fermentación artesanal, baja en azúcar (menos de 3g por 100ml) y con cultivos vivos activos.`,
    autor: "Dr. Tomás Beltrán",
    fecha: "2026-01-15",
    imagen: "https://picsum.photos/seed/blog-kombucha/800/500",
    categoria: "nutricion",
    tags: ["kombucha", "probióticos", "intestino", "fermentados"],
  },
];
