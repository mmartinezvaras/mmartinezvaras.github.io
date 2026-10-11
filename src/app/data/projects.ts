// Para añadir un proyecto: copia un bloque, cambia sus datos y listo. No hay que tocar componentes.
// Escribe pensando en alguien que no es técnico (por ejemplo, un reclutador de RRHH):
// - problem: el problema real en una frase sencilla. Es el titular del proyecto.
// - impact: qué consigue. Es lo único que va en el color de acento.
//     value: corto y llamativo ("1 de cada 2", "Cita la página"). label: lo explica en una frase.
//     Nunca inventes una cifra: si no la has medido, usa una frase cierta.
// - how: cómo funciona, en lenguaje llano.
// - tech: detalles técnicos para quien sí lo es (se muestran plegados). Explica cada término.
// - decisions / next / image: opcionales (decisiones clave, siguientes pasos y captura).
// - featured: true solo en UN proyecto, el principal.
// Entre un número y "%" pon un espacio que no se parte (Alt+0160) para que no se separen.
export type Area = 'IA generativa' | 'Big Data' | 'IA y ML' | 'Desarrollo';

export interface Project {
  slug: string;
  name: string;
  area: Area;
  status?: string;
  featured?: boolean;
  problem: string;
  impact: { value: string; label: string };
  how: string;
  tech: { title: string; text: string }[];
  stack: string[];
  repo: string;
  demo?: string;
  // Opcionales: solo se muestran si existen. Sácalos de los README de cada repo.
  decisions?: string[];
  next?: string[];
  image?: { src: string; alt: string; width: number; height: number };
}

export const areas: Area[] = ['IA generativa', 'Big Data', 'IA y ML', 'Desarrollo'];

