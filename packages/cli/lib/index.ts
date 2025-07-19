import { program } from 'commander'

import './commands'

export function runClI() {
  program
    .option('-v, --version', 'output the version number')
    .option('-h', '--help', 'output usage information')

  program.parse()
}
