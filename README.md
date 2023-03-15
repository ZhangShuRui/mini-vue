# 手写Vue2

这是一个学习Vue2源码的项目

# 01 rollup环境搭建

[1.rollup的环境配置_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Jv4y1q7nE/?p=2&spm_id_from=pageDriver&vd_source=633fb585b48e246e65d0f363285629b9)

## 安装依赖

```shell
yarn add @babel/core @babel/preset-env rollup rollup-plugin-babel rollup-plugin-serve -D
```

## 打包文件的配置

### 目录结构

```
├── README.md
├── dist
├── index.html
├── node_modules
├── package.json
├── rollup.config.js
├── src
├── yarn-error.log
└── yarn.lock
```

### `rollup.config.js`的配置

```javascript
import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";

export default {
	input: "./src/index.js", // 打包的入口文件
	output: {
		file: "dist/vue.js", // 出口文件
		format: "umd", // 打包使用的模块化方案,使用umd打包,会在window上挂载 [name]
		name: "Vue", // 挂载在window上的名字,这个自定义
		sourcemap: true,
	},

	plugins: [
		babel({
			exclude: "node_modules/**", // 不编译引用的依赖
		}), // 高级语法转成低级语法
		serve({
			port: 3000,
			contentBase: "", // 空字符串表示使用当前配置文件所在的目录当做静态服务器的根目录
			openPage: "./index.html",
		}),
	],

};
```

### babelrc 配置

```json
{
	"presets": [
		"@babel/preset-env"
	]
}
```

### package.json配置

```json
{
	"name": "mini-vue",
	"version": "1.0.0",
	"main": "index.js",
	"repository": "git@github.com:ZhangShuRui/mini-vue.git",
	"author": "zhangshurui <844968781@qq.com>",
	"license": "MIT",
	"type" :"module",
	"scripts": {
		"dev": "rollup -c -w"
	},
	"devDependencies": {
		"@babel/core": "^7.21.3",
		"@babel/preset-env": "^7.20.2",
		"rollup": "^3.19.1",
		"rollup-plugin-babel": "^4.4.0",
		"rollup-plugin-serve": "^2.0.2"
	}
}
```

- #### 关于`type`字段的解释

 [`type` 字段用于定义 `package.json` 文件和该文件所在目录根目录中 `.js` 文件和无扩展名文件的模块化处理规范。默认值为 `'commonjs'`](https://juejin.cn/post/7032278473389539365)[1](https://juejin.cn/post/7032278473389539365)[。如果 `type` 字段指定值为 `'module'`，则采用 ESModule 规范；如果省略，则默认采用 CommonJS 规范](https://juejin.cn/post/7032278473389539365)[1](https://juejin.cn/post/7032278473389539365)。

`package.json` 中的 `type` 字段是在 ECMAScript 模块系统中定义模块类型的一种方式。当你使用 Rollup 打包项目时，它会检查每个模块的类型以确定如何处理它。

具体来说，`type` 字段的值可以是以下几种类型之一：

-   `module`：表示模块使用 ECMAScript 模块语法进行导出和导入。这种类型的模块可以被 Rollup 直接打包。
-   `commonjs`：表示模块使用 CommonJS 模块语法进行导出和导入。这种类型的模块需要使用 `@rollup/plugin-commonjs` 插件将其转换为 ECMAScript 模块后才能被 Rollup 打包。
-   `jsnext`：表示模块使用 ES2015 模块语法进行导出和导入，并且使用了一些特定于 ES2015 的功能（例如，使用 `import` 语句导入 CommonJS 模块）。这种类型的模块需要使用 `@rollup/plugin-commonjs` 插件将其转换为 ECMAScript 模块后才能被 Rollup 打包。
-   `amd`：表示模块使用 AMD 模块语法进行导出和导入。这种类型的模块需要使用 `@rollup/plugin-amd` 插件将其转换为 ECMAScript 模块后才能被 Rollup 打包。

因此，通过读取 `package.json` 中的 `type` 字段，Rollup 可以确定每个模块的类型，从而决定如何处理它。这有助于确保 Rollup 可以正确地打包你的项目，并且可以确保打包后的输出文件符合你的预期。

- #### 关于`main`字段的解释

`main` 字段是 `package.json` 文件中的一个属性，它指定了一个包的主入口文件的相对路径或绝对路径。

具体来说，当用户安装一个包时，如果该包没有指定入口文件，Node.js 将会查找该包的 `package.json` 文件中的 `main` 字段，尝试加载其指定的入口文件。如果 `main` 字段不存在或者指定的入口文件无法加载，则 Node.js 将会尝试加载该包的 `index.js` 文件。

对于一个 JavaScript 库来说，`main` 字段通常指定为库的主模块文件，该模块是库的入口点，负责导出该库的公共 API。例如，`lodash` 库的 `main` 字段指定为 `"lodash.js"`，因为该文件包含了 `lodash` 库的主模块代码。

需要注意的是，`main` 字段在不同的包管理器中可能具有不同的行为。例如，对于使用 ES modules 的包，`main` 字段通常被忽略，而是使用 `module` 字段指定的模块作为入口点。因此，在编写 `package.json` 文件时，需要注意根据自己的项目需要正确设置 `main` 字段。


- #### 关于`module`字段的解释

`module` 字段也是 `package.json` 文件中的一个属性，它指定了一个包的 ES Module 的入口文件的相对路径或绝对路径。

与 `main` 字段类似，`module` 字段也是用于指定入口文件，但是它专门用于指定 ES Module 的入口文件。这个字段的目的是为了支持 JavaScript 生态系统中的现代打包工具，例如 Webpack、Rollup 等，这些工具可以识别 ES Module 的入口文件，实现更好的模块化打包效果。

当一个模块使用 ES Module 语法进行导出时，我们可以使用 `module` 字段来指定该模块的入口文件，以便于在打包时能够正确地识别并使用这些模块。

需要注意的是，如果一个包同时指定了 `main` 字段和 `module` 字段，且两个字段的值不同，那么当使用支持 ES Module 的打包工具打包该包时，将会使用 `module` 字段指定的入口文件，而当使用不支持 ES Module 的打包工具或直接在浏览器中使用该包时，则会使用 `main` 字段指定的入口文件。因此，在编写 `package.json` 文件时，需要根据项目的需要合理地设置 `main` 和 `module` 字段。


### 源文件

```js
export default function Vue() {
	console.log("hello world!");
}
```


## 执行命令

```shell
yarn run dev
```

[`rollup -c -w` 是一个命令行指令，用于运行 Rollup。Rollup 是一个 JavaScript 模块打包工具，可以将多个小的代码片段编译为完整的库和应用](https://www.rollupjs.com/)[1](https://www.rollupjs.com/)。`-c` 选项表示使用配置文件，而 `-w` 选项表示监视文件更改并自动重新构建。

### 编译后的代码

```js

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());	
	})(this, (function () { 'use strict';
	
	function Vue() {
		console.log("hello world!");
	}
return Vue;
}));

//# sourceMappingURL=vue.js.map
```
