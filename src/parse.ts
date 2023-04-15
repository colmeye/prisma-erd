import * as fs from 'fs';

const content = fs.readFileSync(process.cwd() + '/src/schema.prisma').toString();

const matches = content.match(/model\s+\w+\s+\{[\s\S]*?\}/g);

console.log(matches);
