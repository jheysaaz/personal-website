import { ArrowLeft } from "lucide-preact";

interface BackNavigationProps {
  href: string;
  label: string;
}

export function BackNavigation({ href, label }: BackNavigationProps) {
  return (
    <div class="flex items-start mb-16">
      <a
        href={href}
        class="text-foreground no-persistent-underline inline-flex items-center gap-2"
      >
        <ArrowLeft class="w-4 h-4" />
        {label}
      </a>
    </div>
  );
}
