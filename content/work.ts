import type { LocalizedString } from "./types";

export interface WorkExperience {
  title: LocalizedString;
  company: string;
  period: LocalizedString;
  description: LocalizedString;
  achievements: LocalizedString[];
  technologies?: LocalizedString[];
}

export const workExperiences: WorkExperience[] = [
  {
    title: { en: "Customer Experience Analyst", es: "Analista de Experiencia del Cliente" },
    company: "Holafly",
    period: { en: "Jun 2025 – Mar 2026", es: "Jun 2025 – Mar 2026" },
    description: {
      en: "Remote contract role focusing on fraud detection and refunds processing with operational reporting.",
      es: "Rol remoto por contrato enfocado en procesamiento de reembolsos, detección de fraude y reportes operacionales.",
    },
    achievements: [
      {
        en: "Identified fraud patterns contributing to reduction in undetected chargeback exposure",
        es: "Identifiqué patrones de fraude que contribuyeron a la reducción de la exposición a disputas bancarias",
      },
      {
        en: "Supported better decision-making with data-backed reporting",
        es: "Mejoré la toma de decisiones mediante informes basados en datos",
      },
      {
        en: "Identified patterns in refund requests (behavior, geography, product, timing)",
        es: "Identifiqué patrones en las solicitudes de reembolso (comportamiento, ubicación geográfica, producto, momento)",
      },
      {
        en: "Automated parts of the refund analysis/reporting",
        es: "Automatizé partes del análisis y la elaboración de informes de reembolsos",
      },
    ],
    technologies: [
      { en: "Excel", es: "Excel" },
      { en: "Google Sheets", es: "Google Sheets" },
      { en: "Looker Studio", es: "Looker Studio" },
      { en: "Shopify", es: "Shopify" },
      { en: "Adyen", es: "Adyen" },
      { en: "Notion", es: "Notion" },
    ],
  },
  {
    title: { en: "Risk Investigator", es: "Investigador de Riesgo" },
    company: "Sutherland Global Services",
    period: { en: "Dec 2024 – Apr 2025", es: "Dic 2024 – Abr 2025" },
    description: {
      en: "Investigated chargebacks and fraud claims using specialized risk assessment tools.",
      es: "Investigué chargebacks y reclamos de fraude usando herramientas especializadas de evaluación de riesgo.",
    },
    achievements: [
      {
        en: "Maintained excellent accuracy rate in risk assessments",
        es: "Mantuve un excelente nivel de precisión en evaluaciones de riesgo",
      },
      {
        en: "Analyzed multi-source transactional data for legitimacy verification",
        es: "Analicé datos transaccionales de múltiples fuentes para verificación de legitimidad",
      },
    ],
    technologies: [
      { en: "LexisNexis", es: "LexisNexis" },
      { en: "Ekata", es: "Ekata" },
      { en: "Sift", es: "Sift" },
      { en: "Fraud", es: "Fraude" },
    ],
  },
  {
    title: { en: "Customer Service Associate", es: "Especialista en Servicio al Cliente" },
    company: "Sutherland Global Services",
    period: { en: "Aug 2024 – Dec 2024", es: "Ago 2024 – Dic 2024" },
    description: {
      en: "Resolved customer inquiries across multiple channels while meeting performance KPIs.",
      es: "Resolví consultas de clientes en múltiples canales cumpliendo con KPIs de rendimiento.",
    },
    achievements: [
      {
        en: "Consistently met CSAT and handling-time KPIs",
        es: "Cumplí consistentemente con KPIs de CSAT y tiempo de manejo",
      },
      {
        en: "Coordinated with partner banks to resolve transaction disputes",
        es: "Coordiné con bancos socios para resolver disputas de transacciones",
      },
    ],
    technologies: [
      { en: "Chat", es: "Chat" },
      { en: "Email", es: "Email" },
      { en: "Phone Support", es: "Soporte Telefónico" },
    ],
  },
];
