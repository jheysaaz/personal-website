import type { LocalizedString } from "./types.ts";

export interface Project {
  title: string;
  description: LocalizedString;
  longDescription: LocalizedString;
  technologies: string[];
  links: {
    github?: string;
    demo?: string;
    chrome?: string;
  };
  status: "active" | "completed" | "archived";
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: "Knox",
    description: {
      en: "Offline desktop app for batch OCR, cleaning, and PDF compression",
      es:
        "App de escritorio offline para OCR por lotes, limpieza y compresión de PDFs",
    },
    longDescription: {
      en:
        "A Tauri-based desktop application that provides batch OCR processing for PDFs using a Rust-native Tesseract FFI pipeline. Features image preprocessing (denoising, binarization, deskew), CCITT Group 4 compression, PDF/A compliance, and real-time per-file progress tracking. Built with React 19, Tailwind CSS, and shadcn/ui.",
      es:
        "Una aplicación de escritorio basada en Tauri que procesa PDFs con OCR por lotes mediante un pipeline nativo en Rust con Tesseract FFI. Incluye preprocesamiento de imágenes (denoising, binarización, deskew), compresión CCITT Group 4, cumplimiento PDF/A y seguimiento de progreso en tiempo real. Construida con React 19, Tailwind CSS y shadcn/ui.",
    },
    technologies: [
      "React",
      "TypeScript",
      "Tauri",
      "Rust",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    links: { github: "https://github.com/jheysaaz/knox" },
    status: "active",
    featured: true,
  },
  {
    title: "Clipio",
    description: {
      en: "Advanced clipboard and snippet manager for browsers",
      es: "Gestor avanzado de clipboard y snippets para navegadores",
    },
    longDescription: {
      en:
        "A powerful browser extension built with React and TypeScript that enhances clipboard functionality. Features rich-text editing with Plate.js, intelligent snippet categorization, cross-tab synchronization, and multi-backend storage options. Designed for developers and power users who work with code, text, and complex formatting.",
      es:
        "Una poderosa extensión de navegador construida con React y TypeScript que mejora la funcionalidad del clipboard. Incluye edición de texto enriquecido con Plate.js, categorización inteligente de snippets, sincronización entre pestañas, y opciones de almacenamiento múltiples. Diseñada para desarrolladores y usuarios avanzados que trabajan con código, texto y formateo complejo.",
    },
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
];
