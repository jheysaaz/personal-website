import { define } from "../../utils.ts";

export const handler = define.middleware((ctx) => ctx.next());
