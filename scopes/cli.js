const Mustache = require('mustache')
const fs = require('node:fs')
const { resolve } = require('node:path')

const TOTAL = process.env.TOTAL || 5
const PERCENTAGE_TO_RENDER = process.env.PERCENTAGE || 20
const VARIANT = process.env.VARIANT || 'inner'

console.log(`GENERATING ${TOTAL} component with ${VARIANT} strategy`)
const componentIndexTpl = `{{#components}}export * from './component-{{idx}}.js'\n{{/components}}`
const componentTpl = fs.readFileSync(resolve(__dirname, 'src/templates/component.mustache'), { encoding:'UTF-8' })
const appTpl = fs.readFileSync(resolve(__dirname, 'src/templates/app.mustache'), { encoding:'UTF-8' })
Mustache.parse(componentTpl)

const components = new Array(Number(TOTAL)).fill(0).map((_, idx) => ({
    component: Mustache.render(componentTpl, { [VARIANT === 'inner' ? 'execution_inner': 'execution_outer']: 'businessLogic.createObjects()', idx }),
    idx,
}))
console.log(components.length)

components.forEach(({ component, idx }) => fs.writeFileSync(resolve(__dirname, `src/components/component-${idx}.js`), component, { encoding:'UTF-8' }))

const componentsIndexTps = Mustache.render(componentIndexTpl, { components })
fs.writeFileSync(resolve(__dirname, `src/components/index.js`), componentsIndexTps, { encoding:'UTF-8' })

const app = Mustache.render(appTpl, { variant: VARIANT, renderedPercentage:  PERCENTAGE_TO_RENDER })
fs.writeFileSync(resolve(__dirname, `src/app.js`), app, { encoding:'UTF-8' })