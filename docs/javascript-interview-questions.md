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

### 🔍 详细解释

#### 2.1 暂时性死区 (Temporal Dead Zone, TDZ)

**什么是暂时性死区？**

暂时性死区是指使用`let`或`const`声明的变量在声明之前无法访问的区域。虽然这些变量会被提升，但它们不会被初始化，访问它们会抛出`ReferenceError`。

```javascript
console.log(typeof a); // "undefined" - var声明的变量
console.log(typeof b); // ReferenceError - let在暂时性死区
console.log(typeof c); // ReferenceError - const在暂时性死区

var a = 1;
let b = 2;
const c = 3;
```

**暂时性死区的实际示例：**

```javascript
function temporalDeadZone() {
  // 这里是TDZ的开始
  console.log(value); // ReferenceError: Cannot access 'value' before initialization
  
  let value = 42;     // TDZ结束，变量可用
  console.log(value); // 42
}

// 参数默认值中的TDZ
function example(a = b, b = 2) {
  return [a, b];
}
example(); // ReferenceError: Cannot access 'b' before initialization
```

#### 2.2 函数作用域 vs 块级作用域

**函数作用域 (var)**

`var`声明的变量具有函数作用域，意味着变量在整个函数内都是可见的，不受块级结构（如if、for、while等）的限制。

```javascript
function functionScope() {
  if (true) {
    var x = 1;
  }
  console.log(x); // 1 - 可以访问，因为var有函数作用域
  
  for (var i = 0; i < 3; i++) {
    // i在这里声明
  }
  console.log(i); // 3 - 循环结束后仍然可以访问
}
```

**块级作用域 (let/const)**

`let`和`const`声明的变量具有块级作用域，只在最近的包含块内可见。

```javascript
function blockScope() {
  if (true) {
    let x = 1;
    const y = 2;
  }
  // console.log(x); // ReferenceError: x is not defined
  // console.log(y); // ReferenceError: y is not defined
  
  for (let i = 0; i < 3; i++) {
    // i只在这个循环块内可见
  }
  // console.log(i); // ReferenceError: i is not defined
}
```

**块级作用域的实际应用：**

```javascript
// 使用var的问题
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 输出: 3, 3, 3
}

// 使用let的解决方案
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 输出: 0, 1, 2
}
```

#### 2.3 变量提升 (Hoisting)

**var的提升：**
```javascript
console.log(x); // undefined (不是ReferenceError)
var x = 5;

// 等价于：
var x;          // 提升到顶部并初始化为undefined
console.log(x); // undefined
x = 5;
```

**let/const的提升：**
```javascript
console.log(y); // ReferenceError
let y = 10;

// let/const也会提升，但不会初始化
// 它们在暂时性死区中，直到声明语句执行
```

#### 2.4 重复声明

```javascript
// var允许重复声明
var name = "张三";
var name = "李四"; // 不会报错

// let/const不允许重复声明
let age = 25;
// let age = 30; // SyntaxError: Identifier 'age' has already been declared

const PI = 3.14;
// const PI = 3.14159; // SyntaxError: Identifier 'PI' has already been declared
```

#### 2.5 重新赋值

```javascript
var a = 1;
a = 2; // ✅ 允许

let b = 1;
b = 2; // ✅ 允许

const c = 1;
// c = 2; // ❌ TypeError: Assignment to constant variable.

// 注意：const对象的属性可以修改
const obj = { name: "张三" };
obj.name = "李四"; // ✅ 允许修改属性
obj.age = 25;      // ✅ 允许添加属性
// obj = {};       // ❌ 不允许重新赋值整个对象
```

### 🎯 最佳实践

1. **优先使用`const`**：如果值不需要重新赋值，使用`const`
2. **需要重新赋值时使用`let`**：当变量值需要改变时
3. **避免使用`var`**：在现代JavaScript开发中，通常不推荐使用`var`

