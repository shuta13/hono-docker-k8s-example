import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.tsx"],
  format: ["cjs"],
  dts: false,
  splitting: false,
  sourcemap: false,
  clean: true,
});
