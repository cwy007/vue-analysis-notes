# extend

Vue 还提供了很多好用的 feature 如 event、v-model、slot、keep-alive、transition

## event

那么至此我们对 Vue 的事件实现有了进一步的了解，Vue 支持 2 种事件类型，原生 DOM 事件和自定义事件，它们主要的区别在于添加和删除事件的方式不一样，并且自定义事件的派发是往当前实例上派发，但是可以利用在父组件环境定义回调函数来实现父子组件的通讯。另外要注意一点，只有组件节点才可以添加自定义事件，并且添加原生 DOM 事件需要使用 native 修饰符；而普通元素使用 .native 修饰符是没有作用的，也只能添加原生 DOM 事件。

编译阶段对代码的生成

代码对事件进行描述

编译

运行时

vm._events 事件中心

## v-model

那么至此，v-model 的实现就分析完了，我们了解到它是 Vue 双向绑定的真正实现，但本质上就是一种语法糖，它即可以支持原生表单元素，也可以支持自定义组件。在组件的实现中，我们是可以配置子组件接收的 prop 名称，以及派发的事件名称。

  props: ['msg'],
  model: {
    prop: 'msg',
    event: 'change'
  },

## slot

使用

实现原理

编译阶段的实现

运行时阶段的实现

## keep-alive

了组件的缓存优化而使用 `<keep-alive>` 组件

它有一个属性 abstract 为 true，是一个抽象组件，Vue 的文档没有提这个概念，实际上它在组件实例建立父子关系的时候会被忽略

`<keep-alive>` 只处理第一个子元素，所以一般和它搭配使用的有 component 动态组件或者是 router-view，这点要牢记。

首次渲染和缓存渲染

## transition

所以真正执行动画的是我们写的 CSS 或者是 JavaScript 钩子函数，而 Vue 的 `<transition>` 只是帮我们很好地管理了这些 CSS 的添加/删除，以及钩子函数的执行时机。

appear 首次渲染时也有过渡效果

所以真正执行动画的是我们写的 CSS 或者是 JavaScript 钩子函数，而 Vue 的 `<transition>` 只是帮我们很好地管理了这些 CSS 的添加/删除，以及钩子函数的执行时机。

## transition-group
