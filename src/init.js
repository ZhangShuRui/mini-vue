import { initState } from "./initState.js";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    let vm = this;
    vm.$options = options;
    // 初始化状态
    initState(vm);
  };
}
