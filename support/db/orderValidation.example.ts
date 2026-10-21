/**
 * Example design only — not executed against SauceDemo.
 * Replace table/column names with the schema of an application you are authorized to test.
 */
import { RowDataPacket } from 'mysql2/promise';
import { queryRows } from './connection';

interface OrderRow extends RowDataPacket {
  order_id: number;
  customer_email: string;
  status: string;
  total_amount: number;
}

export async function findOrderByReference(orderReference: string): Promise<OrderRow | undefined> {
  const rows = await queryRows<OrderRow[]>(
    'SELECT order_id, customer_email, status, total_amount FROM orders WHERE order_reference = ? LIMIT 1',
    [orderReference]
  );
  return rows[0];
}

/**
 * In a real integration test:
 * 1. Capture a unique order reference from the application/API.
 * 2. Poll the database for a bounded period if writes are eventually consistent.
 * 3. Assert customer, status, line items and total using parameterized SELECT queries.
 * 4. Use isolated test data and cleanup only records created by that test.
 */