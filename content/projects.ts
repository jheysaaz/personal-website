export interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  links: {
    github?: string;
    demo?: string;
    chrome?: string;
  };
  status: "active" | "completed" | "archived";
  featured: boolean;
}

export const projects: Record<"en" | "es", Project[]> = {
  en: [
    {
      title: "Clipio",
      description: "Advanced clipboard and snippet manager for browsers",
      longDescription:
        "A powerful browser extension built with React and TypeScript that enhances clipboard functionality. Features rich-text editing with Plate.js, intelligent snippet categorization, cross-tab synchronization, and multi-backend storage options. Designed for developers and power users who work with code, text, and complex formatting.",
      technologies: [
        "React",
        "TypeScript",
        "shadcn/ui",
        "Plate.js",
        "Chrome Extension API",
        "Tailwind CSS",
      ],
      links: {
        github: "https://github.com/jheysaaz/clipio",
        chrome:
          "https://chromewebstore.google.com/detail/clipio-%E2%80%94-snippets-manager/diccgefmgdlhimonhjckhejkmdbkmkod",
      },
      status: "active",
      featured: true,
    },
  ],
  es: [
    {
      title: "Clipio",
      description: "Gestor avanzado de clipboard y snippets para navegadores",
      longDescription:
        "Una poderosa extensión de navegador construida con React y TypeScript que mejora la funcionalidad del clipboard. Incluye edición de texto enriquecido con Plate.js, categorización inteligente de snippets, sincronización entre pestañas, y opciones de almacenamiento múltiples. Diseñada para desarrolladores y usuarios avanzados que trabajan con código, texto y formateo complejo.",
      technologies: [
        "React",
        "TypeScript",
        "shadcn/ui",
        "Plate.js",
        "Chrome Extension API",
        "Tailwind CSS",
      ],
      links: {
        github: "https://github.com/jheysaaz/clipio",
        chrome:
          "https://chromewebstore.google.com/detail/clipio-%E2%80%94-snippets-manager/diccgefmgdlhimonhjckhejkmdbkmkod",
      },
      status: "active",
      featured: true,
    },
  ],
};
