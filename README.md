# json-field-size

A CLI tool to calculate size of all fields in a json, for memory analysis.

[![Dependency Status](https://david-dm.org/plantain-00/json-field-size.svg)](https://david-dm.org/plantain-00/json-field-size)
[![devDependency Status](https://david-dm.org/plantain-00/json-field-size/dev-status.svg)](https://david-dm.org/plantain-00/json-field-size#info=devDependencies)
[![Build Status: Linux](https://travis-ci.org/plantain-00/json-field-size.svg?branch=master)](https://travis-ci.org/plantain-00/json-field-size)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/json-field-size?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/json-field-size/branch/master)
![Github CI](https://github.com/plantain-00/json-field-size/workflows/Github%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/json-field-size.svg)](https://badge.fury.io/js/json-field-size)
[![Downloads](https://img.shields.io/npm/dm/json-field-size.svg)](https://www.npmjs.com/package/json-field-size)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fplantain-00%2Fjson-field-size%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/json-field-size)

## install

`yarn global add json-field-size`

## usage

run `json-field-size test.json`

```txt
┌─────────┬─────┬──────┬───────────┬─────────┐
│ (index) │ key │ size │ totalSize │ percent │
├─────────┼─────┼──────┼───────────┼─────────┤
│    0    │ 'b' │  7   │    29     │  75.9   │
│    1    │ 'a' │  17  │    29     │  41.4   │
└─────────┴─────┴──────┴───────────┴─────────┘
```

## options

key | description
--- | ---
--debug | debug mode
-h,--help | Print this message.
-v,--version | Print the version
