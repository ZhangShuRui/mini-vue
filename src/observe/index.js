export function observer(data) {
  console.log("data", data);
  if (typeof data !== "object" || data === null) {
    // 不需要劫持
    return data;
  }
  // 1 ) data是一个类
  return new Observer(data);
}

class Observer {
  // vue2 Object.defineProperty() 缺点:只能一次检测对象中的一个值
  constructor(value) {
    this.walk(value); // 遍历
  }

  walk(data) {
    let keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
      // 对对象中的每一个属性进行劫持
      let key = keys[i];
      let value = data[key];

      defineReactive(data, key, value);
    }
  }
}

function defineReactive(data, key, value) {
  observer(value); // 递归深层递归
  Object.defineProperty(data, key, {
    get() {
      console.log("数据劫持", key, value);
      return value;
    },

    set(newValue) {
      if (newValue === value) {
        return;
      }

      observer(newValue); // newValue 如果是对象,也要再去劫持
      // data[key] = newValue; // data[key],这里会触发 get ,会死循环
      value = newValue; 
    },
  });
}
