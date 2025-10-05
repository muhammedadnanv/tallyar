import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';
import Watermark from '../Watermark';

const Template16 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="relative bg-white p-8 max-w-4xl mx-auto">
        <Watermark text="TALLYAR" opacity={0.05} />
        
        {/* Header with gradient border */}
        <div className="border-b-4 border-gradient-to-r from-teal-400 to-cyan-600 pb-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                {yourCompany.name}
              </h1>
              <p className="text-gray-600">{yourCompany.address}</p>
              <p className="text-gray-600">{yourCompany.phone}</p>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-bold text-teal-600 mb-4">INVOICE</h2>
              <QRCodeComponent invoiceData={data} templateNumber={16} size={80} />
            </div>
          </div>
        </div>

        {/* Invoice Details Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-lg">
          <div>
            <p className="text-sm text-gray-500 mb-1">Invoice Number</p>
            <p className="font-semibold text-lg">{invoice.number}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Invoice Date</p>
            <p className="font-semibold text-lg">{invoice.date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Due Date</p>
            <p className="font-semibold text-lg">{invoice.paymentDate}</p>
          </div>
        </div>

        {/* Bill To and Ship To */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-teal-50 p-6 rounded-lg">
            <h3 className="font-bold text-teal-700 mb-3 text-lg">BILL TO</h3>
            <p className="font-semibold text-gray-800">{billTo.name}</p>
            <p className="text-gray-600">{billTo.address}</p>
            <p className="text-gray-600">{billTo.phone}</p>
          </div>
          <div className="bg-cyan-50 p-6 rounded-lg">
            <h3 className="font-bold text-cyan-700 mb-3 text-lg">SHIP TO</h3>
            <p className="font-semibold text-gray-800">{shipTo.name}</p>
            <p className="text-gray-600">{shipTo.address}</p>
            <p className="text-gray-600">{shipTo.phone}</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
              <th className="text-left p-4 rounded-tl-lg">Item</th>
              <th className="text-right p-4">Quantity</th>
              <th className="text-right p-4">Rate</th>
              <th className="text-right p-4 rounded-tr-lg">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">{item.description}</td>
                <td className="text-right p-4">{item.quantity}</td>
                <td className="text-right p-4">{formatCurrency(item.amount)}</td>
                <td className="text-right p-4 font-semibold">{formatCurrency(item.quantity * item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Section */}
        <div className="flex justify-end mb-8">
          <div className="w-80 bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between mb-3 pb-3 border-b border-gray-300">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold">{formatCurrency(subTotal)}</span>
            </div>
            <div className="flex justify-between mb-3 pb-3 border-b border-gray-300">
              <span className="text-gray-600">Tax ({taxPercentage}%):</span>
              <span className="font-semibold">{formatCurrency(taxAmount)}</span>
            </div>
            <div className="flex justify-between text-xl">
              <span className="font-bold text-teal-700">Grand Total:</span>
              <span className="font-bold text-teal-700">{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-2 text-gray-700">Notes:</h3>
            <p className="text-gray-600">{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template16;
