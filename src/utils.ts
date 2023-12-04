import { VersionWithPrefix } from './types/common';

export const ERROR_MESSAGES = {
  badInput: `Bad input. Make sure you specify package name and version in the following order:
<name><space><version according to semver>.`,
  noPackage:
    'The packageName you specified is not listed in the source repo deps or devDeps',
  badVersionInput:
    'Make sure you specified a correct version according to semver',
  updatedVersion: 'New version is less than or equal to the actual one',
  unknown:
    'The error happened. If this happens often, please, contact developers',
};

export const SUCCESS_MESSAGES = {
  prCreated: (id: string) =>
    `New pull request successfully created. Check it out: https://bitbucket.org/${process.env.BITBUCKET_WORKPLACE}/${process.env.BITBUCKET_REPO}/pull-requests/${id}`,
};

const VALID_VERSION_PREFIXES = ['~', '^'];

export const extractPrefixFromVersion = (
  version: string,
): VersionWithPrefix => {
  const firstSymbol = version[0];
  const prefix = VALID_VERSION_PREFIXES.includes(firstSymbol)
    ? firstSymbol
    : null;
  return {
    prefix,
    coreVersion: prefix ? version.substring(1) : version,
  };
};
