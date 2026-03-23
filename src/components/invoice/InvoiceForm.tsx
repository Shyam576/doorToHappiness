import React from 'react';
import { InvoiceData, Traveler, CostItem } from '../../utils/invoice-types';
import { v4 as uuidv4 } from 'uuid';

interface InvoiceFormProps {
  invoiceData: InvoiceData;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoiceData, setInvoiceData }) => {
  
  const handleInputChange = (field: keyof InvoiceData, value: any) => {
    setInvoiceData((prev: InvoiceData) => ({ ...prev, [field]: value }));
  };

  const handleTravelerChange = (id: string, field: keyof Traveler, value: any) => {
    setInvoiceData((prev: InvoiceData) => ({
      ...prev,
      travelers: prev.travelers.map((t: Traveler) => {
        if (t.id === id) {
          const updatedTraveler = { ...t, [field]: value };
          
          // Auto-calculate nights if arrival or departure date changes
          if ((field === 'arrivalDate' || field === 'departureDate') && 
              updatedTraveler.arrivalDate && updatedTraveler.departureDate) {
            const arrival = new Date(updatedTraveler.arrivalDate);
            const departure = new Date(updatedTraveler.departureDate);
            const diffTime = Math.abs(departure.getTime() - arrival.getTime());
            updatedTraveler.nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          }
          
          return updatedTraveler;
        }
        return t;
      })
    }));
  };

  const handleCostItemChange = (id: string, field: keyof CostItem, value: any) => {
    setInvoiceData((prev: InvoiceData) => ({
      ...prev,
      costItems: prev.costItems.map((item: CostItem) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addTraveler = () => {
    const newSerial = invoiceData.travelers.length + 1;
    const newTraveler: Traveler = {
      id: uuidv4(),
      fullName: '',
      documentNumber: '',
      arrivalDate: '',
      departureDate: '',
      nights: 0,
      destination: 'Bhutan',
      serial: newSerial
    };
    setInvoiceData((prev: InvoiceData) => ({
      ...prev,
      travelers: [...prev.travelers, newTraveler]
    }));
  };

  const removeTraveler = (id: string) => {
    if (invoiceData.travelers.length > 1) {
      setInvoiceData((prev: InvoiceData) => ({
        ...prev,
        travelers: prev.travelers
          .filter((t: Traveler) => t.id !== id)
          .map((t: Traveler, index: number) => ({ ...t, serial: index + 1 }))
      }));
    }
  };

  const addCostItem = () => {
    const newItem: CostItem = {
      id: uuidv4(),
      description: '',
      amount: 0
    };
    setInvoiceData((prev: InvoiceData) => ({
      ...prev,
      costItems: [...prev.costItems, newItem]
    }));
  };

  const removeCostItem = (id: string) => {
    if (invoiceData.costItems.length > 1) {
      setInvoiceData((prev: InvoiceData) => ({
        ...prev,
        costItems: prev.costItems.filter((item: CostItem) => item.id !== id)
      }));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-white text-base font-semibold mb-6 tracking-wide">🏔 Invoice Generator</h2>

      {/* Invoice Info */}
      <div className="mb-6">
        <h3 className="text-[#7b8cde] text-[11px] uppercase tracking-[1.5px] mb-3 pb-2 border-b border-[#2e3155]">
          Invoice Info
        </h3>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <label className="block text-[11px] text-[#9a9abf] mb-1">Confirmation No.</label>
            <input
              type="text"
              value={invoiceData.confirmationNumber}
              onChange={(e) => handleInputChange('confirmationNumber', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
            />
          </div>
          <div>
            <label className="block text-[11px] text-[#9a9abf] mb-1">Date</label>
            <input
              type="date"
              value={invoiceData.invoiceDate}
              onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
            />
          </div>
        </div>
        <div>
          <label className="block text-[11px] text-[#9a9abf] mb-1">Company Name</label>
          <input
            type="text"
            value={invoiceData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
          />
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-6">
        <h3 className="text-[#7b8cde] text-[11px] uppercase tracking-[1.5px] mb-3 pb-2 border-b border-[#2e3155]">
          Bill To :
        </h3>
        <div className="space-y-2">
          <div>
            <label className="block text-[11px] text-[#9a9abf] mb-1">Agent / Company Name</label>
            <input
              type="text"
              value={invoiceData.agentName}
              onChange={(e) => handleInputChange('agentName', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
            />
          </div>
          <div>
            <label className="block text-[11px] text-[#9a9abf] mb-1">Address</label>
            <input
              type="text"
              value={invoiceData.agentAddress}
              onChange={(e) => handleInputChange('agentAddress', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
            />
          </div>
          <div>
            <label className="block text-[11px] text-[#9a9abf] mb-1">VAT No.</label>
            <input
              type="text"
              value={invoiceData.vatNumber}
              onChange={(e) => handleInputChange('vatNumber', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
            />
          </div>
        </div>
      </div>

      {/* Travelers */}
      <div className="mb-6">
        <h3 className="text-[#7b8cde] text-[11px] uppercase tracking-[1.5px] mb-3 pb-2 border-b border-[#2e3155]">
          Travelers
        </h3>
        <div className="space-y-2">
          {invoiceData.travelers.map((traveler: Traveler) => (
            <div key={traveler.id} className="relative bg-[#12122a] border border-[#2e3155] rounded-lg p-3">
              {invoiceData.travelers.length > 1 && (
                <button
                  onClick={() => removeTraveler(traveler.id)}
                  className="absolute top-2 right-2 bg-[#c0392b] text-white text-[11px] px-2 py-0.5 rounded hover:bg-[#a02d20]"
                >
                  ✕
                </button>
              )}
              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] text-[#9a9abf] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={traveler.fullName}
                    onChange={(e) => handleTravelerChange(traveler.id, 'fullName', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#0a0a18] text-gray-200 outline-none focus:border-[#7b8cde]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#9a9abf] mb-1">Document / Passport No.</label>
                  <input
                    type="text"
                    value={traveler.documentNumber}
                    onChange={(e) => handleTravelerChange(traveler.id, 'documentNumber', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#0a0a18] text-gray-200 outline-none focus:border-[#7b8cde]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-[#9a9abf] mb-1">Arrival Date</label>
                    <input
                      type="date"
                      value={traveler.arrivalDate}
                      onChange={(e) => handleTravelerChange(traveler.id, 'arrivalDate', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#0a0a18] text-gray-200 outline-none focus:border-[#7b8cde]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#9a9abf] mb-1">Departure Date</label>
                    <input
                      type="date"
                      value={traveler.departureDate}
                      onChange={(e) => handleTravelerChange(traveler.id, 'departureDate', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#0a0a18] text-gray-200 outline-none focus:border-[#7b8cde]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-[#9a9abf] mb-1">Destination</label>
                  <input
                    type="text"
                    value={traveler.destination}
                    onChange={(e) => handleTravelerChange(traveler.id, 'destination', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#0a0a18] text-gray-200 outline-none focus:border-[#7b8cde]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addTraveler}
          className="w-full mt-2 px-3 py-2 rounded-md border border-dashed border-[#7b8cde] bg-transparent text-[#7b8cde] text-xs hover:bg-[#2e3155] transition"
        >
          + Add Traveler
        </button>
      </div>

      {/* Cost Breakdown */}
      <div className="mb-6">
        <h3 className="text-[#7b8cde] text-[11px] uppercase tracking-[1.5px] mb-3 pb-2 border-b border-[#2e3155]">
          Cost Breakdown
        </h3>
        <div className="space-y-2">
          {invoiceData.costItems.map((item: CostItem) => (
            <div key={item.id} className="relative bg-[#12122a] border border-[#2e3155] rounded-lg p-3">
              {invoiceData.costItems.length > 1 && (
                <button
                  onClick={() => removeCostItem(item.id)}
                  className="absolute top-2 right-2 bg-[#c0392b] text-white text-[11px] px-2 py-0.5 rounded hover:bg-[#a02d20]"
                >
                  ✕
                </button>
              )}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-[#9a9abf] mb-1">Description</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleCostItemChange(item.id, 'description', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#0a0a18] text-gray-200 outline-none focus:border-[#7b8cde]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#9a9abf] mb-1">
                    Amount ({invoiceData.currency === 'INR' ? 'INR' : 'USD'})
                  </label>
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) => handleCostItemChange(item.id, 'amount', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#0a0a18] text-gray-200 outline-none focus:border-[#7b8cde]"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addCostItem}
          className="w-full mt-2 px-3 py-2 rounded-md border border-dashed border-[#7b8cde] bg-transparent text-[#7b8cde] text-xs hover:bg-[#2e3155] transition"
        >
          + Add Cost Item
        </button>
      </div>

      {/* Currency Selector */}
      <div className="mb-6">
        <h3 className="text-[#7b8cde] text-[11px] uppercase tracking-[1.5px] mb-3 pb-2 border-b border-[#2e3155]">
          Currency
        </h3>
        <div>
          <label className="block text-[11px] text-[#9a9abf] mb-1">Currency</label>
          <select
            value={invoiceData.currency}
            onChange={(e) => handleInputChange('currency', e.target.value)}
            className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
          >
            <option value="USD">USD ($)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </div>
      </div>

      {/* Beneficiary Details */}
      <div className="mb-6">
        <h3 className="text-[#7b8cde] text-[11px] uppercase tracking-[1.5px] mb-3 pb-2 border-b border-[#2e3155]">
          Beneficiary Details
        </h3>
        <div className="space-y-2">
          <div>
            <label className="block text-[11px] text-[#9a9abf] mb-1">Name</label>
            <input
              type="text"
              value={invoiceData.beneficiaryName}
              onChange={(e) => handleInputChange('beneficiaryName', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] text-[#9a9abf] mb-1">Account No.</label>
              <input
                type="text"
                value={invoiceData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#9a9abf] mb-1">Account Type</label>
              <select
                value={invoiceData.accountType}
                onChange={(e) => handleInputChange('accountType', e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
              >
                <option value="Dollar Account">Dollar Account</option>
                <option value="INR Account">INR Account</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] text-[#9a9abf] mb-1">Bank Name</label>
              <input
                type="text"
                value={invoiceData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#9a9abf] mb-1">Swift Code</label>
              <input
                type="text"
                value={invoiceData.swiftCode}
                onChange={(e) => handleInputChange('swiftCode', e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] text-[#9a9abf] mb-1">Bank Address</label>
            <input
              type="text"
              value={invoiceData.bankAddress}
              onChange={(e) => handleInputChange('bankAddress', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
            />
          </div>
        </div>
      </div>

      {/* Company Footer */}
      <div className="mb-6">
        <h3 className="text-[#7b8cde] text-[11px] uppercase tracking-[1.5px] mb-3 pb-2 border-b border-[#2e3155]">
          Company Footer
        </h3>
        <div className="space-y-2">
          <div>
            <label className="block text-[11px] text-[#9a9abf] mb-1">Website</label>
            <input
              type="text"
              value={invoiceData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
            />
          </div>
          <div>
            <label className="block text-[11px] text-[#9a9abf] mb-1">Email</label>
            <input
              type="email"
              value={invoiceData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
            />
          </div>
          <div>
            <label className="block text-[11px] text-[#9a9abf] mb-1">Phone</label>
            <input
              type="tel"
              value={invoiceData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
            />
          </div>
          <div>
            <label className="block text-[11px] text-[#9a9abf] mb-1">Location</label>
            <input
              type="text"
              value={invoiceData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-md border border-[#2e3155] bg-[#12122a] text-gray-200 outline-none focus:border-[#7b8cde]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
