import * as fs from 'fs';
import Model from './model.ts';
import { createAttributeBox } from './mermaid-utils.ts';

const content = fs.readFileSync(process.cwd() + '/src/schema.prisma').toString();

// Find the models within the schema.prisma file
const models = content.match(/model\s+\w+\s+\{[\s\S]*?\}/g);
if (!models) throw new Error('No models found in schema.prisma file');

// Instantiate a class for each found model
const modelInstances = [];

for (const model of models) {
  const modelInstance = new Model(model);
  modelInstances.push(modelInstance);
}



// Create mermaid diagram

// let mermaidDiagram = 'erDiagram\n';

// for (const model of modelInstances) {
//   mermaidDiagram += createAttributeBox(model);

//   for (const field of model.fields) {
//     if (!modelNames.includes(field.type)) continue;

//     // The field type is another model so create a relationship
//     const verb = 'has'
//     mermaidDiagram += `${model.name} }|--|{ ${field.type} : ${verb}\n`
//   }
// }

// console.log(mermaidDiagram);
