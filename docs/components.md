# components

## 组件化

如何编写组件以及组件拥有的属性和特性

接下来我们会用 Vue-cli 初始化的代码为例，来分析一下 Vue 组件初始化的一个过程。

```js
import Vue from 'vue'
import App from './App.vue'

var app = new Vue({
  el: '#app',
  // 这里的 h 是 createElement 方法
  render: h => h(App) // TODO 分析这段代码
})
```

## createComponent

createElement
_createElement

一个普通的 VNode 节点
一个组件 VNode

Ctor

`Ctor: Class<Component> | Function | Object | void,`

分析源码比较推荐的是只分析核心流程

分支流程可以之后针对性的看

* 构造子类构造函数
* 安装组件钩子函数
* 实例化 vnode

在这里 baseCtor 实际上就是 Vue

Vue.extend 的作用就是构造一个 Vue 的子类

合并策略

vnode 执行 patch

组件的 vnode 是没有 children 的

## patch

patch 的过程会调用 createElm 创建元素节点

hydrating 为 true 一般是服务端渲染的情况，我们只考虑客户端渲染

因为实际上 JavaScript 是一个单线程，Vue 整个初始化是一个深度遍历的过程，在实例化子组件的过程中，它需要知道当前上下文的 Vue 实例是什么，并把它作为子组件的父 Vue 实例。

一个组件的 VNode 是如何**创建**、**初始化**、**渲染**的过程也就介绍完毕了

patch 的整体流程

activeInstance
vm.$vnode
vm._vnode

嵌套组件的插入顺序

源码 + 单步调试

## 合并配置

编写一个组件实际上是编写一个 JavaScript 对象，对象的描述就是各种配置，之前我们提到在 _init 的最初阶段执行的就是 merge options 的逻辑

```js
import Vue from 'vue'

let childComp = {
  template: '<div>{{msg}}</div>',
  created() {
    console.log('child created')
  },
  mounted() {
    console.log('child mounted')
  },
  data() {
    return {
      msg: 'Hello Vue'
    }
  }
}

Vue.mixin({
  created() {
    console.log('parent created')
  }
})

let app = new Vue({
  el: '#app',
  render: h => h(childComp)
})
```
