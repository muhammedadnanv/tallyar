
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateReceiptPDF = async (receiptElement, receiptData) => {
  try {
    // Create a temporary container optimized for thermal printing
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '300px'; // 80mm equivalent
    tempContainer.style.minHeight = '400px';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.fontFamily = '"Courier New", monospace';
    tempContainer.style.fontSize = '12px';
    tempContainer.style.lineHeight = '1.2';
    tempContainer.style.padding = '8px';
    document.body.appendChild(tempContainer);

    // Clone the receipt element content
    if (receiptElement) {
      tempContainer.innerHTML = receiptElement.innerHTML;
    } else {
      // Generate fallback receipt HTML
      tempContainer.innerHTML = generateReceiptHTML(receiptData);
    }

    // Wait for any fonts or images to load
    await new Promise(resolve => setTimeout(resolve, 500));

    const canvas = await html2canvas(tempContainer, {
      scale: 3, // Higher scale for better quality on thermal printers
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      foreignObjectRendering: true,
      width: 300,
      onclone: (clonedDoc) => {
        // Ensure fonts are loaded in cloned document
        const style = clonedDoc.createElement('style');
        style.textContent = `
          * {
            font-family: "Courier New", monospace !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        `;
        clonedDoc.head.appendChild(style);
      }
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Calculate dimensions for 80mm width (thermal printer width)
    const mmWidth = 80;
    const mmHeight = Math.max((canvas.height * mmWidth) / canvas.width, 100);
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [mmWidth, mmHeight],
      compress: true
    });

    pdf.addImage(imgData, 'PNG', 0, 0, mmWidth, mmHeight, undefined, 'FAST');

    const timestamp = new Date().getTime();
    const invoiceNumber = receiptData?.invoice?.number || 'Receipt';
    const fileName = `${invoiceNumber}_Receipt_${timestamp}.pdf`;

    pdf.save(fileName);
    
    // Cleanup
    document.body.removeChild(tempContainer);
  } catch (error) {
    console.error('Error generating receipt PDF:', error);
    throw error;
  }
};

// Helper function to generate receipt HTML
function generateReceiptHTML(receiptData) {
  const { billTo = {}, invoice = {}, yourCompany = {}, items = [], taxPercentage = 0, cashier = '', footer = '' } = receiptData || {};
  
  const subTotal = items.reduce((sum, item) => sum + ((item.quantity || 0) * (item.amount || 0)), 0);
  const taxAmount = (subTotal * (taxPercentage || 0)) / 100;
  const total = subTotal + taxAmount;

  return `
    <div style="text-align: center; font-weight: bold; margin-bottom: 8px;">RECEIPT</div>
    <div style="text-align: center; margin-bottom: 8px;">
      <div>${yourCompany.name || "Company Name"}</div>
      <div>${yourCompany.address || "Company Address"}</div>
      ${yourCompany.phone ? `<div>${yourCompany.phone}</div>` : ''}
    </div>
    <div style="margin-bottom: 8px;">
      <div>Invoice: ${invoice.number || "N/A"}</div>
      <div>Date: ${invoice.date || new Date().toLocaleDateString()}</div>
      <div>Customer: ${billTo.name || "N/A"}</div>
      <div>Cashier: ${cashier || "N/A"}</div>
    </div>
    <div style="border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 8px 0; margin-bottom: 8px;">
      <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 8px;">
        <span>Item</span>
        <span>Total</span>
      </div>
      ${items.map(item => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span>${item.name || "Item"} x ${item.quantity || 0}</span>
          <span>$${((item.quantity || 0) * (item.amount || 0)).toFixed(2)}</span>
        </div>
      `).join('')}
    </div>
    <div style="display: flex; justify-content: space-between;">
      <span>Subtotal:</span>
      <span>$${subTotal.toFixed(2)}</span>
    </div>
    ${taxPercentage > 0 ? `
      <div style="display: flex; justify-content: space-between;">
        <span>Tax (${taxPercentage}%):</span>
        <span>$${taxAmount.toFixed(2)}</span>
      </div>
    ` : ''}
    <div style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 8px;">
      <span>Total:</span>
      <span>$${total.toFixed(2)}</span>
    </div>
    <div style="text-align: center; margin-top: 16px;">${footer || "Thank you for your business!"}</div>
  `;
}
