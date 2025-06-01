
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex gap-2">
          <Button onClick={handlePrint} disabled={isPrinting} variant="outline">
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
          <Button onClick={handleDownloadPDF} disabled={isDownloading}>
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

      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-4">
          {receiptTemplates.map((template) => (
            <div
              key={template.id}
              className={`cursor-pointer p-4 border rounded ${
                currentTemplate === template.id
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => handleTemplateChange(template.id)}
            >
              {template.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto border shadow-lg" id="receipt-template">
        <SelectedTemplate data={formData} />
      </div>
    </div>
  );
};

export default ReceiptPage;
