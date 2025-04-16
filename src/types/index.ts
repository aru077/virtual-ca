
// Business information types
export interface BusinessInfo {
  id: string;
  name: string;
  entityType: string;
  establishmentDate: string;
  products: string;
  operationMode: string;
  clientType: string;
  avgMonthlyRevenue: number;
  avgMonthlyExpense: number;
  majorCosts: string[];
  recurringSubscriptions: string[];
  bankAccounts: number;
  paymentMethods: string[];
  loans: boolean;
  gstRegistered: boolean;
  gstScheme?: string;
  tdsDeduction: boolean;
  taxFilingStatus: boolean;
  teamSize: number;
  paymentFrequency: string;
  incentives: boolean;
  businessGoals: string[];
  painPoints: string[];
  helpNeeded: string[];
  onboardingCompleted: boolean;
}

// Financial transaction types
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  description: string;
  paymentMethod: string;
  reference?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  clientName: string;
  amount: number;
  taxAmount: number;
  status: "paid" | "pending" | "overdue";
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  amount: number;
}

export interface Expense {
  id: string;
  date: string;
  vendor: string;
  category: string;
  amount: number;
  taxAmount: number;
  description: string;
  receiptUrl?: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  joinDate: string;
  salary: number;
  paymentFrequency: string;
}

export interface TaxFiling {
  id: string;
  type: "GST" | "Income Tax" | "TDS";
  dueDate: string;
  status: "pending" | "filed" | "overdue";
  period: string;
  amount: number;
}

// Dashboard data types
export interface FinancialMetrics {
  revenue: number[];
  expenses: number[];
  profit: number[];
  cashflow: number[];
  periods: string[];
}

export interface ComplianceStatus {
  gst: TaxFiling[];
  incomeTax: TaxFiling[];
  tds: TaxFiling[];
}

// Onboarding types
export type OnboardingStep =
  | "business-details"
  | "business-nature"
  | "revenue-expenses"
  | "banking-payments"
  | "tax-compliance"
  | "team-payroll"
  | "goals-concerns"
  | "complete";
