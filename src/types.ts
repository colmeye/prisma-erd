export interface FieldInfo {
  name: string;
  optional: boolean;
  other?: string;
  type: string;
}

export interface ParsedFieldData {
  fieldInfo: FieldInfo;
  relationshipInfo?: RelationshipInfo
}

export interface RelationshipInfo {
  fields: string[];
  hasMany: boolean;
  optional: boolean;
  otherModel: string;
  references: string[]; 
  verb: string; 
}
