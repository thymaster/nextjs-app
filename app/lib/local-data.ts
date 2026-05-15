import { customers, invoices, revenue } from './placeholder-data';
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

// Add IDs to invoices since placeholder data doesn't have them
const invoicesWithIds = invoices.map((invoice, index) => ({
  id: `inv-${index + 1}`,
  ...invoice,
}));

export async function fetchRevenue(): Promise<Revenue[]> {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return revenue;
}

export async function fetchLatestInvoices(): Promise<LatestInvoiceRaw[]> {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const latestInvoices = invoicesWithIds
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map((invoice) => {
      const customer = customers.find((c) => c.id === invoice.customer_id)!;
      return {
        id: invoice.id,
        amount: invoice.amount,
        name: customer.name,
        image_url: customer.image_url,
        email: customer.email,
      };
    });

  return latestInvoices;
}

export async function fetchCardData() {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const numberOfInvoices = invoicesWithIds.length;
  const numberOfCustomers = customers.length;
  const totalPaidInvoices = formatCurrency(
    invoicesWithIds
      .filter((invoice) => invoice.status === 'paid')
      .reduce((sum, invoice) => sum + invoice.amount, 0)
  );
  const totalPendingInvoices = formatCurrency(
    invoicesWithIds
      .filter((invoice) => invoice.status === 'pending')
      .reduce((sum, invoice) => sum + invoice.amount, 0)
  );

  return {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  };
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
): Promise<InvoicesTable[]> {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const filteredInvoices = invoicesWithIds
    .map((invoice) => {
      const customer = customers.find((c) => c.id === invoice.customer_id)!;
      return {
        id: invoice.id,
        customer_id: invoice.customer_id,
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
        date: invoice.date,
        amount: invoice.amount,
        status: invoice.status,
      };
    })
    .filter((invoice) =>
      invoice.name.toLowerCase().includes(query.toLowerCase()) ||
      invoice.email.toLowerCase().includes(query.toLowerCase()) ||
      invoice.amount.toString().includes(query) ||
      invoice.date.includes(query) ||
      invoice.status.includes(query)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(offset, offset + ITEMS_PER_PAGE);

  return filteredInvoices;
}

export async function fetchInvoicesPages(query: string): Promise<number> {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const filteredCount = invoicesWithIds
    .map((invoice) => {
      const customer = customers.find((c) => c.id === invoice.customer_id)!;
      return {
        name: customer.name,
        email: customer.email,
        amount: invoice.amount.toString(),
        date: invoice.date,
        status: invoice.status,
      };
    })
    .filter((invoice) =>
      invoice.name.toLowerCase().includes(query.toLowerCase()) ||
      invoice.email.toLowerCase().includes(query.toLowerCase()) ||
      invoice.amount.includes(query) ||
      invoice.date.includes(query) ||
      invoice.status.includes(query)
    ).length;

  const totalPages = Math.ceil(filteredCount / ITEMS_PER_PAGE);
  return totalPages;
}

export async function fetchInvoiceById(id: string): Promise<InvoiceForm[]> {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const invoice = invoicesWithIds.find((inv) => inv.id === id);
  if (!invoice) return [];

  return [{
    id: invoice.id,
    customer_id: invoice.customer_id,
    amount: invoice.amount / 100, // Convert cents to dollars
    status: invoice.status,
  }];
}

export async function fetchCustomers(): Promise<CustomerField[]> {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
  })).sort((a, b) => a.name.localeCompare(b.name));
}

export async function fetchFilteredCustomers(query: string): Promise<FormattedCustomersTable[]> {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const filteredCustomers = customers
    .filter((customer) =>
      customer.name.toLowerCase().includes(query.toLowerCase()) ||
      customer.email.toLowerCase().includes(query.toLowerCase())
    )
    .map((customer) => {
      const customerInvoices = invoicesWithIds.filter((inv) => inv.customer_id === customer.id);
      const total_invoices = customerInvoices.length;
      const total_pending = customerInvoices
        .filter((inv) => inv.status === 'pending')
        .reduce((sum, inv) => sum + inv.amount, 0);
      const total_paid = customerInvoices
        .filter((inv) => inv.status === 'paid')
        .reduce((sum, inv) => sum + inv.amount, 0);

      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
        total_invoices,
        total_pending: formatCurrency(total_pending),
        total_paid: formatCurrency(total_paid),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return filteredCustomers;
}