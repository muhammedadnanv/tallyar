import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';
import Watermark from '../Watermark';

const Receipt15 = ({ data }) => {
  const { billTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <div className="relative bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6 max-w-md mx-auto rounded-3xl shadow-2xl">
      <Watermark text="TALLYAR" opacity={0.04} />
      
      {/* Modern Header Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 mb-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">{yourCompany.name}</h1>
            <p className="text-blue-100 text-xs">{yourCompany.address}</p>
          </div>
          <div className="bg-white p-2 rounded-xl">
            <QRCodeComponent invoiceData={data} templateNumber={15} size={70} />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <p className="text-xs text-blue-100 mb-1">Receipt #</p>
            <p className="font-bold text-sm">{invoice.number}</p>
          </div>
          <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <p className="text-xs text-blue-100 mb-1">Date</p>
            <p className="font-bold text-sm">{invoice.date}</p>
          </div>
        </div>
      </div>

      {/* Customer Badge */}
      <div className="bg-white rounded-xl p-4 shadow-lg mb-4 transform hover:scale-105 transition-transform">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            {billTo.name.charAt(0)}
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Customer</p>
            <p className="font-bold text-gray-800">{billTo.name}</p>
            <p className="text-xs text-gray-600">{billTo.phone}</p>
          </div>
        </div>
      </div>

      {/* Items Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3">
          <h3 className="font-bold text-sm">Purchase Details</h3>
        </div>
        <div className="p-4 space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{item.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.quantity} unit{item.quantity > 1 ? 's' : ''} @ {formatCurrency(item.amount)}
                </p>
              </div>
              <p className="font-bold text-gray-900 ml-3">{formatCurrency(item.quantity * item.amount)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Total Card with Gradient */}
      <div className="bg-white rounded-xl shadow-lg p-5 mb-4">
        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-800">{formatCurrency(subTotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 pb-3 border-b border-gray-200">
            <span>Tax ({taxPercentage}%)</span>
            <span className="font-semibold text-gray-800">{formatCurrency(taxAmount)}</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-4 -mx-5 -mb-5">
          <div className="flex justify-between items-center">
            <span className="text-base font-bold">Amount Paid</span>
            <span className="text-2xl font-bold">{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Thank You Footer */}
      <div className="text-center">
        <div className="inline-block bg-white rounded-full px-6 py-2 shadow-md">
          <p className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Thank You for Your Business!
          </p>
        </div>
        {notes && (
          <p className="text-xs text-gray-600 mt-3 italic">{notes}</p>
        )}
      </div>
    </div>
  );
};

export default Receipt15;
