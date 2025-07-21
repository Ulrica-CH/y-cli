
import registerCommand from '../registerCommand'
import createCommandPluginCreate from './create'
import createCommandDeployInfo from './deploy'
import createCommandPluginInfo from './info'
import createCommandPluginServe from './serve'

/** 注册 info 命令 */
registerCommand(createCommandPluginInfo)
registerCommand(createCommandDeployInfo)
registerCommand(createCommandPluginCreate)
registerCommand(createCommandPluginServe)

