
export const printElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found for printing');
    return;
  }

  const printWindow = window.open('', '_blank');
  
  // Get all styles from the current document
  const styles = Array.from(document.styleSheets)
    .map(styleSheet => {
      try {
        return Array.from(styleSheet.cssRules)
          .map(rule => rule.cssText)
          .join('');
      } catch (e) {
        console.log('Could not access stylesheet', e);
        return '';
      }
    })
    .join('');

  // Also get inline styles
  const inlineStyles = Array.from(document.getElementsByTagName('style'))
    .map(style => style.innerHTML)
    .join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Tallyar - Print</title>
        <meta charset="utf-8">
        <style>
          ${styles}
          ${inlineStyles}
          
          @page {
            size: A4;
            margin: 0.5in;
          }
          
          @media print {
            body { 
              margin: 0; 
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .no-print { 
              display: none !important; 
            }
            
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .print-break-before {
              page-break-before: always;
            }
            
            .print-break-after {
              page-break-after: always;
            }
            
            .print-avoid-break {
              page-break-inside: avoid;
            }
            
            table {
              page-break-inside: auto;
            }
            
            tr {
              page-break-inside: avoid;
              page-break-after: auto;
            }
            
            thead {
              display: table-header-group;
            }
            
            tfoot {
              display: table-footer-group;
            }
          }
          
          @media screen {
            body {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        ${element.outerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  
  // Wait for content to load before printing
  setTimeout(() => {
    printWindow.print();
    setTimeout(() => {
      printWindow.close();
    }, 100);
  }, 500);
};

export const printReceipt = (receiptData, receiptElement) => {
  const printWindow = window.open('', '_blank');
  
  // If receiptElement is provided, use it directly
  const contentHTML = receiptElement ? receiptElement.outerHTML : generateReceiptHTML(receiptData);
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Tallyar - Receipt</title>
        <meta charset="utf-8">
        <style>
          @page {
            size: 80mm auto;
            margin: 2mm;
          }
          
          body {
            font-family: 'Courier New', monospace;
            margin: 0;
            padding: 2mm;
            font-size: 8pt;
            line-height: 1.2;
            width: 76mm;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .receipt-container {
            width: 100%;
            max-width: 76mm;
            margin: 0 auto;
          }
          
          .text-center { text-align: center; }
          .font-bold { font-weight: bold; }
          .mb-2 { margin-bottom: 4pt; }
          .flex { display: flex; }
          .justify-between { justify-content: space-between; }
          .border-t { border-top: 1px solid #000; }
          .border-b { border-bottom: 1px solid #000; }
          .border-dashed { border-style: dashed; }
          .py-2 { padding: 2pt 0; }
          .mt-4 { margin-top: 8pt; }
          
          @media print {
            body { margin: 0; padding: 2mm; }
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          ${contentHTML}
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    setTimeout(() => {
      printWindow.close();
    }, 100);
  }, 500);
};

// Fallback function to generate receipt HTML if element not provided
function generateReceiptHTML(receiptData) {
  return `
    <div class="text-center font-bold mb-2">RECEIPT</div>
    <div class="text-center mb-2">${receiptData.yourCompany?.name || 'Tallyar'}</div>
    <div class="text-center mb-2">${receiptData.yourCompany?.address || ''}</div>
    <div class="text-center mb-2">${receiptData.yourCompany?.phone || ''}</div>
    <div class="border-t border-b py-2 mb-2">
      <div>Invoice: ${receiptData.invoice?.number || 'N/A'}</div>
      <div>Date: ${receiptData.invoice?.date || new Date().toLocaleDateString()}</div>
      <div>Customer: ${receiptData.billTo?.name || 'N/A'}</div>
    </div>
    <div class="border-b py-2 mb-2">
      ${receiptData.items?.map(item => `
        <div class="flex justify-between">
          <span>${item.name || 'Item'} x ${item.quantity || 0}</span>
          <span>$${((item.quantity || 0) * (item.amount || 0)).toFixed(2)}</span>
        </div>
      `).join('') || ''}
    </div>
    <div class="flex justify-between font-bold">
      <span>Total:</span>
      <span>$${receiptData.grandTotal || '0.00'}</span>
    </div>
    <div class="text-center mt-4">Thank you for your business!</div>
  `;
}
