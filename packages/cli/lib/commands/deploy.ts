import { program } from 'commander'

export const commandPluginDeploy = program
  .createCommand('deploy')
  .description('deploy a new project')
  .action(() => {
    console.log('deploy')
  })
