import { isAfter } from 'date-fns';
import { bitbucket } from './core/client';

export const getLastCommitSha = async (): Promise<
  string | undefined | null
> => {
  try {
    const response = await bitbucket.repositories.listCommits({
      repo_slug: process.env.BITBUCKET_REPO!,
      workspace: process.env.BITBUCKET_WORKPLACE!,
    });
    const commits = response.data.values;

    if (!commits) {
      return null;
    }

    // TODO Use native API pagination instead of js based, or even query latest or by time
    commits.sort((a, b) => {
      return isAfter(new Date(a.date!), new Date(b.date!)) ? -1 : 1;
    });

    return commits[0].hash;
  } catch (e) {
    throw new Error(e as string);
  }
};
