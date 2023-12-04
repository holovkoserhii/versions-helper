This tool helps bump package version in package.json file of the target repo. It automatically runs basic checks, creates a separate branch, adds an appropriate commit, creates a pull request and outputs its URL for the user in a console.

Features:
- basic sanity checks
- both dependencies and devDependencies sections checks
- use can update versions with semver prefixes (^, ~). The system will automatically update version of the target package exactly the way the user specifies it (with or without prefixes)
- works only with bitbucket

Steps to use:
- fill in secrets in .env file (example provided)
- navigate to package.json > scripts section of the current repository
- fill in placeholders in "start" section (example in dev section)
- all the results and user can view in the console