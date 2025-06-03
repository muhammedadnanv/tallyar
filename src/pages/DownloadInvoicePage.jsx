
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Download, FileText, ArrowLeft } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';
import InvoiceTemplate from '../components/InvoiceTemplate';

const DownloadInvoicePage = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const [invoiceInfo, setInvoiceInfo] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve invoice data from localStorage
    const invoiceKey = `invoice-${invoiceId}`;
    const storedData = localStorage.getItem(invoiceKey);
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        // Check if data is not too old (24 hours)
        const isExpired = Date.now() - parsedData.timestamp > 24 * 60 * 60 * 1000;
        
        if (isExpired) {
          setError('This invoice link has expired.');
        } else {
          setInvoiceInfo(parsedData);
        }
      } catch (error) {
        setError('Invalid invoice data.');
      }
    } else {
      setError('Invoice not found.');
    }
  }, [invoiceId]);

  const handleDownload = async () => {
    if (!invoiceInfo) return;
    
    setIsDownloading(true);
    try {
      await generatePDF(invoiceInfo.data, invoiceInfo.templateNumber);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      setError('Failed to download invoice.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Invoice Not Available</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button onClick={() => navigate('/')} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go to Home
        </Button>
      </div>
    );
  }

  if (!invoiceInfo) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading invoice...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <FileText className="mx-auto h-16 w-16 text-blue-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Invoice Ready for Download</h1>
        <p className="text-gray-600 mb-6">
          Invoice #{invoiceInfo.data.invoice.number} - {invoiceInfo.data.yourCompany.name}
        </p>
        
        <div className="flex justify-center gap-4">
          <Button onClick={handleDownload} disabled={isDownloading} className="bg-blue-500 hover:bg-blue-600">
            {isDownloading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
          
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>

      <div className="w-[210mm] h-[297mm] mx-auto border shadow-lg scale-75 origin-top">
        <InvoiceTemplate data={invoiceInfo.data} templateNumber={invoiceInfo.templateNumber} />
      </div>
    </div>
  );
};

export default DownloadInvoicePage;
