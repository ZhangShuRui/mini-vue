/**
 * 对数组的劫持
 */

// 1) 获取原来的数组方
let oldArrayProtoMethods = Array.prototype;

// 2) 继承
export let ArrayMethods = Object.create(oldArrayProtoMethods);

// 3) 劫持数组中的方法
let methods = ["push", "pop", "unshift", "shift", "splice"];

methods.forEach((item) => {
  // 复写方法
  ArrayMethods[item] = function (...args) {
    // 自己的劫持的逻辑...
    console.log("数组被接触", args,item);
    const result = oldArrayProtoMethods[item].apply(this, args);
    return result;
  };
});
