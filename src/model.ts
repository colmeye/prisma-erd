interface Field {
  name: string;
  type: string;
}

export default class Model {
  public name: string;
  // public fields: Field[];

  constructor(data: string) {
    // Get the name of the model
    const nameMatch = data.match(/^model\s+(\w+)\s*{/);
    if (!nameMatch || !nameMatch.length) throw new Error('Model has no name?');
    this.name = nameMatch[1];

    // Get the fields of the model
    const fieldDataMatch = data.match(/{([\s\S]+?)}/);
    if (!fieldDataMatch || !fieldDataMatch.length) return;
    const fieldData = fieldDataMatch[1];

    const fieldsMatch = fieldData.match(/(\S+)\s+(\S+\??)(?:\s+(\S+(?:\s+\[.*?\]))+)?/) ?? [];
    const field = [fieldsMatch[1], fieldsMatch[2], fieldsMatch[3]];

    console.log(field);
  }
}
