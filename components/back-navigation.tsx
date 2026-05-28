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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-4 h-4"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        {label}
      </a>
    </div>
  );
}
