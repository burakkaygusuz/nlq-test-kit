import { DatabaseSchema, Test } from '@/types';
import { validateSchema } from '@/utils/validation';
import { decode as decodeTOON } from '@toon-format/toon';

export function parseTOONSchema(toonString: string): DatabaseSchema {
  try {
    const parsed = decodeTOON(toonString);
    return validateSchema(parsed as unknown as DatabaseSchema);
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to parse schema (TOON)');
  }
}

export function parseTOONTests(toonString: string): Test[] {
  try {
    const parsed = decodeTOON(toonString);
    if (!Array.isArray(parsed)) {
      throw new TypeError('Test cases must be an array');
    }

    for (const [i, test] of parsed.entries()) {
      const testCase = test as unknown;
      if (
        typeof testCase !== 'object' ||
        testCase === null ||
        !('id' in testCase) ||
        !('question' in testCase) ||
        !('expected' in testCase)
      ) {
        throw new Error(`Test case ${i}: missing required fields`);
      }
      const expected = (testCase as { expected: unknown }).expected;
      if (
        typeof expected !== 'object' ||
        expected === null ||
        !('dimensions' in expected) ||
        !('metrics' in expected) ||
        !Array.isArray((expected as { dimensions: unknown }).dimensions) ||
        !Array.isArray((expected as { metrics: unknown }).metrics)
      ) {
        throw new TypeError(`Test case ${i}: expected must have dimensions and metrics arrays`);
      }
    }
    return parsed as unknown as Test[];
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to parse test cases (TOON)');
  }
}

export function setsEqual(a: Set<string>, b: Set<string>): boolean {
  if (a.size !== b.size) return false;
  for (const item of a) {
    if (!b.has(item)) return false;
  }
  return true;
}
