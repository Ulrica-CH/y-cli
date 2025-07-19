import type { Command } from 'commander'

export default function createCommandDeployInfo(program: Command) {
  return program
    .createCommand('deploy')
    .description('show deploy')
    .action(() => {
      console.log('deploy')
    })
}
