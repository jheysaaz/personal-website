import { Badge } from "@/components/ui/badge";

interface TechBadgeProps {
  tech: string;
}

export function TechBadge({ tech }: TechBadgeProps) {
  return <Badge variant="secondary">{tech}</Badge>;
}

interface TechBadgeListProps {
  technologies: string[];
  className?: string;
}

export function TechBadgeList({ technologies, className }: TechBadgeListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {technologies.map((tech) => <TechBadge key={tech} tech={tech} />)}
    </div>
  );
}
