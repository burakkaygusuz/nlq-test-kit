import type { NLQResponse } from '@/types/nlq';

/**
 * Test case definition for NLQ testing
 */
export interface Test {
  id: number;
  question: string;
  expected: {
    intent: string;
    dimensions: string[];
    metrics: string[];
  };
}

/**
 * Test result with actual response and pass/fail status
 */
export interface TestResult extends Test {
  actual: NLQResponse | null;
  passed: boolean;
  error?: string | null;
}
