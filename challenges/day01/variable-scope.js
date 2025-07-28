// Day 01: 变量声明和作用域练习

console.log('=== JavaScript 变量声明和作用域练习 ===\n');

// 1. 变量提升示例
console.log('1. 变量提升示例:');
function hoistingExample() {
  console.log('var变量 (提升后):', varVariable); // undefined
  // console.log('let变量 (暂时性死区):', letVariable); // ReferenceError
  // console.log('const变量 (暂时性死区):', constVariable); // ReferenceError
  
  var varVariable = 'var值';
  let letVariable = 'let值';
  const constVariable = 'const值';
  
  console.log('var变量 (赋值后):', varVariable);
  console.log('let变量 (赋值后):', letVariable);
  console.log('const变量 (赋值后):', constVariable);
}

hoistingExample();

// 2. 作用域比较
console.log('\n2. 作用域比较:');
function scopeComparison() {
  var varGlobal = 'var函数级作用域';
  let letGlobal = 'let块级作用域';
  const constGlobal = 'const块级作用域';
  
  if (true) {
    var varLocal = 'var在if块中'; // 函数作用域，外部可访问
    let letLocal = 'let在if块中'; // 块级作用域，外部不可访问
    const constLocal = 'const在if块中'; // 块级作用域，外部不可访问
    
    // 重新声明测试
    var varGlobal = 'var被重新声明'; // 允许
    // let letGlobal = 'let重新声明'; // SyntaxError
    // const constGlobal = 'const重新声明'; // SyntaxError
    
    console.log('if块内 - var:', varGlobal);
    console.log('if块内 - let:', letGlobal);
    console.log('if块内 - const:', constGlobal);
  }
  
  console.log('if块外 - var:', varGlobal); // "var被重新声明"
  console.log('if块外 - varLocal:', varLocal); // "var在if块中"
  console.log('if块外 - let:', letGlobal); // "let块级作用域"
  console.log('if块外 - const:', constGlobal); // "const块级作用域"
  // console.log('if块外 - letLocal:', letLocal); // ReferenceError
  // console.log('if块外 - constLocal:', constLocal); // ReferenceError
}

scopeComparison();

// 3. 循环中的作用域问题
console.log('\n3. 循环中的作用域问题:');

// var在循环中的问题
console.log('var在循环中:');
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(`var循环 - i的值: ${i}`); // 都输出3
  }, 100);
}

// let解决循环问题
console.log('let在循环中:');
for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log(`let循环 - j的值: ${j}`); // 输出0, 1, 2
  }, 200);
}

// 4. const的特殊性
console.log('\n4. const的特殊性:');
function constExample() {
  // const必须初始化
  const message = 'Hello World';
  console.log('const变量:', message);
  
  // const不能重新赋值
  // message = 'New Message'; // TypeError
  
  // const对象可以修改内容
  const person = {
    name: 'Alice',
    age: 25
  };
  
  console.log('const对象 (初始):', person);
  
  person.age = 26; // 允许修改对象属性
  person.city = 'Beijing'; // 允许添加属性
  
  console.log('const对象 (修改后):', person);
  
  // person = {}; // TypeError: 不能重新赋值
  
  // const数组可以修改内容
  const numbers = [1, 2, 3];
  console.log('const数组 (初始):', numbers);
  
  numbers.push(4); // 允许修改数组内容
  numbers[0] = 0; // 允许修改元素
  
  console.log('const数组 (修改后):', numbers);
  
  // numbers = []; // TypeError: 不能重新赋值
}

constExample();

// 5. 词法作用域示例
console.log('\n5. 词法作用域示例:');
function lexicalScopeExample() {
  const outerVariable = '外层变量';
  
  function innerFunction() {
    const innerVariable = '内层变量';
    console.log('内层函数访问:', outerVariable); // 可以访问外层变量
    
    function deeperFunction() {
      console.log('更深层函数访问:', outerVariable); // 可以访问更外层变量
      console.log('更深层函数访问:', innerVariable); // 可以访问父层变量
    }
    
    deeperFunction();
  }
  
  innerFunction();
  // console.log(innerVariable); // ReferenceError: 不能访问内层变量
}

lexicalScopeExample();

// 6. 综合练习：变量声明最佳实践
console.log('\n6. 变量声明最佳实践:');
function bestPractices() {
  // 1. 优先使用const
  const API_URL = 'https://api.example.com';
  const config = {
    timeout: 5000,
    retries: 3
  };
  
  // 2. 需要重新赋值时使用let
  let currentUser = null;
  let isLoading = false;
  
  // 3. 避免使用var
  // var deprecatedVariable = 'avoid this';
  
  // 4. 在需要的地方声明变量
  if (config.timeout > 1000) {
    const message = 'Timeout is configured';
    console.log(message);
  }
  
  // 5. 使用有意义的变量名
  const userAccountBalance = 1000;
  const isUserLoggedIn = true;
  
  console.log('最佳实践示例完成');
}

bestPractices();

console.log('\n=== 变量声明和作用域练习完成 ===');