// IMPORTANTE: la web es bilingüe. Cada texto nuevo debe tener versión en español y en inglés:
// { es: '...', en: '...' }. Solo lo que no cambia entre idiomas (nombres de tecnologías,
// enlaces, el valor de impact si es igual) puede ir como texto normal.
//
// Para añadir un proyecto: copia un bloque, cambia sus datos y listo. No hay que tocar componentes.
// Escribe pensando en alguien que no es técnico (por ejemplo, un reclutador de RRHH):
// - problem: el problema real en una frase sencilla. Es el titular del proyecto.
// - impact: qué consigue. Es lo único que va en el color de acento.
//     value: corto y llamativo ("1 de cada 2", "Cita la página"). label: lo explica en una frase.
//     Nunca inventes una cifra: si no la has medido, usa una frase cierta.
// - how: cómo funciona, en lenguaje llano.
// - tech: detalles técnicos para quien sí lo es (se muestran plegados). Explica cada término.
// - decisions / next / image: opcionales (decisiones clave, siguientes pasos y captura).
//     decisions y next llevan una lista por idioma: { es: [...], en: [...] }.
// - featured: true solo en UN proyecto, el principal.
// Entre un número y "%" pon un espacio que no se parte (Alt+0160) para que no se separen.
// Cada slug va en su propia línea, con comillas simples: deploy.yml lee esas líneas para crear las rutas.
import { L } from '../core/i18n';

export type Area = 'IA generativa' | 'Big Data' | 'IA y ML' | 'Desarrollo';

export interface Project {
  slug: string;
  name: L;
  area: Area;
  status?: L;
  featured?: boolean;
  problem: L;
  impact: { value: string | L; label: L };
  how: L;
  tech: { title: string | L; text: L }[];
  stack: string[];
  repo: string;
  demo?: string;
  // Opcionales: solo se muestran si existen. Sácalos de los README de cada repo.
  decisions?: L<string[]>;
  next?: L<string[]>;
  image?: { src: string; alt: L; width: number; height: number };
}

export const areas: Area[] = ['IA generativa', 'Big Data', 'IA y ML', 'Desarrollo'];

// Nombre visible de cada área (el valor de Area es solo un identificador)
export const areaLabels: Record<Area, L> = {
  'IA generativa': { es: 'IA generativa', en: 'Generative AI' },
  'Big Data': { es: 'Big Data', en: 'Big Data' },
  'IA y ML': { es: 'IA y ML', en: 'AI & ML' },
  Desarrollo: { es: 'Desarrollo', en: 'Development' },
};

