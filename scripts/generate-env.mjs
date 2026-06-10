import fs from 'fs';
import path from 'path';

const mode = process.argv[2] || 'development';

const envFileName = mode === 'production' ? '.env.production' : '.env';
const envPath = path.resolve(process.cwd(), envFileName);

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const content = fs.readFileSync(filePath, 'utf8');

  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .reduce((result, line) => {
      const [key, ...valueParts] = line.split('=');
      result[key.trim()] = valueParts.join('=').trim();
      return result;
    }, {});
}

const env = readEnvFile(envPath);

const appStatus =
  env.APP_STATUS || (mode === 'production' ? 'Production Mode' : 'Development Mode');

const environmentsDir = path.resolve(process.cwd(), 'src/environments');

if (!fs.existsSync(environmentsDir)) {
  fs.mkdirSync(environmentsDir, { recursive: true });
}

const output = `export const environment = {
  production: ${mode === 'production'},
  appStatus: '${appStatus}',
};
`;

fs.writeFileSync(path.join(environmentsDir, 'environment.generated.ts'), output);

console.log(`Environment generated from ${envFileName}: ${appStatus}`);
