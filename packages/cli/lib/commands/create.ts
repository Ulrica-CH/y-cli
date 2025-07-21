import type { Command } from 'commander'
import pc from 'picocolors'
import prompts from 'prompts'

import loadTemplate from '../utils/loadTemplate'
import { logger } from '../utils/logger'

type CreateCommandOptions = {
  framework?: string
  template?: string
  remote?: boolean
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

      let { framework = 'vue', template = 'vue-ts' } = options

  

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

      if (options.remote) {
        console.log('remote',{
          projectName,
          template,
          remote: options.remote
        })
        /** 执行远程拉去代码操作 */
        loadTemplate({
          projectName,
          template,
          remote: options.remote
        })
        return
      }
      /** 加载模板 */
      loadTemplate({
        projectName,
        template,
        remote: options.remote
      })
    })
}
