import Link from 'next/link';
import { getDictionary } from '../../../i18n/get-dictionary';
import type { Locale } from '../../../i18n/config';
import { LanguageSwitcher } from '../../../components/language-switcher';
import { workExperiences } from '../../../content/work';

interface WorkProps {
  params: Promise<{ locale: string }>;
}

export default async function Work({ params }: WorkProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const experiences = workExperiences[locale as Locale];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex justify-between items-start mb-16">
        <Link 
          href={`/${locale}`} 
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ← {dict.bio.title}
        </Link>
        <LanguageSwitcher currentLocale={locale as Locale} />
      </div>

      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-4">
            {dict.pages.work.title}
          </h1>
          <p className="text-muted-foreground">
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
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{exp.company}</span>
                  <span>•</span>
                  <span>{exp.period}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground">
                {exp.description}
              </p>

              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex">
                    <span className="mr-2 text-foreground">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              {exp.technologies && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}