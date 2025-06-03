
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateReceiptPDF = async (receiptElement, receiptData) => {
  try {
    const canvas = await html2canvas(receiptElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Calculate dimensions for 80mm width (thermal printer width)
    const mmWidth = 80;
    const mmHeight = (canvas.height * mmWidth) / canvas.width;
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [mmWidth, mmHeight],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, mmWidth, mmHeight);

    const timestamp = new Date().getTime();
    const invoiceNumber = receiptData?.invoice?.number || 'Receipt';
    const fileName = `${invoiceNumber}_Receipt_${timestamp}.pdf`;

    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating receipt PDF:', error);
    throw error;
  }
};
