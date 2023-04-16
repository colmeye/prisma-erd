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

export function parseFieldInfo(fieldData: string) {
  const fieldsMatch = fieldData.match(/(\w+)\s+(\S+)\s+(.*)/);
  if (!fieldsMatch) throw new Error('No field data found');
  const name = fieldsMatch[1];
  const type = fieldsMatch[2];
  const other = fieldsMatch[3];
  return { name, type, optional: type.endsWith('?'), other };
}
