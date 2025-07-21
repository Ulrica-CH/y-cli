## why

- 不会每个项目都去从零到一去配置去约束去自动化流程,而是应该把内容标准化封装到命令行工具中,只需触发对应命令来完成相关操作
  - 无规范化,重复规范化,多个项目需要 cv 并调试适配
  - 目录结构,针对不同结构从 0 到 1 需要手动配置,比如 packages workspace 需要手动子各个子包 init
  - 创建不同项目需要记住不同命令 Vue3 React Vite webpack??

## how

- 项目初始化
- 依赖管理安装
- 开发流程管理 启动开发,测试,构建
- 质量控制,检测修复提交
- 自动化构建部署

## 搭建步骤

- init 配置 workspace.yaml 搭建目录
  - packages/cli
  - package/core
- init typescript
  - module - 模块输出格式
    - 指定 TypeScript 编译后生成的 JavaScript 代码使用哪种模块系统
    - 默认 cjs 可选 ESNest umd
  - moduleResolution - 模块解析策略
    - 指定 TypeScript 如何查找和解析模块导入
    - node(传统)
    - bundler(现代化构建) node16/nodenext
      - 支持 package.json exports,支持更多文件扩展名
  - allowImportingTsExtensions: true
    - 允许在导入语句中包含 TypeScript 文件扩展名
  - emitDeclarationOnly: true
    - 只生成 TypeScript 声明文件（.d.ts），不生成 JavaScript 文件
    - js 文件由构建器生成
    - 或者另一个配置 noEmit:true
- 配置入口 打包构建 测试正常流程
  - 配置 bin 字段用于定义二进制可执行文件入口
  - 可以对应多个 bin 文件

```javascript
"bin": {
    "y": "./bin/y"
  },
```

- 调试
  - npm link(全局软连接)
  - pnpm workspace
    - 在某个子包安装 cli workspace:'\*'
    - 配置脚本执行命令

## 打包构建

- tsup
  - 配合@types/node
  - 记住 type：module
  - 因为 tsup 要用 import ,cjs 的 require 是动态导入,不支持 treeshaking 等
  - --watch 支持热更新

## 规范化配置

- eslint prettier
- cspell
- husky commitizen
- husky 初始化可能回缺失文件导致不生效

## 读取命令行参数

- 初始做法

```typescript
import { create, deploy } from './commands'
export default function runClI() {
  const command = process.argv[2]
  switch (command) {
    case 'create':
      create()
      break
    case 'deploy':
      deploy()
      break
    default:
      break
  }
}
```

- 存在缺点
  - 扩展性差
    - 如果新增一个命令,需要再来一个 case,每次添加新命令都要修改核心文件
  - 代码耦合度太高
    - 所有命令逻辑都在一个文件中
  - 维护困难
    - 单个文件承担了太多责任
    - 修改一个命令可能意外的影响到了其他命令
- 插件化机制
  - 一种设计思想,及软件通过加载外部插件(功能模块)来扩展自身功能,而无需修改自身的核心代码逻辑
  - 命令职责单一
  - 高内聚,松耦合
  - 便于扩展

```typescript
import { create, deploy } from './commands'
const commands = new Map<string, () => void>()
function registerCommand(command: string, action: () => void) {
  commands.set(command, action)
}
registerCommand('create', create)
registerCommand('deploy', deploy)
export default function runClI() {
  const command = process.argv[2]
  const action = commands.get(command)
  if (action) {
    action()
  } else {
    throw new Error(`command ${command} not found`)
  }
}
```

## 记录下 cjs 和 esm

- 为啥有的文件在不设置 type：module 也可以使用 es 语法
  - 比如 tsup.config.ts
  - 其实这个文件是在 tsup 环境里执行的,tsup 支持 es 语法,所以可以 import
  - 而 lib/index.ts 作为 tsup 打包入口文件,由 tsup 来解析,自然也可以使用 import
  - 但是 bin下的二进制就不行了,因为这是由 node 来执行的自然就不支持 import 了
  - 关于 tsconfig.json里是用来给 tsc 用的,不会影响 tsup.config.ts

## commander

- 命令行解析工具
- 需要require 方式
- 关于插件注册的两种写法

```typescript
export default function registerCommand(command: Command) {
  program.addCommand(command)
}
```

```typescript
/**
 * 扩展性更高,每个插件不再依赖 program
 * 更加灵活,上面的写法无法控制插件,无法添加自定义逻辑
 */
type Fn = (program: Command) => Command
export default function registerCommand(fn: Fn) {
  program.addCommand(fn(program))
}
```

- 一个比较全的例子

```typescript
export default function createCommandPluginCreate(program: Command) {
  return program
    .createCommand('create')
    .arguments('<projectName>')
    .option('-f, --framework <framework>', 'framework')
    .option('-t, --template <template>', 'template')
    .option('-r, --remote <remote>', 'remote')
    .description('create a new project')
    .action(async (projectName: string, options: CreateCommandOptions) => {
      console.log(projectName, options)
      logger.log(pc.green(`Project name: ${projectName} ${options}`))
    })
}
```

## picocolors

- 终端颜色库

## consola

- 提供比 console 更好的日志输出格式和功能

## prompts

- 交互式命令行输入库,用于获取用户输入,支持多种类型

## 加载本地模板

- 本地定义好 template,根据 template 选项匹配目录,copy 到命令行工作目录,并自定义修改 pkg 文件如 name 和 version
- ora 命令行 loading 提示库
- fs-extra fs 文件操作增强库

## 加载远程模板

- giget 从远程 github 下载模板
- copy 到命令行工作目录,并自定义修改 pkg 文件如 name 和 version
- 删除下载下来用于中专的文件

## serve 子进程

- child_process Node 进程库
- 判断有无 pnpm 环境

## Turbo
