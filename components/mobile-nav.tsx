"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "./side-nav";

type Props = { items: NavItem[] };

export default function MobileNav({ items }: Props) {
  const pathname = usePathname();
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
    return pathname === item.href || pathname.startsWith(item.href + "/");
  };

  return (
    <>
      <button
        className="flex flex-col items-center justify-center gap-1 w-10 h-10 md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span
          className={`block w-4 h-px bg-foreground transition-all duration-200 ${
            menuOpen ? "rotate-45 translate-y-[3px]" : ""
          }`}
        />
        <span
          className={`block w-4 h-px bg-foreground transition-all duration-200 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-4 h-px bg-foreground transition-all duration-200 ${
            menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
          }`}
        />
      </button>

      <div
        className={`
          fixed inset-0 z-40 flex flex-col bg-background/80 transition-all duration-500 ease-out md:hidden
          ${menuOpen ? "opacity-100 backdrop-blur-lg pointer-events-auto" : "opacity-0 backdrop-blur-none pointer-events-none"}
        `}
      >
        <div className={`flex-1 flex items-center justify-center transition-all duration-500 delay-150 ease-out ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <ul className="flex flex-col items-center gap-8 text-lg uppercase tracking-widest">
            {items.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`transition-opacity hover:opacity-70 ${
                    isActive(item) ? "font-semibold" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button
          className={`mb-10 flex flex-col items-center gap-1 self-center transition-all duration-500 delay-300 ease-out ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation"
        >
          <span className="block w-5 h-px bg-foreground rotate-45 translate-y-[3px]" />
          <span className="block w-5 h-px bg-foreground -rotate-45 -translate-y-[3px]" />
          <span className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">
            close
          </span>
        </button>
      </div>
    </>
  );
}