```javascript
// 推荐的写法
const users = ['张三', '李四'];     // 不会重新赋值数组引用
let currentIndex = 0;              // 索引可能会改变
const API_URL = 'https://api.example.com'; // 常量

// 避免的写法
var data = {};                     // 使用const或let代替
```

### 🚨 常见陷阱

#### 2.6 循环中的闭包问题
```javascript
// 问题代码
var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function() {
    console.log('按钮 ' + i); // 总是输出最后一个i的值
  };
}

// 解决方案1：使用let
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function() {
    console.log('按钮 ' + i); // 正确输出对应的i值
  };
}

// 解决方案2：使用IIFE
for (var i = 0; i < buttons.length; i++) {
  (function(index) {
    buttons[index].onclick = function() {
      console.log('按钮 ' + index);
    };
  })(i);
}
```

#### 2.7 const的误解
```javascript
// const并不是"不可变"，而是"不可重新赋值"
const arr = [1, 2, 3];
arr.push(4);        // ✅ 允许，修改数组内容
arr[0] = 0;         // ✅ 允许，修改数组元素
// arr = [4, 5, 6]; // ❌ 不允许，重新赋值

// 如果需要真正的不可变，使用Object.freeze()
const immutableArr = Object.freeze([1, 2, 3]);
// immutableArr.push(4); // TypeError (严格模式下)
```

### 📝 小结

- **var**：函数作用域，存在变量提升和初始化，无暂时性死区，允许重复声明和重新赋值
- **let**：块级作用域，存在变量提升但不初始化，有暂时性死区，不允许重复声明，允许重新赋值
- **const**：块级作用域，存在变量提升但不初始化，有暂时性死区，不允许重复声明和重新赋值

理解这些区别有助于编写更安全、更可预测的JavaScript代码。在现代开发中，建议优先使用`const`，需要重新赋值时使用`let`，避免使用`var`。

---

## 3. this关键字的工作原理？

### 📖 定义
`this`的值取决于函数的调用方式，而不是定义位置。JavaScript中的`this`绑定遵循四个主要规则。

### 🎯 this绑定的四大规则

#### 3.1 默认绑定 (Default Binding)

**定义**: 当函数独立调用时，`this`指向全局对象（浏览器中是`window`，Node.js中是`global`）。在严格模式下，`this`为`undefined`。

```javascript
// 非严格模式
function sayName() {
  console.log(this.name); // this指向全局对象
}

var name = "全局变量";
sayName(); // "全局变量"

// 严格模式
"use strict";
function sayNameStrict() {
  console.log(this); // undefined
  // console.log(this.name); // TypeError: Cannot read property 'name' of undefined
}
sayNameStrict();
```

**常见陷阱**:
```javascript
const obj = {
  name: "对象属性",
  sayName: function() {
    console.log(this.name);
  }
};

const fn = obj.sayName; // 赋值给变量
fn(); // undefined (默认绑定，不是对象方法调用)

// 回调函数中的默认绑定
setTimeout(obj.sayName, 1000); // undefined (函数作为参数传递时失去绑定)
```

#### 3.2 隐式绑定 (Implicit Binding)

**定义**: 当函数作为对象的方法被调用时，`this`隐式绑定到该对象。

```javascript
const person = {
  name: 'Alice',
  age: 30,
  sayHello: function() {
    console.log(`Hello, I'm ${this.name}, ${this.age} years old`);
  },
  getInfo: function() {
    return {
      getName: function() {
        return this.name; // this指向getInfo返回的对象
      }
    };
  }
};

person.sayHello(); // "Hello, I'm Alice, 30 years old"

// 链式调用 - this指向最后一个调用对象
const info = person.getInfo();
console.log(info.getName()); // undefined (this指向info对象，没有name属性)
```

**隐式绑定丢失**:
```javascript
const obj = {
  name: "对象",
  sayName: function() {
    console.log(this.name);
  }
};

// 情况1: 赋值导致丢失
const fn = obj.sayName;
fn(); // undefined (变成了默认绑定)

// 情况2: 传参导致丢失
function callFunction(func) {
  func(); // 默认绑定
}
callFunction(obj.sayName); // undefined

