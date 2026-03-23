import React, { useRef } from 'react';
import { InvoiceData, Traveler, CostItem } from '../../utils/invoice-types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoiceData }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const calculateTotal = () => {
    return invoiceData.costItems.reduce((sum: number, item: CostItem) => sum + item.amount, 0);
  };

  const nightsBetween = (arrival: string, departure: string) => {
    if (!arrival || !departure) return 0;
    const diff = (new Date(departure).getTime() - new Date(arrival).getTime()) / 86400000;
    return diff > 0 ? Math.ceil(diff) : 0;
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '–';
    const dt = new Date(dateString + 'T00:00:00');
    const day = dt.getDate();
    const suffix = ['th', 'st', 'nd', 'rd'][day % 10 > 3 ? 0 : (day % 100 - day % 10 !== 10 ? day % 10 : 0)];
    return day + suffix + ' ' + dt.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  };

  const formatInvoiceDate = (dateString: string) => {
    if (!dateString) return '–';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const downloadPDF = async () => {
    if (!invoiceRef.current) return;

    const btn = document.querySelector('#download-pdf-btn') as HTMLButtonElement;
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Generating…';
    }

    try {
      const el = invoiceRef.current;
      const canvas = await html2canvas(el, { 
        scale: 1.5, 
        useCORS: true, 
        backgroundColor: '#fff' 
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.85);
      const pdf = new jsPDF({ 
        orientation: 'portrait', 
        unit: 'mm', 
        format: 'a4' 
      });

      const pW = pdf.internal.pageSize.getWidth();
      const pH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.height / canvas.width;
      const imgH = pW * ratio;

      let pos = 0;
      let remaining = imgH;
      let page = 0;

      while (remaining > 0) {
        if (page > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, -pos, pW, imgH);
        pos += pH;
        remaining -= pH;
        page++;
      }

      const confNo = invoiceData.confirmationNumber || 'invoice';
      pdf.save(`Invoice_${confNo}.pdf`);
    } catch (e) {
      alert('PDF generation failed. Please try again.');
      console.error(e);
    }

    if (btn) {
      btn.disabled = false;
      btn.textContent = '⬇ Download PDF';
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      {/* Preview Label */}
      <div className="text-[11px] uppercase tracking-[2px] text-gray-500 mb-4">
        Live Preview
      </div>

      {/* Download Button */}
      <button
        id="download-pdf-btn"
        onClick={downloadPDF}
        className="mb-6 px-6 py-3 bg-[#7b8cde] text-white rounded-lg font-semibold text-sm tracking-wide hover:bg-[#5a6abf] transition-colors"
      >
        ⬇ Download PDF
      </button>

      {/* Invoice Document */}
      <div
        ref={invoiceRef}
        className="w-[900px] bg-white shadow-2xl"
        style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
      >
        <div className="p-12 min-h-[1120px] flex flex-col" style={{ fontSize: '13px', color: '#1a1a2e' }}>
          
          {/* Header */}
          <div className="flex justify-between items-start mb-1.5">
            <div className="flex items-center gap-4">
              <img 
                src="/logo.svg" 
                alt="Door To Happiness Holiday Logo" 
                className="h-16 w-auto object-contain"
              />
              <div>
                <div className="text-[28px] font-extrabold leading-tight" style={{ color: '#1a1a2e' }}>
                  {invoiceData.companyName}
                </div>
                <div className="text-[13px] font-bold tracking-[2px] mt-1" style={{ color: '#1a1a2e' }}>
                  INVOICE
                </div>
              </div>
            </div>
            <div className="text-right text-xs leading-relaxed" style={{ color: '#333' }}>
              <div><strong style={{ color: '#1a1a2e' }}>Confirmation No:</strong> {invoiceData.confirmationNumber}</div>
              <div><strong style={{ color: '#1a1a2e' }}>Date:</strong> {formatInvoiceDate(invoiceData.invoiceDate)}</div>
            </div>
          </div>

          <hr className="border-t-2 border-[#1a1a2e] my-3" />

          {/* Bill To */}
          <div className="mb-6">
            <div className="text-xs font-bold tracking-[1.5px] uppercase mb-2.5" style={{ color: '#1a1a2e' }}>
              Bill To
            </div>
            <div className="bg-[#f5f6fa] rounded p-3 text-xs leading-relaxed min-h-[60px]">
              {invoiceData.agentName && (
                <div><strong>Agent Name :</strong> {invoiceData.agentName}</div>
              )}
              {invoiceData.agentAddress && (
                <div><strong>Address :</strong> {invoiceData.agentAddress}</div>
              )}
              {invoiceData.vatNumber && (
                <div><strong>VAT No :</strong> {invoiceData.vatNumber}</div>
              )}
            </div>
          </div>

          {/* Travel Details Table */}
          <div className="mb-6">
            <div className="text-xs font-bold tracking-[1.5px] uppercase mb-2.5" style={{ color: '#1a1a2e' }}>
              Travel Details
            </div>
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#1a1a2e] text-white">
                  <th className="border border-[#1a1a2e] px-2.5 py-2 text-left font-semibold text-[11.5px]">S/N</th>
                  <th className="border border-[#1a1a2e] px-2.5 py-2 text-left font-semibold text-[11.5px]">Name</th>
                  <th className="border border-[#1a1a2e] px-2.5 py-2 text-left font-semibold text-[11.5px]">Document No.</th>
                  <th className="border border-[#1a1a2e] px-2.5 py-2 text-left font-semibold text-[11.5px]">Arrival Date</th>
                  <th className="border border-[#1a1a2e] px-2.5 py-2 text-left font-semibold text-[11.5px]">Departure Date</th>
                  <th className="border border-[#1a1a2e] px-2.5 py-2 text-left font-semibold text-[11.5px]">Nights</th>
                  <th className="border border-[#1a1a2e] px-2.5 py-2 text-left font-semibold text-[11.5px]">Destination</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.travelers.map((traveler: Traveler, index: number) => {
                  const nights = nightsBetween(traveler.arrivalDate, traveler.departureDate);
                  return (
                    <tr key={traveler.id} className={index % 2 === 1 ? 'bg-[#f9f9fc]' : ''}>
                      <td className="border border-[#d0d4e8] px-2.5 py-2">{traveler.serial}</td>
                      <td className="border border-[#d0d4e8] px-2.5 py-2">{traveler.fullName || '–'}</td>
                      <td className="border border-[#d0d4e8] px-2.5 py-2">{traveler.documentNumber || '–'}</td>
                      <td className="border border-[#d0d4e8] px-2.5 py-2">{formatDisplayDate(traveler.arrivalDate)}</td>
                      <td className="border border-[#d0d4e8] px-2.5 py-2">{formatDisplayDate(traveler.departureDate)}</td>
                      <td className="border border-[#d0d4e8] px-2.5 py-2">{nights} Night{nights !== 1 ? 's' : ''}</td>
                      <td className="border border-[#d0d4e8] px-2.5 py-2">{traveler.destination || '–'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cost Breakdown Table */}
          <div className="mb-6">
            <div className="text-xs font-bold tracking-[1.5px] uppercase mb-2.5" style={{ color: '#1a1a2e' }}>
              Cost Breakdown
            </div>
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#1a1a2e] text-white">
                  <th className="border border-[#1a1a2e] px-3.5 py-2 text-left font-semibold text-[11.5px]" style={{ width: '70%' }}>
                    Description
                  </th>
                  <th className="border border-[#1a1a2e] px-3.5 py-2 text-right font-semibold text-[11.5px]">
                    Amount (USD)
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.costItems.map((item: CostItem, index: number) => (
                  <tr key={item.id} className={index % 2 === 1 ? 'bg-[#f9f9fc]' : ''}>
                    <td className="border border-[#d0d4e8] px-3.5 py-2">{item.description || '–'}</td>
                    <td className="border border-[#d0d4e8] px-3.5 py-2 text-right">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td className="border border-[#d0d4e8] px-3.5 py-2.5 text-right font-bold text-[13px]" style={{ color: '#1a1a2e' }}>
                    Total Amount Payable
                  </td>
                  <td className="border border-[#d0d4e8] px-3.5 py-2.5 text-right font-bold text-[15px]" style={{ color: '#1a1a2e' }}>
                    ${calculateTotal().toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Beneficiary Details */}
          <div className="mb-8">
            <div className="text-xs font-bold tracking-[1.5px] uppercase mb-2.5" style={{ color: '#1a1a2e' }}>
              Beneficiary Details
            </div>
            <div className="text-xs space-y-1.5">
              <div>
                <strong className="font-bold" style={{ color: '#1a1a2e' }}>Name:</strong>{' '}
                <span className="text-[#444]">{invoiceData.beneficiaryName}</span>
              </div>
              <div>
                <strong className="font-bold" style={{ color: '#1a1a2e' }}>Account No:</strong>{' '}
                <span className="text-[#444]">{invoiceData.accountNumber}</span>
              </div>
              <div>
                <strong className="font-bold" style={{ color: '#1a1a2e' }}>Account Type:</strong>{' '}
                <span className="text-[#444]">{invoiceData.accountType}</span>
              </div>
              <div>
                <strong className="font-bold" style={{ color: '#1a1a2e' }}>Bank Name:</strong>{' '}
                <span className="text-[#444]">{invoiceData.bankName}</span>
              </div>
              <div>
                <strong className="font-bold" style={{ color: '#1a1a2e' }}>Swift Code:</strong>{' '}
                <span className="text-[#444]">{invoiceData.swiftCode}</span>
              </div>
              <div>
                <strong className="font-bold" style={{ color: '#1a1a2e' }}>Address:</strong>{' '}
                <span className="text-[#444]">{invoiceData.bankAddress}</span>
              </div>
            </div>
          </div>

          {/* Signature */}
          <div className="flex justify-end mb-4">
            <div className="text-right">
              <div className="w-[220px] border-t-[1.5px] border-[#1a1a2e] mb-1.5"></div>
              <div className="text-xs font-bold" style={{ color: '#1a1a2e' }}>Authorised Signature</div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-[#1a1a2e] pt-3 text-center mt-auto">
            <div className="font-bold text-[13px] mb-1.5" style={{ color: '#1a1a2e' }}>
              {invoiceData.companyName}
            </div>
            <div className="flex justify-center gap-7 flex-wrap text-[11.5px] text-[#555]">
              <span className="flex items-center gap-1.5">🌐 {invoiceData.website}</span>
              <span className="flex items-center gap-1.5">✉ {invoiceData.email}</span>
              <span className="flex items-center gap-1.5">📞 {invoiceData.phone}</span>
              <span className="flex items-center gap-1.5">📍 {invoiceData.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
