import { type Command, program } from 'commander'

// export default function registerCommand(command: Command) {
//   program.addCommand(command)
// }


/**
 * 扩展性更高,每个插件不再依赖 program
 * 更加灵活,上面的写法无法控制插件,无法添加自定义逻辑
 */
type Fn = (program: Command) => Command
export default function registerCommand(fn: Fn) {
  program.addCommand(fn(program))
}
