import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const projectDirectory = fileURLToPath(new URL('../', import.meta.url));
const sourceDirectory = join(projectDirectory, 'src');
const outputDirectory = join(projectDirectory, 'dist');
const staticFiles = ['index.html', 'style.css', 'app.js'];

await mkdir(outputDirectory, { recursive: true });
await Promise.all(
  staticFiles.map((file) => copyFile(join(sourceDirectory, file), join(outputDirectory, file))),
);

console.log(`Built SScloudKitchen static website at ${outputDirectory}`);
