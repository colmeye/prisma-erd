import * as fs from 'fs';
import Model from './model';
import { createAttributeBox, writeDiagramToFile } from './mermaid-utils';

// Read schema file
// ------------------------------
if (process.argv.length === 2) {
  console.error('Expected at least one argument!');
  process.exit(1);
}

const content = fs.readFileSync(process.cwd() + '/src/schema.prisma').toString();

// Find models in the file
// ------------------------------
const models = content.match(/model\s+\w+\s+\{[\s\S]*?\}/g);
if (!models) throw new Error('No models found in schema.prisma file');

// Parse the found models
// ------------------------------
const modelInstances: { [key: string]: Model } = {};

for (const model of models) {
  const modelInstance = new Model(model);
  modelInstances[modelInstance.name] = modelInstance;
}

// Create mermaid diagram
// ------------------------------
let mermaidDiagram = 'erDiagram\n';

for (const modelName in modelInstances) {
  const model = modelInstances[modelName];

  mermaidDiagram += createAttributeBox(model);

  for (const relationshipInfo of model.relationshipInfo) {
    const otherModel = modelInstances[relationshipInfo.otherModel];
    if (!otherModel) continue;
    const relatedField = otherModel.fieldInfo.find((field) => field.type === model.name);
    if (!relatedField) continue;

    const cardinality = relationshipInfo.hasMany ? '{' : '|';
    const modality = relationshipInfo.optional ? 'o' : '|';
    const relatedFieldCardinality = relatedField.hasMany ? '}' : '|';
    const relatedFieldModality = relatedField.optional ? 'o' : '|';

    const connection = `${relatedFieldCardinality}${relatedFieldModality}--${modality}${cardinality}`;

    mermaidDiagram += `${model.name} ${connection} ${relationshipInfo.otherModel} : ${relationshipInfo.verb}\n`;
  }
}

writeDiagramToFile(mermaidDiagram);
