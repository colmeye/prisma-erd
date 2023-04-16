import { getModelName, getModelFields, parseFieldInfo } from './parse-utils.ts';

interface Field {
  name: string;
  type: string;
  optional: boolean;
  other?: string;
}

export default class Model {
  public name: string;
  public fields: Field[] = [];

  constructor(modelData: string) {
    this.name = getModelName(modelData);

    const fieldData = getModelFields(modelData) ?? '';
    const fieldStrings = fieldData.split('\n');

    // Parse each line of the field data
    for (const fieldString of fieldStrings) {
      let parsedFieldInfo: Field;

      try {
        parsedFieldInfo = parseFieldInfo(fieldString);
      } catch (e) {
        continue;
      }

      this.fields.push(parsedFieldInfo);
    }
  }
}
