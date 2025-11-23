/**
 * Validation error for Dashboard UI
 */
export interface ValidationError {
  id: string;
  field: 'schema' | 'tests';
  message: string;
}
