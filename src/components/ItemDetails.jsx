
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from 'lucide-react';

const ItemDetails = ({ items, taxPercentage, onChange, onTaxChange }) => {
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    // Calculate total for the item
    if (field === 'quantity' || field === 'amount') {
      const quantity = field === 'quantity' ? value : updatedItems[index].quantity;
      const amount = field === 'amount' ? value : updatedItems[index].amount;
      updatedItems[index].total = (quantity || 0) * (amount || 0);
    }
    
    onChange(updatedItems);
  };

  const addItem = () => {
    const newItem = {
      name: '',
      description: '',
      quantity: 1,
      amount: 0,
      total: 0
    };
    onChange([...items, newItem]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      const updatedItems = items.filter((_, i) => i !== index);
      onChange(updatedItems);
    }
  };

  const calculateSubTotal = () => {
    return items.reduce((sum, item) => sum + (item.total || 0), 0).toFixed(2);
  };

  const calculateTaxAmount = () => {
    const subTotal = parseFloat(calculateSubTotal());
    return (subTotal * (taxPercentage / 100)).toFixed(2);
  };

  const calculateGrandTotal = () => {
    const subTotal = parseFloat(calculateSubTotal());
    const taxAmount = parseFloat(calculateTaxAmount());
    return (subTotal + taxAmount).toFixed(2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Item Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="relative border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Item Name *</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg text-base touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={item.name || ''}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  placeholder="Item name"
                  required
                  aria-label={`Item ${index + 1} name`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Quantity *</label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg text-base touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={item.quantity || 1}
                  onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  required
                  aria-label={`Item ${index + 1} quantity`}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Unit Price *</label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg text-base touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={item.amount || 0}
                  onChange={(e) => handleItemChange(index, 'amount', parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  required
                  aria-label={`Item ${index + 1} unit price`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Total</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-gray-100 text-base"
                  value={`$${(item.total || 0).toFixed(2)}`}
                  disabled
                  aria-label={`Item ${index + 1} total amount`}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full p-3 border rounded-lg text-base touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                rows="2"
                value={item.description || ''}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                placeholder="Item description (optional)"
                aria-label={`Item ${index + 1} description`}
              />
            </div>
            
            {items.length > 1 && (
              <Button
                onClick={() => removeItem(index)}
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        
        <Button onClick={addItem} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
        
        <div className="border-t pt-4 space-y-2">
          <div>
            <label className="block text-sm font-medium mb-2">Tax Percentage (%)</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg text-base touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={taxPercentage || 0}
              onChange={(e) => onTaxChange(parseFloat(e.target.value) || 0)}
              min="0"
              max="100"
              step="0.01"
              placeholder="0"
              aria-label="Tax percentage"
            />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${calculateSubTotal()}</span>
            </div>
            {taxPercentage > 0 && (
              <div className="flex justify-between">
                <span>Tax ({taxPercentage}%):</span>
                <span>${calculateTaxAmount()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${calculateGrandTotal()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemDetails;
