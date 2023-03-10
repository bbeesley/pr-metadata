# Snapshot report for `src/get-changed-files.test.ts`

The actual snapshot is saved in `get-changed-files.test.ts.snap`.

Generated by [AVA](https://avajs.dev).

## returns filenames when no args passed

> Snapshot 1

    '[".commitlintrc.json",".gitignore",".nvmrc","README.md","ava.config.cjs","babel.config.cjs","bin/run.cjs","bin/run.mjs","package-lock.json","package.json","prettier.config.cjs","src/__mocks__/mock-context.json","src/__mocks__/push-event.json","src/get-changed-files.test.ts","src/get-changed-files.ts","src/index.ts","test-script.mjs","tsconfig-lint.json","tsconfig.json"]'

## returns directories when called with dirNames arg set to true

> Snapshot 1

    '["bin","src/__mocks__","src"]'

## returns filenames array when called with dirNames arg set to false and json set to false

> Snapshot 1

    [
      '.commitlintrc.json',
      '.gitignore',
      '.nvmrc',
      'README.md',
      'ava.config.cjs',
      'babel.config.cjs',
      'bin/run.cjs',
      'bin/run.mjs',
      'package-lock.json',
      'package.json',
      'prettier.config.cjs',
      'src/__mocks__/mock-context.json',
      'src/__mocks__/push-event.json',
      'src/get-changed-files.test.ts',
      'src/get-changed-files.ts',
      'src/index.ts',
      'test-script.mjs',
      'tsconfig-lint.json',
      'tsconfig.json',
    ]

## returns directories array when called with dirNames arg set to true and json set to false

> Snapshot 1

    [
      'bin',
      'src/__mocks__',
      'src',
    ]

## filters filenames using exclude filter glob

> Snapshot 1

    '["README.md","ava.config.cjs","babel.config.cjs","bin/run.cjs","bin/run.mjs","package-lock.json","package.json","prettier.config.cjs","src/get-changed-files.test.ts","src/get-changed-files.ts","src/index.ts","test-script.mjs","tsconfig-lint.json","tsconfig.json"]'

## filters filenames using include filter glob

> Snapshot 1

    '["src/__mocks__/mock-context.json","src/__mocks__/push-event.json","src/get-changed-files.test.ts","src/get-changed-files.ts","src/index.ts"]'

## filters directories using exclude filter glob

> Snapshot 1

    '["bin","src"]'

## filters directories using include filter glob

> Snapshot 1

    '["src/__mocks__","src"]'
