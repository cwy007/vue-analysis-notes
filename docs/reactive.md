# reactive

Vue 怎么实现数据渲染和组件化

初始化的过程，把原始的数据最终映射到 DOM 中，但并没有涉及到数据变化到 DOM 变化的部分

* 把数据渲染到页面
* 处理用户交互

```js
<div id="app" @click="changeMsg">
  {{ message }}
</div>

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    changeMsg() {
      this.message = 'Hello World!'
    }
  }
})
```

## reactive object

`Object.defineProperty(obj, prop, descriptor)`

一旦对象拥有了 getter 和 setter，我们可以简单地把这个对象称为响应式对象

[描述符默认值汇总](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
拥有布尔值的键 configurable、enumerable 和 writable 的默认值都是 false。
属性值和函数的键 value、get 和 set 字段的默认值为 undefined。

Observer 是一个类，它的作用是给对象的属性添加 getter 和 setter，用于依赖收集和派发更新：

defineReactive 的功能就是定义一个响应式对象，给对象动态添加 getter 和 setter，它的定义在 src/core/observer/index.js 中：

getter 做的事情是依赖收集，setter 做的事情是派发更新

## getters

Vue 会把普通对象变成响应式对象，响应式对象 getter 相关的逻辑就是做依赖收集

`import type Watcher from './watcher'`

[确切说导入类型，flowtype里面有这个语法。vue使用flowtype进行静态语法检测的](https://segmentfault.com/q/1010000015563961)

有一个静态属性 target，这是一个全局唯一 Watcher，这是一个非常巧妙的设计，因为在同一时间只能有一个全局的 Watcher 被计算，另外它的自身属性 subs 也是 Watcher 的数组。

Dep 实际上就是对 Watcher 的一种管理，Dep 脱离 Watcher 单独存在是没有意义的

get()
watcher 计算

dep 和 watcher 之间是多对多的关系

* 一条依赖 dep 可以被多个 watcher 订阅
* 一个 watcher 可以订阅多条依赖 dep

* 依赖收集就是订阅数据变化的 watcher 的收集
* 依赖收集的目的是为了当这些响应式数据发生变化，触发它们的 setter 的时候，能知道应该通知哪些订阅者去做相应的逻辑处理

## setters

收集的目的就是为了当我们修改数据的时候，可以对相关的依赖派发更新

引入了一个队列的概念

nextTick(flushSchedulerQueue)

控制流程状态的一些变量

注意回调函数执行的时候会把第一个和第二个参数传入新值 value 和旧值 oldValue，这就是当我们添加自定义 watcher 的时候能在回调函数的参数中拿到新旧值的原因。
`cb.call(this.vm, value, oldValue)`

Vue 数据修改派发更新的过程

## nextTick

JS 执行是单线程的，它是基于事件循环的。事件循环大致分为以下几个步骤：

（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。

在浏览器环境中，常见的 macro task 有 setTimeout、MessageChannel、postMessage、setImmediate；常见的 micro task 有 MutationObsever 和 Promise.then。

数据的变化到dom的更新是异步的

## questions

Vue.set

那些数据变化不能被检测到

splice
push
unshift

不要通过下标直接给数组中添加新的成员

## computed and watch

computed watcher

setter 通常是计算属性是一个对象，并且拥有 set 方法的时候才有，否则是一个空函数。在平时的开发场景中，计算属性有 setter 的情况比较少

```js
var vm = new Vue({
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

[watcher 类型](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/computed-watcher.html#watcher-options)
this.deep = !!options.deep
this.user = !!options.user
this.lazy = !!options.lazy
this.sync = !!options.sync
this.before = options.before

这样就可以收集到依赖，也就是订阅它们变化的 watcher

计算属性本质上是 computed watcher，而侦听属性本质上是 user watcher。就应用场景而言，计算属性适合用在模板渲染中，某个值是依赖了其它的响应式对象甚至是计算属性计算而来；而侦听属性适用于观测某个值的变化去完成一段复杂的业务逻辑。

数据规范化

immediate

deep watcher

user watcher
默认为异步

sync 配置成同步

触发回调执行，触发重新渲染
