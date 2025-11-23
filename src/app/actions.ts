'use server';

import { simulateNLQEngine } from '@/services/geminiService';
import { DatabaseSchema, NLQResult } from '@/types';

export async function runNLQTest(schema: DatabaseSchema, question: string): Promise<NLQResult> {
  try {
    const result = await simulateNLQEngine(schema, question);
    return { success: true, data: result };
  } catch (error) {
    console.error('NLQ Engine Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { success: false, error: errorMessage };
  }
}
