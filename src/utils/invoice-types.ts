export interface Traveler {
  id: string;
  fullName: string;
  documentNumber: string;
  arrivalDate: string;
  departureDate: string;
  nights: number;
  destination: string;
  serial: number;
}

export interface CostItem {
  id: string;
  description: string;
  amount: number;
}

export interface InvoiceData {
  // Invoice Header
  confirmationNumber: string;
  invoiceDate: string;
  companyName: string;
  
  // Bill To
  agentName: string;
  agentAddress: string;
  vatNumber: string;
  
  // Travelers
  travelers: Traveler[];
  
  // Cost Breakdown
  costItems: CostItem[];
  
  // Beneficiary Details
  beneficiaryName: string;
  accountNumber: string;
  accountType: string;
  bankName: string;
  swiftCode: string;
  bankAddress: string;
  
  // Company Footer
  website: string;
  email: string;
  phone: string;
  location: string;
}
