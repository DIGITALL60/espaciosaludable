import { Review } from "../types";

export const REVIEWS: Record<string, Review[]> = {
  "prod-1": [
    { id: "r1-1", autor: "Agos R.", rating: 5, comentario: "La mejor granola que probé. Super crunchy y llena hasta el mediodía. Mi desayuno favorito desde hace 3 meses.", fecha: "2026-04-10", verificado: true },
    { id: "r1-2", autor: "Martina L.", rating: 5, comentario: "Increíble sabor y textura. La mezclo con yogur y frutas y me dura horas de energía.", fecha: "2026-03-22", verificado: true },
    { id: "r1-3", autor: "Sofía R.", rating: 4, comentario: "Muy rica, aunque me gustaría que tuviera un poco menos de miel. El resto es perfecto.", fecha: "2026-03-05", verificado: false },
  ],
  "prod-2": [
    { id: "r2-1", autor: "Carolina M.", rating: 5, comentario: "La textura es perfecta, ni muy líquida ni muy sólida. Solo almendras, sin relleno. Vale cada peso.", fecha: "2026-04-18", verificado: true },
    { id: "r2-2", autor: "Facundo P.", rating: 5, comentario: "La uso en mis pancakes proteicos todos los días. Increíble calidad, se nota que es 100% natural.", fecha: "2026-04-01", verificado: true },
    { id: "r2-3", autor: "Luciana S.", rating: 5, comentario: "Compré el combo y no me arrepiento. La mejor mantequilla de almendras del mercado argentino.", fecha: "2026-02-14", verificado: true },
  ],
  "prod-3": [
    { id: "r3-1", autor: "Tomás B.", rating: 5, comentario: "Refrescante y sutil. Mucho mejor que las kombucha industriales. La de jengibre-limón es mi favorita.", fecha: "2026-04-20", verificado: true },
    { id: "r3-2", autor: "Valeria N.", rating: 4, comentario: "Buena kombucha, buen nivel de fermentación. La del té verde está un poco más ácida de lo que me gusta.", fecha: "2026-03-30", verificado: true },
    { id: "r3-3", autor: "Pablo G.", rating: 5, comentario: "Desde que la empecé a tomar mejoró mucho mi digestión. La pido una vez por semana.", fecha: "2026-02-28", verificado: false },
  ],
  "prod-4": [
    { id: "r4-1", autor: "Ana C.", rating: 5, comentario: "Las semillas activadas hacen una diferencia enorme vs las crudas. Se nota en la digestión.", fecha: "2026-04-15", verificado: true },
    { id: "r4-2", autor: "Rodrigo M.", rating: 4, comentario: "Muy buena mezcla. Las uso en smoothies, ensaladas y yogur. El packaging es conveniente.", fecha: "2026-03-10", verificado: true },
    { id: "r4-3", autor: "Jimena L.", rating: 5, comentario: "Compro estas semillas hace un año. La relación calidad-precio es excelente.", fecha: "2026-02-01", verificado: true },
  ],
  "prod-5": [
    { id: "r5-1", autor: "Diego F.", rating: 4, comentario: "Buen sabor y textura. Me parece un poco caro pero la calidad lo justifica.", fecha: "2026-04-08", verificado: true },
    { id: "r5-2", autor: "Magalí H.", rating: 5, comentario: "Los mejores snacks proteicos del mercado. Ideales para el gym.", fecha: "2026-03-25", verificado: false },
    { id: "r5-3", autor: "Emilio V.", rating: 3, comentario: "Ricos pero muy pequeños para el precio. Esperaba más cantidad.", fecha: "2026-02-18", verificado: true },
  ],
  "prod-6": [
    { id: "r6-1", autor: "Julieta A.", rating: 5, comentario: "TRIBA es inigualable. Probé mil marcas y esta gana por lejos. Apenas maní y sal, nada más.", fecha: "2026-04-22", verificado: true },
    { id: "r6-2", autor: "Nicolás D.", rating: 5, comentario: "La uso en todo: tostadas, smoothies, recetas. La calidad constante en cada pote es lo que más valoro.", fecha: "2026-04-10", verificado: true },
    { id: "r6-3", autor: "Florencia B.", rating: 5, comentario: "Compro la versión crunchy y es adictiva. El precio es justo para la calidad que tiene.", fecha: "2026-03-15", verificado: true },
  ],
  "prod-7": [
    { id: "r7-1", autor: "Hernán P.", rating: 5, comentario: "Las barras de proteína más naturales que encontré. Sin regusto artificial.", fecha: "2026-04-19", verificado: true },
    { id: "r7-2", autor: "Cecilia M.", rating: 4, comentario: "Muy buenas para el trabajo. Las tengo en el cajón del escritorio.", fecha: "2026-03-28", verificado: true },
    { id: "r7-3", autor: "Ariel G.", rating: 5, comentario: "Post entrenamiento perfectas. La de almendra-cacao es la mejor.", fecha: "2026-03-01", verificado: false },
  ],
  "prod-8": [
    { id: "r8-1", autor: "Belén S.", rating: 5, comentario: "El matcha de CHÍA tiene un color increíble y sabe a matcha real, no a polvo de jardín.", fecha: "2026-04-14", verificado: true },
    { id: "r8-2", autor: "Mauro T.", rating: 4, comentario: "Buena calidad, aunque me gustaría más opciones de mezclas (con cúrcuma, por ejemplo).", fecha: "2026-03-20", verificado: true },
    { id: "r8-3", autor: "Natalia C.", rating: 5, comentario: "Lo uso como reemplazo del café. Energía sin nerviosismo. Súper recomendado.", fecha: "2026-02-10", verificado: true },
  ],
  "prod-9": [
    { id: "r9-1", autor: "Franco L.", rating: 4, comentario: "Muy buen açaí, bien intenso. La textura para smoothie bowl es perfecta.", fecha: "2026-04-16", verificado: true },
    { id: "r9-2", autor: "Paula D.", rating: 5, comentario: "El açaí de CHÍA no tiene azúcar añadida y se nota. Mucho más sabroso que otras marcas.", fecha: "2026-03-12", verificado: false },
    { id: "r9-3", autor: "Martín A.", rating: 4, comentario: "Muy bueno, aunque el envase podría ser más grande para el precio.", fecha: "2026-01-30", verificado: true },
  ],
  "prod-10": [
    { id: "r10-1", autor: "Laura V.", rating: 5, comentario: "La mejor proteína vegana del mercado. Sin polvillo, sin gusto raro. Perfecta en smoothies.", fecha: "2026-04-21", verificado: true },
    { id: "r10-2", autor: "Gustavo P.", rating: 5, comentario: "Llevo 6 meses usándola. Ayudó muchísimo en mi progreso en el gym.", fecha: "2026-04-05", verificado: true },
    { id: "r10-3", autor: "Renata M.", rating: 4, comentario: "Muy completa. El sabor vainilla es el mejor de los 3 que probé.", fecha: "2026-02-25", verificado: true },
  ],
  "prod-11": [
    { id: "r11-1", autor: "Alejandro B.", rating: 5, comentario: "Las cookies sin TACC más ricas que probé. Imposible que sean saludables con ese sabor.", fecha: "2026-04-17", verificado: true },
    { id: "r11-2", autor: "Violeta R.", rating: 4, comentario: "Ricas y crocantes. Perfectas con mate.", fecha: "2026-03-22", verificado: true },
    { id: "r11-3", autor: "Sergio N.", rating: 5, comentario: "Mi hijo celíaco las ama. Por fin algo sin TACC que sabe igual que las normales.", fecha: "2026-02-28", verificado: true },
  ],
  "prod-12": [
    { id: "r12-1", autor: "Verónica M.", rating: 5, comentario: "El mejor chocolate vegano que probé. Negro, intenso, sin sabores raros.", fecha: "2026-04-11", verificado: true },
    { id: "r12-2", autor: "Ignacio F.", rating: 4, comentario: "Muy buena calidad. El 70% cacao es mi favorito.", fecha: "2026-03-15", verificado: false },
    { id: "r12-3", autor: "Daniela A.", rating: 5, comentario: "Lo uso en repostería y en snacking. Versátil y delicioso.", fecha: "2026-02-20", verificado: true },
  ],
  "prod-13": [
    { id: "r13-1", autor: "Ricardo L.", rating: 5, comentario: "El muesli más completo del mercado. Sin azúcar añadida y lleno de frutos secos.", fecha: "2026-04-09", verificado: true },
    { id: "r13-2", autor: "Marta S.", rating: 4, comentario: "Muy rico con leche de coco. El packaging cierra bien y conserva el crunch.", fecha: "2026-03-18", verificado: true },
    { id: "r13-3", autor: "Luis C.", rating: 5, comentario: "Lo compro hace meses. Consistencia de calidad en cada bolsa.", fecha: "2026-01-25", verificado: true },
  ],
  "prod-14": [
    { id: "r14-1", autor: "Eugenia P.", rating: 4, comentario: "Muy buenas barritas. El sabor naranja-almendra es mi favorito.", fecha: "2026-04-13", verificado: true },
    { id: "r14-2", autor: "Roberto V.", rating: 5, comentario: "Ideales para viajes y reuniones. Prácticas y deliciosas.", fecha: "2026-03-28", verificado: false },
    { id: "r14-3", autor: "Sandra H.", rating: 4, comentario: "Buenas pero no son tan saciantes como esperaba.", fecha: "2026-02-14", verificado: true },
  ],
  "prod-15": [
    { id: "r15-1", autor: "Carlos M.", rating: 5, comentario: "La pasta de cashew es mi nueva obsesión. Más suave que la de maní.", fecha: "2026-04-20", verificado: true },
    { id: "r15-2", autor: "Florencia N.", rating: 5, comentario: "Textura perfecta, sin aceite de palma ni azúcar. 10 puntos.", fecha: "2026-04-02", verificado: true },
    { id: "r15-3", autor: "Patricio B.", rating: 4, comentario: "Cara pero vale. La uso solo en ocasiones especiales.", fecha: "2026-03-10", verificado: true },
  ],
  "prod-16": [
    { id: "r16-1", autor: "Ana María G.", rating: 5, comentario: "La leche de avena más cremosa del mercado. Perfecta para café y mate.", fecha: "2026-04-18", verificado: true },
    { id: "r16-2", autor: "Javier L.", rating: 4, comentario: "Buena leche, aunque me gustaría con menos azúcar.", fecha: "2026-03-30", verificado: false },
    { id: "r16-3", autor: "Claudia R.", rating: 5, comentario: "Desde que la encontré no vuelvo a la soja. Sabor neutro y textura increíble.", fecha: "2026-02-22", verificado: true },
  ],
  "prod-17": [
    { id: "r17-1", autor: "Maximiliano P.", rating: 5, comentario: "El kéfir de coco es una revolución. Probióticos sin lácteos.", fecha: "2026-04-16", verificado: true },
    { id: "r17-2", autor: "Silvina O.", rating: 4, comentario: "Rico aunque con sabor intenso al principio. Después te acostumbrás y lo amás.", fecha: "2026-03-25", verificado: true },
    { id: "r17-3", autor: "Horacio V.", rating: 5, comentario: "Me cambió la vida digestiva. Lo tomo cada mañana en ayunas.", fecha: "2026-02-08", verificado: true },
  ],
  "prod-18": [
    { id: "r18-1", autor: "Norma C.", rating: 5, comentario: "El único pan sin TACC que tiene textura real. No se desmorona.", fecha: "2026-04-14", verificado: true },
    { id: "r18-2", autor: "Alberto D.", rating: 4, comentario: "Muy bueno. Tostado está perfecto.", fecha: "2026-03-20", verificado: true },
    { id: "r18-3", autor: "Marcela S.", rating: 5, comentario: "Mi marido celíaco finalmente puede disfrutar un buen pan. Gracias CHÍA.", fecha: "2026-02-15", verificado: true },
  ],
  "prod-19": [
    { id: "r19-1", autor: "Gabriel M.", rating: 5, comentario: "El aceite de coco extra virgen de CHÍA tiene olor y sabor auténtico. Nada que ver con otros.", fecha: "2026-04-12", verificado: true },
    { id: "r19-2", autor: "Patricia L.", rating: 4, comentario: "Muy bueno para cocinar y para la piel. Doble uso.", fecha: "2026-03-18", verificado: false },
    { id: "r19-3", autor: "Fernando A.", rating: 5, comentario: "El mejor aceite para dieta keto. Calidad impresionante.", fecha: "2026-02-05", verificado: true },
  ],
  "prod-20": [
    { id: "r20-1", autor: "Romina P.", rating: 5, comentario: "La granola de chocolate es un pecado divino. No puedo parar de comerla.", fecha: "2026-04-19", verificado: true },
    { id: "r20-2", autor: "Leandro M.", rating: 4, comentario: "Muy rica aunque un poco dulce para mi gusto.", fecha: "2026-03-26", verificado: true },
    { id: "r20-3", autor: "Adriana G.", rating: 5, comentario: "La mezcla granola + chocolate es perfecta. Mi desayuno favorito.", fecha: "2026-03-08", verificado: true },
  ],
  "prod-21": [
    { id: "r21-1", autor: "Eduardo V.", rating: 5, comentario: "El té adaptógeno de CHÍA es una maravilla. Claridad mental sin el nerviosismo del café.", fecha: "2026-04-21", verificado: true },
    { id: "r21-2", autor: "Inés R.", rating: 4, comentario: "El sabor es suave y agradable. Lo tomo antes de trabajar.", fecha: "2026-04-01", verificado: true },
    { id: "r21-3", autor: "Santiago B.", rating: 5, comentario: "Ashwagandha + reishi es la combinación perfecta para el estrés.", fecha: "2026-02-25", verificado: false },
  ],
  "prod-22": [
    { id: "r22-1", autor: "Graciela M.", rating: 5, comentario: "Los alfajores sin TACC de CHÍA son mejor que muchos con gluten. Impresionante.", fecha: "2026-04-17", verificado: true },
    { id: "r22-2", autor: "Ramiro F.", rating: 5, comentario: "El relleno es cremoso y el dulce de leche es real. Calidad de verdad.", fecha: "2026-03-30", verificado: true },
    { id: "r22-3", autor: "Susana V.", rating: 4, comentario: "Muy ricos, aunque me gustaría que el paquete tenga más unidades.", fecha: "2026-03-12", verificado: true },
  ],
  "prod-23": [
    { id: "r23-1", autor: "Jorge P.", rating: 5, comentario: "La pasta de avellanas es luxuosa. 10 veces mejor que Nutella y sin los ingredientes malos.", fecha: "2026-04-22", verificado: true },
    { id: "r23-2", autor: "Miriam S.", rating: 5, comentario: "La uso en tostadas, yogur y directo a la cuchara. Es irresistible.", fecha: "2026-04-08", verificado: true },
    { id: "r23-3", autor: "Gustavo L.", rating: 4, comentario: "Cara pero completamente justificada. El sabor es inigualable.", fecha: "2026-03-15", verificado: true },
  ],
  "prod-24": [
    { id: "r24-1", autor: "Liliana C.", rating: 5, comentario: "El caldo de huesos de CHÍA es lo que le faltaba a mi cocina. Gelatinoso y nutritivo.", fecha: "2026-04-20", verificado: true },
    { id: "r24-2", autor: "Oscar M.", rating: 4, comentario: "Muy buen caldo. Lo uso en sopas y para cocinar arroz. Da un sabor increíble.", fecha: "2026-03-28", verificado: true },
    { id: "r24-3", autor: "Elena B.", rating: 5, comentario: "Desde que lo incorporé a mi dieta mejoró mi recuperación muscular.", fecha: "2026-02-20", verificado: true },
  ],
};
