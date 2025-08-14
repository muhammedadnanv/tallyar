
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Printer } from 'lucide-react';
import { Button } from "@/components/ui/button";
import InvoiceTemplate from '../components/InvoiceTemplate';
import MobileActions from '../components/MobileActions';
import { generatePDF } from '../utils/pdfGenerator';
import { printElement } from '../utils/printUtils';
import { templates } from '../utils/templateRegistry';

const TemplatePage = () => {
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
      // If no form data in location state, try to load from localStorage
      const savedFormData = localStorage.getItem('formData');
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    }
  }, [location.state]);

  const handleTemplateChange = (templateNumber) => {
    setCurrentTemplate(templateNumber);
  };

  const handleDownloadPDF = async () => {
    if (formData && !isDownloading) {
      setIsDownloading(true);
      try {
        await generatePDF(formData, currentTemplate);
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
        printElement('invoice-template');
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

      <div className="mb-6 sm:mb-8 overflow-x-auto">
        <div className="flex space-x-2 sm:space-x-4 pb-2">
          {templates.map((template, index) => (
            <div
              key={index}
              className={`cursor-pointer p-3 sm:p-4 border rounded whitespace-nowrap min-w-0 flex-shrink-0 touch-manipulation active:scale-95 transition-transform ${
                currentTemplate === index + 1
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => handleTemplateChange(index + 1)}
            >
              <span className="text-sm sm:text-base">{template.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto border shadow-lg overflow-auto" style={{ maxWidth: '100%' }}>
        <div className="w-full min-w-[300px] sm:w-[210mm] sm:h-[297mm]" id="invoice-template">
        <InvoiceTemplate data={formData} templateNumber={currentTemplate} />
        </div>
      </div>
      
      <MobileActions 
        onPrint={handlePrint}
        onDownload={handleDownloadPDF}
        isLoading={isDownloading || isPrinting}
      />
    </div>
  );
};

export default TemplatePage;
