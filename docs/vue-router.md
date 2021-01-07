# vue router

根据不同的路径映射到不同的视图

hash、history、abstract 3 种路由方式

`<router-link>` 和 `<router-view>` 2 种组件

Vue 从它的设计上就是一个渐进式 JavaScript 框架，它本身的核心是解决`视图渲染`的问题，其它的能力就通过插件的方式来解决

插件注册原理

私有属性定义

初始化工作

## VueRouter

属性方法

初始化逻辑

## matcher

Location、Route、RouteRecord 等概念

Route 的切换，组件的渲染

transitionTo

输入是什么，输出是什么

## transition to

重定向、别名、滚动行为

路由始终会维护当前的线路，路由切换的时候会把当前线路切换到目标线路，切换过程中会执行一系列的导航守卫钩子函数，会更改 url，同样也会渲染对应的组件，切换完毕后会把目标线路更新替换当前线路，这样就会作为下一次的路径切换的依据。
