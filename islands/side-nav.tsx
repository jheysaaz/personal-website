import { useRef, useState } from "preact/hooks";
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

export default function SideNav({ items, currentPath }: Props) {
  const navRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState<{ y: number } | null>(null);
  const [sidebarHovered, setSidebarHovered] = useState(false);

  const homeHref = items[0]?.href;
  if (currentPath === homeHref) return null;

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
                  isInteracting ? "text-foreground" : "text-muted-foreground/50"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
