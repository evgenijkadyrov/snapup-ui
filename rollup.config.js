import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import vue from "unplugin-vue/rollup";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";

const external = ["vue"];

// Types are emitted by tsc (see tsconfig `emitDeclarationOnly`) then rolled up
// into a single .d.ts here — keeps published package to two JS files + one d.ts.
const bundledConfig = {
  input: "src/index.ts",
  external,
  plugins: [
    vue(),
    resolve(),
    commonjs(),
    esbuild({
      target: "es2020",
      sourceMap: true,
    }),
    postcss({
      extract: "style.css",
      minimize: true,
      sourceMap: false,
    }),
    terser(),
    process.env.ANALYZE &&
      visualizer({ filename: "dist/stats.html", gzipSize: true }),
  ].filter(Boolean),
  output: [
    {
      file: "dist/snapup-ui.esm.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/snapup-ui.cjs.js",
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
  ],
};

const typesConfig = {
  input: "dist/types/index.d.ts",
  external,
  plugins: [dts()],
  output: {
    file: "dist/index.d.ts",
    format: "esm",
  },
};

export default [bundledConfig, typesConfig];
