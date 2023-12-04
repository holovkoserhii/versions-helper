import { bitbucket } from './core/client';
import { convertObjectToFormData } from './convertObjectToFormData';

export const createNewCommit = async (
  branchName: string,
  newFile: object,
  commitMessage: string,
) => {
  try {
    // TODO Optionally add other features (reviewers, author etc.)
    await bitbucket.source.createFileCommit({
      repo_slug: process.env.BITBUCKET_REPO!,
      workspace: process.env.BITBUCKET_WORKPLACE!,
      branch: branchName,
      message: commitMessage,
      _body: convertObjectToFormData({
        'package.json': JSON.stringify(newFile, null, 2),
      }),
    });
  } catch (e) {
    throw new Error(e as string);
  }
};
