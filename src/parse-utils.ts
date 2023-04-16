import { ParsedFieldData } from './types';

export function getModelName(modelData: string) {
  const nameMatch = modelData.match(/^model\s+(\w+)\s*{/);
  if (!nameMatch) throw new Error('Model has no name?');
  return nameMatch[1];
}

export function getModelFields(modelData: string) {
  const fieldDataMatch = modelData.match(/{([\s\S]+?)}/);
  if (!fieldDataMatch) return;
  return fieldDataMatch[1];
}

export function parseFieldData(fieldData: string): ParsedFieldData {
  const fieldsMatch = fieldData.match(/(\w+)\s+(\S+)\s+(.*)/);
  if (!fieldsMatch) throw new Error('No field data found');

  const [_, name, type, other] = fieldsMatch;
  const hasMany = type.endsWith('[]');
  const optional = type.endsWith('?') || type.endsWith('[]');
  const normalizedType = type.replace('?', '').replace('[]', '');

  let fields = undefined;
  let references = undefined;

  try {
    const relationshipDetails = parseRelationshipDetails(fieldData);
    fields = relationshipDetails.fields;
    references = relationshipDetails.references;
  } catch (e) {
    // No relationship data found
  }

  return {
    name,
    optional,
    other,
    type: normalizedType,
    otherModel: normalizedType,
    fields,
    references,
    hasMany,
  };
}

export function parseRelationshipDetails(fieldData: string) {
  const fieldsMatch = fieldData.match(/fields:\s*\[(\w+(?:,\s*\w+)*)\]/);
  if (!fieldsMatch) throw new Error('Fields not found in relationship');

  const referencesMatch = fieldData.match(/references:\s*\[(\w+(?:,\s*\w+)*)\]/);
  if (!referencesMatch) throw new Error('References not found in relationship');

  return { fields: fieldsMatch[1].split(', '), references: referencesMatch[1].split(', ') };
}
