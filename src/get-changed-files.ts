import { context, getOctokit } from '@actions/github';
import multimatch from 'multimatch';

/**
 * Uses github actions metadata to get a list of changes files or directories
 *
 * @export
 * @param {boolean} json Whether or not to return json
 * @param {boolean} dirNames Whether or not to return only directory names
 * @param {string[]} [filter] Filter globs to filter results using
 * @return {*}  {(Promise<string | string[]>)} The changed files or directories
 */
export async function getChangedFiles(
  json: true,
  dirNames: boolean,
  filter?: string[],
): Promise<string>;
export async function getChangedFiles(
  json: false,
  dirNames: boolean,
  filter?: string[],
): Promise<string[]>;
export async function getChangedFiles(
  json: boolean,
  dirNames: boolean,
  filter?: string[],
): Promise<string | string[]> {
  const { GITHUB_TOKEN } = process.env; // eslint-disable-line @typescript-eslint/naming-convention

  if (!GITHUB_TOKEN) {
    throw new Error('missing github token');
  }

  const { rest: client } = getOctokit(GITHUB_TOKEN);
  const base =
    (context.payload.pull_request?.base?.sha as string | undefined) ?? 'master';
  const head =
    (context.payload.pull_request?.head?.sha as string | undefined) ??
    process.env.GITHUB_SHA ??
    'HEAD';

  const response = await client.repos.compareCommits({
    base,
    head,
    owner: context.repo.owner,
    repo: context.repo.repo,
  });
  const files = response.data.files?.map((m) => m.filename) ?? [];
  const filteredFiles =
    filter && filter.length > 0 ? multimatch(files, filter) : files;
  if (dirNames) {
    const dirs = [
      ...new Set(
        filteredFiles
          .filter((f) => f.includes('/'))
          .map((f) => f.replace(/\/[^/]+$/, '')),
      ),
    ];
    return json ? JSON.stringify(dirs) : dirs;
  }

  return json ? JSON.stringify(filteredFiles) : filteredFiles;
}
