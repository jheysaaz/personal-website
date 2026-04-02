import type { Metadata } from 'next';
import { getDictionary } from '../../../i18n/get-dictionary';
import type { Locale } from '../../../i18n/config';
import { workExperiences } from '../../../content/work';
import { BackNavigation } from '../../../components/back-navigation';
import { TechBadgeList } from '../../../components/tech-badge';

interface WorkProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: WorkProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  
  return {
    title: dict.pages.work.title,
    description: dict.pages.work.description,
    alternates: {
      canonical: `/${locale}/work`,
      languages: {
        en: '/en/work',
        es: '/es/work',
      },
    },
  };
}

export default async function Work({ params }: WorkProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const experiences = workExperiences[locale as Locale];

  return (
    <div className="space-y-12">
      <BackNavigation href={`/${locale}`} label={dict.navigation.backToBase} />

      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-4 font-serif">
            {dict.pages.work.title}
          </h1>
          <p className="text-foreground">
            {dict.pages.work.description}
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-foreground">
                  {exp.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <span>{exp.company}</span>
                  <span>•</span>
                  <span>{exp.period}</span>
                </div>
              </div>
              
              <p className="text-foreground">
                {exp.description}
              </p>

              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-sm text-foreground flex">
                    <span className="mr-2 text-foreground">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              {exp.technologies && (
                <TechBadgeList technologies={exp.technologies} className="pt-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}