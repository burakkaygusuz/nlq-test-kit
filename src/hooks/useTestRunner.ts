import { runNLQTest } from '@/app/actions';
import type { DatabaseSchema, NLQResponse, Test, TestResult, ValidationError } from '@/types';
import { parseTOONSchema, parseTOONTests, setsEqual } from '@/utils/toon-parser';
import { useState, useTransition } from 'react';

export function useTestRunner() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isPending, startTransition] = useTransition();

  const runTests = (schemaToon: string, testsToon: string) => {
    setValidationErrors([]);

    startTransition(async () => {
      const errors: ValidationError[] = [];
      let schema: DatabaseSchema | null = null;
      let tests: Test[] | null = null;

      try {
        schema = parseTOONSchema(schemaToon);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        errors.push({ id: 'schema-err', field: 'schema', message });
      }

      try {
        tests = parseTOONTests(testsToon);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        errors.push({ id: 'tests-err', field: 'tests', message });
      }

      if (errors.length > 0 || !schema || !tests) {
        setValidationErrors(
          errors.length
            ? errors
            : [{ id: 'parse-err', field: 'schema', message: 'Failed to parse inputs' }]
        );
        return;
      }

      const newResults: TestResult[] = [];
      for (const test of tests) {
        const response = await runNLQTest(schema, test.question);
        let passed = false;
        let actual: NLQResponse | null = null;
        let error: string | null = null;

        if (response.success) {
          actual = response.data;
          passed =
            setsEqual(new Set(response.data.dimensions), new Set(test.expected.dimensions)) &&
            setsEqual(new Set(response.data.metrics), new Set(test.expected.metrics));
        } else {
          error = response.error;
        }
        newResults.push({ ...test, actual, passed, error });
      }
      setResults(newResults);
    });
  };

  return {
    results,
    validationErrors,
    isPending,
    runTests
  };
}
