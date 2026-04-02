export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  technologies?: string[];
}

export const workExperiences: Record<'en' | 'es', WorkExperience[]> = {
  en: [
    {
      title: "Customer Experience Analyst",
      company: "Holafly",
      period: "Jun 2025 – Mar 2026",
      description: "Remote contract role focusing on fraud detection and operational reporting.",
      achievements: [
        "Identified fraud patterns contributing to 83% reduction in undetected chargeback exposure",
        "Designed Looker Studio dashboards saving ~6 hours per week across CX team",
        "Automated BigQuery data pulls eliminating 3 hours per reporting cycle",
        "Centralized QA documentation improving team alignment"
      ],
      technologies: ["BigQuery", "SQL", "Looker Studio", "Shopify", "Adyen", "Notion"]
    },
    {
      title: "Risk Investigator", 
      company: "Sutherland Global Services",
      period: "Dec 2024 – Apr 2025",
      description: "Investigated chargebacks and fraud claims using specialized risk assessment tools.",
      achievements: [
        "Maintained 80% accuracy rate in risk assessments",
        "Analyzed multi-source transactional data for legitimacy verification"
      ],
      technologies: ["LexisNexis", "Ekata", "Sift"]
    },
    {
      title: "Customer Service Associate",
      company: "Sutherland Global Services", 
      period: "Aug 2024 – Dec 2024",
      description: "Resolved customer inquiries across multiple channels while meeting performance KPIs.",
      achievements: [
        "Consistently met CSAT and handling-time KPIs",
        "Coordinated with partner banks to resolve transaction disputes"
      ],
      technologies: ["Chat", "Email", "Phone Support"]
    }
  ],
  es: [
    {
      title: "Analista de Experiencia del Cliente",
      company: "Holafly", 
      period: "Jun 2025 – Mar 2026",
      description: "Rol remoto por contrato enfocado en detección de fraude y reportes operacionales.",
      achievements: [
        "Identifiqué patrones de fraude contribuyendo a una reducción del 83% en exposición no detectada",
        "Diseñé dashboards en Looker Studio ahorrando ~6 horas semanales al equipo de CX",
        "Automaticé extracciones de datos en BigQuery eliminando 3 horas por ciclo de reporte",
        "Centralicé documentación de QA mejorando la alineación del equipo"
      ],
      technologies: ["BigQuery", "SQL", "Looker Studio", "Shopify", "Adyen", "Notion"]
    },
    {
      title: "Investigador de Riesgo",
      company: "Sutherland Global Services",
      period: "Dic 2024 – Abr 2025", 
      description: "Investigué chargebacks y reclamos de fraude usando herramientas especializadas de evaluación de riesgo.",
      achievements: [
        "Mantuve un 80% de precisión en evaluaciones de riesgo",
        "Analicé datos transaccionales de múltiples fuentes para verificación de legitimidad"
      ],
      technologies: ["LexisNexis", "Ekata", "Sift"]
    },
    {
      title: "Asociado de Servicio al Cliente",
      company: "Sutherland Global Services",
      period: "Ago 2024 – Dic 2024",
      description: "Resolví consultas de clientes en múltiples canales cumpliendo con KPIs de rendimiento.",
      achievements: [
        "Cumplí consistentemente con KPIs de CSAT y tiempo de manejo",
        "Coordiné con bancos socios para resolver disputas de transacciones"
      ],
      technologies: ["Chat", "Email", "Soporte Telefónico"]
    }
  ]
};