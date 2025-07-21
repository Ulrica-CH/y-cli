import type { Command } from 'commander'

export default function createCommandPluginServe(program: Command) {
  return program
    .createCommand('serve')
    .description('show serve')
    .action(() => {
      console.log('serve')
    })
}
