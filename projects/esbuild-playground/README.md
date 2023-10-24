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

## esbuild 插件开发

`Esbuild` 插件结构被设计为一个对象，里面有`name`和`setup`两个属性，`name`是插件的名称，`setup`是一个函数，其中入参是一个 `build` 对象，这个对象上挂载了一些钩子可供我们自定义一些钩子函数逻辑。以下是一个简单的`Esbuild`插件示例:

```js
let envPlugin = {
  name: 'env',
  setup(build) {
    build.onResolve({ filter: /^env$/ }, args => ({
      path: args.path,
      namespace: 'env-ns',
    }))

    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
      contents: JSON.stringify(process.env),
      loader: 'json',
    }))
  },
}

require('esbuild').build({
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'out.js',
  // 应用插件
  plugins: [envPlugin],
}).catch(() => process.exit(1))
```

### 钩子函数

#### onResolve & onLoad

这两个钩子函数都需要传入两个参数： `Options` & `Callback`

```typescript
interface Options {
  filter: RegExp;
  namespace?: string;
}
```

`filter` 为必传属性，是一个正则表达式，它决定了要过滤出的特征文件。

`namespace` 为选填属性，一般在 `onResolve` 钩子中的回调参数返回`namespace`属性作为标识，我们可以在`onLoad`钩子中通过 `namespace` 将模块过滤出来。如上述插件示例就在`onLoad`钩子通过`env-ns`这个 namespace 标识过滤出了要处理的`env`模块。

另一个参数 `Callback` 的类型根据不同的钩子会有所不同。

其中 `onResolve` 为：

```typescript
interface OnResolveArgs {
  path: string; // 模块路径
  importer: string; // 父模块路径
  namespace: string; // namespace 标识
  resolveDir: string; // 基准路径
  kind: ResolveKind; // 导入方式，如 import、require
  pluginData: any; // 额外绑定的插件数据
}

type ResolveKind =
  | 'entry-point'
  | 'import-statement'
  | 'require-call'
  | 'dynamic-import'
  | 'require-resolve'
  | 'import-rule'
  | 'composes-from'
  | 'url-token'

interface OnResolveResult {
  errors?: Message[]; // 错误信息
  external?: boolean; // 是否需要 external
  namespace?: string; // namespace 标识
  path?: string; // 模块路径
  pluginData?: any; // 额外绑定的插件数据
  pluginName?: string; // 插件名称
  sideEffects?: boolean; // 设置为 false，如果模块没有被用到，模块代码将会在产物中会删除。否则不会这么做
  suffix?: string; // 添加一些路径后缀，如`?xxx`
  warnings?: Message[]; // 警告信息
  // 仅仅在 Esbuild 开启 watch 模式下生效
  // 告诉 Esbuild 需要额外监听哪些文件/目录的变化
  watchDirs?: string[];
  watchFiles?: string[];
}

interface Message {
  text: string;
  location: Location | null;
  detail: any; // The original error from a JavaScript plugin, if applicable
}

interface Location {
  file: string;
  namespace: string;
  line: number; // 1-based
  column: number; // 0-based, in bytes
  length: number; // in bytes
  lineText: string;
}

build.onResolve({ filter: /^env$/ }, (args: onResolveArgs): onResolveResult => {
  return {...}
}
```

`onLoad` 则为：

```typescript
interface OnLoadArgs {
  path: string; // 模块路径
  namespace: string; // namespace 标识
  suffix: string; // 后缀信息
  pluginData: any; // 额外的插件数据
}

interface OnLoadResult {
  contents?: string | Uint8Array; // 模块具体内容
  errors?: Message[]; // 错误信息
  loader?: Loader; // 指定 loader，如`js`、`ts`、`jsx`、`tsx`、`json`等等
  pluginData?: any; // 额外的插件数据
  pluginName?: string; // 插件名称
  resolveDir?: string; // 基准路径
  warnings?: Message[]; // 警告信息
  watchDirs?: string[];
  watchFiles?: string[];
}

interface Message {
  text: string;
  location: Location | null;
  detail: any; // The original error from a JavaScript plugin, if applicable
}

interface Location {
  file: string;
  namespace: string;
  line: number; // 1-based
  column: number; // 0-based, in bytes
  length: number; // in bytes
  lineText: string;
}

build.onLoad({ filter: /.*/, namespace: 'env-ns' }, (args: OnLoadArgs): OnLoadResult => {
  return {...}
});
```

#### 其他钩子函数

除了`onResolve`和`onLoad`，还有`onStart`和`onEnd`两个钩子用来在构建开启和结束时执行一些自定义的逻辑。

```js
let examplePlugin = {
  name: 'example',
  setup(build) {
    build.onStart(() => {
      console.log('build started')
    });
    build.onEnd((buildResult) => {
      if (buildResult.errors.length) {
        return;
      }
      // 构建元信息
      // 获取元信息后做一些自定义的事情，比如生成 HTML
      console.log(buildResult.metafile)
    })
  },
}
```

在使用这些钩子的时候，有 2 点需要注意。

1. `onStart` 的执行时机是在每次 build 的时候，包括触发 `watch` 或者 `serve`模式下的重新构建。
2. `onEnd` 钩子中如果要拿到 `metafile`，必须将 esbuild 的构建配置中`metafile`属性设为 `true`。

