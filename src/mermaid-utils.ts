import * as fs from 'fs';
import Model from './model';

export function createAttributeBox(modelInstance: Model) {
  let attributeBoxString = `${modelInstance.name} {\n`;

  for (const field of Object.values(modelInstance.fieldInfo)) {
    attributeBoxString += `\t${field.type} ${field.name}\n`;
  }

  attributeBoxString += '}\n';
  return attributeBoxString;
}

export function writeDiagramToFile(mermaidDiagram: string, outputFilePath: string) {
  const html = `
    <!DOCTYPE html>
    <div class="mermaid">
      ${mermaidDiagram}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    <script>
      mermaid.initialize({ startOnLoad: true });
    </script>
  `;

  fs.writeFileSync(outputFilePath + '/erd.html', html);
}
