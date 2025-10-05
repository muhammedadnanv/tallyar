import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';
import Watermark from '../Watermark';

const Template19 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="relative bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-8 max-w-4xl mx-auto">
        <Watermark text="TALLYAR" opacity={0.04} />
        
        {/* Creative Header with Curved Design */}
        <div className="relative mb-8">
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white p-8 rounded-3xl shadow-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold mb-2">{yourCompany.name}</h1>
                <p className="text-violet-100">{yourCompany.address}</p>
                <p className="text-violet-100">{yourCompany.phone}</p>
              </div>
              <div className="bg-white p-3 rounded-2xl">
                <QRCodeComponent invoiceData={data} templateNumber={19} size={80} />
              </div>
            </div>
            <div className="mt-6 flex gap-6">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                <p className="text-xs text-violet-200">Invoice #</p>
                <p className="font-bold text-lg">{invoice.number}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                <p className="text-xs text-violet-200">Date</p>
                <p className="font-bold text-lg">{invoice.date}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                <p className="text-xs text-violet-200">Due</p>
                <p className="font-bold text-lg">{invoice.paymentDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Client Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
              <h3 className="font-bold text-violet-700 uppercase text-sm tracking-wide">Bill To</h3>
            </div>
            <p className="font-bold text-gray-800 text-lg mb-1">{billTo.name}</p>
            <p className="text-gray-600 text-sm">{billTo.address}</p>
            <p className="text-gray-600 text-sm">{billTo.phone}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-fuchsia-500 rounded-full"></div>
              <h3 className="font-bold text-fuchsia-700 uppercase text-sm tracking-wide">Ship To</h3>
            </div>
            <p className="font-bold text-gray-800 text-lg mb-1">{shipTo.name}</p>
            <p className="text-gray-600 text-sm">{shipTo.address}</p>
            <p className="text-gray-600 text-sm">{shipTo.phone}</p>
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-4">
            <h2 className="font-bold text-lg">Invoice Items</h2>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Description</th>
                <th className="text-center p-4 font-semibold text-gray-700">Qty</th>
                <th className="text-right p-4 font-semibold text-gray-700">Rate</th>
                <th className="text-right p-4 font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-violet-50 transition-colors">
                  <td className="p-4 text-gray-700">{item.description}</td>
                  <td className="text-center p-4 text-gray-700">{item.quantity}</td>
                  <td className="text-right p-4 text-gray-700">{formatCurrency(item.amount)}</td>
                  <td className="text-right p-4 font-semibold text-gray-900">{formatCurrency(item.quantity * item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Section */}
        <div className="flex justify-end mb-8">
          <div className="w-96">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold">{formatCurrency(subTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700 pb-3 border-b border-gray-200">
                <span>Tax ({taxPercentage}%)</span>
                <span className="font-semibold">{formatCurrency(taxAmount)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent pt-3">
                <span>Grand Total</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-violet-700 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
              Notes
            </h3>
            <p className="text-gray-600 leading-relaxed">{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template19;
