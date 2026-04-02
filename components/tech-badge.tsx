interface TechBadgeProps {
  tech: string;
}

export function TechBadge({ tech }: TechBadgeProps) {
  return (
    <span className="px-2 py-1 text-xs bg-muted text-foreground rounded-md">
      {tech}
    </span>
  );
}

interface TechBadgeListProps {
  technologies: string[];
  className?: string;
}

export function TechBadgeList({ technologies, className = '' }: TechBadgeListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {technologies.map((tech) => (
        <TechBadge key={tech} tech={tech} />
      ))}
    </div>
  );
}
