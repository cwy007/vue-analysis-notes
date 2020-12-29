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

vue-cli 4.x 添加 vue.config.js 配置文件，添加 runtimeCompiler: true 选项，使用 runtime + compiler 待编译器版本的 vue.js

[是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。](https://cli.vuejs.org/zh/config/#runtimecompiler)

在这个文件中添加 debugger
/Users/chanweiyan/tmp/vue3/step4/vue-analysis-notes/example/node_modules/vue/dist/vue.esm.js

data 初始化

this.message
this._data.message
proxy

new Vue()

this._init()
merge options
响应式处理 observe data
vm.$mount
分支逻辑
数据渲染

## Vue 实例挂载的实现

$mount 这个方法的实现是和平台、构建方式都相关的

抛开 webpack 的 vue-loader

在纯前端浏览器环境分析 Vue 的工作原理，有助于我们对原理理解的深入

The read-only Node.nodeType property is an integer that identifies what the node is. It distinguishes different kind of nodes from each other, such as elements, text and comments.

首先缓存了原型上的 $mount 方法，再重新定义该方法

在 Vue 2.0 版本中，所有 Vue 的组件的渲染最终都需要 render 方法

这个过程是 Vue 的一个“在线编译”的过程，它是调用 compileToFunctions 方法实现的

$mount 方法支持传入 2 个参数，第一个是 el，它表示挂载的元素，可以是字符串，也可以是 DOM 对象，如果是字符串在浏览器环境下会调用 query 方法转换成 DOM 对象的。第二个参数是和服务端渲染相关，在浏览器环境下我们不需要传第二个参数。

调用 vm._render 方法先生成虚拟 Node，最终调用 vm._update 更新 DOM

这里注意 vm.$vnode 表示 Vue 实例的父虚拟 Node，所以它为 Null 则表示当前是**根 Vue 的实例**。

mountComponent 方法的逻辑也是非常清晰的，它会完成整个渲染工作，接下来我们要重点分析其中的细节，也就是最核心的 2 个方法：vm._render 和 vm._update。

mount 会覆盖

render -> mount

mountComponent

runtime only render function
runtime + compiler template
template or render

callHook

mark 性能埋点

noop 空函数
渲染 watcher，观察者模式 observer
new Warcher()
标志位
isRenderWatcher

首次渲染

数据更新

## vm._render

Vue 的 _render 方法是实例的一个私有方法，它用来把实例渲染成一个虚拟 Node

vm.$options.render

Component
VNode

vm._render 最终是通过执行 createElement 方法并返回的是 vnode，它是一个虚拟 Node。Vue 2.0 相比 Vue 1.0 最大的升级就是利用了 Virtual DOM

call 的第一个参数表示当前上下文

VNode data

render 替换

开发阶段有警告

生产环境没有警告

## Virtual DOM

它产生的前提是浏览器中的 DOM 是很“昂贵"的

```js
// div 有 297 个属性
var div = document.createElement('div')
var arr = []
for (var key in div) { arr.push(key) }
```

浏览器的标准就把 DOM 设计的非常复杂

Virtual DOM 就是用一个原生的 JS 对象去描述一个 DOM 节点，所以它比创建一个 DOM 的代价要小很多

由于 VNode 只是用来映射到真实 DOM 的渲染，不需要包含操作 DOM 的方法，因此它是非常轻量和简单的。

VNode 是对真实 DOM 的一种抽象描述

Virtual DOM 除了它的数据结构的定义，映射到真实的 DOM 实际上要经历 VNode 的 create、diff、patch 等过程

## createElement

Vue.js 利用 createElement 方法创建 VNode

createElement 方法实际上是对 _createElement 方法的封装

normalizationType 表示子节点规范的类型

simpleNormalizeChildren 方法调用场景是 render 函数是编译生成的

如果存在两个连续的 text 节点，会把它们合并成一个 text 节点。

经过对 children 的规范化，children 变成了一个类型为 VNode 的 Array

参数重载

`__ob__` 响应式

基础类型

对 children 进行 normalize

## vm._update

Vue 的 _update 是实例的一个私有方法，它被调用的时机有 2 个，一个是首次渲染，一个是数据更新的时候

作用是把 VNode 渲染成真实的 DOM

在服务端渲染中，没有真实的浏览器 DOM 环境

差异化部分只需要通过参数来区别，这里用到了一个函数柯里化的技巧，通过 createPatchFunction 把差异化参数提前固化，这样不用每次调用 patch 的时候都传递 nodeOps 和 modules 了，这种编程技巧也非常值得学习。

createChildren 的逻辑很简单，实际上是遍历子虚拟节点，递归调用 createElm，这是一种常用的**深度优先**的遍历算法

因为是递归调用，子元素会优先调用 insert，所以整个 vnode 树节点的插入顺序是先子后父

![new-vue](https://tva1.sinaimg.cn/large/0081Kckwly1gm5ac85sz6j30kc09rdg2.jpg)

从主线上把模板和数据如何渲染成最终的 DOM 的过程分析完毕了

`new Vue() -> init -> $mount -> compile -> render -> vnode -> patch -> DOM`

从初始化 Vue 到最终渲染的整个过程

细节部分：结合具体的案例，阅读相关的源码，开始时，先对主线有个认识

将平台的参数化进行磨平

闭包

参数克里化

oldVnode 真实的dom
vnode 虚拟dom

单步

步长
