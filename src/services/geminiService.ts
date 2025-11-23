import env from '@/config/env';
import { DatabaseSchema, NLQ_RESPONSE_SCHEMA, type NLQResponse } from '@/types';
import {
  validateColumnsExist,
  validateQuestion,
  validateResponse,
  validateSchema
} from '@/utils/validation';
import { GoogleGenAI } from '@google/genai';
import { encode as encodeTOON } from '@toon-format/toon';
import { unstable_cache } from 'next/cache';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import 'server-only';

const genAI = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

const PROMPT_TEMPLATE = readFileSync(join(process.cwd(), 'src/prompts/nlq-engine.md'), 'utf-8');

const SYSTEM_INSTRUCTION = PROMPT_TEMPLATE.split('## Schema')[0].trim();

const schemaCache = new Map<string, string>();

async function callGeminiAPI(systemPrompt: string, question: string) {
  const result = await genAI.models.generateContent({
    model: env.GEMINI_MODEL,
    contents: `Question: "${question}"`,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: 'application/json',
      responseSchema: NLQ_RESPONSE_SCHEMA,
      temperature: 0,
      topP: 1,
      topK: 1,
      maxOutputTokens: 512
    }
  });

  if (!result.text) {
    throw new Error('Empty response from Gemini API');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(result.text);
  } catch {
    throw new Error('Failed to parse Gemini response');
  }

  validateResponse(parsed);
  return parsed as NLQResponse;
}

/**
 * NLQ Engine - converts natural language questions to query intents
 * using Gemini API with TOON-encoded schema
 *
 * @param schema - Database schema
 * @param question - Natural language question
 * @returns NLQ response with intent, dimensions, and metrics
 */
export async function simulateNLQEngine(
  schema: DatabaseSchema,
  question: string
): Promise<NLQResponse> {
  validateSchema(schema);
  validateQuestion(question);

  const schemaKey = JSON.stringify(schema);
  let toonSchema = schemaCache.get(schemaKey);

  if (!toonSchema) {
    toonSchema = encodeTOON(schema);
    schemaCache.set(schemaKey, toonSchema);

    if (schemaCache.size > 10) {
      const firstKey = schemaCache.keys().next().value;
      if (firstKey) schemaCache.delete(firstKey);
    }
  }

  const systemPrompt = `${SYSTEM_INSTRUCTION}\n\nSchema (TOON format):\n${toonSchema}`;

  const getCachedResponse = unstable_cache(
    async () => callGeminiAPI(systemPrompt, question),
    [`nlq-${schemaKey}-${question}`],
    { tags: ['nlq-responses'], revalidate: 3600 }
  );

  try {
    const response = await getCachedResponse();
    validateColumnsExist(response, schema);

    return response;
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('NLQ Error:', msg);
    throw new Error(`NLQ failed: ${msg}`);
  }
}
