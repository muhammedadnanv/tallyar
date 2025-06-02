import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from 'lucide-react';
import BillToSection from '../components/BillToSection';
import ShipToSection from '../components/ShipToSection';
import ItemDetails from '../components/ItemDetails';
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from '../utils/invoiceCalculations';

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    billTo: { name: '', address: '', phone: '' },
    shipTo: { name: '', address: '', phone: '' },
    invoice: { number: '', date: '', paymentDate: '' },
    yourCompany: { name: '', address: '', phone: '' },
    items: [{ name: '', description: '', quantity: 1, amount: 0, total: 0 }],
    taxPercentage: 0,
    notes: ''
  });

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const calculateTotals = () => {
    const subTotal = parseFloat(calculateSubTotal(formData.items));
    const taxAmount = parseFloat(calculateTaxAmount(subTotal, formData.taxPercentage));
    const grandTotal = subTotal + taxAmount;

    return {
      subTotal: subTotal.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      grandTotal: grandTotal.toFixed(2)
    };
  };

  const handleGenerateInvoice = (templateNumber = 1) => {
    const totals = calculateTotals();
    const completeFormData = {
      ...formData,
      ...totals
    };
    
    localStorage.setItem('formData', JSON.stringify(completeFormData));
    navigate('/template', { 
      state: { 
        formData: completeFormData, 
        selectedTemplate: templateNumber 
      } 
    });
  };

  const handleGenerateReceipt = (templateNumber = 1) => {
    const totals = calculateTotals();
    const receiptData = {
      ...formData,
      ...totals,
      cashier: 'Tallyar User'
    };
    
    localStorage.setItem('receiptData', JSON.stringify(receiptData));
    navigate('/receipt', { 
      state: { 
        formData: receiptData, 
        selectedTemplate: templateNumber 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Create Invoice
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill in the details below to generate your professional invoice
            </p>
            <div className="flex justify-center mt-6">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                Professional • Fast • Reliable
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg"
                    value={formData.yourCompany.name}
                    onChange={(e) => updateFormData('yourCompany', { ...formData.yourCompany, name: e.target.value })}
                    placeholder="Your Company Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <textarea
                    className="w-full p-3 border rounded-lg"
                    rows="3"
                    value={formData.yourCompany.address}
                    onChange={(e) => updateFormData('yourCompany', { ...formData.yourCompany, address: e.target.value })}
                    placeholder="Company Address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg"
                    value={formData.yourCompany.phone}
                    onChange={(e) => updateFormData('yourCompany', { ...formData.yourCompany, phone: e.target.value })}
                    placeholder="Phone Number"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Invoice Number</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg"
                    value={formData.invoice.number}
                    onChange={(e) => updateFormData('invoice', { ...formData.invoice, number: e.target.value })}
                    placeholder="INV-001"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Invoice Date</label>
                    <input
                      type="date"
                      className="w-full p-3 border rounded-lg"
                      value={formData.invoice.date}
                      onChange={(e) => updateFormData('invoice', { ...formData.invoice, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Due Date</label>
                    <input
                      type="date"
                      className="w-full p-3 border rounded-lg"
                      value={formData.invoice.paymentDate}
                      onChange={(e) => updateFormData('invoice', { ...formData.invoice, paymentDate: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <BillToSection 
              data={formData.billTo} 
              onChange={(data) => updateFormData('billTo', data)} 
            />
            <ShipToSection 
              data={formData.shipTo} 
              billToData={formData.billTo}
              onChange={(data) => updateFormData('shipTo', data)} 
            />
          </div>

          <div className="space-y-6">
            <ItemDetails 
              items={formData.items}
              taxPercentage={formData.taxPercentage}
              onChange={(items) => updateFormData('items', items)}
              onTaxChange={(tax) => updateFormData('taxPercentage', tax)}
            />

            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows="4"
                  value={formData.notes}
                  onChange={(e) => updateFormData('notes', e.target.value)}
                  placeholder="Additional notes or terms..."
                />
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button 
                onClick={() => handleGenerateInvoice(1)} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                size="lg"
              >
                Generate Invoice
              </Button>
              
              <Button 
                onClick={() => handleGenerateReceipt(1)} 
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 py-3"
                size="lg"
              >
                Generate Receipt
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
