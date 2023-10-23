## esbuild 为什么性能极高？

1. **使用 Golang 开发**，构建逻辑代码直接被编译为原生机器码，而不用像 JS 一样先代码解析为字节码，然后转换为机器码，大大节省了程序运行时间。
2. **多核并行**。内部打包算法充分利用多核 CPU 优势，所有的步骤尽可能并行，这也是得益于 Go 当中多线程共享内存的优势。
3. **从零造轮子**。 几乎没有使用任何第三方库，所有逻辑自己编写，大到 AST 解析，小到字符串的操作，保证极致的代码性能。
4. **高效的内存利用**。Esbuild 中从头到尾尽可能地复用一份 AST 节点数据，而不用像 JS 打包工具中频繁地解析和传递 AST 数据（如 string -> TS -> JS -> string)，造成内存的大量浪费。

## 基础功能使用

### build & watch

```js
import * as esbuild from "esbuild";

const ctx = await esbuild.build({
  // ----  如下是一些常见的配置  ---
  // 当前项目根目录
  absWorkingDir: process.cwd(),
  // 入口文件列表，为一个数组
  entryPoints: ["./src/index.jsx"],
  // 打包产物目录
  outdir: "dist",
  // 是否需要打包，一般设为 true
  bundle: true,
  // 模块格式，包括`esm`、`commonjs`和`iife`
  format: "esm",
  // 需要排除打包的依赖列表
  external: [],
  // 是否开启自动拆包
  splitting: true,
  // 是否生成 SourceMap 文件
  sourcemap: true,
  // 是否生成打包的元信息文件
  metafile: true,
  // 是否进行代码压缩
  minify: false,
  // 是否将产物写入磁盘
  write: true,
  // Esbuild 内置了一系列的 loader，包括 base64、binary、css、dataurl、file、js(x)、ts(x)、text、json
  // 针对一些特殊的文件，调用不同的 loader 进行加载
  loader: {
    ".png": "base64",
  },
});

// with watch
await ctx.watch();

console.log("watching...");

```

### serve

serve 的三个特点：

1. 开启 serve 模式后，将在指定的端口和目录上搭建一个`静态文件服务`，这个服务器用原生 Go 语言实现，性能比 Nodejs 更高。
2. 类似 webpack-dev-server，所有的产物文件都默认不会写到磁盘，而是放在内存中，通过请求服务来访问。
3. **每次请求**到来时，都会进行重新构建(`rebuild`)，永远返回新的产物。

```js
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
```

> Serve API 只适合在开发阶段使用，不适用于生产环境。

### transform

单文件编译

```js
import * as esbuild from "esbuild";

let ts = "const isNull = (str: string): boolean => str.length > 0;";
let result = await esbuild.transform(ts, {
  loader: "ts",
});
console.log(result);
```

