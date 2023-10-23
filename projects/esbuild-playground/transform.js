import * as esbuild from "esbuild";

let ts = "const isNull = (str: string): boolean => str.length > 0;";
let result = await esbuild.transform(ts, {
  loader: "ts",
});
console.log(result);
