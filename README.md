[![Build, Test & Publish Main](https://github.com/bbeesley/pr-metadata/actions/workflows/build-test-on-push.yml/badge.svg)](https://github.com/bbeesley/pr-metadata/actions/workflows/build-test-on-push.yml)

# @beesley/pr-metadata

A tool for reading information about pull requests within github actions. Works as a cli or as a node module.
Expects a GITHUB_TOKEN env var to be set.

## CLI Usage

```shell
npx @beesley/pr-metadata --help
# Options:
#   --help      Show help                                                                       [boolean]
#   --version   Show version number                                                             [boolean]
#   --dirNames  Whether to return directory names instead of file names                         [boolean] [default: false]
#   --json      Whether to return result as a json string                                       [boolean] [default: true]
#   --filter    An array of globs to act as an include filter for where we look for changes     [array]

npx @beesley/pr-metadata
# [".commitlintrc.json","src/__mocks__/mock-context.json","src/__mocks__/push-event.json","src/get-changed-files.test.ts","src/get-changed-files.ts","src/index.ts"]

npx @beesley/pr-metadata --json false
# [
#   '.commitlintrc.json',
#   'src/__mocks__/mock-context.json',
#   'src/__mocks__/push-event.json',
#   'src/get-changed-files.test.ts',
#   'src/get-changed-files.ts',
#   'src/index.ts'
# ]

npx @beesley/pr-metadata --dirNames
# ["bin","src/__mocks__","src"]

npx @beesley/pr-metadata --dirNames --filter '**' --filter '!**/__mocks__/**'
# ["bin","src"]

npx @beesley/pr-metadata --filter 'src/**'
# ["src/__mocks__/mock-context.json","src/__mocks__/push-event.json","src/get-changed-files.test.ts","src/get-changed-files.ts","src/index.ts"]
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [getChangedFiles](#getchangedfiles)
    *   [Parameters](#parameters)

### getChangedFiles

[src/get-changed-files.ts:13-17](https://github.com/bbeesley/pr-metadata/blob/9f64c7966adf224f2992f1c045d5011612f669b6/src/get-changed-files.ts#L13-L17 "Source code on GitHub")

Uses github actions metadata to get a list of changes files or directories

#### Parameters

*   `json` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether or not to return json
*   `dirNames` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether or not to return only directory names
*   `filter` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>?** Filter globs to filter results using

Returns **any** {(Promise\<string | string\[]>)} The changed files or directories
