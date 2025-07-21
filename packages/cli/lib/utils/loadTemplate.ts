import { copy, readJson, remove, writeJson } from 'fs-extra'
import { downloadTemplate } from 'giget'
import path from 'node:path'
import ora from 'ora'
import pc from 'picocolors'
type loadLocalTemplateOptions = {
  projectName: string
  template: string
}

type loadRemoteTemplateOptions = {
  projectName: string
}
type LoadTemplateOptions = {
  remote?: boolean
} & loadLocalTemplateOptions &
  loadRemoteTemplateOptions

const generatePackageJson = async (options: { projectName: string; targetPath: string }) => {
  const packageJsonPath = path.join(options.targetPath, 'package.json')
  const packageJson = await readJson(packageJsonPath)
  await writeJson(
    packageJsonPath,
    {
      ...packageJson,
      name: options.projectName,
      version: '1.0.0'
    },
    {
      spaces: 2
    }
  )
}
async function loadLocalTemplate(options: loadLocalTemplateOptions) {
  console.log('loadLocalTemplate', options)
  /** 1.
   * 定义本地模板
   * cli/templates
   *  */
  const spinner = ora({
    text: '模板复制中...',
    spinner: 'bouncingBall'
  }).start()
  /** 2.
   * 根据 template 拿到对应的模板
   * fs-extra(增强文件操作) ora(loading效果)
   * */
  const templatePath = path.join(__dirname, `../templates/template-${options.template}`)
  const targetPath = path.join(process.cwd(), options.projectName)

  /** 3.复制模板到当前工作目录 */
  await copy(templatePath, targetPath)
  spinner.succeed('模板复制成功')
  /** 4.初始化操作 */
  /** 4.1 更改 package.json 内容 */
  generatePackageJson({
    projectName: options.projectName,
    targetPath
  })
}
async function loadRemoteTemplate(options: loadRemoteTemplateOptions) {
  const spinner = ora({
    text: 'Download template loading...',
    color: 'green'
  }).start()
  /** 1.找到远程模板 */
  const remotePath =
    //   'https://codeload.github.com/design-sparx/antd-multipurpose-dashboard/tar.gz/refs/heads/main'
    'github:vitejs/vite#main:packages/create-vite/template-react-ts'

  try {
    const { dir } = await downloadTemplate(remotePath, {
      dir: `${process.cwd()}/.temp`
    })
    await copy(dir, `${process.cwd()}/${options.projectName}`)

    await generatePackageJson({
      projectName: options.projectName,
      targetPath: `${process.cwd()}/${options.projectName}`
    })

    spinner.spinner = 'moon'
    spinner.text = pc.green(`Project named ${pc.bold(options.projectName)} created successfully!`)

    spinner.succeed()
    await remove(dir)
  } catch (error) {
    spinner.fail('下载模板失败')
    console.log(error)
    return
  }
}

export default async function loadTemplate(options: LoadTemplateOptions) {
  console.log('loadTemplate', options)
  if (options.remote) {
    await loadRemoteTemplate({
      projectName: options.projectName
    })
  } else {
    await loadLocalTemplate({
      projectName: options.projectName,
      template: options.template
    })
  }
}
