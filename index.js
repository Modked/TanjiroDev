import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pluginsDir = path.join(__dirname, 'runtime-core')

const plugins = {}

for (const file of fs.readdirSync(pluginsDir).filter(f => f.endsWith('.js'))) {
  const { default: plugin } = await import(`./runtime-core/${file}`)
  plugins[file] = plugin
}

export default plugins
