
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Printer, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import InvoiceTemplate from '../components/InvoiceTemplate';
import MobileActions from '../components/MobileActions';
import { generatePDF } from '../utils/pdfGenerator';
import { printElement } from '../utils/printUtils';
import { templates } from '../utils/templateRegistry';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const TemplatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [currentTemplate, setCurrentTemplate] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();

    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
      setCurrentTemplate(location.state.selectedTemplate || 1);
      setEditId(location.state.editId || null);
    } else {
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

  const handleSave = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to save invoices',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    setIsSaving(true);
    try {
      const invoiceData = {
        user_id: user.id,
        invoice_number: formData.invoiceNumber || `INV-${Date.now()}`,
        invoice_date: formData.invoiceDate || new Date().toISOString().split('T')[0],
        due_date: formData.dueDate || null,
        company_name: formData.companyName || '',
        company_address: formData.companyAddress || '',
        company_email: formData.companyEmail || '',
        company_phone: formData.companyPhone || '',
        bill_to_name: formData.billToName || '',
        bill_to_address: formData.billToAddress || '',
        bill_to_email: formData.billToEmail || '',
        bill_to_phone: formData.billToPhone || '',
        ship_to_name: formData.shipToName || '',
        ship_to_address: formData.shipToAddress || '',
        items: formData.items || [],
        tax_percentage: parseFloat(formData.taxPercentage) || 0,
        discount_percentage: parseFloat(formData.discountPercentage) || 0,
        shipping_cost: parseFloat(formData.shippingCost) || 0,
        sub_total: parseFloat(formData.subTotal) || 0,
        tax_amount: parseFloat(formData.taxAmount) || 0,
        discount_amount: parseFloat(formData.discountAmount) || 0,
        grand_total: parseFloat(formData.grandTotal) || 0,
        notes: formData.notes || '',
        terms: formData.terms || '',
        template_number: currentTemplate,
        is_receipt: false,
      };

      if (editId) {
        const { error } = await supabase
          .from('invoices')
          .update(invoiceData)
          .eq('id', editId);
        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Invoice updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('invoices')
          .insert([invoiceData]);
        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Invoice saved successfully',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
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
          {user && (
            <Button onClick={handleSave} disabled={isSaving} variant="outline" size="touch" className="w-full sm:w-auto">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {editId ? 'Update' : 'Save'}
                </>
              )}
            </Button>
          )}
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
