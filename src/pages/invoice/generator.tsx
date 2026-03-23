import React, { useState } from 'react';
import { NextPage } from 'next';
import InvoiceForm from '../../components/invoice/InvoiceForm';
import InvoicePreview from '../../components/invoice/InvoicePreview';
import { InvoiceData } from '../../utils/invoice-types';

const InvoiceGeneratorPage: NextPage = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    confirmationNumber: 'DTH1091',
    invoiceDate: new Date().toISOString().split('T')[0],
    companyName: 'Door To Happiness Holiday',
    
    // Bill To
    agentName: 'SPORTS TOURS & TRAVEL PVT LTD',
    agentAddress: 'Jhamsikhel 03, Lalitpur',
    vatNumber: '204570885',
    
    // Travelers
    travelers: [
      {
        id: '1',
        fullName: 'RAKCHHYA MAHARJAN',
        documentNumber: '11025259',
        arrivalDate: '2026-04-09',
        departureDate: '2026-04-14',
        nights: 5,
        destination: 'Bhutan',
        serial: 1
      },
      {
        id: '2',
        fullName: 'BIDYA MAHARJAN',
        documentNumber: 'PA3218544',
        arrivalDate: '2026-04-09',
        departureDate: '2026-04-14',
        nights: 5,
        destination: 'Bhutan',
        serial: 2
      }
    ],
    
    // Cost Breakdown
    costItems: [
      {
        id: '1',
        description: 'Visa Fees',
        amount: 80
      },
      {
        id: '2',
        description: 'SDF Fees',
        amount: 1000
      }
    ],
    
    // Beneficiary Details
    beneficiaryName: 'Door to Happiness Holiday',
    accountNumber: '640007528',
    accountType: 'Dollar Account',
    bankName: 'Bhutan National Bank Limited',
    swiftCode: 'BNBTBTBT',
    bankAddress: 'Norzin Lam, RICBL Building, Thimphu, Bhutan',
    
    // Company Footer
    website: 'www.doortohappinessholidays.com',
    email: 'doortohappinessholiday@gmail.com',
    phone: '+975 - 17910421',
    location: 'Thimphu, Bhutan'
  });

  return (
    <div className="flex min-h-screen">
      {/* Form Section - Dark Sidebar */}
      <div className="w-[420px] min-w-[420px] bg-[#1a1a2e] text-gray-200 overflow-y-auto max-h-screen sticky top-0">
        <InvoiceForm invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
      </div>
      
      {/* Preview Section */}
      <div className="flex-1 bg-[#e8eaf0] overflow-y-auto">
        <InvoicePreview invoiceData={invoiceData} />
      </div>
    </div>
  );
};

export default InvoiceGeneratorPage;
