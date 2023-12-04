import { extractPrefixFromVersion } from './utils';

describe('extractPrefixFromVersion', () => {
  it('should decompose version by prefix and core version', () => {
    expect(extractPrefixFromVersion('^5.5.5')).toEqual({
      coreVersion: '5.5.5',
      prefix: '^',
    });
  });

  it('should show prefix being null', () => {
    expect(extractPrefixFromVersion('5.5.5')).toEqual({
      coreVersion: '5.5.5',
      prefix: null,
    });
  });
});
