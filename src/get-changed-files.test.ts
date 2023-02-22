import { readFile } from 'node:fs/promises';
import * as url from 'node:url';
import { resolve } from 'node:path';
import test from 'ava';
import nock from 'nock';
import { getChangedFiles } from './get-changed-files.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

process.env.GITHUB_ACTION = '__run_3';
process.env.GITHUB_ACTOR = 'bbeesley';
process.env.GITHUB_API_URL = 'https://api.github.com';
process.env.GITHUB_EVENT_NAME = 'push';
process.env.GITHUB_EVENT_PATH = resolve(
  __dirname,
  './__mocks__/pr-event-payload.json',
);
process.env.GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';
process.env.GITHUB_JOB = 'terraform';
process.env.GITHUB_REF = 'refs/heads/test-branch';
process.env.GITHUB_REPOSITORY = 'bbeesley/pr-metadata';
process.env.GITHUB_RUN_ID = '4242872541';
process.env.GITHUB_RUN_NUMBER = '8';
process.env.GITHUB_SERVER_URL = 'https://github.com';
process.env.GITHUB_SHA = '39c9e593b846262419684277864dcc4703515c04';
process.env.GITHUB_WORKFLOW = 'Test toolkit';
process.env.GITHUB_TOKEN = 'token';

let scope;

test.serial.before(async () => {
  const compareResponseData = await readFile(
    resolve(__dirname, '__mocks__/compare-response-body.json'),
    { encoding: 'utf8' },
  );
  scope = nock('https://api.github.com')
    .get(/\/repos\/bbeesley\/pr-metadata\/compare\/.*/)
    .reply(200, JSON.parse(compareResponseData))
    .persist();
  nock.emitter.on('no match', (request) => {
    console.error('no match for request', request);
  });
});

test.serial('returns filenames when no args passed', async (t) => {
  const result = await getChangedFiles(true, false);
  t.snapshot(result);
});

test.serial(
  'returns directories when called with dirNames arg set to true',
  async (t) => {
    const result = await getChangedFiles(true, true);
    t.snapshot(result);
  },
);

test.serial(
  'returns filenames array when called with dirNames arg set to false and json set to false',
  async (t) => {
    const result = await getChangedFiles(false, false);
    t.snapshot(result);
  },
);

test.serial(
  'returns directories array when called with dirNames arg set to true and json set to false',
  async (t) => {
    const result = await getChangedFiles(false, true);
    t.snapshot(result);
  },
);

test.serial('filters filenames using exclude filter glob', async (t) => {
  const result = await getChangedFiles(true, false, ['**', '!**/__mocks__/**']);
  t.snapshot(result);
});

test.serial('filters filenames using include filter glob', async (t) => {
  const result = await getChangedFiles(true, false, ['src/**']);
  t.snapshot(result);
});

test.serial('filters directories using exclude filter glob', async (t) => {
  const result = await getChangedFiles(true, true, ['**', '!**/__mocks__/**']);
  t.snapshot(result);
});

test.serial('filters directories using include filter glob', async (t) => {
  const result = await getChangedFiles(true, true, ['src/**']);
  t.snapshot(result);
});
