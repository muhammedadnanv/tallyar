
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Printer, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { generateReceiptPDF } from '../utils/receiptPDFGenerator';
import { printElement } from '../utils/printUtils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import Receipt1 from '../components/templates/Receipt1';
import Receipt2 from '../components/templates/Receipt2';
import Receipt3 from '../components/templates/Receipt3';
import Receipt4 from '../components/templates/Receipt4';
import Receipt5 from '../components/templates/Receipt5';
import Receipt6 from '../components/templates/Receipt6';
import Receipt7 from '../components/templates/Receipt7';
import Receipt8 from '../components/templates/Receipt8';
import Receipt9 from '../components/templates/Receipt9';
import Receipt10 from '../components/templates/Receipt10';
import Receipt11 from '../components/templates/Receipt11';
import Receipt12 from '../components/templates/Receipt12';
import Receipt13 from '../components/templates/Receipt13';
import Receipt14 from '../components/templates/Receipt14';
import Receipt15 from '../components/templates/Receipt15';

const receiptTemplates = [
  { id: 1, name: 'Receipt 1', component: Receipt1 },
  { id: 2, name: 'Receipt 2', component: Receipt2 },
  { id: 3, name: 'Receipt 3', component: Receipt3 },
  { id: 4, name: 'Receipt 4', component: Receipt4 },
  { id: 5, name: 'Receipt 5', component: Receipt5 },
  { id: 6, name: 'Receipt 6', component: Receipt6 },
  { id: 7, name: 'Receipt 7', component: Receipt7 },
  { id: 8, name: 'Receipt 8', component: Receipt8 },
  { id: 9, name: 'Receipt 9', component: Receipt9 },
  { id: 10, name: 'Receipt 10', component: Receipt10 },
  { id: 11, name: 'Receipt 11', component: Receipt11 },
  { id: 12, name: 'Receipt 12', component: Receipt12 },
  { id: 13, name: 'Receipt 13', component: Receipt13 },
  { id: 14, name: 'Receipt 14', component: Receipt14 },
  { id: 15, name: 'Receipt 15', component: Receipt15 },
];

const ReceiptPage = () => {
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

  const handleSave = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to save receipts',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    setIsSaving(true);
    try {
      const receiptData = {
        user_id: user.id,
        invoice_number: formData.receiptNumber || `REC-${Date.now()}`,
        invoice_date: formData.date || new Date().toISOString().split('T')[0],
        company_name: formData.companyName || '',
        company_address: formData.companyAddress || '',
        company_email: formData.companyEmail || '',
        company_phone: formData.companyPhone || '',
        bill_to_name: formData.customerName || '',
        bill_to_address: formData.customerAddress || '',
        bill_to_email: formData.customerEmail || '',
        bill_to_phone: formData.customerPhone || '',
        items: formData.items || [],
        tax_percentage: parseFloat(formData.taxPercentage) || 0,
        sub_total: parseFloat(formData.subTotal) || 0,
        tax_amount: parseFloat(formData.taxAmount) || 0,
        grand_total: parseFloat(formData.grandTotal) || 0,
        notes: formData.notes || '',
        template_number: currentTemplate,
        is_receipt: true,
      };

      if (editId) {
        const { error } = await supabase
          .from('invoices')
          .update(receiptData)
          .eq('id', editId);
        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Receipt updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('invoices')
          .insert([receiptData]);
        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Receipt saved successfully',
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

  const SelectedTemplate = receiptTemplates.find(t => t.id === currentTemplate)?.component || Receipt1;

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
          <Button onClick={handleDownloadPDF} disabled={isDownloading} size="touch" className="w-full sm:w-auto">
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
