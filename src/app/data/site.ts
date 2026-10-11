// Todo el contenido personal de la web vive aquí.
export const site = {
  name: 'Marcos María Martínez Varas',
  role: 'Junior Data & AI Engineer',
  focus: 'Big Data e IA generativa',
  tagline: 'Convierto datos en decisiones.',
  intro:
    'Técnico Superior en DAM con prácticas en Minsait (Indra Group) y estudiante del máster en Big Data, IA aplicada e IA generativa de U-tad. Construyo pipelines de datos y aplicaciones con IA generativa, y estoy aprendiendo COBOL para conectar los sistemas de siempre con la tecnología de hoy.',
  cv: 'Marcos_Maria_Martinez_Varas_BigData_IA.pdf',
  // Nombre con el que se guarda el CV al descargarlo
  cvFileName: 'Marcos_Maria_Martinez_Varas_BigData_IA.pdf',
  location: 'Madrid, España',
  seeking:
    'Busco prácticas o mi primer empleo en datos, IA o modernización de sistemas. En remoto, presencial o en otro país.',
  availability: 'Disponibilidad inmediata',
  email: 'mmartinezvaras@icloud.com',
  github: 'https://github.com/mmartinezvaras',
  linkedin: 'https://www.linkedin.com/in/marcos-mar%C3%ADa-mart%C3%ADnez-varas-b5156b3a3/',
  interests: [
    {
      title: 'Big Data',
      text: 'Pipelines, procesamiento de grandes volúmenes de datos y analítica que ayude a decidir.',
    },
    {
      title: 'IA',
      text: 'IA aplicada e IA generativa: usarla en problemas reales, no solo en demos.',
    },
    {
      title: 'COBOL',
      text: 'Sistemas heredados y mainframe: lo estoy aprendiendo para entenderlos y conectarlos con tecnologías actuales.',
    },
  ],
  education: [
    {
      period: '2026 – 2027',
      title: 'Máster en Big Data, IA aplicada e IA generativa',
      center: 'U-tad',
      current: true,
    },
    {
      period: '2024 – 2026',
      title: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)',
      center: 'IES Gonzalo Chacón',
      current: false,
    },
  ],
  experience: [
    {
      period: 'Mar – Jun 2026',
      title: 'Prácticas de tecnología · 4 meses',
      company: 'Minsait (Indra Group)',
      text: 'Trabajé dentro de un equipo de desarrollo profesional, con sus flujos de trabajo reales, aplicando lo aprendido en el ciclo DAM.',
    },
  ],
  certifications: [] as { title: string; issuer: string; year: string }[],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'C2 · LanguageCert' },
  ],
  extras: [
    'Disponibilidad inmediata',
    'Carnet de conducir',
    'Experiencia dirigiendo un equipo de fútbol: liderazgo y organización',
  ],
  // Solo tecnologías usadas en repos públicos (o en el CV, como Spark, COBOL y Git).
  skills: [
    {
      category: 'IA generativa',
      items: ['LLMs', 'RAG', 'LangChain', 'Ollama', 'AWS Bedrock', 'ChromaDB', 'Streamlit', 'Evaluación LLM-as-judge', 'Prompting'].map((name) => ({ name, learning: false })),
    },
    {
      category: 'Machine Learning',
      items: ['scikit-learn', 'pandas', 'Jupyter', 'Matplotlib'].map((name) => ({ name, learning: false })),
    },
    {
      category: 'Big Data',
      items: ['Spark', 'Hadoop HDFS'].map((name) => ({ name, learning: false })),
    },
    {
      category: 'Datos y backend',
      items: ['SQL', 'MySQL', 'MongoDB / PyMongo', 'Spring Boot', 'JPA / Hibernate'].map((name) => ({ name, learning: false })),
    },
    {
      category: 'Calidad y DevOps',
      items: ['pytest', 'JUnit 5 / Mockito', 'GitHub Actions', 'Docker', 'Git'].map((name) => ({ name, learning: false })),
    },
    {
      category: 'Lenguajes y front-end',
      items: ['Python', 'Java', 'TypeScript', 'Angular', 'PrimeNG', 'HTML', 'CSS'].map((name) => ({ name, learning: false })),
    },
    {
      category: 'Visión por computador',
      items: ['OpenCV', 'face_recognition'].map((name) => ({ name, learning: false })),
    },
    {
      category: 'Mainframe',
      items: [{ name: 'COBOL', learning: true }],
    },
  ],
};
