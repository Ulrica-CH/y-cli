import type { Command } from 'commander'
import pc from 'picocolors'
import prompts from 'prompts'

import { logger } from '../utils/logger'

type CreateCommandOptions = {
  framework?: string
  template?: string
  remote?: string
}
export default function createCommandPluginCreate(program: Command) {
  return program
    .createCommand('create')
    .arguments('<projectName>')
    .option('-f, --framework <framework>', 'framework')
    .option('-t, --template <template>', 'template')
    .option('-r, --remote <remote>', 'remote')
    .description('create a new project')
    .action(async (projectName: string, options: CreateCommandOptions) => {
      console.log(projectName, options)
      logger.log(pc.green(`Project name: ${projectName} ${options}`))

      let { framework, template } = options

      if (options.remote) {
        /** 执行远程拉去代码操作 */
        return
      }

      if (!framework) {
        const res = await prompts({
          type: 'select',
          name: 'framework',
          message: 'Select framework',
          choices: [
            { title: 'Vue', value: 'vue' },
            { title: 'React', value: 'react' },
            { title: 'Svelte', value: 'svelte' }
          ]
        })
        framework = res.framework
      }

      if (!template) {
        const res = await prompts({
          type: 'select',
          name: 'template',
          message: 'Select template',
          choices: [
            { title: 'vue-ts', value: 'vue-ts' },
            { title: 'react-ts', value: 'react-ts' },
            { title: 'svelte-ts', value: 'svelte-ts' }
          ]
        })
        template = res.template
      }

      console.log(framework, template)
    })
}