// 情况3: 内置函数导致丢失
setTimeout(obj.sayName, 1000); // undefined
[1, 2, 3].forEach(obj.sayName); // undefined (每次调用都是默认绑定)
```

**解决隐式绑定丢失**:
```javascript
// 方法1: 包装函数
setTimeout(() => obj.sayName(), 1000); // 正确输出

// 方法2: 使用bind
setTimeout(obj.sayName.bind(obj), 1000); // 正确输出

// 方法3: 存储引用
const boundSayName = obj.sayName.bind(obj);
setTimeout(boundSayName, 1000); // 正确输出
```

#### 3.3 显式绑定 (Explicit Binding)

**定义**: 使用`call()`、`apply()`或`bind()`方法显式指定`this`的值。

##### call() 方法
```javascript
function introduce(greeting, punctuation) {
  console.log(greeting + ', I am ' + this.name + punctuation);
}

const person1 = { name: 'John' };
const person2 = { name: 'Jane' };

// call(thisArg, arg1, arg2, ...)
introduce.call(person1, 'Hello', '!'); // "Hello, I am John!"
introduce.call(person2, 'Hi', '.'); // "Hi, I am Jane."
```

##### apply() 方法
```javascript
function introduce(greeting, punctuation) {
  console.log(greeting + ', I am ' + this.name + punctuation);
}

const person = { name: 'Bob' };

// apply(thisArg, [argsArray])
introduce.apply(person, ['Hello', '!']); // "Hello, I am Bob!"

// apply在数组操作中的应用
const numbers = [5, 6, 2, 3, 7];
console.log(Math.max.apply(null, numbers)); // 7
// ES6写法: Math.max(...numbers)
```

##### bind() 方法
```javascript
function greet(greeting) {
  return greeting + ', ' + this.name;
}

const person = { name: 'Charlie' };

// bind返回一个新函数，不会立即执行
const boundGreet = greet.bind(person);
console.log(boundGreet('Hello')); // "Hello, Charlie"

// bind可以进行参数预设(柯里化)
const sayHello = greet.bind(person, 'Hello');
console.log(sayHello()); // "Hello, Charlie"
```

##### call、apply、bind的详细对比

| 方法 | 执行时机 | 参数传递 | 返回值 | 使用场景 |
|------|---------|---------|--------|---------|
| `call` | 立即执行 | 逐个传递 | 函数执行结果 | 参数数量固定且较少 |
| `apply` | 立即执行 | 数组形式 | 函数执行结果 | 参数数量不确定或来自数组 |
| `bind` | 返回新函数 | 逐个传递 | 绑定后的新函数 | 需要稍后执行或事件处理 |

```javascript
function sum(a, b, c) {
  console.log(`${this.name}: ${a} + ${b} + ${c} = ${a + b + c}`);
}

const calculator = { name: 'Calculator' };

// call - 立即执行，参数逐个传递
sum.call(calculator, 1, 2, 3); // "Calculator: 1 + 2 + 3 = 6"

// apply - 立即执行，参数以数组形式传递
sum.apply(calculator, [4, 5, 6]); // "Calculator: 4 + 5 + 6 = 15"

// bind - 返回新函数，可以分步传递参数
const boundSum = sum.bind(calculator, 7, 8);
boundSum(9); // "Calculator: 7 + 8 + 9 = 24"

// 实际应用：数组方法的借用
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const realArray = Array.prototype.slice.call(arrayLike);
console.log(realArray); // ['a', 'b', 'c']
```

**硬绑定**:
```javascript
function hardBind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments);
  };
}

// 或者使用内置的bind
function sayName() {
  console.log(this.name);
}

const obj = { name: 'Hard Bound' };
const hardBound = sayName.bind(obj);

// 无法被重新绑定
hardBound.call({ name: 'Other' }); // 仍然输出 "Hard Bound"
```

#### 3.4 new绑定 (New Binding)

**定义**: 使用`new`操作符调用函数时，会创建一个新对象，`this`指向这个新对象。

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function() {
    console.log(`Hello, I'm ${this.name}`);
  };
}

