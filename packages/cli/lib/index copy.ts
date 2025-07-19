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
