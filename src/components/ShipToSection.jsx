
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from 'lucide-react';

const ShipToSection = ({ data, onChange, billToData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copyBillToShip, setCopyBillToShip] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };

  const toggleExpand = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const handleCopyBillToShip = (e) => {
    const isChecked = e.target.checked;
    setCopyBillToShip(isChecked);
    
    if (isChecked && billToData) {
      onChange({
        name: billToData.name || '',
        address: billToData.address || '',
        phone: billToData.phone || ''
      });
    } else if (!isChecked) {
      onChange({
        name: '',
        address: '',
        phone: ''
      });
    }
  };

  // Auto-update ship to when bill to changes and copy is enabled
  useEffect(() => {
    if (copyBillToShip && billToData) {
      onChange({
        name: billToData.name || '',
        address: billToData.address || '',
        phone: billToData.phone || ''
      });
    }
  }, [billToData, copyBillToShip, onChange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Ship To</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <input
                type="checkbox"
                id="copyBillToShip"
                checked={copyBillToShip}
                onChange={handleCopyBillToShip}
                className="mr-2"
              />
              <label htmlFor="copyBillToShip">Same as Bill To</label>
            </div>
            <button onClick={toggleExpand} className="focus:outline-none">
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border rounded-lg"
              value={data?.name || ''}
              onChange={handleInputChange}
              placeholder="Ship To Name"
              disabled={copyBillToShip}
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
              placeholder="Ship To Address"
              disabled={copyBillToShip}
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
              disabled={copyBillToShip}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ShipToSection;