const person1 = new Person('Alice', 25);
const person2 = new Person('Bob', 30);

person1.sayHello(); // "Hello, I'm Alice"
person2.sayHello(); // "Hello, I'm Bob"

console.log(person1 instanceof Person); // true
```

**new操作符的工作过程**:
```javascript
// 手动实现new操作符的过程
function myNew(constructor, ...args) {
  // 1. 创建一个新对象，继承构造函数的原型
  const obj = Object.create(constructor.prototype);
  
  // 2. 执行构造函数，this指向新对象
  const result = constructor.apply(obj, args);
  
  // 3. 如果构造函数返回对象，则返回该对象，否则返回新创建的对象
  return result instanceof Object ? result : obj;
}

// 使用示例
const person3 = myNew(Person, 'Charlie', 35);
person3.sayHello(); // "Hello, I'm Charlie"
```

**构造函数返回值的影响**:
```javascript
function Person1(name) {
  this.name = name;
  // 隐式返回this
}

function Person2(name) {
  this.name = name;
  return { name: 'Overridden' }; // 显式返回对象
}

function Person3(name) {
  this.name = name;
  return 'string'; // 返回原始值，被忽略
}

const p1 = new Person1('Alice'); // { name: 'Alice' }
const p2 = new Person2('Bob');   // { name: 'Overridden' }
const p3 = new Person3('Charlie'); // { name: 'Charlie' }
```

### 🎯 绑定优先级

当多个绑定规则同时适用时，优先级如下：

**1. new绑定 > 显式绑定 > 隐式绑定 > 默认绑定**

```javascript
function sayName() {
  console.log(this.name);
}

const obj1 = { name: 'obj1', sayName: sayName };
const obj2 = { name: 'obj2' };

// 隐式绑定 vs 显式绑定
obj1.sayName(); // "obj1" (隐式绑定)
obj1.sayName.call(obj2); // "obj2" (显式绑定优先)

// 显式绑定 vs new绑定
function Person(name) {
  this.name = name;
}

const boundPerson = Person.bind(obj1);
boundPerson('bound'); // obj1.name变为'bound'
const newPerson = new boundPerson('new'); // 创建新对象，name为'new'
console.log(newPerson.name); // "new" (new绑定优先)
```

### 🏹 箭头函数的词法作用域

**核心特点**: 箭头函数没有自己的`this`，它会捕获其所在上下文的`this`值，作为自己的`this`值。

#### 基本行为
```javascript
// 普通函数 vs 箭头函数
const obj = {
  name: 'Object',
  
  regularFunction: function() {
    console.log('Regular:', this.name); // this指向obj
    
    const arrowFunction = () => {
      console.log('Arrow:', this.name); // 继承外层的this，也指向obj
    };
    
    function innerFunction() {
      console.log('Inner:', this.name); // this指向全局对象(非严格模式)或undefined(严格模式)
    }
    
    arrowFunction();
    innerFunction();
  }
};

obj.regularFunction();
// 输出:
// Regular: Object
// Arrow: Object
// Inner: undefined (严格模式)
```

#### 箭头函数不能被重新绑定
```javascript
const obj1 = { name: 'obj1' };
const obj2 = { name: 'obj2' };

const arrowFunc = () => {
  console.log(this.name);
};

// 箭头函数的this不能被改变
arrowFunc.call(obj1); // undefined (this仍然是定义时的上下文)
arrowFunc.apply(obj2); // undefined
arrowFunc.bind(obj1)(); // undefined

// 对比普通函数
function regularFunc() {
  console.log(this.name);
}

regularFunc.call(obj1); // "obj1"
regularFunc.apply(obj2); // "obj2"
```

#### 实际应用场景

**1. 事件处理器**
```javascript
class Button {
  constructor(element) {
    this.element = element;
    this.clickCount = 0;
    
    // 使用箭头函数，this自动绑定到Button实例
    this.element.addEventListener('click', () => {
      this.clickCount++;
      console.log(`按钮被点击了 ${this.clickCount} 次`);
    });
    
    // 如果使用普通函数，需要手动绑定
    // this.element.addEventListener('click', this.handleClick.bind(this));
  }
  
