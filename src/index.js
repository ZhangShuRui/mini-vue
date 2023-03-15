import { initMixin } from "./init";

function Vue(options) {
  console.log(options);
  // 初始化
  this._init(options);
}

initMixin(Vue); // 把初始化逻辑抽取出去

export default Vue;
