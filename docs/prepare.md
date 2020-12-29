# prepare

## flow

Vue.js 的源码利用了 Flow 做了静态类型检查，所以了解 Flow 有助于我们阅读源码。

所谓类型检查，就是在编译期尽早发现（由类型错误引起的）bug，又不影响代码运行（不需要运行时动态检查类型），使编写 JavaScript 具有和编写 Java 等强类型语言相近的体验。

ESLint 保证代码风格

类型推断：通过变量的使用上下文来推断出变量类型，然后根据这些推断来检查类型。

类型注释：事先注释好我们期待的类型，Flow 会基于这些注释来判断。

数据结构的定义

```txt
flow
├── compiler.js        # 编译相关
├── component.js       # 组件数据结构
├── global-api.js      # Global API 结构
├── modules.js         # 第三方库定义
├── options.js         # 选项相关
├── ssr.js             # 服务端渲染相关
├── vnode.js           # 虚拟 node 相关
```

/*@flow*/
表示文件需要 flow 做类型检查

静态类型检查的方式非常有利于大型项目源码的开发和维护

类似 Flow 的工具还有如 TypeScript

## 源码目录设计

```txt
src
├── compiler        # 编译相关
├── core            # 核心代码
├── platforms       # 不同平台的支持
├── server          # 服务端渲染
├── sfc             # .vue 文件解析
├── shared          # 共享代码
```

编译的工作可以在构建时做（借助 webpack、vue-loader 等辅助插件）--- 离线编译

也可以在运行时做，使用包含构建功能的 Vue.js

Vue.js 的核心代码，包括内置组件、全局 API 封装，Vue 实例化、观察者、虚拟 DOM、工具函数等等。

重点分析 web 入口打包后的 Vue.js

服务端渲染主要的工作是把组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将静态标记"混合"为客户端上完全交互的应用程序

## 源码构建

通常一个基于 NPM 托管的项目都会有一个 package.json 文件，它是对项目的描述文件

我们通常会配置 script 字段作为 NPM 的执行脚本

环境参数

process.argv[2]

```json
{
  "script": {
    "build": "node scripts/build.js",
    "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
    "build:weex": "npm run build -- weex"
  }
}
```

对于单个配置，它是遵循 Rollup 的构建规则的

借助如 webpack 的 vue-loader 工具把 .vue 文件编译成 JavaScript

Vue.js 的构建打包过程

rollup 更轻量

js 库构建

一系列任务

配置转换

映射

通过 npm 脚本，找到 vue 源码的编译打包的入口文件

## 从入口开始

本质上就是一个用 Function 实现的 Class，然后它的原型 prototype 以及它本身都扩展了一系列的方法和属性

那么 Vue 能做什么，它是怎么做的

import Vue from 'vue'

初始化过程

原型方法

静态方法