  handleClick() {
    this.clickCount++;
    console.log(`按钮被点击了 ${this.clickCount} 次`);
  }
}
```

**2. 数组方法中的回调**
```javascript
class NumberProcessor {
  constructor(numbers) {
    this.numbers = numbers;
    this.multiplier = 2;
  }
  
  // 使用箭头函数
  processWithArrow() {
    return this.numbers.map(num => num * this.multiplier);
  }
  
  // 使用普通函数需要额外处理this
  processWithRegular() {
    const self = this; // 保存this引用
    return this.numbers.map(function(num) {
      return num * self.multiplier;
    });
    
    // 或者使用bind
    // return this.numbers.map(function(num) {
    //   return num * this.multiplier;
    // }.bind(this));
  }
}

const processor = new NumberProcessor([1, 2, 3, 4]);
console.log(processor.processWithArrow()); // [2, 4, 6, 8]
```

**3. 定时器**
```javascript
class Timer {
  constructor() {
    this.seconds = 0;
  }
  
  start() {
    // 箭头函数确保this指向Timer实例
    setInterval(() => {
      this.seconds++;
      console.log(`已过去 ${this.seconds} 秒`);
    }, 1000);
    
    // 普通函数需要绑定this
    // setInterval(function() {
    //   this.seconds++;
    //   console.log(`已过去 ${this.seconds} 秒`);
    // }.bind(this), 1000);
  }
}
```

#### 箭头函数的限制
```javascript
// 1. 不能用作构造函数
const ArrowFunc = () => {
  this.name = 'test';
};
// const instance = new ArrowFunc(); // TypeError: ArrowFunc is not a constructor

// 2. 没有arguments对象
const arrowFunc = () => {
  console.log(arguments); // ReferenceError: arguments is not defined
};

// 使用剩余参数代替
const arrowFuncWithRest = (...args) => {
  console.log(args); // 正确
};

// 3. 没有prototype属性
console.log(ArrowFunc.prototype); // undefined

// 4. 不能用作生成器函数
// const arrowGenerator = * () => { // SyntaxError
//   yield 1;
// };
```

### 🛠️ 实际应用案例

#### 案例1: React组件中的事件处理
```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  // 箭头函数方法 - 自动绑定this
  handleClickArrow = () => {
    this.setState({ count: this.state.count + 1 });
  }
  
  // 普通方法 - 需要在构造函数中绑定或使用bind
  handleClickRegular() {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClickArrow}>箭头函数</button>
        <button onClick={this.handleClickRegular.bind(this)}>普通函数</button>
      </div>
    );
  }
}
```

#### 案例2: API调用中的this处理
```javascript
class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.token = null;
  }
  
  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: this.getHeaders()
      });
      
      return response.json();
    } catch (error) {
      this.handleError(error);
    }
  }
  
  getHeaders() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    };
  }
  
  handleError(error) {
    console.error('API Error:', error);
  }
  
  // 使用箭头函数确保this绑定正确
  setupErrorHandler() {
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError(event.reason); // this正确指向ApiService实例
    });
  }
}
```

### 📝 总结

#### this绑定规则优先级：
1. **new绑定** - 构造函数调用
2. **显式绑定** - call/apply/bind
3. **隐式绑定** - 对象方法调用
4. **默认绑定** - 独立函数调用

#### 箭头函数特点：
- 没有自己的this，使用词法作用域
- 不能被call/apply/bind改变this
- 不能用作构造函数
- 适合回调函数和事件处理器

#### 最佳实践：
- 理解调用位置决定this的值
- 在需要保持this上下文的回调中使用箭头函数
- 在构造函数和对象方法中使用普通函数
- 必要时使用bind创建硬绑定函数

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