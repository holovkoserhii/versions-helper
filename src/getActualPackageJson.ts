import { bitbucket } from './core/client';

export const getActualPackageJson = async (lastCommitSha: string) => {
  try {
    const response = await bitbucket.repositories.readSrc({
      repo_slug: process.env.BITBUCKET_REPO!,
      workspace: process.env.BITBUCKET_WORKPLACE!,
      path: 'package.json',
      commit: lastCommitSha,
    });
    const fileContent = response.data as string;
    return JSON.parse(fileContent);
  } catch (e) {
    throw new Error(e as string);
  }
};
