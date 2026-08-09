import { useEffect, useState } from "preact/hooks";
import type { NavItem } from "./side-nav.tsx";

type Props = { items: NavItem[]; currentPath: string };

export default function MobileNav({ items, currentPath }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (item: NavItem) => {
    if (item.key === "home") return false;
    return currentPath === item.href || currentPath.startsWith(item.href + "/");
  };

  return (
    <>
      <button
        type="button"
        class="flex flex-col items-center justify-center gap-1 w-10 h-10 md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span
          class={`block w-4 h-px bg-foreground transition-all duration-200 ${
            menuOpen ? "rotate-45 translate-y-[3px]" : ""
          }`}
        />
        <span
          class={`block w-4 h-px bg-foreground transition-all duration-200 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          class={`block w-4 h-px bg-foreground transition-all duration-200 ${
            menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
          }`}
        />
      </button>

      <div
        class={`
          fixed inset-0 z-40 flex flex-col bg-background/80 transition-all duration-500 ease-out md:hidden
          ${
          menuOpen
            ? "opacity-100 backdrop-blur-lg pointer-events-auto"
            : "opacity-0 backdrop-blur-none pointer-events-none"
        }
        `}
      >
        <div
          class={`flex-1 flex items-center justify-center transition-all duration-500 delay-150 ease-out ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <ul class="flex flex-col items-center gap-8 text-lg uppercase tracking-widest">
            {items.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  class={`transition-opacity hover:opacity-70 ${
                    isActive(item) ? "font-semibold" : ""
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          class={`mb-10 flex flex-col items-center gap-1 self-center transition-all duration-500 delay-300 ease-out ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation"
        >
          <span class="block w-5 h-px bg-foreground rotate-45 translate-y-[3px]" />
          <span class="block w-5 h-px bg-foreground -rotate-45 -translate-y-[3px]" />
          <span class="text-xs text-muted-foreground mt-2 uppercase tracking-widest">
            close
          </span>
        </button>
      </div>
    </>
  );
}
