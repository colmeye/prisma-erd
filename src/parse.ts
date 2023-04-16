import * as fs from 'fs';
import Model from './model.ts';

const content = fs.readFileSync(process.cwd() + '/src/schema.prisma').toString();

// Find the models within the schema.prisma file
const models = content.match(/model\s+\w+\s+\{[\s\S]*?\}/g);
if (!models || !models.length) throw new Error('No models found in schema.prisma file');

// Instantiate a class for each found model
for (const model of models) {
  const modelInstance = new Model(model);
  console.log(modelInstance);
}
