import { useEffect, useRef, useState } from "preact/hooks";
import type { JSX } from "preact";

export type NavItem = {
  key: string;
  label: string;
  href: string;
};

type Props = {
  items: NavItem[];
  currentPath: string;
};

const MAX_SCALE = 0.35;
const SIGMA = 0.7;

export default function Nav({ items, currentPath }: Props) {
  const navRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState<{ y: number } | null>(null);
  const [sidebarHovered, setSidebarHovered] = useState(false);
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

  const homeHref = items[0]?.href;
  const showSidebar = currentPath !== homeHref;

  const isActive = (item: NavItem) => {
    if (item.key === "home") return false;
    return currentPath === item.href || currentPath.startsWith(item.href + "/");
  };

  const getScale = (index: number) => {
    if (!mousePos || !navRef.current) return 1;
    const navHeight = navRef.current.offsetHeight;
    if (!navHeight) return 1;
    const spacing = navHeight / items.length;
    const itemCenter = spacing * (index + 0.5);
    const dist = Math.abs(mousePos.y - itemCenter) / spacing;
    return 1 + Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA)) * MAX_SCALE;
  };

  const handleMouseMove = (e: JSX.TargetedMouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setSidebarHovered(false);
  };

  const handleNavMouseEnter = () => {
    setSidebarHovered(true);
  };

  const isInteracting = sidebarHovered || mousePos !== null;

  return (
    <div class="contents">
      {showSidebar && (
        <nav
          ref={navRef}
          class="fixed left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 hidden md:block select-none"
          onMouseEnter={handleNavMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <ul class="flex flex-col items-end gap-5">
            {items.map((item, index) => {
              const active = isActive(item);
              const scale = getScale(index);
              return (
                <li
                  key={item.key}
                  class="will-change-transform"
                  style={{ transform: `scale(${scale})` }}
                >
                  <a
                    href={item.href}
                    class={`text-xs tracking-widest uppercase transition-all duration-200 ${
                      active ? "font-semibold" : "font-normal"
                    } ${
                      isInteracting
                        ? "text-foreground"
                        : "text-muted-foreground/50"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

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
    </div>
  );
}
