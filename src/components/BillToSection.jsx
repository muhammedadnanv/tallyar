
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
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-3 border rounded-lg"
            value={data?.name || ''}
            onChange={handleInputChange}
            placeholder="Customer Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <textarea
            name="address"
            className="w-full p-3 border rounded-lg"
            rows="3"
            value={data?.address || ''}
            onChange={handleInputChange}
            placeholder="Customer Address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            className="w-full p-3 border rounded-lg"
            value={data?.phone || ''}
            onChange={handleInputChange}
            placeholder="Phone Number"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BillToSection;
