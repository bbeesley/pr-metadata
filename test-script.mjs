import { context, getOctokit } from '@actions/github';

const { rest: client } = getOctokit(process.env.GITHUB_TOKEN);

console.log(JSON.stringify(context));
const base = context.payload.pull_request?.base?.sha ?? 'master';
const head = context.payload.pull_request?.head?.sha ?? process.env.GITHUB_SHA;

const response = await client.repos.compareCommits({
  base,
  head,
  owner: context.repo.owner,
  repo: context.repo.repo,
});

console.log({ files: response.data.files });

console.log(JSON.stringify(response));
