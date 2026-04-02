import Link from 'next/link';
import { getDictionary } from '../../../i18n/get-dictionary';
import type { Locale } from '../../../i18n/config';
import { LanguageSwitcher } from '../../../components/language-switcher';
import { projects } from '../../../content/projects';

interface LabProps {
  params: Promise<{ locale: string }>;
}

export default async function Lab({ params }: LabProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const projectList = projects[locale as Locale];

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
            {dict.pages.lab.title}
          </h1>
          <p className="text-muted-foreground">
            {dict.pages.lab.description}
          </p>
        </div>

        <div className="space-y-8">
          {projectList.map((project, index) => (
            <div key={index} className="border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-medium text-foreground">
                    {project.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-md ${
                  project.status === 'active' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    : project.status === 'completed'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
                }`}>
                  {project.status}
                </span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.longDescription}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-2">
                {project.links.github && (
                  <a 
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub →
                  </a>
                )}
                {project.links.demo && (
                  <a 
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Demo →
                  </a>
                )}
                {project.links.chrome && (
                  <a 
                    href={project.links.chrome}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Chrome Store →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}