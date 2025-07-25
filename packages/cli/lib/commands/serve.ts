import type { Command } from 'commander'
import { spawn } from 'node:child_process'

import { hasPnpm } from '../utils/env'
export default function createCommandPluginServe(program: Command) {
  return program
    .createCommand('serve')
    .description('show serve')
    .action(() => {
      const _hasPnpm = hasPnpm()
      const command = _hasPnpm ? 'pnpm' : 'npm'
      const params = _hasPnpm ? ['dev'] : ['run', 'dev']
      const child = spawn(command, params, {
        stdio: 'inherit'
      })
      child.on('close', (code) => {
        process.exit(code)
      })
    })
}
