import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';
import Watermark from '../Watermark';

const Receipt11 = ({ data }) => {
  const { billTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 p-6 max-w-md mx-auto rounded-xl shadow-xl">
      <Watermark text="TALLYAR" opacity={0.04} />
      
      {/* Header */}
      <div className="text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl">
        <h1 className="text-3xl font-bold mb-2">{yourCompany.name}</h1>
        <p className="text-indigo-100 text-sm">{yourCompany.address}</p>
        <p className="text-indigo-100 text-sm">{yourCompany.phone}</p>
      </div>

      {/* Receipt Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">RECEIPT</h2>
        <p className="text-sm text-gray-600">#{invoice.number}</p>
        <p className="text-xs text-gray-500">{invoice.date}</p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center mb-6">
        <QRCodeComponent invoiceData={data} templateNumber={11} size={100} />
      </div>

      {/* Customer Info */}
      <div className="bg-white p-4 rounded-lg mb-6 shadow">
        <h3 className="font-bold text-indigo-600 mb-2 text-sm">Customer Details</h3>
        <p className="font-semibold text-gray-800">{billTo.name}</p>
        <p className="text-sm text-gray-600">{billTo.phone}</p>
      </div>

      {/* Items */}
      <div className="bg-white p-4 rounded-lg mb-6 shadow">
        <h3 className="font-bold text-indigo-600 mb-3 text-sm">Items Purchased</h3>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{item.description}</p>
                <p className="text-xs text-gray-500">{item.quantity} × {formatCurrency(item.amount)}</p>
              </div>
              <p className="font-semibold text-gray-900">{formatCurrency(item.quantity * item.amount)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="bg-white p-4 rounded-lg mb-6 shadow">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">{formatCurrency(subTotal)}</span>
          </div>
          <div className="flex justify-between text-sm border-b border-gray-200 pb-2">
            <span className="text-gray-600">Tax ({taxPercentage}%)</span>
            <span className="font-semibold">{formatCurrency(taxAmount)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-indigo-700 pt-2">
            <span>Total Paid</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-xs text-gray-500">Thank you for your business!</p>
        {notes && <p className="text-xs text-gray-500 mt-2">{notes}</p>}
      </div>
    </div>
  );
};

export default Receipt11;
