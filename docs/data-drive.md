# data drive

目标是**弄清楚模板和数据如何渲染成最终的 DOM**

Vue.js 一个核心思想是数据驱动

所谓数据驱动，是指视图是由数据驱动生成的

我们对视图的修改，不会直接操作 DOM，而是通过修改数据

简化了代码量

DOM 变成了数据的映射

采用简洁的模板语法来声明式的将数据渲染为 DOM

主线代码

分支逻辑

数据更新驱动视图变化

## new Vue

new 关键字在 Javascript 语言中代表实例化是一个对象

Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等

主线逻辑一目了然

挂载的目标就是把模板渲染成最终的 DOM

istanbul ignore if

## 调试

下面有调用堆栈

scope 为当前作用域下的变量

debugger 时在console 中执行

console.log(vm)

* 1. 从一个断点跳到下一个断点
* 2. 步进
* 3. 单步执行，进入函数

/Users/chanweiyan/tmp/vue3/step4/vue2.x-demo/node_modules/vue/package.json
"main": "dist/vue.runtime.common.js",
"module": "dist/vue.runtime.esm.js",

看 package.json 文件中的 module 和 main 字段，正常情况下会优先找 module 下的文件，然后再找 main，当然这个顺序也可以通过 webpack 配置修改
