import { getModelName, getModelFields, parseFieldData } from './parse-utils.ts';
import { FieldInfo, RelationshipInfo } from './types.ts';

export default class Model {
  public name: string;
  public fieldInfo: FieldInfo[] = [];
  public relationshipInfo: RelationshipInfo[] = [];

  constructor(modelData: string) {
    this.name = getModelName(modelData);

    const fieldData = getModelFields(modelData) ?? '';
    const fieldStrings = fieldData.split('\n');

    // Parse each line of the field data
    for (const fieldString of fieldStrings) {
      try {
        const { fieldInfo, relationshipInfo } = parseFieldData(fieldString);
        this.fieldInfo.push(fieldInfo);
        if (relationshipInfo) this.relationshipInfo.push(relationshipInfo);
      } catch (e) {
        continue;
      }
    }
  }
}
