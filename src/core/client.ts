import { Bitbucket } from 'bitbucket';

// TODO Set up to support different branches

const clientOptions = {
  baseUrl: 'https://api.bitbucket.org/2.0',
  auth: {
    token: process.env.ACCESS_TOKEN!,
  },
};

// TODO Get rid of type assertion in favour of proper type checking

export const bitbucket = new Bitbucket(clientOptions);
