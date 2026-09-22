const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const servicesRoot = path.join(process.cwd(), 'services');
const services = fs.readdirSync(servicesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name.endsWith('-service'))
  .map((entry) => entry.name);
const npmCommand = 'npm';

for (const service of services) {
  console.log(`Installing dependencies for ${service}`);
  const result = spawnSync(npmCommand, ['install', '--prefix', path.join('services', service), '--no-audit', '--no-fund'], { stdio: 'inherit', shell: true });
  if (result.error) {
    console.error(`Could not start npm for ${service}: ${result.error.message}`);
  }
  if (result.status !== 0) process.exit(result.status || 1);
}
