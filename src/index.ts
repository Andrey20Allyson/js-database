import { readFile, access } from 'fs/promises';
import { TableStruct } from './js-database/structs/table';

async function readDataBaseStruct(file: string) {
  const data = await readFile(file, { encoding: 'utf-8' });

  for (const table of TableStruct.compileTables(data)) {
    console.log(table.fields.get('id'));
  }
}

readDataBaseStruct('./src/db-struct.txt');