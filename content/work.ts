export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  technologies?: string[];
}

export const workExperiences: Record<"en" | "es", WorkExperience[]> = {
  en: [
    {
      title: "Customer Experience Analyst",
      company: "Holafly",
      period: "Jun 2025 – Mar 2026",
      description:
        "Remote contract role focusing on fraud detection and refunds processing with operational reporting.",
      achievements: [
        "Identified fraud patterns contributing to reduction in undetected chargeback exposure",
        "Supported better decision-making with data-backed reporting",
        "Identified patterns in refund requests (behavior, geography, product, timing)",
        "Automated parts of the refund analysis/reporting",
      ],
      technologies: [
        "Excel",
        "Google Sheets",
        "Looker Studio",
        "Shopify",
        "Adyen",
        "Notion",
      ],
    },
    {
      title: "Risk Investigator",
      company: "Sutherland Global Services",
      period: "Dec 2024 – Apr 2025",
      description:
        "Investigated chargebacks and fraud claims using specialized risk assessment tools.",
      achievements: [
        "Maintained excellent accuracy rate in risk assessments",
        "Analyzed multi-source transactional data for legitimacy verification",
      ],
      technologies: ["LexisNexis", "Ekata", "Sift", "Fraud"],
    },
    {
      title: "Customer Service Associate",
      company: "Sutherland Global Services",
      period: "Aug 2024 – Dec 2024",
      description:
        "Resolved customer inquiries across multiple channels while meeting performance KPIs.",
      achievements: [
        "Consistently met CSAT and handling-time KPIs",
        "Coordinated with partner banks to resolve transaction disputes",
      ],
      technologies: ["Chat", "Email", "Phone Support"],
    },
  ],
  es: [
    {
      title: "Analista de Experiencia del Cliente",
      company: "Holafly",
      period: "Jun 2025 – Mar 2026",
      description:
        "Rol remoto por contrato enfocado en procesamiento de reembolsos, detección de fraude y reportes operacionales.",
      achievements: [
        "Identifiqué patrones de fraude que contribuyeron a la reducción de la exposición a disputas bancarias",
        "Mejoré la toma de decisiones mediante informes basados en datos",
        "Identifiqué patrones en las solicitudes de reembolso (comportamiento, ubicación geográfica, producto, momento)",
        "Automatizé partes del análisis y la elaboración de informes de reembolsos",
      ],
      technologies: [
        "Excel",
        "Google Sheets",
        "Looker Studio",
        "Shopify",
        "Adyen",
        "Notion",
      ],
    },
    {
      title: "Investigador de Riesgo",
      company: "Sutherland Global Services",
      period: "Dic 2024 – Abr 2025",
      description:
        "Investigué chargebacks y reclamos de fraude usando herramientas especializadas de evaluación de riesgo.",
      achievements: [
        "Mantuve un excelente nivel de precisión en evaluaciones de riesgo",
        "Analicé datos transaccionales de múltiples fuentes para verificación de legitimidad",
      ],
      technologies: ["LexisNexis", "Ekata", "Sift", "Fraude"],
    },
    {
      title: "Especialista en Servicio al Cliente",
      company: "Sutherland Global Services",
      period: "Ago 2024 – Dic 2024",
      description:
        "Resolví consultas de clientes en múltiples canales cumpliendo con KPIs de rendimiento.",
      achievements: [
        "Cumplí consistentemente con KPIs de CSAT y tiempo de manejo",
        "Coordiné con bancos socios para resolver disputas de transacciones",
      ],
      technologies: ["Chat", "Email", "Soporte Telefónico"],
    },
  ],
};