export const projects: Project[] = [
  {
    slug: 'rag-pdfs',
    featured: true,
    name: 'Asistente para PDFs (RAG)',
    area: 'IA generativa',
    problem:
      'Buscar un dato en un documento largo obliga a leerlo entero, y un chatbot normal se inventa la respuesta.',
    impact: {
      value: 'Cita la página',
      label: 'Cada respuesta dice de qué documento y página sale, para que puedas comprobarla.',
    },
    how:
      'Parte los PDFs en trozos, los guarda en una base de datos que busca por significado (no por palabras exactas) y le pasa los 5 trozos más parecidos a una IA que se ejecuta en el propio ordenador. Esa IA solo puede responder con lo que dicen los documentos, y por defecto ningún documento sale de la máquina.',
    tech: [
      {
        title: 'Datos',
        text: 'PDFs de ejemplo (reglamentos de fútbol y de Fórmula 1) divididos en fragmentos de 800 caracteres que se solapan 80, para no cortar una idea por la mitad.',
      },
      {
        title: 'Búsqueda',
        text: 'Cada fragmento se convierte en una lista de números que representa su significado (embeddings locales con nomic-embed-text en Ollama; AWS Bedrock como opción) y se guarda en ChromaDB. Al preguntar, se recuperan los 5 fragmentos más parecidos.',
      },
      {
        title: 'Respuesta',
        text: 'Llama 3.2 3B en local con Ollama (temperatura 0, se puede cambiar por otro modelo, como Mistral) responde usando solo esos fragmentos e indica su origen: documento, página y fragmento. Al añadir PDFs nuevos solo se procesa lo nuevo, sin duplicados.',
      },
      {
        title: 'Pruebas',
        text: 'Tests con pytest y evaluación LLM-as-judge (el propio modelo comprueba si la respuesta coincide con la esperada), que se ejecutan de principio a fin en GitHub Actions en cada cambio. Parte de un proyecto de referencia que adapté.',
      },
      {
        title: 'Demo',
        text: 'Interfaz web en Streamlit que se abre en GitHub Codespaces con un clic, sin instalar nada. Admite preguntas en español o inglés y subir tus propios PDF.',
      },
    ],
    stack: ['Python', 'LangChain', 'ChromaDB', 'Ollama', 'Streamlit', 'Llama 3.2', 'pytest'],
    decisions: [
      'Fragmentos de 800 caracteres con un 10 % de solapamiento: lo bastante pequeños para recuperar pasajes precisos sin cortar frases.',
      'Recuperar 5 fragmentos: contexto suficiente para respuestas de varias partes sin saturar el prompt.',
      'ChromaDB local y persistente: cero infraestructura, y la base sobrevive a los reinicios.',
      'Modelo e embeddings en local con Ollama: funciona sin conexión en un portátil y gratis.',
    ],
    next: [
      'Devolver la puntuación de relevancia de cada fuente y descartar los fragmentos poco parecidos.',
      'Un conjunto de evaluación mayor para medir el porcentaje de acierto entre documentos.',
      'Búsqueda híbrida (palabras clave + vectores) para nombres y cifras exactas.',
    ],
    demo: 'https://codespaces.new/mmartinezvaras/Python-RAG-AI-para-los-PDFs?quickstart=1',
    image: {
      src: 'https://raw.githubusercontent.com/mmartinezvaras/Python-RAG-AI-para-los-PDFs/HEAD/docs/demo.png',
      alt: 'Demo web respondiendo a una pregunta y citando sus fuentes',
      width: 1280,
      height: 900,
    },
    repo: 'https://github.com/mmartinezvaras/Python-RAG-AI-para-los-PDFs',
  },
  {
    slug: 'ml-partidos',
    name: 'Predicción de partidos de La Liga',
    area: 'IA y ML',
    problem: 'Predecir quién gana un partido de fútbol es difícil: hay mucho azar.',
    impact: {
      value: '1 de cada 2',
      label: 'Cuando predice que un equipo ganará, acierta la mitad de las veces. Al azar serían menos de 4 de cada 10.',
    },
    how:
      'Aprende de los 380 partidos de La Liga 2025-26. Se entrena con los partidos hasta diciembre y se pone a prueba con los de 2026, como si no los conociera. Lo que más le ayudó fue saber cómo había jugado cada equipo en sus 3 últimos partidos.',
    tech: [
      {
        title: 'Datos',
        text: '380 partidos (760 registros, uno por equipo y partido) con goles, tiros, tiros a puerta, faltas, córners y tarjetas.',
      },
      {
        title: 'Modelo',
        text: 'Random Forest de scikit-learn con local o visitante, rival, hora y día de la semana como variables. Entrenamiento hasta diciembre de 2025 y prueba desde el 1 de enero de 2026, sin usar datos del futuro.',
      },
      {
        title: 'Mejora clave',
        text: 'Añadir la media de los 3 partidos anteriores de cada equipo (calculada sin incluir el propio partido, para no hacer trampa) subió la precisión al predecir victorias del 46,4 % al 51,5 %.',
      },
      {
        title: 'Cuando se moja',
        text: 'En los 33 enfrentamientos en los que el modelo dio ganador a un solo equipo, acertó 18 (54,5 %).',
      },
      {
        title: 'Por qué precisión y no accuracy',
        text: 'La precisión mide cuántas de sus predicciones de victoria se cumplen. En los partidos de prueba solo el 38 % fueron victorias, así que decir siempre «no gana» ya daría mucha accuracy sin servir para nada. Acertar el 51,5 % de las victorias que predice es una mejora real sobre el azar.',
      },
    ],
    stack: ['Python', 'pandas', 'scikit-learn', 'Jupyter'],
    repo: 'https://github.com/mmartinezvaras/MLpartidosPremier',
  },
  {
    slug: 'banking-lakehouse',
    name: 'Banco simulado para detectar fraude',
    area: 'Big Data',
    status: 'En desarrollo',
    problem:
      'Los bancos tienen que detectar movimientos sospechosos, pero los datos de clientes reales son privados y no se pueden usar para practicar.',
    impact: {
      value: '1 de cada 800',
      label: 'movimientos es un fraude, escondido entre 50.062 transacciones de un banco ficticio. Raro y difícil de ver, como en la vida real.',
    },
    how:
      'Un programa crea 1.000 clientes inventados y seis meses de movimientos, y mete 62 fraudes en 10 ráfagas. Siempre genera exactamente los mismos datos, y cada cambio en el código se comprueba automáticamente.',
    tech: [
      {
        title: 'Hecho',
        text: 'Generador en Python con Faker: 1.000 clientes, 50.062 transacciones de enero a junio de 2026 y 62 fraudes en 10 ráfagas (0,12 %). Semilla fija (42) para que el resultado sea reproducible. Tests con pytest en cada push con GitHub Actions.',
      },
      {
        title: 'Planificado',
        text: 'Ingesta y limpieza con PySpark en capas Bronze, Silver y Gold, almacenamiento en Parquet y tablas Delta Lake.',
      },
      {
        title: 'Planificado · fraude',
        text: 'Reglas con funciones de ventana, que comparan cada movimiento con los anteriores del mismo cliente (lag/lead y totales acumulados).',
      },
    ],
    stack: ['Python', 'Faker', 'pytest', 'GitHub Actions'],
    decisions: [
      'Reproducir lo que hace difícil el fraude real: es raro, llega en ráfagas y se esconde entre muchos pagos normales.',
      'El número de ráfagas crece con el volumen de datos (una por cada 5.000 transacciones), así que el problema escala igual.',
      'Semilla fija: cualquiera obtiene exactamente el mismo dataset en su máquina.',
    ],
    next: [
      'Ingesta y limpieza con PySpark (Bronze → Silver).',
      'Almacenamiento en Parquet particionado y tablas Delta Lake (Gold).',
      'Detección de fraude con funciones de ventana y diagrama de arquitectura.',
    ],
    repo: 'https://github.com/mmartinezvaras/banking-lakehouse-pyspark',
  },
  {
    slug: 'nosql-financiero',
    name: 'Base de datos bancaria en la nube',
    area: 'Big Data',
    problem: 'Un banco necesita consultar al momento los saldos y movimientos de sus clientes.',
    impact: {
      value: 'Saldo medio en una consulta',
      label: 'Calcula indicadores como el saldo medio por tipo de cuenta de una sola vez, sin recorrer cliente a cliente.',
    },
    how:
      'Guarda cada cliente como una ficha con sus datos, su dirección y su lista de movimientos dentro, en una base de datos en la nube, y usa índices (como el índice de un libro) para encontrar clientes rápido.',
    tech: [
      {
        title: 'Modelo de datos',
        text: 'Documentos JSON en MongoDB Atlas (en AWS): tipo de cuenta y saldo son campos simples, y la dirección (objeto) y las transacciones (lista) van embebidas. Los movimientos nuevos se añaden con $push.',
      },
      {
        title: 'Consultas',
        text: 'Filtros por rango de saldo e índices simples y compuestos para acelerar las búsquedas.',
      },
      {
        title: 'Agregaciones',
        text: 'Pipelines con $match, $group, $sort, $project y $count, y extremos con $min y $max, para obtener saldos medios e indicadores.',
      },
      {
        title: 'Buenas prácticas',
        text: '33 pasos documentados en un notebook. La cadena de conexión (MONGO_URI) se lee de una variable de entorno, no va en el código.',
      },
    ],
    stack: ['Python', 'PyMongo', 'MongoDB Atlas', 'Google Colab'],
    repo: 'https://github.com/mmartinezvaras/nosql-financial-engine',
  },
  {
    slug: 'reconocimiento-facial',
    name: 'Asistencia con reconocimiento facial',
    area: 'IA y ML',
    problem: 'Pasar lista a mano lleva tiempo y es fácil de falsear.',
    impact: {
      value: 'Basta con mirar a la cámara',
      label: 'Registra quién ha llegado y a qué hora, una sola vez al día por persona.',
    },
    how:
      'Compara cada cara con las fotos de las personas registradas y apunta el nombre y la hora en una hoja de cálculo diaria. La hoja se consulta en una web que no la sube a ningún servidor.',
    tech: [
      {
        title: 'Reconocimiento',
        text: 'OpenCV captura el vídeo y face_recognition (dlib) convierte cada cara en un vector de 128 números. Se acepta la persona más parecida solo si está dentro de un umbral de distancia; si no, queda como desconocida.',
      },
      {
        title: 'Rendimiento',
        text: 'Cada imagen se reduce al 25 % y se analiza una de cada dos, para que funcione en tiempo real en un portátil.',
      },
      {
        title: 'Registro y visor',
        text: 'Un CSV por día con una entrada por persona. Una web en Angular abre el CSV y lo procesa solo en el navegador.',
      },
      {
        title: 'Uso responsable',
        text: 'Las caras son datos biométricos protegidos por el RGPD. Un uso real necesitaría consentimiento explícito, almacenamiento cifrado y una política de conservación. Es una demo técnica con fotos públicas.',
      },
    ],
    stack: ['Python', 'OpenCV', 'face_recognition', 'NumPy', 'Angular'],
    repo: 'https://github.com/mmartinezvaras/Reconocimiento_Facial',
  },
  {
    slug: 'hdfs-docker',
    name: 'Clúster HDFS en Docker',
    area: 'Big Data',
    status: 'Práctica del curso',
    problem: 'Para practicar Big Data hace falta un clúster de varias máquinas, y montarlo de verdad es caro.',
    impact: {
      value: '4 nodos',
      label: 'Un clúster Hadoop (1 nodo principal y 3 de datos) que arranca en un ordenador con Docker.',
    },
    how:
      'El entorno lo proporcionó el curso: Docker levanta varias «máquinas» que se reparten los ficheros como en un clúster real. Sobre él hice las prácticas de análisis de datos con pandas.',
    tech: [
      {
        title: 'Entorno (del curso)',
        text: 'Hadoop 3.4.2 en Docker Compose: un NameNode y tres DataNodes, con replicación 2 y bloques de 16 MB.',
      },
      {
        title: 'Prácticas',
        text: 'Análisis exploratorio con pandas y Matplotlib en notebooks sobre datos de clientes.',
      },
    ],
    stack: ['Hadoop HDFS', 'Docker', 'pandas', 'Matplotlib', 'Jupyter'],
    repo: 'https://github.com/mmartinezvaras/s_aprendizaje',
  },
  {
    slug: 'tfg-restaurante',
    name: 'App de pedidos para restaurante (TFG)',
    area: 'Desarrollo',
    problem: 'En un restaurante lleno, esperar para pedir y para pagar es lo que más molesta.',
    impact: {
      value: 'Pide y paga sin esperar',
      label: 'Los comensales se unen a una mesa con un código, piden juntos y cada uno paga lo suyo. El camarero valida el pago con un QR.',
    },
    how:
      'Cada comensal entra con su nombre y el código de la mesa. El pedido es compartido, pero cada plato guarda quién lo pidió, así que la cuenta se divide por persona. Un servidor guarda todo en una base de datos.',
    tech: [
      {
        title: 'Web',
        text: 'Angular 21 con renderizado en servidor y PrimeNG: menú por categorías con buscador, carrito que se actualiza cada 12 segundos, pago y factura en PDF.',
      },
      {
        title: 'Pago seguro',
        text: 'La factura viaja en un QR codificado en Base64-URL con un token aleatorio de 192 bits, que el camarero escanea para validarla.',
      },
      {
        title: 'Servidor',
        text: 'API REST en Spring Boot 4 (Java 25) por capas: controladores, servicios y repositorios. Incluye un simulador de cocina que revisa los pedidos pendientes.',
      },
      {
        title: 'Datos',
        text: 'MySQL con Spring Data JPA. Entidades: Sala (la mesa compartida), Persona, Item, Pedido y ListaPedido (cada línea del pedido con quién la pidió).',
      },
    ],
    stack: ['Angular', 'PrimeNG', 'Spring Boot', 'Java', 'MySQL'],
    next: [
      'Sustituir el sondeo cada 12 segundos por WebSockets o Server-Sent Events para actualizar el carrito al instante.',
      'Integrar un pago real (Stripe en modo de pruebas) y firmar el contenido del QR.',
      'Un panel de cocina para el personal en lugar del simulador.',
    ],
    repo: 'https://github.com/mmartinezvaras/TFGangular',
  },
  {
    slug: 'gestion-reventa',
    name: 'Panel de reventa de auriculares',
    area: 'Desarrollo',
    problem:
      'Revender auriculares en Wallapop, Vinted o eBay parece rentable hasta que sumas envíos, comisiones y lo que no se vende.',
    impact: {
      value: 'Margen real por producto',
      label: 'Un panel muestra el stock, las ventas y cuánto ganas de verdad con cada producto, con todos los gastos descontados.',
    },
    how:
      'Una web para registrar productos, proveedores, compras, ventas (con su plataforma), gastos y movimientos de inventario. El servidor impide vender más unidades de las que hay, aunque dos ventas lleguen a la vez.',
    tech: [
      {
        title: 'Servidor',
        text: 'Java 21 y Spring Boot 3.4: 64 endpoints en 11 controladores, por capas (servicios, repositorios, DTO y mappers), con validación y gestión de errores. El dinero se calcula con BigDecimal.',
      },
      {
        title: 'Stock sin errores',
        text: 'Bloqueo pesimista (SELECT … FOR UPDATE) al vender, y un libro de inventario en el que solo se añaden movimientos, nunca se borran: cada cifra de stock se puede auditar.',
      },
      {
        title: 'Rentabilidad',
        text: 'Simulador de rentabilidad con ROI y punto de equilibrio en precio y en unidades.',
      },
      {
        title: 'Datos y calidad',
        text: 'MySQL con 11 tablas y 34 restricciones CHECK. 26 tests con JUnit 5 y Mockito.',
      },
      {
        title: 'Web',
        text: 'Angular con PrimeNG, gráficos con Chart.js y formularios reactivos.',
      },
    ],
    stack: ['Java', 'Spring Boot', 'MySQL', 'Angular', 'JUnit 5'],
    decisions: [
      'Un único formato de error para toda la API: cada excepción del dominio se traduce a 404, 409 o 400 con mensaje, ruta y hora.',
      'Interfaz guiada por configuración: productos, proveedores, gastos, inventario y ventas usan un mismo componente, así que añadir una pantalla es configuración, no código.',
      'Configuración por variables de entorno y zona horaria fijada en Europe/Madrid.',
    ],
    next: [
      'Autenticación con Spring Security y JWT para varios usuarios.',
      'Migraciones de base de datos con Flyway.',
      'Tests de integración con Testcontainers, CI y Docker Compose para arrancar con un comando.',
    ],
    repo: 'https://github.com/mmartinezvaras/consolaAdminProductos',
  },
];