export const projects: Project[] = [
  {
    slug: 'rag-pdfs',
    featured: true,
    name: { es: 'Asistente para PDFs (RAG)', en: 'PDF assistant (RAG)' },
    area: 'IA generativa',
    problem: {
      es: 'Buscar un dato en un documento largo obliga a leerlo entero, y un chatbot normal se inventa la respuesta.',
      en: 'Finding one fact in a long document means reading all of it, and a regular chatbot simply makes the answer up.',
    },
    impact: {
      value: { es: 'Cita la página', en: 'Cites the page' },
      label: {
        es: 'Cada respuesta dice de qué documento y página sale, para que puedas comprobarla.',
        en: 'Every answer says which document and page it comes from, so you can check it.',
      },
    },
    how: {
      es: 'Parte los PDFs en trozos, los guarda en una base de datos que busca por significado (no por palabras exactas) y le pasa los 5 trozos más parecidos a una IA que se ejecuta en el propio ordenador. Esa IA solo puede responder con lo que dicen los documentos, y por defecto ningún documento sale de la máquina.',
      en: 'It splits the PDFs into chunks, stores them in a database that searches by meaning (not by exact words) and hands the 5 most similar chunks to an AI model running on the computer itself. The model can only answer with what the documents say, and by default no document ever leaves the machine.',
    },
    tech: [
      {
        title: { es: 'Datos', en: 'Data' },
        text: {
          es: 'PDFs de ejemplo (reglamentos de fútbol y de Fórmula 1) divididos en fragmentos de 800 caracteres que se solapan 80, para no cortar una idea por la mitad.',
          en: 'Sample PDFs (football and Formula 1 rulebooks) split into 800-character chunks that overlap by 80, so no idea gets cut in half.',
        },
      },
      {
        title: { es: 'Búsqueda', en: 'Search' },
        text: {
          es: 'Cada fragmento se convierte en una lista de números que representa su significado (embeddings locales con nomic-embed-text en Ollama; AWS Bedrock como opción) y se guarda en ChromaDB. Al preguntar, se recuperan los 5 fragmentos más parecidos.',
          en: 'Each chunk becomes a list of numbers that represents its meaning (local embeddings with nomic-embed-text on Ollama, with AWS Bedrock as an option) and is stored in ChromaDB. When you ask a question, the 5 most similar chunks are retrieved.',
        },
      },
      {
        title: { es: 'Respuesta', en: 'Answer' },
        text: {
          es: 'Llama 3.2 3B en local con Ollama (temperatura 0, se puede cambiar por otro modelo, como Mistral) responde usando solo esos fragmentos e indica su origen: documento, página y fragmento. Al añadir PDFs nuevos solo se procesa lo nuevo, sin duplicados.',
          en: 'Llama 3.2 3B running locally on Ollama (temperature 0, swappable for another model such as Mistral) answers using only those chunks and states where they come from: document, page and chunk. When new PDFs are added, only the new content is processed, with no duplicates.',
        },
      },
      {
        title: { es: 'Pruebas', en: 'Testing' },
        text: {
          es: 'Tests con pytest y evaluación LLM-as-judge (el propio modelo comprueba si la respuesta coincide con la esperada), que se ejecutan de principio a fin en GitHub Actions en cada cambio. Parte de un proyecto de referencia que adapté.',
          en: 'Tests with pytest and LLM-as-a-judge evaluation (the model itself checks whether the answer matches the expected one), run end to end on GitHub Actions on every change. It started from a reference project that I adapted.',
        },
      },
      {
        title: 'Demo',
        text: {
          es: 'Interfaz web en Streamlit que se abre en GitHub Codespaces con un clic, sin instalar nada. Admite preguntas en español o inglés y subir tus propios PDF.',
          en: 'Streamlit web interface that opens in GitHub Codespaces with one click, with nothing to install. It takes questions in Spanish or English and lets you upload your own PDFs.',
        },
      },
    ],
    stack: ['Python', 'LangChain', 'ChromaDB', 'Ollama', 'Streamlit', 'Llama 3.2', 'pytest'],
    decisions: {
      es: [
        'Fragmentos de 800 caracteres con un 10 % de solapamiento: lo bastante pequeños para recuperar pasajes precisos sin cortar frases.',
        'Recuperar 5 fragmentos: contexto suficiente para respuestas de varias partes sin saturar el prompt.',
        'ChromaDB local y persistente: cero infraestructura, y la base sobrevive a los reinicios.',
        'Modelo e embeddings en local con Ollama: funciona sin conexión en un portátil y gratis.',
      ],
      en: [
        '800-character chunks with a 10% overlap: small enough to retrieve precise passages without cutting sentences.',
        'Retrieve 5 chunks: enough context for multi-part answers without flooding the prompt.',
        'Local, persistent ChromaDB: zero infrastructure, and the database survives restarts.',
        'Model and embeddings running locally on Ollama: works offline on a laptop, for free.',
      ],
    },
    next: {
      es: [
        'Devolver la puntuación de relevancia de cada fuente y descartar los fragmentos poco parecidos.',
        'Un conjunto de evaluación mayor para medir el porcentaje de acierto entre documentos.',
        'Búsqueda híbrida (palabras clave + vectores) para nombres y cifras exactas.',
      ],
      en: [
        'Return a relevance score with each source and drop low-similarity chunks.',
        'A larger evaluation set to measure answer accuracy across documents.',
        'Hybrid search (keywords + vectors) for exact names and numbers.',
      ],
    },
    demo: 'https://codespaces.new/mmartinezvaras/Python-RAG-AI-para-los-PDFs?quickstart=1',
    image: {
      src: 'https://raw.githubusercontent.com/mmartinezvaras/Python-RAG-AI-para-los-PDFs/HEAD/docs/demo.png',
      alt: {
        es: 'Demo web respondiendo a una pregunta y citando sus fuentes',
        en: 'Web demo answering a question and citing its sources',
      },
      width: 1280,
      height: 900,
    },
    repo: 'https://github.com/mmartinezvaras/Python-RAG-AI-para-los-PDFs',
  },
  {
    slug: 'ml-partidos',
    name: { es: 'Predicción de partidos de La Liga', en: 'LaLiga match prediction' },
    area: 'IA y ML',
    problem: {
      es: 'Predecir quién gana un partido de fútbol es difícil: hay mucho azar.',
      en: 'Predicting who wins a football match is hard: luck plays a big part.',
    },
    impact: {
      value: { es: '1 de cada 2', en: '1 in 2' },
      label: {
        es: 'Cuando predice que un equipo ganará, acierta la mitad de las veces. Al azar serían menos de 4 de cada 10.',
        en: 'When it predicts that a team will win, it is right half the time. Guessing at random would be right fewer than 4 times in 10.',
      },
    },
    how: {
      es: 'Aprende de los 380 partidos de La Liga 2025-26. Se entrena con los partidos hasta diciembre y se pone a prueba con los de 2026, como si no los conociera. Lo que más le ayudó fue saber cómo había jugado cada equipo en sus 3 últimos partidos.',
      en: 'It learns from the 380 matches of the 2025-26 LaLiga season. It is trained on the matches up to December and tested on the 2026 ones, as if it had never seen them. What helped most was knowing how each team had played in its last 3 matches.',
    },
    tech: [
      {
        title: { es: 'Datos', en: 'Data' },
        text: {
          es: '380 partidos (760 registros, uno por equipo y partido) con goles, tiros, tiros a puerta, faltas, córners y tarjetas.',
          en: '380 matches (760 rows, one per team and match) with goals, shots, shots on target, fouls, corners and cards.',
        },
      },
      {
        title: { es: 'Modelo', en: 'Model' },
        text: {
          es: 'Random Forest de scikit-learn con local o visitante, rival, hora y día de la semana como variables. Entrenamiento hasta diciembre de 2025 y prueba desde el 1 de enero de 2026, sin usar datos del futuro.',
          en: 'scikit-learn Random Forest with home or away, opponent, kick-off hour and day of the week as features. Trained up to December 2025 and tested from 1 January 2026, without using any data from the future.',
        },
      },
      {
        title: { es: 'Mejora clave', en: 'Key improvement' },
        text: {
          es: 'Añadir la media de los 3 partidos anteriores de cada equipo (calculada sin incluir el propio partido, para no hacer trampa) subió la precisión al predecir victorias del 46,4 % al 51,5 %.',
          en: "Adding each team's average over its previous 3 matches (computed without the match itself, so there is no cheating) raised win-prediction precision from 46.4% to 51.5%.",
        },
      },
      {
        title: { es: 'Cuando se moja', en: 'When it commits' },
        text: {
          es: 'En los 33 enfrentamientos en los que el modelo dio ganador a un solo equipo, acertó 18 (54,5 %).',
          en: 'In the 33 fixtures where the model backed only one of the two teams to win, it got 18 right (54.5%).',
        },
      },
      {
        title: { es: 'Por qué precisión y no accuracy', en: 'Why precision and not accuracy' },
        text: {
          es: 'La precisión mide cuántas de sus predicciones de victoria se cumplen. En los partidos de prueba solo el 38 % fueron victorias, así que decir siempre «no gana» ya daría mucha accuracy sin servir para nada. Acertar el 51,5 % de las victorias que predice es una mejora real sobre el azar.',
          en: 'Precision measures how many of its win predictions come true. Only 38% of the test matches were wins, so always saying "no win" would already give high accuracy while being useless. Being right on 51.5% of the wins it predicts is a real improvement over chance.',
        },
      },
    ],
    stack: ['Python', 'pandas', 'scikit-learn', 'Jupyter'],
    repo: 'https://github.com/mmartinezvaras/laliga-match-prediction',
  },
  // Cuando el pipeline PySpark esté terminado: poner featured: true aquí y quitarlo de rag-pdfs
  {
    slug: 'banking-lakehouse',
    name: { es: 'Banco simulado para detectar fraude', en: 'Simulated bank for fraud detection' },
    area: 'Big Data',
    status: { es: 'En desarrollo', en: 'In progress' },
    problem: {
      es: 'Los bancos tienen que detectar movimientos sospechosos, pero los datos de clientes reales son privados y no se pueden usar para practicar.',
      en: "Banks have to spot suspicious transactions, but real customer data is private and can't be used for practice.",
    },
    impact: {
      value: { es: '1 de cada 800', en: '1 in 800' },
      label: {
        es: 'movimientos es un fraude, escondido entre 50.062 transacciones de un banco ficticio. Raro y difícil de ver, como en la vida real.',
        en: 'transactions is fraudulent, hidden among 50,062 transactions at a fictional bank. Rare and hard to spot, just like in real life.',
      },
    },
    how: {
      es: 'Un programa crea 1.000 clientes inventados y seis meses de movimientos, y mete 62 fraudes en 10 ráfagas. Siempre genera exactamente los mismos datos, y cada cambio en el código se comprueba automáticamente.',
      en: 'A program creates 1,000 fictional customers and six months of transactions, and injects 62 frauds in 10 bursts. It always generates exactly the same data, and every code change is checked automatically.',
    },
    tech: [
      {
        title: { es: 'Hecho', en: 'Done' },
        text: {
          es: 'Generador en Python con Faker: 1.000 clientes, 50.062 transacciones de enero a junio de 2026 y 62 fraudes en 10 ráfagas (0,12 %). Semilla fija (42) para que el resultado sea reproducible. Tests con pytest en cada push con GitHub Actions.',
          en: 'Python generator with Faker: 1,000 customers, 50,062 transactions from January to June 2026 and 62 frauds in 10 bursts (0.12%). Fixed seed (42) so the result is reproducible. pytest tests on every push with GitHub Actions.',
        },
      },
      {
        title: { es: 'Planificado', en: 'Planned' },
        text: {
          es: 'Ingesta y limpieza con PySpark en capas Bronze, Silver y Gold, almacenamiento en Parquet y tablas Delta Lake.',
          en: 'Ingestion and cleaning with PySpark in Bronze, Silver and Gold layers, with Parquet storage and Delta Lake tables.',
        },
      },
      {
        title: { es: 'Planificado · fraude', en: 'Planned · fraud' },
        text: {
          es: 'Reglas con funciones de ventana, que comparan cada movimiento con los anteriores del mismo cliente (lag/lead y totales acumulados).',
          en: "Rules built with window functions, which compare each transaction with the same customer's previous ones (lag/lead and running totals).",
        },
      },
    ],
    stack: ['Python', 'Faker', 'pytest', 'GitHub Actions'],
    decisions: {
      es: [
        'Reproducir lo que hace difícil el fraude real: es raro, llega en ráfagas y se esconde entre muchos pagos normales.',
        'El número de ráfagas crece con el volumen de datos (una por cada 5.000 transacciones), así que el problema escala igual.',
        'Semilla fija: cualquiera obtiene exactamente el mismo dataset en su máquina.',
      ],
      en: [
        'Reproduce what makes real fraud hard: it is rare, arrives in bursts and hides among many normal payments.',
        'The number of bursts grows with the data volume (one per 5,000 transactions), so the problem scales the same way.',
        'Fixed seed: anyone gets exactly the same dataset on their own machine.',
      ],
    },
    next: {
      es: [
        'Ingesta y limpieza con PySpark (Bronze → Silver).',
        'Almacenamiento en Parquet particionado y tablas Delta Lake (Gold).',
        'Detección de fraude con funciones de ventana y diagrama de arquitectura.',
      ],
      en: [
        'Ingestion and cleaning with PySpark (Bronze → Silver).',
        'Partitioned Parquet storage and Delta Lake tables (Gold).',
        'Fraud detection with window functions, plus an architecture diagram.',
      ],
    },
    repo: 'https://github.com/mmartinezvaras/banking-lakehouse-pyspark',
  },
  {
    slug: 'nosql-financiero',
    name: { es: 'Base de datos bancaria en la nube', en: 'Cloud banking database' },
    area: 'Big Data',
    problem: {
      es: 'Un banco necesita consultar al momento los saldos y movimientos de sus clientes.',
      en: "A bank needs to look up its customers' balances and transactions instantly.",
    },
    impact: {
      value: { es: 'Saldo medio en una consulta', en: 'Average balance in one query' },
      label: {
        es: 'Calcula indicadores como el saldo medio por tipo de cuenta de una sola vez, sin recorrer cliente a cliente.',
        en: 'Computes indicators such as the average balance per account type in one go, without going through customers one by one.',
      },
    },
    how: {
      es: 'Guarda cada cliente como una ficha con sus datos, su dirección y su lista de movimientos dentro, en una base de datos en la nube, y usa índices (como el índice de un libro) para encontrar clientes rápido.',
      en: 'It stores each customer as a single record holding their details, address and list of transactions, in a cloud database, and uses indexes (like the index of a book) to find customers quickly.',
    },
    tech: [
      {
        title: { es: 'Modelo de datos', en: 'Data model' },
        text: {
          es: 'Documentos JSON en MongoDB Atlas (en AWS): tipo de cuenta y saldo son campos simples, y la dirección (objeto) y las transacciones (lista) van embebidas. Los movimientos nuevos se añaden con $push.',
          en: 'JSON documents in MongoDB Atlas (on AWS): account type and balance are simple fields, while the address (object) and transactions (array) are embedded. New transactions are added with $push.',
        },
      },
      {
        title: { es: 'Consultas', en: 'Queries' },
        text: {
          es: 'Filtros por rango de saldo e índices simples y compuestos para acelerar las búsquedas.',
          en: 'Balance range filters, plus single and compound indexes to speed up searches.',
        },
      },
      {
        title: { es: 'Agregaciones', en: 'Aggregations' },
        text: {
          es: 'Pipelines con $match, $group, $sort, $project y $count, y extremos con $min y $max, para obtener saldos medios e indicadores.',
          en: 'Pipelines with $match, $group, $sort, $project and $count, plus extremes with $min and $max, to get average balances and other indicators.',
        },
      },
      {
        title: { es: 'Buenas prácticas', en: 'Good practices' },
        text: {
          es: '33 pasos documentados en un notebook. La cadena de conexión (MONGO_URI) se lee de una variable de entorno, no va en el código.',
          en: '33 steps documented in a notebook. The connection string (MONGO_URI) is read from an environment variable and never stored in the code.',
        },
      },
    ],
    stack: ['Python', 'PyMongo', 'MongoDB Atlas', 'Google Colab'],
    repo: 'https://github.com/mmartinezvaras/nosql-financial-engine',
  },
  {
    slug: 'reconocimiento-facial',
    name: { es: 'Asistencia con reconocimiento facial', en: 'Face recognition attendance' },
    area: 'IA y ML',
    problem: {
      es: 'Pasar lista a mano lleva tiempo y es fácil de falsear.',
      en: 'Taking attendance by hand is slow and easy to fake.',
    },
    impact: {
      value: { es: 'Basta con mirar a la cámara', en: 'Just look at the camera' },
      label: {
        es: 'Registra quién ha llegado y a qué hora, una sola vez al día por persona.',
        en: 'Records who has arrived and when, once a day per person.',
      },
    },
    how: {
      es: 'Compara cada cara con las fotos de las personas registradas y apunta el nombre y la hora en una hoja de cálculo diaria. La hoja se consulta en una web que no la sube a ningún servidor.',
      en: "It compares each face with the photos of the registered people and logs the name and time in a daily spreadsheet. The spreadsheet can be viewed on a web page that doesn't upload it to any server.",
    },
    tech: [
      {
        title: { es: 'Reconocimiento', en: 'Recognition' },
        text: {
          es: 'OpenCV captura el vídeo y face_recognition (dlib) convierte cada cara en un vector de 128 números. Se acepta la persona más parecida solo si está dentro de un umbral de distancia; si no, queda como desconocida.',
          en: 'OpenCV captures the video and face_recognition (dlib) turns each face into a vector of 128 numbers. The closest match is accepted only if it falls within a distance threshold; otherwise the person is marked as unknown.',
        },
      },
      {
        title: { es: 'Rendimiento', en: 'Performance' },
        text: {
          es: 'Cada imagen se reduce al 25 % y se analiza una de cada dos, para que funcione en tiempo real en un portátil.',
          en: 'Each frame is scaled down to 25% and only every other frame is analysed, so it runs in real time on a laptop.',
        },
      },
      {
        title: { es: 'Registro y visor', en: 'Log and viewer' },
        text: {
          es: 'Un CSV por día con una entrada por persona. Una web en Angular abre el CSV y lo procesa solo en el navegador.',
          en: 'One CSV per day with one entry per person. An Angular web app opens the CSV and processes it entirely in the browser.',
        },
      },
      {
        title: { es: 'Uso responsable', en: 'Responsible use' },
        text: {
          es: 'Las caras son datos biométricos protegidos por el RGPD. Un uso real necesitaría consentimiento explícito, almacenamiento cifrado y una política de conservación. Es una demo técnica con fotos públicas.',
          en: 'Faces are biometric data protected under the GDPR. Real-world use would need explicit consent, encrypted storage and a retention policy. This is a technical demo using public photos.',
        },
      },
    ],
    stack: ['Python', 'OpenCV', 'face_recognition', 'NumPy', 'Angular'],
    repo: 'https://github.com/mmartinezvaras/Reconocimiento_Facial',
  },
  {
    slug: 'hdfs-docker',
    name: { es: 'Clúster HDFS en Docker', en: 'HDFS cluster on Docker' },
    area: 'Big Data',
    status: { es: 'Práctica del curso', en: 'Course lab' },
    problem: {
      es: 'Para practicar Big Data hace falta un clúster de varias máquinas, y montarlo de verdad es caro.',
      en: 'Practising Big Data takes a cluster of several machines, and building a real one is expensive.',
    },
    impact: {
      value: { es: '4 nodos', en: '4 nodes' },
      label: {
        es: 'Un clúster Hadoop (1 nodo principal y 3 de datos) que arranca en un ordenador con Docker.',
        en: 'A Hadoop cluster (1 main node and 3 data nodes) that runs on a single computer with Docker.',
      },
    },
    how: {
      es: 'El entorno lo proporcionó el curso: Docker levanta varias «máquinas» que se reparten los ficheros como en un clúster real. Sobre él hice las prácticas de análisis de datos con pandas.',
      en: 'The environment was provided by the course: Docker spins up several "machines" that share the files as in a real cluster. On top of it I did the data analysis exercises with pandas.',
    },
    tech: [
      {
        title: { es: 'Entorno (del curso)', en: 'Environment (provided by the course)' },
        text: {
          es: 'Hadoop 3.4.2 en Docker Compose: un NameNode y tres DataNodes, con replicación 2 y bloques de 16 MB.',
          en: 'Hadoop 3.4.2 on Docker Compose: one NameNode and three DataNodes, with a replication factor of 2 and 16 MB blocks.',
        },
      },
      {
        title: { es: 'Prácticas', en: 'Exercises' },
        text: {
          es: 'Análisis exploratorio con pandas y Matplotlib en notebooks sobre datos de clientes.',
          en: 'Exploratory analysis of customer data with pandas and Matplotlib in notebooks.',
        },
      },
    ],
    stack: ['Hadoop HDFS', 'Docker', 'pandas', 'Matplotlib', 'Jupyter'],
    repo: 'https://github.com/mmartinezvaras/s_aprendizaje',
  },
  {
    slug: 'tfg-restaurante',
    name: { es: 'App de pedidos para restaurante (TFG)', en: 'Restaurant ordering app (final project)' },
    area: 'Desarrollo',
    problem: {
      es: 'En un restaurante lleno, esperar para pedir y para pagar es lo que más molesta.',
      en: 'In a busy restaurant, waiting to order and waiting to pay are the most frustrating parts.',
    },
    impact: {
      value: { es: 'Pide y paga sin esperar', en: 'Order and pay without waiting' },
      label: {
        es: 'Los comensales se unen a una mesa con un código, piden juntos y cada uno paga lo suyo. El camarero valida el pago con un QR.',
        en: 'Diners join a table with a code, order together and each pays their own share. The waiter validates the payment with a QR code.',
      },
    },
    how: {
      es: 'Cada comensal entra con su nombre y el código de la mesa. El pedido es compartido, pero cada plato guarda quién lo pidió, así que la cuenta se divide por persona. Un servidor guarda todo en una base de datos.',
      en: 'Each diner joins with their name and the table code. The order is shared, but every dish remembers who ordered it, so the bill is split per person. A server stores everything in a database.',
    },
    tech: [
      {
        title: 'Web',
        text: {
          es: 'Angular 21 con renderizado en servidor y PrimeNG: menú por categorías con buscador, carrito que se actualiza cada 12 segundos, pago y factura en PDF.',
          en: 'Angular 21 with server-side rendering and PrimeNG: menu by category with search, a cart that refreshes every 12 seconds, payment and a PDF invoice.',
        },
      },
      {
        title: { es: 'Pago seguro', en: 'Secure payment' },
        text: {
          es: 'La factura viaja en un QR codificado en Base64-URL con un token aleatorio de 192 bits, que el camarero escanea para validarla.',
          en: 'The invoice travels in a QR code encoded in Base64-URL with a random 192-bit token, which the waiter scans to validate it.',
        },
      },
      {
        title: { es: 'Servidor', en: 'Server' },
        text: {
          es: 'API REST en Spring Boot 4 (Java 25) por capas: controladores, servicios y repositorios. Incluye un simulador de cocina que revisa los pedidos pendientes.',
          en: 'Layered REST API in Spring Boot 4 (Java 25): controllers, services and repositories. It includes a kitchen simulator that checks pending orders.',
        },
      },
      {
        title: { es: 'Datos', en: 'Data' },
        text: {
          es: 'MySQL con Spring Data JPA. Entidades: Sala (la mesa compartida), Persona, Item, Pedido y ListaPedido (cada línea del pedido con quién la pidió).',
          en: 'MySQL with Spring Data JPA. Entities: Sala (the shared table), Persona (diner), Item, Pedido (order) and ListaPedido (each order line, with who ordered it).',
        },
      },
    ],
    stack: ['Angular', 'PrimeNG', 'Spring Boot', 'Java', 'MySQL'],
    next: {
      es: [
        'Sustituir el sondeo cada 12 segundos por WebSockets o Server-Sent Events para actualizar el carrito al instante.',
        'Integrar un pago real (Stripe en modo de pruebas) y firmar el contenido del QR.',
        'Un panel de cocina para el personal en lugar del simulador.',
      ],
      en: [
        'Replace the 12-second polling with WebSockets or Server-Sent Events so the cart updates instantly.',
        'Integrate real payments (Stripe in test mode) and sign the QR contents.',
        'A kitchen dashboard for staff instead of the simulator.',
      ],
    },
    repo: 'https://github.com/mmartinezvaras/TFGangular',
  },
  {
    slug: 'gestion-reventa',
    name: { es: 'Panel de reventa de auriculares', en: 'Headphone resale dashboard' },
    area: 'Desarrollo',
    problem: {
      es: 'Revender auriculares en Wallapop, Vinted o eBay parece rentable hasta que sumas envíos, comisiones y lo que no se vende.',
      en: "Reselling headphones on Wallapop, Vinted or eBay looks profitable until you add up shipping, fees and the units that don't sell.",
    },
    impact: {
      value: { es: 'Margen real por producto', en: 'Real margin per product' },
      label: {
        es: 'Un panel muestra el stock, las ventas y cuánto ganas de verdad con cada producto, con todos los gastos descontados.',
        en: 'A dashboard shows stock, sales and how much you really make on each product, with every cost deducted.',
      },
    },
    how: {
      es: 'Una web para registrar productos, proveedores, compras, ventas (con su plataforma), gastos y movimientos de inventario. El servidor impide vender más unidades de las que hay, aunque dos ventas lleguen a la vez.',
      en: 'A web app to record products, suppliers, purchases, sales (with their platform), expenses and inventory movements. The server prevents selling more units than are in stock, even when two sales arrive at the same time.',
    },
    tech: [
      {
        title: { es: 'Servidor', en: 'Server' },
        text: {
          es: 'Java 21 y Spring Boot 3.4: 64 endpoints en 11 controladores, por capas (servicios, repositorios, DTO y mappers), con validación y gestión de errores. El dinero se calcula con BigDecimal.',
          en: 'Java 21 and Spring Boot 3.4: 64 endpoints across 11 controllers, in layers (services, repositories, DTOs and mappers), with validation and error handling. Money is calculated with BigDecimal.',
        },
      },
      {
        title: { es: 'Stock sin errores', en: 'Reliable stock' },
        text: {
          es: 'Bloqueo pesimista (SELECT … FOR UPDATE) al vender, y un libro de inventario en el que solo se añaden movimientos, nunca se borran: cada cifra de stock se puede auditar.',
          en: 'Pessimistic locking (SELECT … FOR UPDATE) when selling, and an append-only inventory ledger where movements are never deleted: every stock figure can be audited.',
        },
      },
      {
        title: { es: 'Rentabilidad', en: 'Profitability' },
        text: {
          es: 'Simulador de rentabilidad con ROI y punto de equilibrio en precio y en unidades.',
          en: 'Profitability simulator with ROI and break-even point in both price and units.',
        },
      },
      {
        title: { es: 'Datos y calidad', en: 'Data and quality' },
        text: {
          es: 'MySQL con 11 tablas y 34 restricciones CHECK. 26 tests con JUnit 5 y Mockito.',
          en: 'MySQL with 11 tables and 34 CHECK constraints. 26 tests with JUnit 5 and Mockito.',
        },
      },
      {
        title: 'Web',
        text: {
          es: 'Angular con PrimeNG, gráficos con Chart.js y formularios reactivos.',
          en: 'Angular with PrimeNG, charts with Chart.js and reactive forms.',
        },
      },
    ],
    stack: ['Java', 'Spring Boot', 'MySQL', 'Angular', 'JUnit 5'],
    decisions: {
      es: [
        'Un único formato de error para toda la API: cada excepción del dominio se traduce a 404, 409 o 400 con mensaje, ruta y hora.',
        'Interfaz guiada por configuración: productos, proveedores, gastos, inventario y ventas usan un mismo componente, así que añadir una pantalla es configuración, no código.',
        'Configuración por variables de entorno y zona horaria fijada en Europe/Madrid.',
      ],
      en: [
        'A single error format for the whole API: each domain exception maps to 404, 409 or 400 with a message, path and timestamp.',
        'Configuration-driven UI: products, suppliers, expenses, inventory and sales share one component, so adding a screen is configuration, not code.',
        'Configuration through environment variables, with the time zone pinned to Europe/Madrid.',
      ],
    },
    next: {
      es: [
        'Autenticación con Spring Security y JWT para varios usuarios.',
        'Migraciones de base de datos con Flyway.',
        'Tests de integración con Testcontainers, CI y Docker Compose para arrancar con un comando.',
      ],
      en: [
        'Authentication with Spring Security and JWT for multiple users.',
        'Database migrations with Flyway.',
        'Integration tests with Testcontainers, CI, and Docker Compose to start everything with one command.',
      ],
    },
    repo: 'https://github.com/mmartinezvaras/consolaAdminProductos',
  },
];
