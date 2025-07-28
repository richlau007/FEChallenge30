// Day 01: 模块模式练习

console.log('=== JavaScript 模块模式练习 ===\n');

// 1. 基础模块模式 - 用户管理模块
console.log('1. 基础用户管理模块:');
const UserManager = (function() {
  // 私有变量
  let users = [];
  let currentId = 1;
  
  // 私有方法
  function generateId() {
    return currentId++;
  }
  
  function findUserById(id) {
    return users.find(user => user.id === id);
  }
  
  function validateUser(user) {
    if (!user.name || typeof user.name !== 'string') {
      throw new Error('用户名是必需的，且必须是字符串');
    }
    if (!user.email || !user.email.includes('@')) {
      throw new Error('有效的邮箱地址是必需的');
    }
    return true;
  }
  
  // 公共API
  return {
    addUser: function(userData) {
      try {
        validateUser(userData);
        const user = {
          id: generateId(),
          name: userData.name,
          email: userData.email,
          createdAt: new Date().toISOString()
        };
        users.push(user);
        console.log(`用户 ${user.name} 已添加，ID: ${user.id}`);
        return user;
      } catch (error) {
        console.error('添加用户失败:', error.message);
        return null;
      }
    },
    
    removeUser: function(id) {
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
        const removedUser = users.splice(index, 1)[0];
        console.log(`用户 ${removedUser.name} 已删除`);
        return removedUser;
      }
      console.log('未找到指定ID的用户');
      return null;
    },
    
    getUser: function(id) {
      return findUserById(id) || null;
    },
    
    getAllUsers: function() {
      return [...users]; // 返回副本，防止外部修改
    },
    
    getUserCount: function() {
      return users.length;
    },
    
    updateUser: function(id, updates) {
      const user = findUserById(id);
      if (!user) {
        console.log('未找到指定ID的用户');
        return null;
      }
      
      // 验证更新数据
      const updatedUser = { ...user, ...updates };
      try {
        validateUser(updatedUser);
        Object.assign(user, updates);
        user.updatedAt = new Date().toISOString();
        console.log(`用户 ${user.name} 已更新`);
        return user;
      } catch (error) {
        console.error('更新用户失败:', error.message);
        return null;
      }
    }
  };
})();

// 测试用户管理模块
const user1 = UserManager.addUser({ name: 'Alice', email: 'alice@example.com' });
const user2 = UserManager.addUser({ name: 'Bob', email: 'bob@example.com' });
UserManager.addUser({ name: 'Charlie' }); // 应该失败

console.log('所有用户:', UserManager.getAllUsers());
console.log('用户数量:', UserManager.getUserCount());

UserManager.updateUser(user1.id, { name: 'Alice Smith' });
console.log('更新后的用户1:', UserManager.getUser(user1.id));

