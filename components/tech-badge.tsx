import { Badge } from "@/components/ui/badge.tsx";

export function TechBadge({ tech }: { tech: string }) {
  return <Badge variant="secondary">{tech}</Badge>;
}

export function TechBadgeList({
  technologies,
  class: className,
}: {
  technologies: string[];
  class?: string;
}) {
  return (
    <div class={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {technologies.map((tech) => <TechBadge key={tech} tech={tech} />)}
    </div>
  );
}
