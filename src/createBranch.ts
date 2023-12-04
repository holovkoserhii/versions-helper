import { bitbucket } from './core/client';

// TODO Check if basic inputs (repo_slug, workspace) can be set in one place

export const createBranch = async (
  name: string,
  lastCommitSha: string,
): Promise<void> => {
  try {
    await bitbucket.refs.createBranch({
      _body: {
        name,
        target: {
          hash: lastCommitSha,
        },
      },
      repo_slug: process.env.BITBUCKET_REPO!,
      workspace: process.env.BITBUCKET_WORKPLACE!,
    });
  } catch (e) {
    throw new Error(e as string);
  }
};
