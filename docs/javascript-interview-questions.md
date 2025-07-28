# JavaScript面试题大全 - 10道热门面试题

## 🌟 概述

JavaScript作为前端开发的核心语言，在技术面试中占据重要地位。本文档整理了10道最热门的JavaScript面试题，涵盖了闭包、作用域、异步编程、原型继承等核心概念，帮助你在面试中脱颖而出。

---

## 📚 目录

1. [什么是闭包(Closure)？](#1-什么是闭包closure)
2. [var、let、const的区别？](#2-varletconst的区别)
3. [this关键字的工作原理？](#3-this关键字的工作原理)
4. [Promise是什么？如何使用？](#4-promise是什么如何使用)
5. [== 和 === 的区别？](#5--和--的区别)
6. [什么是事件委托(Event Delegation)？](#6-什么是事件委托event-delegation)
7. [什么是高阶函数(Higher-Order Functions)？](#7-什么是高阶函数higher-order-functions)
8. [什么是原型继承(Prototypal Inheritance)？](#8-什么是原型继承prototypal-inheritance)
9. [事件冒泡和事件捕获的区别？](#9-事件冒泡和事件捕获的区别)
10. [防抖(Debouncing)和节流(Throttling)的区别？](#10-防抖debouncing和节流throttling的区别)

---

## 1. 什么是闭包(Closure)？

### 📖 定义
闭包是指内部函数可以访问外部函数的变量，即使外部函数已经返回。

### 💡 示例代码
```javascript
function outerFunction() {
  var outerVariable = 'I am outside!';
  
  function innerFunction() {
    console.log(outerVariable);
  }
  
  return innerFunction;
}

var closure = outerFunction();
closure(); // Output: I am outside!
```

### 🔍 实际应用
```javascript
// 模块化模式
const counter = (function() {
  let count = 0;
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
})();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
```

### ⭐ 关键点
- 数据封装和私有变量
- 模块化设计模式
- 回调函数和事件处理

---

## 2. var、let、const的区别？

### 📊 对比表格

| 特性 | var | let | const |
|------|-----|-----|-------|
| 作用域 | 函数作用域 | 块级作用域 | 块级作用域 |
| 变量提升 | 会提升并初始化为undefined | 会提升但不初始化 | 会提升但不初始化 |
| 重复声明 | 允许 | 不允许 | 不允许 |
| 重新赋值 | 允许 | 允许 | 不允许 |
| 暂时性死区 | 无 | 有 | 有 |

### 💡 示例代码
```javascript
function example() {
  console.log(x); // undefined (变量提升)
  // console.log(y); // ReferenceError (暂时性死区)
  // console.log(z); // ReferenceError (暂时性死区)
  
  var x = 5;
  let y = 10;
  const z = 15;
  
  if (true) {
    var x = 20;     // 同一函数作用域，覆盖外层的x
    let y = 30;     // 新的块级作用域变量
    const z = 40;   // 新的块级作用域常量
    
    console.log(x, y, z); // 20, 30, 40
  }
  
  console.log(x, y, z); // 20, 10, 15
}
```

### ✅ 最佳实践
- 优先使用 `const`，确保数据不可变
- 需要重新赋值时使用 `let`
- 避免使用 `var`，防止作用域问题

---

## 3. this关键字的工作原理？

### 📖 定义
`this`的值取决于函数的调用方式，而不是定义位置。

### 💡 不同场景下的this

#### 3.1 对象方法调用
```javascript
const person = {
  name: 'John',
  sayHello: function() {
    console.log('Hello, ' + this.name); // this指向person对象
  }
};
person.sayHello(); // Output: Hello, John
```

#### 3.2 普通函数调用
```javascript
function greet() {
  console.log(this); // 非严格模式：全局对象，严格模式：undefined
}
greet();
```

#### 3.3 箭头函数
```javascript
const obj = {
  name: 'Jane',
  sayHello: function() {
    const innerFunc = () => {
      console.log(this.name); // 继承外层函数的this
    };
    innerFunc();
  }
};
obj.sayHello(); // Output: Jane
```

#### 3.4 显式绑定
```javascript
function greet() {
  console.log(`Hello, ${this.name}`);
}

const person = { name: 'Alice' };

greet.call(person);    // Hello, Alice
greet.apply(person);   // Hello, Alice
greet.bind(person)();  // Hello, Alice
```

### 🎯 面试要点
- 默认绑定、隐式绑定、显式绑定、new绑定
- 箭头函数的词法作用域
- call、apply、bind的区别

---

## 4. Promise是什么？如何使用？

### 📖 定义
Promise是处理异步操作的对象，代表一个异步操作的最终完成或失败。

### 🔄 Promise状态
- **Pending（待定）**：初始状态
- **Fulfilled（已完成）**：操作成功
- **Rejected（已拒绝）**：操作失败

### 💡 基本使用
```javascript
// 创建Promise
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve('Data fetched successfully!');
      } else {
        reject('Failed to fetch data');
      }
    }, 2000);
  });
}

// 使用Promise
fetchData()
  .then(data => {
    console.log(data);
    return 'Processing data...';
  })
  .then(message => {
    console.log(message);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('Operation completed');
  });
```

### 🚀 async/await语法
```javascript
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
    
    const processedData = await processData(data);
    console.log(processedData);
    
    return processedData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### 🔧 Promise常用方法
```javascript
// Promise.all - 全部成功才成功
Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results));

// Promise.race - 第一个完成的决定结果
Promise.race([promise1, promise2])
  .then(result => console.log(result));

// Promise.allSettled - 等待所有Promise完成
Promise.allSettled([promise1, promise2])
  .then(results => console.log(results));
```

---

## 5. == 和 === 的区别？

### 📖 核心区别
- `==`：宽松相等，允许类型转换
- `===`：严格相等，不允许类型转换

### 💡 示例对比
```javascript
// == (宽松相等)
console.log(1 == '1');    // true (字符串'1'转换为数字1)
console.log(0 == false);  // true (false转换为0)
console.log(null == undefined); // true (特殊规则)
console.log('' == 0);     // true (空字符串转换为0)

// === (严格相等)
console.log(1 === '1');   // false (类型不同)
console.log(0 === false); // false (类型不同)
console.log(null === undefined); // false (类型不同)
console.log('' === 0);    // false (类型不同)
```

### 🔍 类型转换规则
```javascript
// == 转换规则示例
console.log([] == []);     // false (对象比较引用)
console.log([] == 0);      // true ([]转换为''，再转换为0)
console.log([] == '');     // true ([]转换为'')
console.log([''] == '');   // true
console.log([0] == 0);     // true
console.log([1,2] == '1,2'); // true (数组转换为字符串)
```

### ✅ 最佳实践
```javascript
// 推荐：始终使用 ===
if (value === null) { /* ... */ }
if (value === undefined) { /* ... */ }
if (value === 0) { /* ... */ }

// 例外：检查null或undefined
if (value == null) { // 等同于 value === null || value === undefined
  /* ... */
}
```

---

## 6. 什么是事件委托(Event Delegation)？

### 📖 定义
事件委托是将事件监听器添加到父元素上，利用事件冒泡来处理子元素的事件。

### 💡 基本示例
```javascript
// HTML结构
// <ul id="list">
//   <li data-id="1">Item 1</li>
//   <li data-id="2">Item 2</li>
//   <li data-id="3">Item 3</li>
// </ul>

// 事件委托
document.getElementById('list').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    const itemId = event.target.dataset.id;
    console.log('Clicked item:', itemId);
  }
});
```

### 🚀 动态内容处理
```javascript
// 动态添加列表项
function addListItem(text, id) {
  const ul = document.getElementById('list');
  const li = document.createElement('li');
  li.textContent = text;
  li.dataset.id = id;
  ul.appendChild(li);
}

// 即使是动态添加的元素也能响应事件
addListItem('New Item', '4');
```

### ✅ 优势
- **性能优化**：减少事件监听器数量
- **内存效率**：只需要一个监听器
- **动态支持**：自动处理新增元素
- **代码简洁**：统一的事件处理逻辑

### 🔧 高级应用
```javascript
// 复杂的事件委托
document.addEventListener('click', function(event) {
  const target = event.target;
  
  // 处理按钮点击
  if (target.matches('.btn')) {
    handleButtonClick(target);
  }
  
  // 处理链接点击
  if (target.matches('a[data-action]')) {
    event.preventDefault();
    handleActionLink(target);
  }
  
  // 处理表单元素
  if (target.matches('input[type="checkbox"]')) {
    handleCheckboxChange(target);
  }
});
```

---

## 7. 什么是高阶函数(Higher-Order Functions)？

### 📖 定义
高阶函数是接受函数作为参数或返回函数的函数。

### 💡 接受函数作为参数
```javascript
function doOperation(operation) {
  return function(a, b) {
    return operation(a, b);
  };
}

const sum = doOperation((a, b) => a + b);
const multiply = doOperation((a, b) => a * b);

console.log(sum(2, 3));      // 5
console.log(multiply(4, 5)); // 20
```

### 🔄 返回函数
```javascript
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(4)); // 12
```

### 🌟 常见的高阶函数

#### Array.prototype.map()
```javascript
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(num => num * num);
console.log(squared); // [1, 4, 9, 16, 25]
```

#### Array.prototype.filter()
```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6]
```

#### Array.prototype.reduce()
```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

// 复杂的reduce应用
const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
];

const grouped = people.reduce((acc, person) => {
  const ageGroup = person.age >= 30 ? 'adult' : 'young';
  if (!acc[ageGroup]) {
    acc[ageGroup] = [];
  }
  acc[ageGroup].push(person);
  return acc;
}, {});

console.log(grouped);
```

### 🔧 实际应用
```javascript
// 函数组合
const compose = (...functions) => (value) =>
  functions.reduceRight((acc, fn) => fn(acc), value);

const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const square = x => x * x;

const composedFunction = compose(square, multiplyByTwo, addOne);
console.log(composedFunction(3)); // ((3 + 1) * 2)² = 64
```

---

## 8. 什么是原型继承(Prototypal Inheritance)？

### 📖 定义
JavaScript使用原型链实现继承，对象可以从其原型对象继承属性和方法。

### 💡 基础示例
```javascript
function Vehicle(make, model) {
  this.make = make;
  this.model = model;
}

Vehicle.prototype.getDetails = function() {
  return `${this.make} ${this.model}`;
};

Vehicle.prototype.start = function() {
  return `${this.getDetails()} is starting...`;
};

function Car(make, model, doors) {
  Vehicle.call(this, make, model); // 调用父构造函数
  this.doors = doors;
}

// 设置原型链
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

// 添加Car特有的方法
Car.prototype.getInfo = function() {
  return `${this.getDetails()} with ${this.doors} doors`;
};

const myCar = new Car('Toyota', 'Camry', 4);
console.log(myCar.getInfo()); // Toyota Camry with 4 doors
console.log(myCar.start());   // Toyota Camry is starting...
```

### 🚀 ES6 Class语法
```javascript
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  
  getDetails() {
    return `${this.make} ${this.model}`;
  }
  
  start() {
    return `${this.getDetails()} is starting...`;
  }
}

class Car extends Vehicle {
  constructor(make, model, doors) {
    super(make, model);
    this.doors = doors;
  }
  
  getInfo() {
    return `${this.getDetails()} with ${this.doors} doors`;
  }
}

const myCar = new Car('Honda', 'Civic', 4);
console.log(myCar.getInfo()); // Honda Civic with 4 doors
```

### 🔍 原型链查找
```javascript
// 原型链示例
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
  return `${this.name} barks`;
};

