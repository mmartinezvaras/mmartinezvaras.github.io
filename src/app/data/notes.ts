// Para añadir una nota al Lab: copia un bloque, cambia sus datos y listo. No hay que tocar componentes.
export interface Note {
  slug: string;
  title: string;
  date: string;
  isoDate: string; // AAAA-MM-DD, para el atributo datetime
  tags: string[];
  summary: string;
  body: string[];
}

export const notes: Note[] = [
  {
    slug: 'agente-local-ollama-opencode',
    title: 'Montar un agente de programación local y gratuito en una RTX 3060',
    date: '4 oct 2026',
    isoDate: '2026-10-04',
    tags: ['IA generativa', 'Ollama', 'Agentes'],
    summary:
      'Qué funcionó y qué no al ejecutar un agente de programación con modelos locales, sin pagar por tokens.',
    body: [
      'Quería un agente de programación que funcionara en mi propio PC, sin pagar por tokens. Mi equipo es modesto: una RTX 3060 con 12 GB de VRAM y 16 GB de RAM. Probé Ollama como motor, OpenCode como agente y modelos de la familia Qwen de 8 y 9 mil millones de parámetros.',
      'El primer problema fue el contexto. Ollama arranca por defecto con 4.096 tokens, demasiado poco para un agente. Lo comprobé con el comando ollama ps, lo subí a 32.768 y verifiqué que el modelo seguía cabiendo entero en la GPU.',
      'Después llegó aprender sus límites. Un modelo de este tamaño resuelve bien tareas pequeñas, pero si se le piden varias cosas a la vez inventa archivos que no existen, deja el trabajo a medias o se pone a rebuscar en node_modules. Lo que mejor me ha funcionado son las tareas acotadas, darle el código exacto cuando la sintaxis es delicada y comprobar el resultado real al terminar cada una, con git status y el build.',
      'También aprendí a no fiarme de lo que el agente dice haber hecho: la prueba es siempre la salida de los comandos. Y un detalle práctico en Windows PowerShell 5.1: escribir archivos con ciertos comandos corrompe los acentos, así que hay que usar la herramienta de edición o guardar en UTF-8 sin BOM.',
      'Este mismo portfolio se ha construido con ese flujo, apoyándome en un asistente de IA para diseñar los pasos y revisar los errores.',
    ],
  },
];