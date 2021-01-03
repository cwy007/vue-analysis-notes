# component update

重新渲染

mountComponent
updateComponent

render watcher

nextTick()

vm._update(vm._render(), hydrating)

prevVnode

vm.__patch__()

渲染 vnode，根vnode
组件 vnode

vnode diff

## props

Props 作为组件的核心特性之一，也是我们平时开发 Vue 项目中接触最多的特性之一，它可以让组件的功能变得丰富，也是父子组件通讯的一个渠道

## 规范化

由于对象形式的 props 可以指定每个 prop 的类型和定义其它的一些属性，推荐用对象形式定义 props。

## 初始化

initProps 主要做 3 件事情：校验、响应式和代理。

validateProp 主要就做 3 件事情：处理 Boolean 类型的数据，处理默认数据，prop 断言，并最终返回 prop 的值。

其实对于非根实例的子组件而言，prop 的代理发生在 Vue.extend 阶段，在 src/core/global-api/extend.js 中：

组件更新过程的 prepatch 钩子函数

其实子组件的重新渲染有 2 种情况，一个是 prop 值被修改，另一个是对象类型的 prop 内部属性的变化。

模块

其实和 initProps 的逻辑一样，不需要对引用类型 props 递归做响应式处理，所以也需要 toggleObserving(false)。

优先级

对象引用

