import { createDefine } from "fresh";
import type { SiteIntl } from "@/lib/i18n.ts";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State {
  locale: "en" | "es";
  intl: SiteIntl;
}

export const define = createDefine<State>();
