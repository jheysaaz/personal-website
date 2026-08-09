import { define } from "@/utils/state.ts";
import Nav, { type NavItem } from "@/islands/nav.tsx";
import { LanguageSwitcher } from "@/components/language-switcher.tsx";

export default define.layout((props) => {
  const { locale, intl } = props.state;

  const navItems: NavItem[] = [
    { key: "home", label: intl.t("nav.home"), href: `/${locale}` },
    { key: "work", label: intl.t("nav.work"), href: `/${locale}/work` },
    { key: "lab", label: intl.t("nav.lab"), href: `/${locale}/lab` },
    {
      key: "library",
      label: intl.t("nav.library"),
      href: `/${locale}/library`,
    },
    { key: "music", label: intl.t("nav.music"), href: `/${locale}/music` },
  ];

  return (
    <main class="max-w-2xl mx-auto px-4 py-6 md:py-12 sm:px-6 lg:px-8 w-full relative">
      <div class="flex items-center justify-between md:justify-end mb-3 md:mb-8">
        <Nav items={navItems} currentPath={props.url.pathname} />
        <LanguageSwitcher currentPath={props.url.pathname} />
      </div>
      <div id="page-view">
        <props.Component />
      </div>
    </main>
  );
});
