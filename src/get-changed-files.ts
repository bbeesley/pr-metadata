import { context, getOctokit } from '@actions/github';
import multimatch from 'multimatch';

const { GITHUB_TOKEN } = process.env;

if (!GITHUB_TOKEN) {
   throw new Error('missing github token');
}

const { rest: client } = getOctokit(GITHUB_TOKEN);

export async function getChangedFiles(
  dirNames: boolean,
  filter?: string[],
): Promise<string> {
  const base =
    (context.payload.pull_request?.base?.sha as string | undefined) ?? 'master';
  const head =
    (context.payload.pull_request?.head?.sha as string | undefined) ??
    (process.env.GITHUB_SHA as string | undefined) ??
    'HEAD';

  const response = await client.repos.compareCommits({
    base,
    head,
    owner: context.repo.owner,
    repo: context.repo.repo,
  });
  const files = response.data.files?.map(m => m.filename) ?? [];
  const filteredFiles = filter && filter.length > 0 ? multimatch(files, filter) : files;
  if (dirNames) {
    const dirs = [...new Set(filteredFiles.map(f => f.replace(/\/[^/]+$/, '')))];
    return JSON.stringify(dirs);
  }
  return JSON.stringify(filteredFiles);
}
