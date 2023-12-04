import { bitbucket } from './core/client';

export const createPullRequest = async (
  sourceBranchName: string,
  destinationBranchName: string,
): Promise<string | undefined> => {
  try {
    const response = await bitbucket.repositories.createPullRequest({
      _body: {
        title: 'Bump package version',
        type: 'pullrequest',
        source: {
          branch: {
            name: sourceBranchName,
          },
        },
        destination: {
          branch: {
            name: destinationBranchName,
          },
        },
      },
      repo_slug: process.env.BITBUCKET_REPO!,
      workspace: process.env.BITBUCKET_WORKPLACE!,
    });
    return String(response.data.id);
  } catch (e) {
    throw new Error(e as string);
  }
};
