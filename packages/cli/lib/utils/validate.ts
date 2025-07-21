import {
  frameworks,
  reactTemplateChoices,
  vanillaTemplateChoices,
  vueTemplateChoices
} from '../constants'
import { Framework, Template } from '../types'
export const validateGivenTemplate = (framework: Framework, template: Template) => {
  switch (framework) {
    case 'vue':
      return vueTemplateChoices.map(({ value }) => value).includes(template)
    case 'react':
      return reactTemplateChoices.map(({ value }) => value).includes(template)
    case 'vanilla':
      return vanillaTemplateChoices.map(({ value }) => value).includes(template)
    default:
      return false
  }
}

export const validateGivenFramework = (framework: Framework) => frameworks.includes(framework)
