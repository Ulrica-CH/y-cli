import { program } from 'commander'

import { commandPluginDeploy, commandPluginInit } from './commands'
import registerCommand from './registerCommand'

export function runClI() {
  program
    .option('-v, --version', 'output the version number')
    .option('-h', '--help', 'output usage information')
  registerCommand(commandPluginInit)
  registerCommand(commandPluginDeploy)
  program.parse()
}
