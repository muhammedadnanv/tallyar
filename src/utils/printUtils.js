
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
          @media print {
            body { 
              margin: 0; 
              padding: 20px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .no-print { display: none !important; }
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
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

export const printReceipt = (receiptData) => {
  const printWindow = window.open('', '_blank');
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Tallyar - Receipt</title>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Courier New', monospace;
            margin: 0;
            padding: 20px;
            font-size: 12px;
            line-height: 1.4;
          }
          .receipt-container {
            max-width: 300px;
            margin: 0 auto;
          }
          .text-center { text-align: center; }
          .font-bold { font-weight: bold; }
          .mb-2 { margin-bottom: 8px; }
          .flex { display: flex; }
          .justify-between { justify-content: space-between; }
          .border-t { border-top: 1px solid #000; }
          .border-b { border-bottom: 1px solid #000; }
          .py-2 { padding: 8px 0; }
          .mt-4 { margin-top: 16px; }
          @media print {
            body { margin: 0; padding: 10px; }
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
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
