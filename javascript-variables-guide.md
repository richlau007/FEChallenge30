# JavaScript 变量声明：var、let、const 详解

## 📊 对比表格

| 特性 | var | let | const |
|------|-----|-----|-------|
| 作用域 | 函数作用域 | 块级作用域 | 块级作用域 |
| 变量提升 | 会提升并初始化为undefined | 会提升但不初始化 | 会提升但不初始化 |
| 重复声明 | 允许 | 不允许 | 不允许 |
| 重新赋值 | 允许 | 允许 | 不允许 |
| 暂时性死区 | 无 | 有 | 有 |

## 💡 示例代码

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

## 🔍 详细解释

### 1. 暂时性死区 (Temporal Dead Zone, TDZ)

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

### 2. 函数作用域 vs 块级作用域

#### 函数作用域 (var)

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

#### 块级作用域 (let/const)

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

### 3. 变量提升 (Hoisting)

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

### 4. 重复声明

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

### 5. 重新赋值

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

## 🎯 最佳实践

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

## 🚨 常见陷阱

### 1. 循环中的闭包问题
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

### 2. const的误解
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

## 📝 总结

- **var**：函数作用域，存在变量提升和初始化，无暂时性死区，允许重复声明和重新赋值
- **let**：块级作用域，存在变量提升但不初始化，有暂时性死区，不允许重复声明，允许重新赋值
- **const**：块级作用域，存在变量提升但不初始化，有暂时性死区，不允许重复声明和重新赋值

理解这些区别有助于编写更安全、更可预测的JavaScript代码。在现代开发中，建议优先使用`const`，需要重新赋值时使用`let`，避免使用`var`。