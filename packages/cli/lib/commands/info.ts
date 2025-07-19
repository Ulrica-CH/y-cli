import type { Command } from 'commander'
import pc from 'picocolors'

import pkg from '../../package.json'
import { logger } from '../utils/logger'
export default function createCommandPluginInfo(program: Command) {
  return program
    .createCommand('info')
    .description('show info')
    .action(() => {
      logger.log(pc.bgGreen(`Project y-cli version${pkg.version}`))
      logger.log(pc.blue(`Author: ${pkg.author || 'Xy'}`))
      logger.log(pc.underline(`Description: ${pkg.description || 'Xy'}`))
    })
}
