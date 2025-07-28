#!/usr/bin/env node

// Day 01: 运行所有JavaScript基础示例

const fs = require('fs');
const path = require('path');

console.log('🚀 开始运行Day 01的所有JavaScript示例...\n');

// 要运行的文件列表
const examples = [
  'variable-scope.js',
  'closure-counter.js', 
  'module-pattern.js'
];

function runExample(filename) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📁 运行: ${filename}`);
  console.log(`${'='.repeat(60)}\n`);
  
  try {
    const filePath = path.join(__dirname, filename);
    if (fs.existsSync(filePath)) {
      require(filePath);
    } else {
      console.log(`❌ 文件不存在: ${filename}`);
      console.log(`请先创建文件: ${filename}`);
    }
  } catch (error) {
    console.error(`❌ 运行 ${filename} 时出错:`, error.message);
  }
  
  console.log(`\n✅ ${filename} 运行完成\n`);
}

// 运行所有示例
examples.forEach(runExample);

console.log(`\n🎉 所有示例运行完成！`);
console.log(`\n📋 今日学习清单检查:`);
console.log(`- [ ] 理解 var、let、const 的区别`);
console.log(`- [ ] 掌握不同类型的作用域`);
console.log(`- [ ] 理解闭包的概念和应用`);
console.log(`- [ ] 完成三个代码挑战`);
console.log(`- [ ] 能够解释代码的执行结果`);

console.log(`\n💡 运行单个示例:`);
console.log(`node variable-scope.js`);
console.log(`node closure-counter.js`);
console.log(`node module-pattern.js`);

console.log(`\n🔗 相关面试题:`);
console.log(`查看 ../../docs/javascript-interview-questions.md 了解更多`);