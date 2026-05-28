import { defineConfig, type Logger } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";

const logger: Logger = {
  info(msg, _opts) {
    if (msg.includes("Sourcemap")) return;
    console.info(msg);
  },
  warn(msg, _opts) {
    if (msg.includes("Sourcemap")) return;
    console.warn(msg);
  },
  warnOnce(msg, _opts) {
    if (msg.includes("Sourcemap")) return;
    console.warn(msg);
  },
  error(msg, _opts) {
    console.error(msg);
  },
  clearScreen() {},
  hasErrorLogged(_error) {
    return false;
  },
  hasWarned: false,
};

export default defineConfig({
  plugins: [fresh(), tailwindcss()],
  customLogger: logger,
});
