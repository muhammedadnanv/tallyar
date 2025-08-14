
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Printer } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { generateReceiptPDF } from '../utils/receiptPDFGenerator';
import { printElement } from '../utils/printUtils';
import Receipt1 from '../components/templates/Receipt1';
import Receipt2 from '../components/templates/Receipt2';
import Receipt3 from '../components/templates/Receipt3';
import Receipt4 from '../components/templates/Receipt4';

const receiptTemplates = [
  { id: 1, name: 'Receipt 1', component: Receipt1 },
  { id: 2, name: 'Receipt 2', component: Receipt2 },
  { id: 3, name: 'Receipt 3', component: Receipt3 },
  { id: 4, name: 'Receipt 4', component: Receipt4 },
];

const ReceiptPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [currentTemplate, setCurrentTemplate] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
      setCurrentTemplate(location.state.selectedTemplate || 1);
    } else {
      const savedFormData = localStorage.getItem('receiptData');
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    }
  }, [location.state]);

  const handleTemplateChange = (templateId) => {
    setCurrentTemplate(templateId);
  };

  const handleDownloadPDF = async () => {
    if (formData && !isDownloading) {
      setIsDownloading(true);
      try {
        const receiptElement = document.getElementById('receipt-template');
        await generateReceiptPDF(receiptElement);
      } catch (error) {
        console.error('Error generating PDF:', error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handlePrint = () => {
    if (!isPrinting) {
      setIsPrinting(true);
      try {
        printElement('receipt-template');
      } catch (error) {
        console.error('Error printing:', error);
      } finally {
        setIsPrinting(false);
      }
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  const SelectedTemplate = receiptTemplates.find(t => t.id === currentTemplate)?.component || Receipt1;

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 safe-area-inset safe-area-inset-top safe-area-inset-bottom">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <Button variant="ghost" onClick={handleBack} size="touch" className="w-full sm:w-auto">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button onClick={handlePrint} disabled={isPrinting} variant="outline" size="touch" className="w-full sm:w-auto">
            {isPrinting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Printing...
              </>
            ) : (
              <>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </>
            )}
          </Button>
          <Button onClick={handleDownloadPDF} disabled={isDownloading} size="touch" className="w-full sm:w-auto">>
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              "Download PDF"
            )}
          </Button>
        </div>
      </div>

      <div className="mb-6 sm:mb-8 overflow-x-auto">
        <div className="flex space-x-2 sm:space-x-4 pb-2">
          {receiptTemplates.map((template) => (
            <div
              key={template.id}
              className={`cursor-pointer p-3 sm:p-4 border rounded whitespace-nowrap min-w-0 flex-shrink-0 touch-manipulation active:scale-95 transition-transform ${
                currentTemplate === template.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => handleTemplateChange(template.id)}
            >
              <span className="text-sm sm:text-base">{template.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto border shadow-lg overflow-auto" style={{ maxWidth: '100%' }}>
        <div className="w-full min-w-[300px] sm:w-auto" id="receipt-template">
          <SelectedTemplate data={formData} />
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
