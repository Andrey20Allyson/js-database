export enum DataTypes {
  BOOLEAN,
  CHAR,
  DOUBLE,
  FLOAT,
  INTEGER,
  LARGE,
  LONG,
  TEXT,
  VARCHAR,
}

export type TypesMap = Record<string, DataTypes | undefined>;

export class DataType {
  private static readonly TYPES_MAP: TypesMap = {
    'boolean': DataTypes.BOOLEAN,
    'char': DataTypes.CHAR,
    'double': DataTypes.DOUBLE,
    'float': DataTypes.FLOAT,
    'int': DataTypes.INTEGER,
    'large': DataTypes.LARGE,
    'long': DataTypes.LONG,
    'text': DataTypes.TEXT,
    'varchar': DataTypes.VARCHAR,
  };
  private value: DataTypes;

  constructor(type: DataTypes) {
    this.value = type;
  }

  is(type: DataTypes) {
    return this.value === type;
  }

  test() {

  }

  static parse(data: string) {
    const pindex = data.indexOf('(');

    const unparsedDataType = pindex !== -1 ? data.slice(0, pindex) : data;

    const dataTypeValue = this.TYPES_MAP[unparsedDataType];

    if (dataTypeValue) {
      return new this(dataTypeValue);
    } else {
      throw new Error(`Data type '${unparsedDataType}' is invalid!`);
    }
  }
}