interface TechBadgeProps {
  tech: string;
}

export function TechBadge({ tech }: TechBadgeProps) {
  return (
    <span class="px-2 py-1 text-xs bg-muted text-foreground rounded-md">
      {tech}
    </span>
  );
}

interface TechBadgeListProps {
  technologies: string[];
  class?: string;
}

export function TechBadgeList(
  { technologies, ...props }: TechBadgeListProps,
) {
  return (
    <div class={`flex flex-wrap gap-2 ${props.class ?? ""}`}>
      {technologies.map((tech) => <TechBadge key={tech} tech={tech} />)}
    </div>
  );
}