// 2. 高级模块模式 - 购物车模块
console.log('\n2. 购物车模块:');
const ShoppingCart = (function() {
  let items = [];
  let discounts = [];
  
  // 私有方法
  function findItemIndex(productId) {
    return items.findIndex(item => item.productId === productId);
  }
  
  function calculateSubtotal() {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  function applyDiscounts(subtotal) {
    return discounts.reduce((total, discount) => {
      if (discount.type === 'percentage') {
        return total * (1 - discount.value / 100);
      } else if (discount.type === 'fixed') {
        return Math.max(0, total - discount.value);
      }
      return total;
    }, subtotal);
  }
  
  function formatCurrency(amount) {
    return `¥${amount.toFixed(2)}`;
  }
  
  // 公共API
  return {
    addItem: function(product) {
      const { id, name, price, quantity = 1 } = product;
      
      if (!id || !name || typeof price !== 'number' || price < 0) {
        console.error('产品信息无效');
        return false;
      }
      
      const existingIndex = findItemIndex(id);
      
      if (existingIndex !== -1) {
        items[existingIndex].quantity += quantity;
        console.log(`${name} 数量已更新为 ${items[existingIndex].quantity}`);
      } else {
        items.push({
          productId: id,
          name: name,
          price: price,
          quantity: quantity
        });
        console.log(`${name} 已添加到购物车`);
      }
      return true;
    },
    
    removeItem: function(productId) {
      const index = findItemIndex(productId);
      if (index !== -1) {
        const removedItem = items.splice(index, 1)[0];
        console.log(`${removedItem.name} 已从购物车移除`);
        return removedItem;
      }
      console.log('商品未找到');
      return null;
    },
    
    updateQuantity: function(productId, newQuantity) {
      if (newQuantity <= 0) {
        return this.removeItem(productId);
      }
      
      const index = findItemIndex(productId);
      if (index !== -1) {
        items[index].quantity = newQuantity;
        console.log(`${items[index].name} 数量已更新为 ${newQuantity}`);
        return items[index];
      }
      console.log('商品未找到');
      return null;
    },
    
    addDiscount: function(discount) {
      const { type, value, description } = discount;
      
      if (!['percentage', 'fixed'].includes(type)) {
        console.error('折扣类型无效');
        return false;
      }
      
      discounts.push({ type, value, description });
      console.log(`折扣已添加: ${description}`);
      return true;
    },
    
    clearDiscounts: function() {
      discounts = [];
      console.log('所有折扣已清除');
    },
    
    getItems: function() {
      return [...items];
    },
    
    getItemCount: function() {
      return items.reduce((total, item) => total + item.quantity, 0);
    },
    
    getSubtotal: function() {
      return calculateSubtotal();
    },
    
    getTotal: function() {
      const subtotal = calculateSubtotal();
      return applyDiscounts(subtotal);
    },
    
    getSummary: function() {
      const subtotal = this.getSubtotal();
      const total = this.getTotal();
      const savings = subtotal - total;
      
      return {
        itemCount: this.getItemCount(),
        subtotal: formatCurrency(subtotal),
        savings: formatCurrency(savings),
        total: formatCurrency(total),
        items: this.getItems(),
        discounts: [...discounts]
      };
    },
    
    clear: function() {
      items = [];
      discounts = [];
      console.log('购物车已清空');
    }
  };
})();

// 测试购物车模块
ShoppingCart.addItem({ id: 1, name: '苹果', price: 5.99, quantity: 3 });
ShoppingCart.addItem({ id: 2, name: '香蕉', price: 3.49, quantity: 2 });
ShoppingCart.addItem({ id: 1, name: '苹果', price: 5.99, quantity: 1 }); // 增加数量

ShoppingCart.addDiscount({ type: 'percentage', value: 10, description: '新用户10%折扣' });
ShoppingCart.addDiscount({ type: 'fixed', value: 5, description: '满减5元' });

console.log('购物车摘要:', ShoppingCart.getSummary());

// 3. 可配置的模块工厂
console.log('\n3. 可配置的模块工厂:');
function createLogger(config = {}) {
  const {
    level = 'INFO',
    prefix = '[LOG]',
    timestamp = true,
    colors = false
  } = config;
  
  const levels = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
  };
  
  const currentLevel = levels[level] || 1;
  
  // 私有方法
  function formatMessage(level, message) {
    let formatted = '';
    
    if (timestamp) {
      formatted += `[${new Date().toISOString()}] `;
    }
    
    formatted += `${prefix} [${level}] ${message}`;
    
    if (colors) {
      const colorCodes = {
        DEBUG: '\x1b[36m', // 青色
        INFO: '\x1b[32m',  // 绿色
        WARN: '\x1b[33m',  // 黄色
        ERROR: '\x1b[31m'  // 红色
      };
      formatted = `${colorCodes[level]}${formatted}\x1b[0m`;
    }
    
    return formatted;
  }
  
  function shouldLog(messageLevel) {
    return levels[messageLevel] >= currentLevel;
  }
  
  // 公共API
  return {
    debug: function(message) {
      if (shouldLog('DEBUG')) {
        console.log(formatMessage('DEBUG', message));
      }
    },
    
    info: function(message) {
      if (shouldLog('INFO')) {
        console.log(formatMessage('INFO', message));
      }
    },
    
    warn: function(message) {
      if (shouldLog('WARN')) {
        console.warn(formatMessage('WARN', message));
      }
    },
    
    error: function(message) {
      if (shouldLog('ERROR')) {
        console.error(formatMessage('ERROR', message));
      }
    },
    
    setLevel: function(newLevel) {
      if (levels.hasOwnProperty(newLevel)) {
        level = newLevel;
        currentLevel = levels[newLevel];
        this.info(`日志级别已设置为 ${newLevel}`);
      } else {
        this.error(`无效的日志级别: ${newLevel}`);
      }
    }
  };
}

// 创建不同配置的日志器
const logger1 = createLogger({
  level: 'DEBUG',
  prefix: '[APP]',
  colors: true
});

const logger2 = createLogger({
  level: 'WARN',
  prefix: '[SYS]',
  timestamp: false
});

logger1.debug('这是一个调试消息');
logger1.info('应用启动成功');
logger1.warn('这是一个警告');
logger1.error('这是一个错误');

logger2.debug('这条消息不会显示'); // 级别太低
logger2.warn('系统警告');
logger2.error('系统错误');

// 4. 命名空间模式
console.log('\n4. 命名空间模式:');
const MyApp = {};

// 用户模块
MyApp.User = (function() {
  let currentUser = null;
  
  return {
    login: function(username, password) {
      // 模拟登录验证
      if (username && password) {
        currentUser = { username, loginTime: new Date() };
        console.log(`用户 ${username} 登录成功`);
        return true;
      }
      console.log('登录失败');
      return false;
    },
    
    logout: function() {
      if (currentUser) {
        console.log(`用户 ${currentUser.username} 已退出`);
        currentUser = null;
      }
    },
    
    getCurrentUser: function() {
      return currentUser;
    },
    
    isLoggedIn: function() {
      return currentUser !== null;
    }
  };
})();

// 工具模块
MyApp.Utils = (function() {
  return {
    formatDate: function(date) {
      return date.toLocaleDateString('zh-CN');
    },
    
    generateId: function() {
      return Math.random().toString(36).substr(2, 9);
    },
    
    debounce: function(func, delay) {
      let timeoutId;
      return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
      };
    }
  };
})();

// 测试命名空间模块
MyApp.User.login('alice', 'password123');
console.log('当前用户:', MyApp.User.getCurrentUser());
console.log('今天日期:', MyApp.Utils.formatDate(new Date()));
console.log('随机ID:', MyApp.Utils.generateId());

console.log('\n=== 模块模式练习完成 ===');