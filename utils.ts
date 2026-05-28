import { createDefine } from "fresh";

export interface State {
  locale?: string;
}

export const define = createDefine<State>();
