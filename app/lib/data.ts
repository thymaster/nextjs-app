import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  FormattedCustomersTable,
} from './definitions';
import { formatCurrency } from './utils';

// Temporarily using local data instead of database
import {
  fetchRevenue as localFetchRevenue,
  fetchLatestInvoices as localFetchLatestInvoices,
  fetchCardData as localFetchCardData,
  fetchFilteredInvoices as localFetchFilteredInvoices,
  fetchInvoicesPages as localFetchInvoicesPages,
  fetchInvoiceById as localFetchInvoiceById,
  fetchCustomers as localFetchCustomers,
  fetchFilteredCustomers as localFetchFilteredCustomers,
} from './local-data';

// Keep the sql client for when database is available
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  // Using local data for now
  return localFetchRevenue();
}

export async function fetchLatestInvoices() {
  // Using local data for now
  return localFetchLatestInvoices();
}

export async function fetchCardData() {
  // Using local data for now
  return localFetchCardData();
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  // Using local data for now
  return localFetchFilteredInvoices(query, currentPage);
}

export async function fetchInvoicesPages(query: string) {
  // Using local data for now
  return localFetchInvoicesPages(query);
}

export async function fetchInvoiceById(id: string) {
  // Using local data for now
  return localFetchInvoiceById(id);
}

export async function fetchCustomers() {
  // Using local data for now
  return localFetchCustomers();
}

export async function fetchFilteredCustomers(query: string): Promise<FormattedCustomersTable[]> {
  // Using local data for now
  return localFetchFilteredCustomers(query);
}
