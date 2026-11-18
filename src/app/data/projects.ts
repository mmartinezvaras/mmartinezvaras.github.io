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
    slug: 'banking-lakehouse',
    featured: true,
    name: { es: 'Detección de fraude con tarjeta en un lakehouse', en: 'Card fraud detection on a lakehouse' },
    area: 'Big Data',
    problem: {
      es: 'El fraude con tarjeta es raro, llega en ráfagas y se esconde entre miles de pagos normales.',
      en: 'Card fraud is rare, comes in bursts and hides among thousands of normal payments.',
    },
    impact: {
      value: { es: '13 de 13', en: '13 of 13' },
      label: {
        es: 'ataques detectados, frenando el 99,9 % del dinero defraudado. La regla simple solo cazaba 4 y con casi el doble de falsas alarmas.',
        en: 'attacks detected, stopping 99.9% of the stolen money. The simple rule caught only 4, with almost twice as many false alarms.',
      },
    },
    how: {
      es: 'Un banco ficticio con 1.000 clientes y seis meses de pagos, con datos sucios como los reales. Los ficheros pasan por tres capas: una copia fiel, una versión limpia y unas tablas listas para analizar. Cada pago se compara con los anteriores del mismo cliente (cuántos en 10 minutos, si cambia de país, si antes hubo un cargo de prueba) y un panel enseña los resultados.',
      en: 'A fictional bank with 1,000 customers and six months of payments, with data as dirty as real data. The files go through three layers: a faithful copy, a clean version and tables ready for analysis. Each payment is compared with the same customer\'s previous ones (how many in 10 minutes, whether the country changes, whether there was a test charge before) and a dashboard shows the results.',
    },
    tech: [
      {
        title: { es: 'Arquitectura medallion', en: 'Medallion architecture' },
        text: {
          es: 'PySpark y Delta Lake en capas Bronze (todo texto, con columnas de auditoría), Silver (tipado, sin duplicados y particionado por mes) y Gold (variables, alertas y métricas). 50.880 filas en bruto → 50.109 válidas + 746 en una tabla de cuarentena, cada una con su motivo.',
          en: 'PySpark and Delta Lake in Bronze (all text, with audit columns), Silver (typed, deduplicated and partitioned by month) and Gold (features, alerts and metrics) layers. 50,880 raw rows → 50,109 valid + 746 in a quarantine table, each with its reason.',
        },
      },
      {
        title: { es: 'Cargas incrementales', en: 'Incremental loads' },
        text: {
          es: 'La segunda entrega trae un día nuevo y 25 importes corregidos: un MERGE por tx_id inserta 282 filas y actualiza 25 sin duplicar nada, y volver a ejecutar no cambia el resultado. La versión anterior sigue consultable con time travel, y OPTIMIZE con ZORDER compacta la tabla de variables.',
          en: 'The second delivery brings a new day and 25 corrected amounts: a MERGE on tx_id inserts 282 rows and updates 25 without duplicating anything, and re-running it changes nothing. The previous version is still queryable with time travel, and OPTIMIZE with ZORDER compacts the features table.',
        },
      },
      {
        title: { es: 'Reglas con funciones de ventana', en: 'Rules with window functions' },
        text: {
          es: 'Ventanas rangeBetween de 10 minutos y 30 días, lag y lead, y totales acumulados. Velocidad (3 pagos online en el extranjero en 10 minutos), prueba de tarjeta (cargo pequeño y luego uno grande) y salto de país.',
          en: 'rangeBetween windows of 10 minutes and 30 days, lag and lead, and running totals. Velocity (3 online payments abroad in 10 minutes), card testing (a tiny charge, then a big one) and country hopping.',
        },
      },
      {
        title: { es: 'Resultados medidos', en: 'Measured results' },
        text: {
          es: '83 pagos fraudulentos entre 50.109 (1 de cada 604) en 13 ataques. Reglas de ventana frente a la regla simple: recall del 71 % frente al 24 %, precisión del 43 % frente al 13 % y 0,43 falsas alarmas al día frente a 0,76. Una regla de revisión al día siguiente con lead sube el recall al 81 %. Las cifras las calcula la integración continua en cada push.',
          en: '83 fraudulent payments among 50,109 (1 in 604) in 13 attacks. Window rules versus the simple rule: 71% recall versus 24%, 43% precision versus 13%, and 0.43 false alarms per day versus 0.76. A next-day review rule using lead raises recall to 81%. The figures are computed by CI on every push.',
        },
      },
      {
        title: { es: 'Pruebas y panel', en: 'Tests and dashboard' },
        text: {
          es: 'Tests unitarios de cada regla, de la cuarentena, del MERGE y del time travel, y un test de principio a fin, todos sobre Spark y Delta reales en GitHub Actions. Panel en Streamlit con modo claro y oscuro que se abre en Codespaces.',
          en: 'Unit tests for every rule, the quarantine, MERGE and time travel, plus an end-to-end test, all on real Spark and Delta in GitHub Actions. A Streamlit dashboard with light and dark modes that opens in Codespaces.',
        },
      },
    ],
    stack: ['PySpark', 'Delta Lake', 'Python', 'Streamlit', 'pytest', 'GitHub Actions'],
    decisions: {
      es: [
        'Datos realistas a propósito: turistas que pagan el hotel, compras online seguidas y verificaciones de 1 €, porque con etiquetas aleatorias cualquier regla parecería buena.',
        'Las filas que no se pueden arreglar no se tiran: van a cuarentena con su motivo, así que cada fila en bruto queda contabilizada (y está testado).',
        'Evaluar las reglas como un banco: no solo precisión y recall, también ataques detectados, dinero frenado y falsas alarmas al día.',
        'El panel lee pequeñas exportaciones deterministas, así que no necesita Spark y se puede alojar gratis.',
      ],
      en: [
        'Realistic data on purpose: tourists paying their hotel, online shopping sprees and €1 verifications, because with random labels any rule would look good.',
        'Rows that cannot be fixed are not thrown away: they go to quarantine with a reason, so every raw row is accounted for (and tested).',
        'Evaluate the rules the way a bank would: not just precision and recall, but also attacks detected, money stopped and false alarms per day.',
        'The dashboard reads small deterministic exports, so it needs no Spark and can be hosted for free.',
      ],
    },
    demo: 'https://fraude-lakehouse-marcos.streamlit.app/',
    image: {
      src: 'https://raw.githubusercontent.com/mmartinezvaras/banking-lakehouse-pyspark/screenshots/light-top.png',
      alt: {
        es: 'Panel del lakehouse con la comparación entre la regla simple y las reglas con ventanas',
        en: 'Lakehouse dashboard comparing the simple rule with the window-function rules',
      },
      width: 2560,
      height: 1800,
    },
    repo: 'https://github.com/mmartinezvaras/banking-lakehouse-pyspark',
  },
  {
    slug: 'credit-scoring',
    name: { es: 'Scoring de crédito explicable', en: 'Explainable credit scoring' },
    area: 'IA y ML',
    problem: {
      es: 'Un banco tiene que decidir a quién da crédito, y un modelo que dice «no» sin explicar por qué no sirve ni al banco ni al cliente.',
      en: 'A bank has to decide who gets credit, and a model that says "no" without explaining why is useless to both the bank and the customer.',
    },
    impact: {
      value: { es: '77 % de los impagos', en: '77% of defaults' },
      label: {
        es: 'se evitarían revisando al 47 % de los clientes. Y cada decisión llega con sus motivos en lenguaje claro.',
        en: 'would be avoided by reviewing 47% of customers. And every decision comes with its reasons in plain language.',
      },
    },
    how: {
      es: 'A partir de 30.000 clientes reales de tarjeta (un dataset público), calcula la probabilidad de que cada uno deje de pagar, lo coloca en un tramo de riesgo de la A a la E y explica qué ha pesado en su caso. Una app web permite cambiar los datos de un cliente y ver al momento cómo cambia el resultado.',
      en: 'Using 30,000 real credit card customers (a public dataset), it estimates how likely each one is to stop paying, places them in a risk band from A to E and explains what weighed in their case. A web app lets you change a customer\'s details and instantly see how the result changes.',
    },
    tech: [
      {
        title: { es: 'Datos sucios de dos sistemas', en: 'Dirty data from two systems' },
        text: {
          es: 'El dataset Default of Credit Card Clients (UCI) se convirtió en dos extracciones sucias, una de tarjetas en CSV y otra del CRM en JSON. La limpieza resuelve 20 problemas: números en formato español, cuatro marcas de «sin dato», fechas en 4 formatos, IDs distintos entre sistemas y duplicados. Se valida con assert y se guarda en Parquet.',
          en: 'The Default of Credit Card Clients dataset (UCI) was turned into two dirty extracts, a cards CSV and a CRM JSON. Cleaning solves 20 problems: Spanish number formats, four different "no data" markers, dates in 4 formats, IDs that differ between systems and duplicates. It is validated with assert and saved as Parquet.',
        },
      },
      {
        title: { es: 'Modelos', en: 'Models' },
        text: {
          es: 'Regresión logística como referencia (Gini 0,478 en prueba) y LightGBM regularizado y monótono (Gini 0,546), medidos con un 30 % de clientes que no vieron al entrenar. La regularización redujo el sobreajuste sin perder poder en prueba.',
          en: 'Logistic regression as the baseline (test Gini 0.478) and a regularised, monotonic LightGBM (Gini 0.546), measured on 30% of customers held out from training. Regularisation reduced overfitting without losing test performance.',
        },
      },
      {
        title: { es: 'Explicaciones y sentido de negocio', en: 'Explanations and business sense' },
        text: {
          es: 'SHAP explica cada decisión con sus motivos principales. Las restricciones de monotonía obligan a que el modelo tenga lógica: más retraso, más riesgo; más límite o más parte pagada, menos riesgo.',
          en: 'SHAP explains each decision with its main reasons. Monotonic constraints force the model to make sense: more arrears, more risk; a higher limit or a larger share paid, less risk.',
        },
      },
      {
        title: { es: 'Medido como un banco', en: 'Measured like a bank' },
        text: {
          es: 'Calibración por deciles (la probabilidad media y el impago real difieren como mucho 4 puntos), tramos A–E y un punto de corte por coste: si un impago cuesta 5 veces más que un buen cliente perdido, conviene revisar a partir de una probabilidad del 15 %. El sexo no entra en el modelo y se comprueba aparte: funciona de forma parecida en hombres y mujeres (Gini 0,532 y 0,554) y está bien calibrado en ambos grupos.',
          en: 'Calibration by deciles (average predicted probability and actual default differ by at most 4 points), A–E risk bands and a cost-based cut-off: if a default costs 5 times more than a lost good customer, reviewing from a 15% probability is cheapest. Sex is not a model feature and is checked separately: the model performs similarly for men and women (Gini 0.532 and 0.554) and is well calibrated in both groups.',
        },
      },
      {
        title: 'App',
        text: {
          es: 'App en Streamlit publicada en Streamlit Cloud, con modo claro y oscuro: probabilidad de impago, tramo, decisión y motivos de cada cliente.',
          en: 'Streamlit app published on Streamlit Cloud, with light and dark modes: probability of default, risk band, decision and reasons for each customer.',
        },
      },
    ],
    stack: ['Python', 'pandas', 'LightGBM', 'SHAP', 'scikit-learn', 'Streamlit'],
    decisions: {
      es: [
        'Empezar por una regresión logística: es la referencia que usa Riesgo de Crédito y fija el listón que LightGBM tiene que superar.',
        'Quitar las restricciones de monotonía sobre el uso del límite, que costaban 5 puntos de Gini, y mantener el resto.',
        'Elegir el punto de corte por coste de negocio y no por un umbral fijo del 50 %.',
      ],
      en: [
        'Start with a logistic regression: it is the benchmark Credit Risk teams use and sets the bar LightGBM has to beat.',
        'Drop the monotonic constraints on limit usage, which cost 5 Gini points, and keep the rest.',
        'Choose the cut-off by business cost rather than a fixed 50% threshold.',
      ],
    },
    demo: 'https://scoring-credito-marcos.streamlit.app/',
    image: {
      src: 'https://raw.githubusercontent.com/mmartinezvaras/credit-scoring/HEAD/docs/app.jpg',
      alt: {
        es: 'App de scoring con la probabilidad de impago, el tramo de riesgo, la decisión y los motivos de un cliente',
        en: 'Scoring app showing a customer\'s probability of default, risk band, decision and reasons',
      },
      width: 1368,
      height: 690,
    },
    repo: 'https://github.com/mmartinezvaras/credit-scoring',
  },
  {
    slug: 'rag-pdfs',
    name: { es: 'Asistente del Estatuto de los Trabajadores (RAG)', en: 'Spanish Workers\' Statute assistant (RAG)' },
    area: 'IA generativa',
    problem: {
      es: 'Encontrar un dato en una ley de más de 100 páginas obliga a leerla, y un chatbot normal se inventa la respuesta.',
      en: 'Finding one fact in a law of over 100 pages means reading it, and a regular chatbot simply makes the answer up.',
    },
    impact: {
      value: { es: 'Cita artículo y página', en: 'Cites article and page' },
      label: {
        es: 'Cada respuesta lleva el artículo y la página exacta del BOE, y si la pregunta no está en la ley lo dice en lugar de inventar.',
        en: 'Every answer comes with the exact article and page in the official gazette, and if the question is not covered by the law it says so instead of making things up.',
      },
    },
    how: {
      es: 'Parte el Estatuto en trozos y, ante cada pregunta, busca los 5 más relevantes combinando significado y palabras exactas. Una IA responde solo con esos trozos y numera de dónde sale cada dato. Se puede probar online sin instalar nada, o ejecutar en local sin que el documento salga del ordenador.',
      en: 'It splits the Statute into chunks and, for each question, finds the 5 most relevant ones by combining meaning and exact words. An AI answers using only those chunks and numbers where each fact comes from. It can be tried online with nothing to install, or run locally without the document leaving the computer.',
    },
    tech: [
      {
        title: { es: 'Búsqueda híbrida', en: 'Hybrid search' },
        text: {
          es: 'Búsqueda por vectores en ChromaDB (entiende que «días libres» ≈ «vacaciones») y BM25 implementado desde cero (acierta números de artículo y cifras exactas), combinadas con Reciprocal Rank Fusion. Fragmentos de 1.000 caracteres con 150 de solapamiento, etiquetados con su artículo.',
          en: 'Vector search in ChromaDB (it understands that "days off" ≈ "holidays") and BM25 implemented from scratch (it catches article numbers and exact figures), merged with Reciprocal Rank Fusion. 1,000-character chunks with 150 of overlap, tagged with their article.',
        },
      },
      {
        title: { es: 'No inventa', en: 'No made-up answers' },
        text: {
          es: 'Si el fragmento más parecido no llega a un umbral de similitud calibrado con la evaluación, responde «no está en los documentos» sin llamar a la IA: ni gasta tokens ni puede inventar.',
          en: 'If the closest chunk falls below a similarity threshold calibrated with the evaluation, it answers "not in the documents" without calling the AI: no tokens spent and no chance to invent.',
        },
      },
      {
        title: { es: 'Evaluación', en: 'Evaluation' },
        text: {
          es: '35 preguntas con respuesta conocida, evaluadas en GitHub Actions en cada cambio: encuentra el artículo correcto en el 87 % (80 % solo con vectores), responde bien el 77 % (70 %) y rechaza el 100 % de las preguntas que no están en la ley.',
          en: '35 questions with known answers, evaluated on GitHub Actions on every change: it finds the right article 87% of the time (80% with vectors only), answers 77% correctly (70%) and refuses 100% of the questions not covered by the law.',
        },
      },
      {
        title: { es: 'Local u online', en: 'Local or online' },
        text: {
          es: 'El mismo código funciona con Ollama en local (Llama 3.2 3B, sin claves) o con Gemini en la demo online. Los embeddings del documento se precalculan en CI para no gastar la cuota gratuita, y las preguntas en inglés se traducen solo para buscar.',
          en: 'The same code runs locally on Ollama (Llama 3.2 3B, no keys) or on Gemini for the online demo. Document embeddings are precomputed in CI so the free quota isn\'t spent, and English questions are translated for the search only.',
        },
      },
      {
        title: { es: 'Interfaz y pruebas', en: 'Interface and tests' },
        text: {
          es: 'Interfaz en Streamlit con tema claro y oscuro, respuesta palabra a palabra y enlace a la página del BOE. 47 tests unitarios, tests de principio a fin con el modelo real y despliegue en Docker y Codespaces.',
          en: 'Streamlit interface with light and dark themes, word-by-word streaming and a link to the gazette page. 47 unit tests, end-to-end tests with the real model and deployment on Docker and Codespaces.',
        },
      },
    ],
    stack: ['Python', 'LangChain', 'ChromaDB', 'BM25', 'Ollama', 'Gemini', 'Streamlit', 'pytest'],
    decisions: {
      es: [
        'Un documento real y comprobable: el Estatuto de los Trabajadores del BOE, largo, en español y lleno de cifras exactas.',
        'Búsqueda híbrida porque en un texto legal importan los números de artículo y las cifras exactas, y la evaluación lo confirma.',
        'El índice se sincroniza solo: añade lo nuevo, vuelve a procesar solo lo que cambió y borra lo de los PDF eliminados.',
      ],
      en: [
        'A real, checkable document: the Spanish Workers\' Statute from the official gazette, long, in Spanish and full of exact figures.',
        'Hybrid search because article numbers and exact figures matter in legal text, and the evaluation confirms it.',
        'The index keeps itself in sync: it adds what is new, re-processes only what changed and removes chunks of deleted PDFs.',
      ],
    },
    next: {
      es: [
        'Un reranker y un modelo más grande, medidos con la misma evaluación.',
        'Mejorar las preguntas que no comparten vocabulario con la ley (por ejemplo, «edad para trabajar» frente a «menores de dieciséis años»).',
      ],
      en: [
        'A reranker and a larger model, measured with the same evaluation.',
        'Improve questions that share no vocabulary with the law (for example, "working age" versus "under sixteen").',
      ],
    },
    demo: 'https://estatuto-rag.streamlit.app/',
    image: {
      src: '/img/rag-demo.webp',
      alt: {
        es: 'Demo web respondiendo a una pregunta sobre el Estatuto y citando el artículo y la página',
        en: 'Web demo answering a question about the Statute and citing the article and page',
      },
      width: 1920,
      height: 1352,
    },
    repo: 'https://github.com/mmartinezvaras/Python-RAG-AI-para-los-PDFs',
  },
  {
    slug: 'pagos-tarjeta',
    name: { es: 'Pagos con tarjeta en tiempo real (Kafka, HDFS y Hive)', en: 'Real-time card payments (Kafka, HDFS and Hive)' },
    area: 'Big Data',
    problem: {
      es: 'Un banco recibe un pago con tarjeta tras otro y no puede perder ninguno, ni siquiera si un programa se cae a mitad.',
      en: 'A bank receives one card payment after another and cannot lose a single one, not even if a program crashes halfway.',
    },
    impact: {
      value: { es: '0 pagos perdidos', en: '0 payments lost' },
      label: {
        es: 'en 102.000 mensajes, también al matar el programa que los guarda en mitad del tráfico. Y cada resultado se comprueba solo.',
        en: 'out of 102,000 messages, even when the program that stores them is killed mid-traffic. And every result is checked automatically.',
      },
    },
    how: {
      es: 'Un simulador genera pagos de clientes ficticios, Kafka los transporta, un archivador los guarda en HDFS y Hive responde tres preguntas de negocio: cuánto se gasta cada día por categoría, a qué horas se paga más y qué tarjetas han pagado en dos países el mismo día. Todo arranca en local con Docker.',
      en: 'A simulator generates payments from fictional customers, Kafka carries them, an archiver stores them in HDFS and Hive answers three business questions: how much is spent each day per category, at what times people pay most and which cards paid in two countries on the same day. Everything starts locally with Docker.',
    },
    tech: [
      {
        title: { es: 'Transporte con Kafka', en: 'Transport with Kafka' },
        text: {
          es: 'Topic de 3 particiones con card_id como clave, para que los pagos de una tarjeta mantengan su orden. El archivador escribe en HDFS por lotes (500 mensajes o 5 s) y solo después confirma el offset: si muere, relee, pero nunca pierde (at-least-once).',
          en: 'A 3-partition topic keyed by card_id, so each card\'s payments keep their order. The archiver writes to HDFS in batches (500 messages or 5 s) and only then commits the offset: if it dies, it re-reads but never loses anything (at-least-once).',
        },
      },
      {
        title: { es: 'Limpieza en Hive', en: 'Cleaning in Hive' },
        text: {
          es: 'Una vista deduplica por tx_id, aplica 5 reglas de validación y pasa de UTC a hora de Madrid. Los pagos válidos van a una tabla Parquet particionada por día y los rechazados a una cuarentena con su motivo. Importes siempre en DECIMAL, nunca en float.',
          en: 'A view deduplicates by tx_id, applies 5 validation rules and converts UTC to Madrid time. Valid payments go to a Parquet table partitioned by day and rejected ones to a quarantine table with their reason. Amounts are always DECIMAL, never float.',
        },
      },
      {
        title: { es: 'Pruebas con evidencias', en: 'Tests with evidence' },
        text: {
          es: 'Cada prueba parte de cero y compara Hive celda a celda con resultados calculados aparte en Python. Relectura: 0 perdidos. Caída: el retraso sube de 169 a 1.727 mensajes con el archivador muerto y vuelve a 0 en 6 s. Volumen: 102.000 mensajes de Kafka a HDFS en 139 s y 42,1 MB de JSON reducidos a 4,1 MB en Parquet.',
          en: 'Each test starts from scratch and compares Hive cell by cell with results computed separately in Python. Re-read: 0 lost. Crash: lag grows from 169 to 1,727 messages while the archiver is dead and returns to 0 in 6 s. Volume: 102,000 messages from Kafka to HDFS in 139 s, and 42.1 MB of JSON reduced to 4.1 MB of Parquet.',
        },
      },
      {
        title: { es: 'Entorno', en: 'Environment' },
        text: {
          es: 'Docker Compose con Kafka, Hadoop HDFS y Hive, un script con comandos para arrancar, probar y hacer una demo guiada, y un panel en directo en Streamlit.',
          en: 'Docker Compose with Kafka, Hadoop HDFS and Hive, a script with commands to start, test and run a guided demo, and a live Streamlit dashboard.',
        },
      },
    ],
    stack: ['Kafka', 'Hadoop HDFS', 'Hive', 'Python', 'Docker', 'Parquet', 'Streamlit'],
    decisions: {
      es: [
        'Confirmar el offset solo después de escribir en HDFS: se aceptan repeticiones, que la deduplicación por tx_id elimina, pero nunca pérdidas.',
        'Datos simulados con anomalías, duplicados y tarjetas sospechosas a propósito, para comprobar que el sistema los trata bien.',
        'Guardar los instantes en UTC y pasar a hora de Madrid solo para el día y la hora de negocio.',
      ],
      en: [
        'Commit the offset only after writing to HDFS: duplicates are accepted and removed by deduplicating on tx_id, but losses never happen.',
        'Simulated data with anomalies, duplicates and suspicious cards on purpose, to check that the system handles them correctly.',
        'Store timestamps in UTC and convert to Madrid time only for the business day and hour.',
      ],
    },
    image: {
      src: 'https://raw.githubusercontent.com/mmartinezvaras/bigdata-pagos-tarjeta/HEAD/docs/arquitectura.png',
      alt: {
        es: 'Arquitectura: simulador, Kafka, archivador, HDFS, Hive y consultas de negocio',
        en: 'Architecture: simulator, Kafka, archiver, HDFS, Hive and business queries',
      },
      width: 1561,
      height: 624,
    },
    repo: 'https://github.com/mmartinezvaras/bigdata-pagos-tarjeta',
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
    name: { es: 'Panel de reventa de productos', en: 'Product resale dashboard' },
    area: 'Desarrollo',
    problem: {
      es: 'Revender productos en Wallapop, Vinted o eBay parece rentable hasta que sumas envíos, comisiones y lo que no se vende.',
      en: "Reselling products on Wallapop, Vinted or eBay looks profitable until you add up shipping, fees and the units that don't sell.",
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
