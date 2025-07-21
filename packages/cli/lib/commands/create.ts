import type { Command } from 'commander'
import pc from 'picocolors'
import prompts from 'prompts'

import { logger } from '.././utils/logger'
import { frameworkChoices, templateChoices } from '../constants'
import { Framework, Template } from '../types'
import loadTemplate from '../utils/loadTemplate'
import { validateGivenFramework, validateGivenTemplate } from '../utils/validate'
type CreateCommandOptions = {
  framework: Framework
  template: Template
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
      handleCreate(projectName, options)
    })
}
  /**
   * Create a new project based on the given framework and template
   * @param projectName name of the project
   * @param options options for creating the project
   * @returns void
   */
async function handleCreate(projectName: string, options: CreateCommandOptions) {
  const framework = await resolveFramework(options.framework)
  const template = await resolveTemplate(framework, options.template)
  if (!framework || !template) {
    logger.error(pc.red('您的 framework 或者 template 选择错误,请重试...'))
    process.exit(1)
  }
  const config = {
    projectName,
    template,
    remote: options.remote
  }
  if (options.remote) {
    logger.info(pc.blue('使用远程模板创建项目...'))
  }
  loadTemplate(config)
}

  /**
   *  framework
   * @param framework -  framework,  validateGivenFramework
   * @returns  framework
   */
async function resolveFramework(framework: Framework) {
  if (framework && validateGivenFramework(framework)) return framework

  if (framework) logger.error(pc.red('您选择的框架不存在,请选择以下框架'))

  const res = await prompts({
    type: 'select',
    name: 'framework',
    message: 'Select framework',
    choices: frameworkChoices
  })

  return res.framework
}

  /**
   *  template
   * @param framework -  framework
   * @param template -  template,  validateGivenTemplate
   * @returns  template
   */
async function resolveTemplate(framework: Framework, template: Template) {
  if (template && validateGivenTemplate(framework, template)) return template

  if (template) logger.error(pc.red('您选择的模板不存在,请选择以下模板'))
  const choices = templateChoices[framework]
  const res = await prompts({
    type: 'select',
    name: 'template',
    message: 'Select template',
    choices
  })

  return res.template
}
