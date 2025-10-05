import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';
import Watermark from '../Watermark';

const Template17 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="relative bg-gradient-to-br from-orange-50 to-red-50 p-8 max-w-4xl mx-auto">
        <Watermark text="TALLYAR" opacity={0.04} />
        
        {/* Modern Header with Split Design */}
        <div className="flex justify-between mb-8">
          <div className="flex-1 bg-white p-8 rounded-l-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{yourCompany.name}</h1>
            <p className="text-gray-600">{yourCompany.address}</p>
            <p className="text-gray-600">{yourCompany.phone}</p>
          </div>
          <div className="w-48 bg-gradient-to-br from-orange-500 to-red-600 p-8 rounded-r-2xl shadow-lg text-white flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">INVOICE</h2>
            <QRCodeComponent invoiceData={data} templateNumber={17} size={80} />
          </div>
        </div>

        {/* Invoice Info Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-xs text-gray-500 uppercase mb-1">Invoice #</p>
            <p className="font-bold text-orange-600">{invoice.number}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-xs text-gray-500 uppercase mb-1">Date</p>
            <p className="font-bold text-orange-600">{invoice.date}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-xs text-gray-500 uppercase mb-1">Due Date</p>
            <p className="font-bold text-orange-600">{invoice.paymentDate}</p>
          </div>
        </div>

        {/* Client Information */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
            <h3 className="font-bold text-orange-600 mb-3 uppercase tracking-wide">Bill To</h3>
            <p className="font-semibold text-gray-800 text-lg mb-1">{billTo.name}</p>
            <p className="text-gray-600">{billTo.address}</p>
            <p className="text-gray-600">{billTo.phone}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
            <h3 className="font-bold text-red-600 mb-3 uppercase tracking-wide">Ship To</h3>
            <p className="font-semibold text-gray-800 text-lg mb-1">{shipTo.name}</p>
            <p className="text-gray-600">{shipTo.address}</p>
            <p className="text-gray-600">{shipTo.phone}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                <th className="text-left p-4 font-semibold">Description</th>
                <th className="text-center p-4 font-semibold">Qty</th>
                <th className="text-right p-4 font-semibold">Rate</th>
                <th className="text-right p-4 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-orange-50 transition-colors">
                  <td className="p-4 text-gray-700">{item.description}</td>
                  <td className="text-center p-4 text-gray-700">{item.quantity}</td>
                  <td className="text-right p-4 text-gray-700">{formatCurrency(item.amount)}</td>
                  <td className="text-right p-4 font-semibold text-gray-900">{formatCurrency(item.quantity * item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-96 bg-white p-6 rounded-xl shadow-lg">
            <div className="space-y-3">
              <div className="flex justify-between pb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">{formatCurrency(subTotal)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-600">Tax ({taxPercentage}%):</span>
                <span className="font-semibold">{formatCurrency(taxAmount)}</span>
              </div>
              <div className="flex justify-between text-xl pt-2">
                <span className="font-bold text-orange-600">Total Amount:</span>
                <span className="font-bold text-orange-600">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-bold text-orange-600 mb-3">Additional Notes:</h3>
            <p className="text-gray-600 leading-relaxed">{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template17;
