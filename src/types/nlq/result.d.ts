import type { NLQResponse } from '@/types/nlq/response';

/**
 * Result wrapper for NLQ Engine execution
 */
export type NLQResult =
  | {
      success: true;
      data: NLQResponse;
    }
  | {
      success: false;
      error: string;
    };
