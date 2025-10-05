import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';
import Watermark from '../Watermark';

const Receipt14 = ({ data }) => {
  const { billTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <div className="relative bg-white p-8 max-w-lg mx-auto shadow-xl">
      <Watermark text="TALLYAR" opacity={0.05} />
      
      {/* Minimal Header */}
      <div className="border-b-4 border-gray-900 pb-6 mb-6">
        <h1 className="text-4xl font-light text-gray-900 mb-2">{yourCompany.name}</h1>
        <div className="flex justify-between items-end">
          <div className="text-sm text-gray-600">
            <p>{yourCompany.address}</p>
            <p>{yourCompany.phone}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-gray-500">Receipt</p>
            <p className="font-bold text-gray-900">{invoice.number}</p>
          </div>
        </div>
      </div>

      {/* Date and QR */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Date</p>
          <p className="font-medium text-gray-900">{invoice.date}</p>
        </div>
        <QRCodeComponent invoiceData={data} templateNumber={14} size={80} />
      </div>

      {/* Customer */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Customer</p>
        <p className="font-semibold text-gray-900 text-lg">{billTo.name}</p>
        <p className="text-sm text-gray-600">{billTo.phone}</p>
      </div>

      {/* Items - Clean List */}
      <div className="mb-8">
        <div className="border-b-2 border-gray-900 pb-2 mb-4">
          <p className="text-xs uppercase tracking-wider text-gray-500">Items</p>
        </div>
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-baseline mb-4">
            <div className="flex-1">
              <p className="font-medium text-gray-800">{item.description}</p>
              <p className="text-sm text-gray-500">{item.quantity} × {formatCurrency(item.amount)}</p>
            </div>
            <p className="font-semibold text-gray-900 ml-4">{formatCurrency(item.quantity * item.amount)}</p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border-t-2 border-gray-900 pt-4">
        <div className="space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span className="font-medium">{formatCurrency(subTotal)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Tax ({taxPercentage}%)</span>
            <span className="font-medium">{formatCurrency(taxAmount)}</span>
          </div>
          <div className="flex justify-between text-2xl font-bold text-gray-900 pt-3 border-t-2 border-gray-900">
            <span>Total</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      {notes && (
        <div className="mt-8 pt-6 border-t border-gray-300">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Note</p>
          <p className="text-sm text-gray-600">{notes}</p>
        </div>
      )}

      <div className="mt-8 text-center text-xs text-gray-400">
        Thank you for your business
      </div>
    </div>
  );
};

export default Receipt14;
