import semver from 'semver/preload';
import {
  ERROR_MESSAGES,
  extractPrefixFromVersion,
  SUCCESS_MESSAGES,
} from './utils';
import { getActualPackageJson } from './getActualPackageJson';
import { getLastCommitSha } from './getLastCommitSha';
import { EntryProps } from './types/common';
import { createBranch } from './createBranch';
import { createNewCommit } from './createNewCommit';
import { createPullRequest } from './createPullRequest';

export const handleJob = async ({ name, version }: EntryProps) => {
  if (!name || !version) {
    throw new Error(ERROR_MESSAGES.badInput);
  }

  const { coreVersion: coreNewVersion, prefix: newPrefix } =
    extractPrefixFromVersion(version);

  if (!coreNewVersion || !semver.valid(coreNewVersion)) {
    throw new Error(ERROR_MESSAGES.badVersionInput);
  }

  const lastCommitSha = await getLastCommitSha();

  if (!lastCommitSha) {
    return null;
  }

  const actualPackageJson = await getActualPackageJson(lastCommitSha);
  if (!actualPackageJson) {
    throw new Error(ERROR_MESSAGES.unknown);
  }
  const { dependencies, devDependencies } = actualPackageJson;
  const actualPackages = { ...dependencies, ...devDependencies };

  const actualVersion = actualPackages[name];

  if (!actualVersion) {
    throw new Error(ERROR_MESSAGES.noPackage);
  }

  const { coreVersion } = extractPrefixFromVersion(actualVersion);

  if (semver.lte(coreNewVersion, coreVersion)) {
    throw new Error(ERROR_MESSAGES.updatedVersion);
  }

  const updatedVersion = `${newPrefix ?? ''}${coreNewVersion}`;

  const newBranchName = `chore/bump-package-${name
    .split(' ')
    .join('-')}-to-version-${coreNewVersion}`;

  await createBranch(newBranchName, lastCommitSha);

  const section = ['dependencies', 'devDependencies'].find(
    (sectionName) => actualPackageJson[sectionName][name],
  );
  if (!section) {
    throw new Error(ERROR_MESSAGES.unknown);
  }

  const newPackageJson = {
    ...actualPackageJson,
    [section]: {
      ...actualPackageJson[section],
      [name]: updatedVersion,
    },
  };

  const commitMessage = `[Chore] Bump package ${name} to version ${updatedVersion}`;
  await createNewCommit(newBranchName, newPackageJson, commitMessage);

  const id = await createPullRequest(newBranchName, 'main');
  if (id) {
    console.log(SUCCESS_MESSAGES.prCreated(id));
  }
};
