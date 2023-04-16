export interface FieldInfo {
  hasMany: boolean;
  name: string;
  optional: boolean;
  other?: string;
  type: string;
}

export interface ParsedFieldData {
  name: string;
  optional: boolean;
  other?: string;
  type: string;
  fields?: string[];
  hasMany: boolean;
  otherModel?: string;
  references?: string[];
}

export interface RelationshipInfo {
  fields: string[];
  hasMany: boolean;
  optional: boolean;
  otherModel: string;
  references: string[];
  verb: string;
}
