import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackNavigationProps {
  href: string;
  label: string;
}

export function BackNavigation({ href, label }: BackNavigationProps) {
  return (
    <div className="flex items-start mb-16">
      <Link 
        href={href} 
        className="text-foreground no-persistent-underline inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {label}
      </Link>
    </div>
  );
}