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
  verb: string; 
  fields: string[];
  references: string[]; 
  hasMany: boolean;
  optional: boolean;
}
