import { DataType } from "./data-type";

export type FieldsType = Record<string, FieldInfo | undefined>;

export interface FieldInfoConfig {
  name: string;
  type: DataType;
  autoIncrement?: boolean;
  isPrimaryKey?: boolean;
}

export class FieldInfo {
  static readonly FIELD_REGEXP = /\w* *: [^\r\n]*/g;
  static readonly FIELD_NAME_INFO_SPLITER_REGEXP = / *: */;
  static readonly FIELD_INFO_SPLITER_REGEXP = / +/;
  
  readonly name: string; 
  readonly type: DataType;
  readonly autoIncrement: boolean;
  readonly isPrimaryKey: boolean;

  constructor(config: FieldInfoConfig) {
    const {
      name,
      type,
      autoIncrement = false,
      isPrimaryKey = false,
    } = config;

    this.name = name;
    this.type = type;
    this.autoIncrement = autoIncrement;
    this.isPrimaryKey = isPrimaryKey;
  }

  static parse(data: string) {
    const [name, unparsedInfo] = data.split(this.FIELD_NAME_INFO_SPLITER_REGEXP);
    const [unparsedType, ...rest] = unparsedInfo.split(this.FIELD_INFO_SPLITER_REGEXP);

    return new this({
      name: name,
      type: DataType.parse(unparsedType),
    });
  }

  static * compileFields(data: string) {
    for (const fieldFound of data.matchAll(this.FIELD_REGEXP)) {
      const unparsedField = fieldFound[0]

      const field = this.parse(unparsedField);

      yield field;
    }
  }
}
