import * as esbuild from "esbuild";
import CdnImportPlugin from "./plugins/cdn-import-plugin.js";
import HtmlPlugin from "./plugins/html-plugin.js";

await esbuild.build({
  absWorkingDir: process.cwd(),
  entryPoints: ["./src/index-cdn.jsx"],
  outdir: "dist",
  bundle: true,
  format: "esm",
  splitting: true,
  sourcemap: true,
  metafile: true,
  plugins: [CdnImportPlugin(), HtmlPlugin()],
  loader: {
    ".png": "base64",
  },
});
