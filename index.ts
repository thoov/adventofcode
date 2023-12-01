import { join } from 'node:path';
import { Glob, file, resolveSync } from 'bun';

type ImportType = typeof import('./day-x/index');

(async function() {
  const glob = new Glob('day-*/index.ts');
  for await (const path of glob.scan(".")) {
    const [day] = path.split('/');
    const { solve } = (await import(join(import.meta.dir, path)) as ImportType);
    const bunFile = file(resolveSync(`./${day}/input.txt`, import.meta.dir));
    const input = await bunFile.text();
    console.log(`${day}: ${solve(input)}`);
  }
})();
