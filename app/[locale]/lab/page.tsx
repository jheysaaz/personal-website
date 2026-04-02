import type { Metadata } from 'next';
import { getDictionary } from '../../../i18n/get-dictionary';
import type { Locale } from '../../../i18n/config';
import { projects } from '../../../content/projects';
import { SquareArrowOutUpRight } from 'lucide-react';
import { BackNavigation } from '../../../components/back-navigation';
import { TechBadgeList } from '../../../components/tech-badge';

interface LabProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LabProps): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  
  return {
    title: dict.pages.lab.title,
    description: dict.pages.lab.description,
    alternates: {
      canonical: `/${locale}/lab`,
      languages: {
        en: '/en/lab',
        es: '/es/lab',
      },
    },
  };
}

export default async function Lab({ params }: LabProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="space-y-12">
      <BackNavigation href={`/${locale}`} label={dict.navigation.returnToShip} />

      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-4 font-serif">
            {dict.pages.lab.title}
          </h1>
          <p className="text-foreground">
            {dict.pages.lab.description}
          </p>
        </div>

        <div className="grid gap-8">
          {projects[locale as Locale].map((project) => (
            <div key={project.title} className="space-y-4 pb-8 border-b border-border last:border-0">
              <div>
                <h2 className="text-lg font-medium text-foreground mb-2">
                  {project.title}
                </h2>
                <p className="text-foreground text-sm mb-4">
                  {project.description}
                </p>
              </div>

              <TechBadgeList technologies={project.technologies} />

              <div className="flex gap-4 pt-2">
                {project.links.github && (
                  <a 
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground no-persistent-underline inline-flex items-center gap-1"
                  >
                    GitHub
                    <SquareArrowOutUpRight className="w-3 h-3" />
                  </a>
                )}
                {project.links.demo && (
                  <a 
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground no-persistent-underline inline-flex items-center gap-1"
                  >
                    Demo
                    <SquareArrowOutUpRight className="w-3 h-3" />
                  </a>
                )}
                {project.links.chrome && (
                  <a 
                    href={project.links.chrome}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground no-persistent-underline inline-flex items-center gap-1"
                  >
                    Chrome Store
                    <SquareArrowOutUpRight className="w-3 h-3" />
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