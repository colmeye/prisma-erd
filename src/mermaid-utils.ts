import Model from "./model";

export function createAttributeBox(modelInstance: Model) {
  let attributeBoxString = `${modelInstance.name} {\n`;

  for (const field of modelInstance.fieldInfo) {
    // TODO: Support types
    attributeBoxString += `\tstring ${field.name}\n`;
  }

  attributeBoxString += '}\n';
  return attributeBoxString;
}
