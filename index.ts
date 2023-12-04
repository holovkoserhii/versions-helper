import dotenv from 'dotenv';
dotenv.config();
import { handleJob } from './src/handleJob';

const REPO_NAME = 'versions-helper';

// in first args quantity can change, I'm filtering out those where the repo name in present
const [name, version] = process.argv.filter((arg) => !arg.includes(REPO_NAME));
handleJob({ name, version });

// TODO Unit test *.ts files
