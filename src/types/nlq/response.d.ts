/**
 * Natural Language Query Response
 *
 * Represents the structured output from the NLQ engine after parsing
 * a natural language question against a database schema.
 */
export interface NLQResponse {
  /**
   * Short, snake_case summary of the query operation
   * @example "daily_sales_by_region" | "top_products_by_category"
   */
  intent: string;

  /**
   * Columns used for grouping/filtering without aggregation
   * @example ["date", "region"] | ["category", "product_name"]
   */
  dimensions: string[];

  /**
   * Columns to be aggregated (base column names only)
   * @example ["amount"] | ["quantity", "revenue"]
   */
  metrics: string[];
}