Dog.prototype.wagTail = function() {
  return `${this.name} wags tail`;
};

const dog = new Dog('Rex', 'German Shepherd');

// 原型链查找过程：
// 1. dog.wagTail() -> 在Dog.prototype中找到
// 2. dog.speak() -> 在Dog.prototype中找到（重写了Animal的方法）
// 3. dog.toString() -> 逐级向上查找到Object.prototype

console.log(dog.speak());   // Rex barks
console.log(dog.wagTail()); // Rex wags tail
```

---

## 9. 事件冒泡和事件捕获的区别？

### 📖 定义
- **事件冒泡**：事件从目标元素向上传播到根元素
- **事件捕获**：事件从根元素向下传播到目标元素

### 🔄 事件传播的三个阶段
1. **捕获阶段**：从根元素到目标元素
2. **目标阶段**：在目标元素上
3. **冒泡阶段**：从目标元素到根元素

### 💡 示例代码
```javascript
// HTML结构
// <div id="grandparent">
//   <div id="parent">
//     <div id="child">Click me</div>
//   </div>
// </div>

const grandparent = document.getElementById('grandparent');
const parent = document.getElementById('parent');
const child = document.getElementById('child');

// 事件冒泡（默认）
grandparent.addEventListener('click', () => {
  console.log('Grandparent - 冒泡');
}, false);

