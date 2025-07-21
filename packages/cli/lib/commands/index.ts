
import registerCommand from '../registerCommand'
import createCommandPluginBuild from './build'
import createCommandPluginCreate from './create'
import createCommandDeployInfo from './deploy'
import createCommandPluginInfo from './info'
import createCommandPluginServe from './serve'

/** 注册命令 */
registerCommand(createCommandPluginInfo)
registerCommand(createCommandDeployInfo)
registerCommand(createCommandPluginCreate)
registerCommand(createCommandPluginServe)
registerCommand(createCommandPluginBuild)

