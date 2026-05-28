interface LanguageSwitcherProps {
  pathname: string;
}

export function LanguageSwitcher({ pathname }: LanguageSwitcherProps) {
  const isSpanish = pathname.startsWith("/es");
  const currentLocale = isSpanish ? "es" : "en";
  const cleanPath = isSpanish
    ? pathname.replace(/^\/es/, "") || "/"
    : pathname.replace(/^\/en/, "") || "/";

  const getLocalizedPath = (locale: string) => {
    return cleanPath === "/" ? `/${locale}` : `/${locale}${cleanPath}`;
  };

  return (
    <div class="language-switcher flex gap-2 text-sm">
      <a
        href={getLocalizedPath("en")}
        class={currentLocale === "en" ? "active" : ""}
      >
        EN
      </a>
      <a
        href={getLocalizedPath("es")}
        class={currentLocale === "es" ? "active" : ""}
      >
        ES
      </a>
    </div>
  );
}
