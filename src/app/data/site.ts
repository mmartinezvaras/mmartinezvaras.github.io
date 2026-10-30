import { L } from '../core/i18n';

// Todo el contenido personal de la web vive aquí.
// Cada texto visible va en los dos idiomas: { es: '...', en: '...' }. Lo que no cambia
// (nombres propios, tecnologías, enlaces) puede ir como texto normal.
export const site = {
  name: 'Marcos María Martínez Varas',
  role: 'Junior Data Engineer',
  focus: { es: 'Big Data e IA generativa', en: 'Big Data and Generative AI' },
  tagline: { es: 'Convierto datos en decisiones.', en: 'I turn data into decisions.' },
  intro: {
    es: 'Técnico Superior en DAM con prácticas en Minsait (Indra Group) y estudiante del máster en Big Data, IA aplicada e IA generativa de U-tad. Estoy construyendo un pipeline de datos con PySpark y Delta Lake y aplicaciones con IA generativa, y aprendiendo COBOL para conectar los sistemas de siempre con la tecnología de hoy.',
    en: "Higher Technician in Multiplatform Application Development (DAM) with an internship at Minsait (Indra Group), currently studying a Master's in Big Data, Applied AI and Generative AI at U-tad. I'm building a data pipeline with PySpark and Delta Lake and generative AI applications, and learning COBOL to connect long-standing systems with today's technology.",
  },
  cv: 'Marcos_Maria_Martinez_Varas_BigData_IA.pdf',
  // Nombre con el que se guarda el CV al descargarlo
  cvFileName: 'Marcos_Maria_Martinez_Varas_BigData_IA.pdf',
  cvEn: 'Marcos_Maria_Martinez_Varas_BigData_IA_EN.pdf',
  cvEnFileName: 'Marcos_Maria_Martinez_Varas_BigData_IA_EN.pdf',
  location: { es: 'Madrid, España', en: 'Madrid, Spain' },
  seeking: {
    es: 'Busco prácticas o mi primer empleo como junior de datos (Data Engineer, BI o ETL), también en proyectos de IA generativa o modernización de sistemas.',
    en: "I'm looking for an internship or my first role as a junior data professional (Data Engineer, BI or ETL), and I'm also open to generative AI and legacy modernisation projects.",
  },
  availability: {
    es: 'Disponible ya por las mañanas (hasta las 15:00) · Jornada completa desde junio de 2027',
    en: 'Available now for mornings (until 15:00 CET) · Full-time from June 2027',
  },
  email: 'mmartinezvaras@icloud.com',
  github: 'https://github.com/mmartinezvaras',
  linkedin: 'https://www.linkedin.com/in/marcos-mar%C3%ADa-mart%C3%ADnez-varas-b5156b3a3/',
  interests: [
    {
      title: 'Big Data',
      text: {
        es: 'Pipelines, procesamiento de grandes volúmenes de datos y analítica que ayude a decidir.',
        en: 'Pipelines, large-scale data processing and analytics that help people make decisions.',
      },
    },
    {
      title: { es: 'IA', en: 'AI' },
      text: {
        es: 'IA aplicada e IA generativa: usarla en problemas reales, no solo en demos.',
        en: 'Applied and generative AI: putting it to work on real problems, not just demos.',
      },
    },
    {
      title: 'COBOL',
      text: {
        es: 'Sistemas heredados y mainframe: lo estoy aprendiendo para entenderlos y conectarlos con tecnologías actuales.',
        en: "Legacy and mainframe systems: I'm learning COBOL to understand them and connect them with modern technology.",
      },
    },
  ],
  education: [
    {
      period: '2026 – 2027',
      title: {
        es: 'Máster en Big Data, IA aplicada e IA generativa',
        en: "Master's in Big Data, Applied AI and Generative AI",
      },
      center: 'U-tad',
      current: true,
    },
    {
      period: '2024 – 2026',
      title: {
        es: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)',
        en: 'Higher Technician in Multiplatform Application Development (DAM)',
      },
      center: 'IES Gonzalo Chacón',
      current: false,
    },
  ],
  experience: [
    {
      period: 'Mar – Jun 2026',
      title: { es: 'Prácticas de desarrollo · 4 meses', en: 'Software Development Intern · 4 months' },
      company: 'Minsait (Indra Group)',
      text: {
        es: 'Desarrollo front-end con Angular, Tailwind CSS y JavaScript y tareas de back-end con Java y Spring Boot, dentro de un equipo de desarrollo profesional y con sus flujos reales: Git, revisiones y entregas por tareas.',
        en: "Front-end development with Angular, Tailwind CSS and JavaScript, plus back-end tasks with Java and Spring Boot, as part of a professional development team and within its real workflow: Git, reviews and task-based delivery.",
      },
    },
  ],
  // De la más reciente a la más antigua. 'image': insignia de Credly (se ve a 80 px; 160 px para pantallas retina)
  certifications: [
    {
      title: 'Python Essentials 2',
      issuer: 'Cisco · OpenEDG Python Institute',
      year: 'Oct 2026',
      url: 'https://www.credly.com/badges/50a0a413-61d9-47c9-be51-33c1361e98e5/public_url',
      image: 'https://images.credly.com/size/160x160/images/3f802526-7274-4230-91ab-f6d1a35340e6/image.png',
    },
    {
      title: 'Python Essentials 1',
      issuer: 'Cisco · OpenEDG Python Institute',
      year: 'Oct 2026',
      url: 'https://www.credly.com/badges/d5f2e3d3-7c41-4ec8-8fdd-0be91d3ac1a8/public_url',
      image: 'https://images.credly.com/size/160x160/images/68c0b94d-f6ac-40b1-a0e0-921439eb092e/image.png',
    },
    {
      title: 'Data Science Essentials with Python',
      issuer: 'Cisco',
      year: 'Oct 2026',
      url: 'https://www.credly.com/badges/3eb09829-dfb1-4eed-ada0-a2b9ffe9e77b/public_url',
      image: 'https://images.credly.com/size/160x160/images/62db59ef-19f9-4652-a00c-7582baee8177/blob',
    },
  ] as { title: string | L; issuer: string; year: string; url?: string; image?: string }[],
  languages: [
    { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' } },
    { name: { es: 'Inglés', en: 'English' }, level: 'C2 · LanguageCert' },
  ],
  extras: [
    {
      es: 'Disponible ya por las mañanas (hasta las 15:00) · Jornada completa desde junio de 2027',
      en: 'Available now for mornings (until 15:00 CET) · Full-time from June 2027',
    },
    { es: 'Carnet de conducir', en: 'Driving licence' },
    {
      es: 'Experiencia dirigiendo un equipo de fútbol: liderazgo y organización',
      en: 'Experience coaching a football team: leadership and organisation',
    },
  ],
  // Solo tecnologías usadas en repos públicos (o en el CV, como Spark, COBOL y Git).
  skills: [
    {
      category: { es: 'IA generativa', en: 'Generative AI' },
      items: ['LLMs', 'RAG', 'LangChain', 'Ollama', 'AWS Bedrock', 'ChromaDB', 'Streamlit', { es: 'Evaluación LLM-as-judge', en: 'LLM-as-a-judge evaluation' }, 'Prompting'].map((name) => ({ name, learning: false })),
    },
    {
      category: 'Machine Learning',
      items: ['scikit-learn', 'pandas', 'Jupyter', 'Matplotlib'].map((name) => ({ name, learning: false })),
    },
    {
      category: 'Big Data',
      // Spark y HDFS en aprendizaje hasta terminar el pipeline PySpark de banking-lakehouse
      items: ['Spark', 'Hadoop HDFS'].map((name) => ({ name, learning: true })),
    },
    {
      category: { es: 'Datos y backend', en: 'Data and back-end' },
      items: ['SQL', 'MySQL', 'MongoDB / PyMongo', 'Spring Boot', 'JPA / Hibernate'].map((name) => ({ name, learning: false })),
    },
    {
      category: { es: 'Calidad y DevOps', en: 'Quality and DevOps' },
      items: ['pytest', 'JUnit 5 / Mockito', 'GitHub Actions', 'Docker', 'Git'].map((name) => ({ name, learning: false })),
    },
    {
      category: { es: 'Lenguajes y front-end', en: 'Languages and front-end' },
      items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'Angular', 'Tailwind CSS', 'PrimeNG', 'HTML', 'CSS'].map((name) => ({ name, learning: false })),
    },
    {
      category: { es: 'Visión por computador', en: 'Computer vision' },
      items: ['OpenCV', 'face_recognition'].map((name) => ({ name, learning: false })),
    },
    {
      category: 'Mainframe',
      items: [{ name: 'COBOL', learning: true }],
    },
  ],
};
