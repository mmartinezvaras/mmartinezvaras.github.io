// IMPORTANTE: la web es bilingüe. Cada texto nuevo debe tener versión en español y en inglés:
// { es: '...', en: '...' } (y en las listas, una lista por idioma: { es: [...], en: [...] }).
//
// Para añadir una nota al Lab: copia un bloque, cambia sus datos y listo. No hay que tocar componentes.
import { L } from '../core/i18n';

export interface Note {
  slug: string;
  title: L;
  date: L;
  isoDate: string; // AAAA-MM-DD, para el atributo datetime
  tags: L<string[]>;
  summary: L;
  body: L<string[]>;
}

export const notes: Note[] = [
  // Plantilla de nota vacía: cópiala, quita los // y rellénala. El Lab las muestra en el orden de este array.
  // {
  //   slug: '',
  //   title: { es: '', en: '' },
  //   date: { es: '', en: '' },
  //   isoDate: '',
  //   tags: { es: [], en: [] },
  //   summary: { es: '', en: '' },
  //   body: {
  //     es: [''],
  //     en: [''],
  //   },
  // },
  {
    slug: 'agente-local-ollama-opencode',
    title: {
      es: 'Montar un agente de programación local y gratuito en una RTX 3060',
      en: 'Setting up a free, local coding agent on an RTX 3060',
    },
    date: { es: '4 oct 2026', en: '4 Oct 2026' },
    isoDate: '2026-10-04',
    tags: { es: ['IA generativa', 'Ollama', 'Agentes'], en: ['Generative AI', 'Ollama', 'Agents'] },
    summary: {
      es: 'Qué funcionó y qué no al ejecutar un agente de programación con modelos locales, sin pagar por tokens.',
      en: "What worked and what didn't when running a coding agent on local models, without paying for tokens.",
    },
    body: {
      es: [
        'Quería un agente de programación que funcionara en mi propio PC, sin pagar por tokens. Mi equipo es modesto: una RTX 3060 con 12 GB de VRAM y 16 GB de RAM. Probé Ollama como motor, OpenCode como agente y modelos de la familia Qwen de 8 y 9 mil millones de parámetros.',
        'El primer problema fue el contexto. Ollama arranca por defecto con 4.096 tokens, demasiado poco para un agente. Lo comprobé con el comando ollama ps, lo subí a 32.768 y verifiqué que el modelo seguía cabiendo entero en la GPU.',
        'Después llegó aprender sus límites. Un modelo de este tamaño resuelve bien tareas pequeñas, pero si se le piden varias cosas a la vez inventa archivos que no existen, deja el trabajo a medias o se pone a rebuscar en node_modules. Lo que mejor me ha funcionado son las tareas acotadas, darle el código exacto cuando la sintaxis es delicada y comprobar el resultado real al terminar cada una, con git status y el build.',
        'También aprendí a no fiarme de lo que el agente dice haber hecho: la prueba es siempre la salida de los comandos. Y un detalle práctico en Windows PowerShell 5.1: escribir archivos con ciertos comandos corrompe los acentos, así que hay que usar la herramienta de edición o guardar en UTF-8 sin BOM.',
        'Este mismo portfolio se ha construido con ese flujo, apoyándome en un asistente de IA para diseñar los pasos y revisar los errores.',
      ],
      en: [
        'I wanted a coding agent that ran on my own PC, without paying for tokens. My machine is modest: an RTX 3060 with 12 GB of VRAM and 16 GB of RAM. I tried Ollama as the engine, OpenCode as the agent and Qwen-family models with 8 and 9 billion parameters.',
        'The first problem was context. By default, Ollama starts with 4,096 tokens, far too few for an agent. I checked it with the ollama ps command, raised it to 32,768 and made sure the model still fitted entirely on the GPU.',
        "Then came learning its limits. A model this size handles small tasks well, but ask it for several things at once and it invents files that don't exist, leaves work half done or starts digging through node_modules. What has worked best for me is tightly scoped tasks, giving it the exact code when the syntax is tricky, and checking the real result after each one with git status and the build.",
        'I also learned not to trust what the agent says it has done: the proof is always the output of the commands. And a practical detail on Windows PowerShell 5.1: writing files with certain commands corrupts accented characters, so you need to use the editing tool or save as UTF-8 without BOM.',
        'This very portfolio was built with that workflow, with an AI assistant helping me plan the steps and review the errors.',
      ],
    },
  },
];
