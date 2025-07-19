import { program } from 'commander'

export const commandPluginInit = program
  .createCommand('init')
  .description('init a new project')
  .action(() => {
    console.log('init')
  })