parent.addEventListener('click', () => {
  console.log('Parent - 冒泡');
}, false);

child.addEventListener('click', () => {
  console.log('Child - 冒泡');
}, false);

// 事件捕获
grandparent.addEventListener('click', () => {
  console.log('Grandparent - 捕获');
}, true);

parent.addEventListener('click', () => {
  console.log('Parent - 捕获');
}, true);

child.addEventListener('click', () => {
  console.log('Child - 捕获');
}, true);

// 点击child元素的输出顺序：
// Grandparent - 捕获
// Parent - 捕获
// Child - 捕获
// Child - 冒泡
// Parent - 冒泡
// Grandparent - 冒泡
```

### 🛑 阻止事件传播
```javascript
// 阻止事件冒泡
child.addEventListener('click', (event) => {
  console.log('Child clicked');
  event.stopPropagation(); // 阻止事件继续传播
});

// 阻止默认行为
document.querySelector('a').addEventListener('click', (event) => {
  event.preventDefault(); // 阻止链接跳转
  console.log('Link clicked but not navigated');
});

// 立即停止事件传播（包括同一元素上的其他监听器）
element.addEventListener('click', (event) => {
  event.stopImmediatePropagation();
});
```

### 🎯 实际应用场景
```javascript
// 模态框关闭
document.querySelector('.modal-overlay').addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closeModal(); // 点击遮罩层关闭模态框
  }
});

