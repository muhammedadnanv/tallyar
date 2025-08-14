
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BillToSection = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bill To</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
          <input
            type="text"
            name="name"
            className="w-full p-3 border rounded-lg text-base touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={data?.name || ''}
            onChange={handleInputChange}
            placeholder="Customer Name"
            required
            aria-label="Customer Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <textarea
            name="address"
            className="w-full p-3 border rounded-lg text-base touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
            rows="3"
            value={data?.address || ''}
            onChange={handleInputChange}
            placeholder="Customer Address"
            aria-label="Customer Address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            className="w-full p-3 border rounded-lg text-base touch-manipulation focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={data?.phone || ''}
            onChange={handleInputChange}
            placeholder="Phone Number"
            aria-label="Customer Phone Number"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BillToSection;
