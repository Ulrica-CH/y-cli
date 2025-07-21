import { execSync } from 'child_process'

export const hasPnpm = () => !!getPnpmVersion

export const getPnpmVersion = () => {
  let _pnpmVersion

  try {
    _pnpmVersion = execSync('pnpm --version', {
      stdio: ['pipe', 'pipe', 'ignore']
    }).toString()
  } catch {
    _pnpmVersion = undefined
  }

  return _pnpmVersion
}
