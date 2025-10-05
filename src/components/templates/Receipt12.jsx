import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';
import Watermark from '../Watermark';

const Receipt12 = ({ data }) => {
  const { billTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <div className="relative bg-white p-6 max-w-sm mx-auto border-4 border-rose-500 rounded-lg">
      <Watermark text="TALLYAR" opacity={0.05} />
      
      {/* Header with Border */}
      <div className="border-b-2 border-rose-500 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-center text-rose-600">{yourCompany.name}</h1>
        <p className="text-center text-xs text-gray-600">{yourCompany.address}</p>
        <p className="text-center text-xs text-gray-600">{yourCompany.phone}</p>
      </div>

      {/* Receipt Details */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">SALES RECEIPT</h2>
        <div className="mt-2 space-y-1">
          <p className="text-sm"><span className="font-semibold">Receipt #:</span> {invoice.number}</p>
          <p className="text-sm"><span className="font-semibold">Date:</span> {invoice.date}</p>
        </div>
      </div>

      {/* QR Code */}
      <div className="flex justify-center mb-4">
        <div className="border-2 border-rose-500 p-2 rounded">
          <QRCodeComponent invoiceData={data} templateNumber={12} size={90} />
        </div>
      </div>

      {/* Customer */}
      <div className="border-t-2 border-b-2 border-dashed border-gray-300 py-3 mb-4">
        <p className="text-xs font-semibold text-gray-600">CUSTOMER:</p>
        <p className="font-bold text-gray-800">{billTo.name}</p>
        <p className="text-sm text-gray-600">{billTo.phone}</p>
      </div>

      {/* Items Table */}
      <table className="w-full mb-4 text-sm">
        <thead>
          <tr className="border-b-2 border-rose-500">
            <th className="text-left py-2 font-bold">Item</th>
            <th className="text-center py-2 font-bold">Qty</th>
            <th className="text-right py-2 font-bold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-2 text-gray-700">{item.description}</td>
              <td className="text-center py-2 text-gray-700">{item.quantity}</td>
              <td className="text-right py-2 font-semibold">{formatCurrency(item.quantity * item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="border-t-2 border-rose-500 pt-3 mb-4">
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-semibold">{formatCurrency(subTotal)}</span>
        </div>
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-gray-600">Tax ({taxPercentage}%):</span>
          <span className="font-semibold">{formatCurrency(taxAmount)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-rose-600 border-t-2 border-dashed border-gray-300 pt-2">
          <span>TOTAL:</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 border-t-2 border-dashed border-gray-300 pt-3">
        <p className="font-semibold mb-1">Thank You for Your Purchase!</p>
        {notes && <p className="italic">{notes}</p>}
      </div>
    </div>
  );
};

export default Receipt12;
