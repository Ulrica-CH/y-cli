import { type Command, program } from 'commander'

export default function registerCommand(command: Command) {
  program.addCommand(command)
}
