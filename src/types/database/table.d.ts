import type { SchemaColumn } from './column';

export interface SchemaTable {
  name: string;
  columns: string[] | SchemaColumn[];
}
