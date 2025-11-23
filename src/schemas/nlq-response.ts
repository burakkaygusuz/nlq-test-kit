import { Type } from '@google/genai';

/**
 * Gemini API Response Schema for NLQ Engine
 *
 * Defines the structured JSON output format that Gemini must follow
 * when converting natural language queries to structured intents.
 */
export const NLQ_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    intent: {
      type: Type.STRING,
      description: 'Snake_case summary of the query operation (e.g., daily_sales_by_region)'
    },
    dimensions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Grouping/filtering columns without aggregation'
    },
    metrics: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Columns to be aggregated (base names only, no functions)'
    }
  },
  required: ['intent', 'dimensions', 'metrics']
} as const;

export type NLQResponseSchema = typeof NLQ_RESPONSE_SCHEMA;
