import * as esbuild from "esbuild";

let ctx = await esbuild.context({
  entryPoints: ["./src/index.jsx"],
  outdir: "dist",
  bundle: true,
});

await ctx.watch();
console.log("watching...");
