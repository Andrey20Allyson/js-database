import { FieldInfo, FieldsType } from "./field";

export class TableStruct {
  static readonly TABLE_REGEXP = /table \w+ \{[^}]*\}/g;
  static readonly TABLE_VALUES_REGEXP = /^table +(\w+) *\{([^}]*)\}$/;
  readonly name: string;
  readonly fields: Map<string, FieldInfo>;

  constructor(name: string) {
    this.name = name;
    this.fields = new Map();
  }

  static parse(data: string) {
    const result = this.TABLE_VALUES_REGEXP.exec(data);

    if (!result) throw new Error('Erro ao compilar');

    const [, name, fields] = result as (string | undefined)[];

    if (!name || !fields) throw new Error('Erro ao compilar');

    const table = new this(name);

    for (const field of FieldInfo.compileFields(fields)) {
      table.fields.set(field.name, field);
    }

    return table;
  }

  static * compileTables(data: string) {
    for (const tableString of data.matchAll(this.TABLE_REGEXP)) {
      yield this.parse(tableString[0]);
    }
  }
}