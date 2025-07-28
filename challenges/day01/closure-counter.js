// Day 01: 闭包计数器练习

console.log('=== JavaScript 闭包计数器练习 ===\n');

// 1. 基础闭包计数器
console.log('1. 基础闭包计数器:');
function createCounter() {
  let count = 0; // 私有变量
  
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
    },
    reset: function() {
      count = 0;
      return count;
    }
  };
}

const counter1 = createCounter();
console.log('初始计数:', counter1.getCount()); // 0
console.log('增加:', counter1.increment()); // 1
console.log('增加:', counter1.increment()); // 2
console.log('减少:', counter1.decrement()); // 1
console.log('当前计数:', counter1.getCount()); // 1
console.log('重置:', counter1.reset()); // 0

// 2. 多个独立计数器
console.log('\n2. 多个独立计数器:');
const counter2 = createCounter();
const counter3 = createCounter();

counter2.increment();
counter2.increment();
counter3.increment();

console.log('计数器2:', counter2.getCount()); // 2
console.log('计数器3:', counter3.getCount()); // 1
console.log('计数器1:', counter1.getCount()); // 0 (之前被重置了)

// 3. 高级计数器（带步长）
console.log('\n3. 高级计数器（带步长）:');
function createAdvancedCounter(initialValue = 0, step = 1) {
  let count = initialValue;
  
  return {
    increment: function(customStep = step) {
      count += customStep;
      return count;
    },
    decrement: function(customStep = step) {
      count -= customStep;
      return count;
    },
    getCount: function() {
      return count;
    },
    reset: function(newInitial = initialValue) {
      count = newInitial;
      return count;
    },
    setStep: function(newStep) {
      step = newStep;
      return step;
    }
  };
}

const advancedCounter = createAdvancedCounter(10, 5);
console.log('高级计数器初始值:', advancedCounter.getCount()); // 10
console.log('增加5:', advancedCounter.increment()); // 15
console.log('增加3:', advancedCounter.increment(3)); // 18
console.log('减少5:', advancedCounter.decrement()); // 13
console.log('设置步长为2:', advancedCounter.setStep(2));
console.log('增加2:', advancedCounter.increment()); // 15

// 4. 计数器工厂（函数式风格）
console.log('\n4. 计数器工厂（函数式风格）:');
function counterFactory(config = {}) {
  const {
    initialValue = 0,
    step = 1,
    min = -Infinity,
    max = Infinity
  } = config;
  
  let count = initialValue;
  
  function validate(newCount) {
    return Math.min(Math.max(newCount, min), max);
  }
  
  return {
    increment: (customStep = step) => {
      count = validate(count + customStep);
      return count;
    },
    decrement: (customStep = step) => {
      count = validate(count - customStep);
      return count;
    },
    getValue: () => count,
    reset: () => {
      count = initialValue;
      return count;
    },
    set: (value) => {
      count = validate(value);
      return count;
    }
  };
}

const boundedCounter = counterFactory({
  initialValue: 0,
  step: 1,
  min: 0,
  max: 10
});

console.log('有界计数器初始值:', boundedCounter.getValue()); // 0
console.log('增加到8:', boundedCounter.set(8)); // 8
console.log('增加1:', boundedCounter.increment()); // 9
console.log('增加5 (超出上限):', boundedCounter.increment(5)); // 10
console.log('减少15 (超出下限):', boundedCounter.decrement(15)); // 0

// 5. 闭包陷阱示例
console.log('\n5. 闭包陷阱示例:');

// 错误的做法 - 循环中的闭包
console.log('错误的做法 - var在循环中:');
var functions = [];
for (var i = 0; i < 3; i++) {
  functions[i] = function() {
    return i; // 这里会捕获最后的i值
  };
}

functions.forEach((fn, index) => {
  console.log(`函数${index}返回值:`, fn()); // 都返回3
});

// 正确的做法1 - 使用let
console.log('\n正确的做法1 - let在循环中:');
var functionsCorrect1 = [];
for (let j = 0; j < 3; j++) {
  functionsCorrect1[j] = function() {
    return j; // let创建了块级作用域
  };
}

functionsCorrect1.forEach((fn, index) => {
  console.log(`函数${index}返回值:`, fn()); // 返回0, 1, 2
});

// 正确的做法2 - 使用IIFE（立即执行函数表达式）
console.log('\n正确的做法2 - 使用IIFE:');
var functionsCorrect2 = [];
for (var k = 0; k < 3; k++) {
  functionsCorrect2[k] = (function(num) {
    return function() {
      return num;
    };
  })(k);
}

functionsCorrect2.forEach((fn, index) => {
  console.log(`函数${index}返回值:`, fn()); // 返回0, 1, 2
});

// 6. 实际应用场景
console.log('\n6. 实际应用场景:');

// 场景1: 私有变量和方法
function createUser(name, email) {
  let isActive = true;
  let loginCount = 0;
  
  // 私有方法
  function log(action) {
    console.log(`[${new Date().toISOString()}] User ${name}: ${action}`);
  }
  
  return {
    getName: () => name,
    getEmail: () => email,
    login: () => {
      if (isActive) {
        loginCount++;
        log('logged in');
        return true;
      }
      log('login failed - account inactive');
      return false;
    },
    logout: () => {
      log('logged out');
    },
    deactivate: () => {
      isActive = false;
      log('account deactivated');
    },
    getLoginCount: () => loginCount
  };
}

const user = createUser('Alice', 'alice@example.com');
console.log('用户名:', user.getName());
user.login();
user.login();
console.log('登录次数:', user.getLoginCount());
user.deactivate();
user.login(); // 失败

// 场景2: 模块化配置
function createApiClient(baseUrl) {
  let authToken = null;
  let retryCount = 3;
  
  return {
    setAuthToken: (token) => {
      authToken = token;
    },
    setRetryCount: (count) => {
      retryCount = count;
    },
    request: async (endpoint, options = {}) => {
      // 模拟API请求
      console.log(`发送请求到: ${baseUrl}${endpoint}`);
      console.log(`认证令牌: ${authToken ? '***已设置***' : '未设置'}`);
      console.log(`重试次数: ${retryCount}`);
      return { success: true, data: {} };
    }
  };
}

const apiClient = createApiClient('https://api.example.com');
apiClient.setAuthToken('abc123');
apiClient.setRetryCount(5);
apiClient.request('/users');

console.log('\n=== 闭包计数器练习完成 ===');