# Travel Invoice Generator

A professional, modern web application for generating travel invoices with a polished dark sidebar interface, live preview, and PDF export capabilities.

## 🎨 Design Highlights

- **Dark Sidebar Editor**: Professional dark theme (#1a1a2e) with excellent contrast and readability
- **Live Preview Panel**: Real-time invoice preview as you type on a clean white document
- **Premium Typography**: Refined fonts, spacing, and visual hierarchy
- **Alternating Table Rows**: Enhanced readability with subtle row striping
- **Ordinal Date Formatting**: Dates display with suffixes (1st, 2nd, 3rd April 2026)
- **Multi-Page PDF Support**: Automatically handles invoices longer than one page

## 🚀 Features

- **Live Invoice Preview**: See real-time updates as you fill in the form
- **PDF Generation**: Export professional-looking invoices as PDF files
- **Dynamic Forms**: 
  - Add/remove multiple travelers
  - Add/remove cost line items
- **Auto-calculations**:
  - Automatically calculate nights from arrival/departure dates
  - Auto-sum total amount from cost items
- **Pre-filled Templates**: Bank details and company info are pre-filled but editable
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📍 Access

Navigate to `/invoice/generator` in your application or use the "Invoice Generator" link in the admin navigation bar.

## 📋 How to Use

### 1. Invoice Header
- Enter confirmation number (e.g., DTH1091)
- Select invoice date (defaults to today)
- Edit company name if needed

### 2. Bill To (Agent Details)
- Enter agent/company name
- Add address
- Include VAT number

### 3. Traveler Details
- Click "+ Add Traveler" to add more travelers
- For each traveler, enter:
  - Full Name
  - Document/Passport Number
  - Arrival Date (the system will auto-calculate nights)
  - Departure Date
  - Manually adjust nights if needed
  - Destination (defaults to "Bhutan")
- Serial numbers are automatically generated
- Remove travelers by clicking "Remove" button

### 4. Cost Breakdown
- Click "+ Add Item" to add more cost items
- For each item:
  - Enter description (e.g., "Visa Fees", "Hotel", "Guide Fee")
  - Enter amount in USD
- Total is automatically calculated
- Remove items using the "✕" button

### 5. Beneficiary/Bank Details
Pre-filled with default values but editable:
- Beneficiary Name: Door to Happiness Holiday
- Account No: 640007528
- Account Type: Dollar Account
- Bank Name: Bhutan National Bank Limited
- Swift Code: BNBTBTBT
- Address: Norzin Lam, RICBL Building, Thimphu, Bhutan

### 6. Company Footer
Pre-filled but editable:
- Website
- Email
- Phone
- Location

### 7. Generate PDF
- Review the live preview on the right side
- Click "📥 Download PDF" to generate and download the invoice
- PDF filename includes confirmation number and timestamp

## 🎨 Invoice Layout

The generated PDF includes:
- **Premium Header**: Bold company name with "INVOICE" label
- **Meta Information**: Confirmation number and date in top-right
- **Bill To Section**: Clean, boxed agent details with subtle background
- **Travel Details Table**: Dark header with S/N, names, dates (with ordinal formatting), nights, destination
- **Cost Breakdown Table**: Description and amounts with bold total row
- **Beneficiary Details**: Two-column grid layout for bank information
- **Authorised Signature**: Professional signature line  
- **Footer**: Centered company info with website, email, phone, and location

### Visual Design Features
- **Typography**: Segoe UI font family for professional appearance
- **Colors**: Dark navy (#1a1a2e) headers with light backgrounds (#f5f6fa, #f9f9fc)
- **Tables**: Bordered cells with alternating row colors for readability
- **Spacing**: Generous padding and margins for clean document flow
- **A4 Format**: Perfect 794px width optimized for print

## 🆕 Latest Updates (23 March 2026)

### Complete Design Overhaul
The invoice generator has been redesigned with a premium interface:
- **Dark Sidebar**: 420px fixed-width sidebar with dark theme for the form
- **Improved Form Styling**: Smaller, tighter form controls with better labels
- **Better Color Scheme**: Purple accent (#7b8cde) for interactive elements
- **Enhanced Preview**: Centered invoice document on light gray background
- **Date Improvements**: Ordinal suffixes (9th April 2026 instead of Apr 9, 2026)
- **Better PDF Quality**: JPEG compression at 97% quality for smaller file sizes
- **Table Enhancements**: Alternating row colors and better cell padding

### Key Features Maintained
- Serial numbers (S/N) in traveler table (not Pax)
- Auto-calculation of nights between dates
- Dynamic add/remove travelers and cost items
- Pre-filled bank details for Door To Happiness Holiday
- Full edit capability for all fields

## 📋 Invoice Layout

The generated PDF includes:
- Company header with invoice title
- Confirmation number and date
- Bill To section with agent details
- Travel Details table (with serial numbers, names, dates, nights, destination)
- Cost Breakdown table with total
- Beneficiary bank details
- Authorised signature line
- Company footer with contact information

## ⚡ Technical Details

### Technologies Used
- **Next.js**: React framework
- **TypeScript**: Type-safe development
- **TailwindCSS**: Styling
- **jsPDF**: PDF generation
- **html2canvas**: Converting HTML to canvas for PDF

### Files Created
- `/src/pages/invoice/generator.tsx` - Main page
- `/src/components/invoice/InvoiceForm.tsx` - Form component
- `/src/components/invoice/InvoicePreview.tsx` - Preview & PDF generation
- `/src/utils/invoice-types.ts` - TypeScript interfaces

### Dependencies Added
- `jspdf@4.2.1`
- `html2canvas@1.4.1`

## 🔧 Customization

You can customize default values in the main page (`/src/pages/invoice/generator.tsx`):
- Default company name
- Default beneficiary details
- Default bank information
- Default footer information

## 📱 Navigation

The invoice generator is accessible from:
- Direct URL: `/invoice/generator`
- Admin navigation menu (both desktop and mobile)

## 💡 Tips

1. **Auto-calculate nights**: The system automatically calculates nights when you enter both arrival and departure dates
2. **Manual override**: You can manually edit the nights field if needed
3. **Serial numbers**: Serial numbers for travelers are automatically maintained when adding/removing travelers
4. **Total calculation**: Total amount is automatically updated as you modify cost items
5. **PDF quality**: The PDF is generated at high resolution (scale: 2) for print quality

## 🐛 Troubleshooting

- **PDF not generating**: Ensure all required fields have valid data
- **Dates not calculating**: Make sure both arrival and departure dates are filled
- **PDF looks cut off**: The system automatically handles multi-page PDFs when content exceeds one page

## 📄 License

Part of the Door To Happiness Holiday application.