// 表单验证
document.querySelector('form').addEventListener('submit', (event) => {
  if (!validateForm()) {
    event.preventDefault(); // 阻止表单提交
    showValidationErrors();
  }
});
```

---

## 10. 防抖(Debouncing)和节流(Throttling)的区别？

### 📖 定义
- **防抖**：在事件停止触发后等待指定时间再执行
- **节流**：确保函数在指定时间间隔内最多执行一次

### 💡 防抖(Debouncing)实现

#### 基础防抖
```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// 使用示例：搜索输入框
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((event) => {
  console.log('Searching for:', event.target.value);
  // 执行搜索请求
  performSearch(event.target.value);
}, 300);

searchInput.addEventListener('input', debouncedSearch);
```

#### 高级防抖（支持立即执行）
```javascript
function debounce(func, delay, immediate = false) {
  let timeoutId;
  return function(...args) {
    const callNow = immediate && !timeoutId;
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) func.apply(this, args);
    }, delay);
    
    if (callNow) func.apply(this, args);
  };
}
```

### 🔄 节流(Throttling)实现

#### 基础节流
```javascript
function throttle(func, interval) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      func.apply(this, args);
    }
  };
}

// 使用示例：滚动事件
const throttledScroll = throttle(() => {
  console.log('Scrolling...', window.scrollY);
  updateScrollIndicator();
}, 100);

window.addEventListener('scroll', throttledScroll);
```

#### 高级节流（支持前缘和后缘触发）
```javascript
function throttle(func, interval, options = {}) {
  let timeout;
  let previous = 0;
  
  const later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    func.apply(this, arguments);
  };
  
  return function(...args) {
    const now = Date.now();
    
    if (!previous && options.leading === false) {
      previous = now;
    }
    
    const remaining = interval - (now - previous);
    
    if (remaining <= 0 || remaining > interval) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };
}
```

### 🎯 应用场景对比

| 场景 | 防抖 | 节流 |
|------|------|------|
| 搜索输入框 | ✅ 推荐 | ❌ |
| 按钮重复点击 | ✅ 推荐 | ❌ |
| 窗口resize | ✅ 可用 | ✅ 推荐 |
| 滚动事件 | ❌ | ✅ 推荐 |
| 鼠标移动 | ❌ | ✅ 推荐 |
| API请求限制 | ✅ 推荐 | ✅ 可用 |

### 🚀 实际应用示例
```javascript
// 搜索建议
const searchSuggestions = debounce(async (query) => {
  if (query.length < 2) return;
  
  try {
    const response = await fetch(`/api/search?q=${query}`);
    const suggestions = await response.json();
    displaySuggestions(suggestions);
  } catch (error) {
    console.error('Search failed:', error);
  }
}, 300);

// 滚动进度条
const updateScrollProgress = throttle(() => {
  const scrolled = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress = (scrolled / maxScroll) * 100;
  
  document.querySelector('.scroll-progress').style.width = `${progress}%`;
}, 16); // 约60FPS

// 窗口大小变化
const handleResize = debounce(() => {
  updateLayout();
  recalculateDimensions();
}, 250);

window.addEventListener('resize', handleResize);
```

---

## 🎯 总结

### 🔑 核心知识点
1. **闭包** - 理解作用域链和内存管理
2. **变量声明** - 掌握ES6+的新特性
3. **this绑定** - 理解不同调用模式下的上下文
4. **Promise** - 掌握现代异步编程
5. **相等性比较** - 避免类型转换陷阱
6. **事件系统** - 理解DOM事件机制
7. **函数式编程** - 掌握高阶函数概念
8. **面向对象** - 理解原型继承
9. **性能优化** - 掌握防抖和节流技术

### 📚 学习建议
- 多动手实践，理论结合代码
- 理解概念背后的原理
- 关注实际应用场景
- 持续关注新特性和最佳实践

### 🚀 进阶方向
- 深入学习ES6+新特性
- 掌握现代前端框架
- 了解浏览器工作原理
- 学习前端工程化工具

---

**继续加油，掌握这些核心概念将大大提升你的JavaScript技能！** 💪