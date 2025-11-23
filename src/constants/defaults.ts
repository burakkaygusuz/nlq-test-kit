import { DatabaseSchema } from '@/types';

export const DEFAULT_SCHEMA: DatabaseSchema = {
  tables: [
    {
      name: 'sales',
      columns: ['date', 'product_id', 'region', 'amount', 'quantity']
    },
    {
      name: 'products',
      columns: ['product_id', 'category', 'product_name']
    }
  ]
} as const;

export const DEFAULT_TESTS = [
  {
    id: 1,
    question: 'Show me daily sales by region',
    expected: {
      intent: 'daily_sales_by_region',
      dimensions: ['date', 'region'],
      metrics: ['amount']
    }
  },
  {
    id: 2,
    question: 'Top selling products by category',
    expected: {
      intent: 'top_products_by_category',
      dimensions: ['category', 'product_name'],
      metrics: ['amount']
    }
  }
] as const;
