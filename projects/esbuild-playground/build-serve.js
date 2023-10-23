import * as esbuild from "esbuild";

let ctx = await esbuild.context({
  absWorkingDir: process.cwd(),
  outdir: "./dist",
  entryPoints: ["./src/index.jsx"],
  bundle: true,
  format: "esm",
  splitting: true,
  sourcemap: true,
  ignoreAnnotations: true,
  metafile: true,
});

let { host, port } = await ctx.serve({
  servedir: "./dist",
});

console.log(
  `Server runs on http://${host === "0.0.0.0" ? "localhost" : host}:${port}`
);
