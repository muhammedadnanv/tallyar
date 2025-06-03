
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (invoiceData, templateNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a temporary container for rendering
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '794px';
      tempContainer.style.height = '1123px';
      tempContainer.style.backgroundColor = 'white';
      document.body.appendChild(tempContainer);
      
      // Dynamically import and render the component
      const { default: React } = await import('react');
      const { createRoot } = await import('react-dom/client');
      const { default: InvoiceTemplate } = await import('../components/InvoiceTemplate');
      
      // Create root and render
      const root = createRoot(tempContainer);
      
      await new Promise((renderResolve) => {
        root.render(
          React.createElement(InvoiceTemplate, { 
            data: invoiceData, 
            templateNumber: templateNumber 
          })
        );
        
        // Wait for rendering to complete
        setTimeout(renderResolve, 1000);
      });
      
      // Capture with html2canvas
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        allowTaint: true,
        foreignObjectRendering: true
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Create PDF with exact A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      
      // A4 dimensions: 210mm x 297mm
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
      
      // Generate filename based on template and data
      const { number, date } = invoiceData.invoice;
      const { name: companyName } = invoiceData.yourCompany;
      const { name: billToName } = invoiceData.billTo;
      const timestamp = new Date().getTime();

      let fileName;
      switch (templateNumber) {
        case 1:
          fileName = `Invoice_${number || timestamp}.pdf`;
          break;
        case 2:
          fileName = `${companyName || 'Company'}_${number || timestamp}.pdf`;
          break;
        case 3:
          fileName = `${companyName || 'Invoice'}_${timestamp}.pdf`;
          break;
        case 4:
          fileName = `Invoice_${date || new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`;
          break;
        case 5:
          fileName = `${number || 'INV'}-${date || new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`;
          break;
        case 6:
          fileName = `TaxInvoice_${timestamp}.pdf`;
          break;
        case 7:
          fileName = `Invoice_${number || timestamp}.pdf`;
          break;
        case 8:
          fileName = `Invoice_${billToName || 'Customer'}_${timestamp}.pdf`;
          break;
        case 9:
          fileName = `IN-${date || new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`;
          break;
        default:
          fileName = `invoice_template_${templateNumber}_${timestamp}.pdf`;
      }

      pdf.save(fileName);
      
      // Cleanup
      root.unmount();
      document.body.removeChild(tempContainer);
      resolve();
    } catch (error) {
      console.error('Error generating PDF:', error);
      reject(error);
    }
  });
};
