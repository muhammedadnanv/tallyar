import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';
import Watermark from '../Watermark';

const Receipt13 = ({ data }) => {
  const { billTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <div className="relative bg-gradient-to-b from-amber-50 to-orange-50 p-6 max-w-md mx-auto rounded-2xl shadow-2xl">
      <Watermark text="TALLYAR" opacity={0.04} />
      
      {/* Decorative Top Border */}
      <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-t-xl mb-6"></div>

      {/* Company Header */}
      <div className="text-center mb-6">
        <div className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg mb-3">
          <h1 className="text-2xl font-bold">{yourCompany.name}</h1>
        </div>
        <p className="text-sm text-gray-600">{yourCompany.address}</p>
        <p className="text-sm text-gray-600">{yourCompany.phone}</p>
      </div>

      {/* Receipt Badge */}
      <div className="text-center mb-4">
        <div className="inline-block bg-white px-6 py-2 rounded-full shadow-md border-2 border-amber-400">
          <h2 className="text-xl font-bold text-amber-600">RECEIPT</h2>
        </div>
        <p className="text-sm mt-2 font-semibold text-gray-700">#{invoice.number}</p>
        <p className="text-xs text-gray-500">{invoice.date}</p>
      </div>

      {/* QR Code in Circle */}
      <div className="flex justify-center mb-6">
        <div className="bg-white p-3 rounded-full shadow-lg">
          <QRCodeComponent invoiceData={data} templateNumber={13} size={90} />
        </div>
      </div>

      {/* Customer Card */}
      <div className="bg-white rounded-xl p-4 shadow-md mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
          <h3 className="font-bold text-amber-600 text-sm">Customer</h3>
        </div>
        <p className="font-semibold text-gray-800">{billTo.name}</p>
        <p className="text-sm text-gray-600">{billTo.phone}</p>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl p-4 shadow-md mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <h3 className="font-bold text-orange-600 text-sm">Items</h3>
        </div>
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-start mb-3 pb-3 border-b border-gray-100 last:border-0">
            <div className="flex-1">
              <p className="font-medium text-gray-800 text-sm">{item.description}</p>
              <p className="text-xs text-gray-500">{item.quantity} × {formatCurrency(item.amount)}</p>
            </div>
            <p className="font-bold text-gray-900">{formatCurrency(item.quantity * item.amount)}</p>
          </div>
        ))}
      </div>

      {/* Payment Summary */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl p-4 shadow-lg mb-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-amber-100">Subtotal</span>
            <span className="font-semibold">{formatCurrency(subTotal)}</span>
          </div>
          <div className="flex justify-between text-sm border-b border-amber-400 pb-2">
            <span className="text-amber-100">Tax ({taxPercentage}%)</span>
            <span className="font-semibold">{formatCurrency(taxAmount)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold pt-2">
            <span>TOTAL PAID</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-sm font-semibold text-amber-700 mb-1">Thank You!</p>
        {notes && <p className="text-xs text-gray-600 italic">{notes}</p>}
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-b-xl mt-6"></div>
    </div>
  );
};

export default Receipt13;
