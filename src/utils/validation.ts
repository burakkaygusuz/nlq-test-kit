import type { DatabaseSchema } from '@/types/database';
import { z } from 'zod';

const SchemaValidation = z.object({
  tables: z
    .array(
      z.object({
        name: z.string().min(1),
        columns: z.array(z.union([z.string(), z.object({ name: z.string() })])).min(1)
      })
    )
    .min(1)
});

const GeminiResponseSchema = z
  .object({
    intent: z.string().min(1),
    dimensions: z.array(z.string()),
    metrics: z.array(z.string())
  })
  .strict();

export function validateSchema(schema: DatabaseSchema): DatabaseSchema {
  try {
    return SchemaValidation.parse(schema) as DatabaseSchema;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      if (firstError) {
        const path = firstError.path.join('.');
        const pathPrefix = path ? `${path} - ` : '';
        throw new Error(`Schema validation failed: ${pathPrefix}${firstError.message}`);
      }
    }
    const msg = error instanceof Error ? error.message : 'Invalid schema format';
    throw new Error(msg);
  }
}

export function validateQuestion(question: string): void {
  if (!question || typeof question !== 'string') {
    throw new Error('Question must be a non-empty string');
  }
  if (question.length > 1000) {
    throw new Error('Question must be under 1000 characters');
  }
}

export function validateResponse(response: unknown): void {
  try {
    GeminiResponseSchema.parse(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      if (firstError) {
        const path = firstError.path.join('.');
        const pathPrefix = path ? `${path} - ` : '';
        throw new Error(`Response validation failed: ${pathPrefix}${firstError.message}`);
      }
    }
    const msg = error instanceof Error ? error.message : 'Invalid response format';
    throw new Error(msg);
  }
}

export function validateColumnsExist(
  response: { dimensions: string[]; metrics: string[] },
  schema: DatabaseSchema
): void {
  const validColumns = new Set<string>();

  for (const table of schema.tables) {
    for (const col of table.columns) {
      const name = typeof col === 'string' ? col : col.name;
      validColumns.add(name);
    }
  }

  const allCols = [...response.dimensions, ...response.metrics];
  for (const col of allCols) {
    if (!validColumns.has(col)) {
      throw new Error(`Column "${col}" not found in schema`);
    }
  }
}
