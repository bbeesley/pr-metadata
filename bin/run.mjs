import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'; // eslint-disable-line n/file-extension-in-import
import { getChangedFiles } from '../dist/esm/get-changed-files.js';

const argv = yargs(hideBin(process.argv))
  .option('dirNames', {
    boolean: true,
    describe: 'Whether to return directory names instead of file names',
    default: false,
  })
  .option('filter', {
    array: true,
    string: true,
    describe: 'An array of globs to act as an include filter for where we look for changes',
  })
  .parse();
try {
  await getChangedFiles(argv.dirNames, argv.filter);
} catch (error) {
  console.error('fatal error', error.message, error.stack);
  process.exit(1);
}
