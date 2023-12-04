export type EntryProps = {
  name?: string;
  version?: string;
};

export type VersionWithPrefix = {
  coreVersion: string;
  prefix: string | null;
};
