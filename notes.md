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
