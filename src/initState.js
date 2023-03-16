import { observer } from "./observe/index.js";
export function initState(vm) {
  let opts = vm.$options;
  console.log('opts', opts)

  if (opts.props) {
    initProps();
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.watch) {
    initWatch();
  }
  if (opts.computed) {
    initComputed();
  }
  if (opts.methods) {
    initMethods();
  }
}

function initProps() { }
function initWatch() { }
function initComputed() { }
function initMethods() { }


// vue2 对data的初始化 
// 注意: data 的数据类型 可能是对象,也可能是方法
function initData(vm) {
  console.log('initData', vm);
  let data = vm.$options.data;
  data = typeof data === 'function' ? data.call(vm) : data; // 这里要注意,不可以直接写 data() ,这样写this指向的是window
  vm._data = data; // 挂载到Vue实例对象上,方便调试
  // data 数据进行劫持 特殊处理 object 和 array
  observer(data);

}