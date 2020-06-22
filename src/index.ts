import minimist from 'minimist'
import * as fs from 'fs'
import cloneDeep from 'lodash.clonedeep'
import * as packageJson from '../package.json'

let suppressError = false

function showToolVersion() {
  console.log(`Version: ${packageJson.version}`)
}

function showHelp() {
  console.log(`Version ${packageJson.version}
Syntax:   json-field-size [options] [file...]
Examples: json-field-size test.json
          json-field-size test.json --debug
Options:
 -h, --help                                         Print this message.
 -v, --version                                      Print the version
 --debug                                            Debug mode
`)
}

async function executeCommandLine() {
  const argv = minimist(process.argv.slice(2), { '--': true }) as unknown as {
    v?: unknown
    version?: unknown
    suppressError?: unknown
    _: string[]
    debug?: unknown
    h?: unknown
    help?: unknown
  }

  const showVersion = argv.v || argv.version
  if (showVersion) {
    showToolVersion()
    return
  }

  if (argv.h || argv.help) {
    showHelp()
    process.exit(0)
  }

  suppressError = !!argv.suppressError

  if (argv._.length === 0) {
    throw new Error('need a json file')
  }
  const file = argv._[0]
  const json: unknown = JSON.parse(fs.readFileSync(file).toString())
  const totalSize = JSON.stringify(json).length

  const keys: string[] = []
  collectFields(json, keys)

  const result: Array<{
    key: string
    size: number
    totalSize: number
    percent: number
  }> = []
  for (const key of keys) {
    const obj = cloneDeep(json)
    removeField(obj, key)
    const file = JSON.stringify(obj)
    const size = file.length
    result.push({
      key,
      size,
      totalSize,
      percent: +(1 - size / totalSize).toFixed(3) * 100,
    })
    if (argv.debug) {
      fs.writeFileSync(key + '.json', file)
    }
  }
  result.sort((a, b) => b.percent - a.percent)
  console.table(result)
}

function collectFields(obj: unknown, keys: string[]) {
  if (Array.isArray(obj)) {
    for (const item of obj as unknown[]) {
      collectFields(item, keys)
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (!keys.includes(key)) {
        keys.push(key)
      }
      collectFields((obj as { [key: string]: unknown })[key], keys)
    }
  }
}

function removeField(obj: unknown, field: string) {
  if (Array.isArray(obj)) {
    for (const item of obj as unknown[]) {
      removeField(item, field)
    }
  } else if (typeof obj === 'object' && obj !== null) {
    delete (obj as { [key: string]: unknown })[field]
    for (const key in obj) {
      removeField((obj as { [key: string]: unknown })[key], field)
    }
  }
}

executeCommandLine().then(() => {
  console.log(`json-field-size success.`)
}, (error: unknown) => {
  if (error instanceof Error) {
    console.log(error.message)
  } else {
    console.log(error)
  }
  if (!suppressError) {
    process.exit(1)
  }
})
