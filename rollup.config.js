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
