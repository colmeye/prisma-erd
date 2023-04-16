import { getModelName, getModelFields, parseFieldData } from './parse-utils';
import { FieldInfo, RelationshipInfo } from './types';

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
        const { name, optional, other, type, otherModel, fields, references, hasMany } =
          parseFieldData(fieldString);

        this.fieldInfo.push({ hasMany, name, optional, other, type });

        if (otherModel && fields && references) {
          this.relationshipInfo.push({ fields, hasMany, optional, otherModel, references, verb: name });
        }
      } catch (e) {
        continue;
      }
    }
  }
}
