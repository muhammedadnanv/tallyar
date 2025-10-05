import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';
import Watermark from '../Watermark';

const Template18 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="relative bg-white p-8 max-w-4xl mx-auto">
        <Watermark text="TALLYAR" opacity={0.05} />
        
        {/* Minimalist Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start border-b-2 border-gray-900 pb-6">
            <div>
              <h1 className="text-5xl font-light text-gray-900 mb-6">{yourCompany.name}</h1>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{yourCompany.address}</p>
                <p>{yourCompany.phone}</p>
              </div>
            </div>
            <div className="text-right">
              <QRCodeComponent invoiceData={data} templateNumber={18} size={90} />
            </div>
          </div>
        </div>

        {/* Invoice Details - Minimal Grid */}
        <div className="grid grid-cols-4 gap-8 mb-12 py-6 border-b border-gray-300">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Invoice</p>
            <p className="font-bold text-gray-900">{invoice.number}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Date</p>
            <p className="font-medium text-gray-900">{invoice.date}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Due Date</p>
            <p className="font-medium text-gray-900">{invoice.paymentDate}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Amount</p>
            <p className="font-bold text-gray-900">{formatCurrency(grandTotal)}</p>
          </div>
        </div>

        {/* Client Info - Side by Side */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">Billed To</p>
            <div className="space-y-1">
              <p className="font-semibold text-gray-900">{billTo.name}</p>
              <p className="text-gray-600">{billTo.address}</p>
              <p className="text-gray-600">{billTo.phone}</p>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">Shipped To</p>
            <div className="space-y-1">
              <p className="font-semibold text-gray-900">{shipTo.name}</p>
              <p className="text-gray-600">{shipTo.address}</p>
              <p className="text-gray-600">{shipTo.phone}</p>
            </div>
          </div>
        </div>

        {/* Items Table - Clean Design */}
        <table className="w-full mb-12">
          <thead>
            <tr className="border-b-2 border-gray-900">
              <th className="text-left py-4 font-medium text-sm uppercase tracking-wider text-gray-900">Item</th>
              <th className="text-center py-4 font-medium text-sm uppercase tracking-wider text-gray-900">Qty</th>
              <th className="text-right py-4 font-medium text-sm uppercase tracking-wider text-gray-900">Rate</th>
              <th className="text-right py-4 font-medium text-sm uppercase tracking-wider text-gray-900">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-4 text-gray-700">{item.description}</td>
                <td className="text-center py-4 text-gray-700">{item.quantity}</td>
                <td className="text-right py-4 text-gray-700">{formatCurrency(item.amount)}</td>
                <td className="text-right py-4 font-semibold text-gray-900">{formatCurrency(item.quantity * item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="flex justify-end">
          <div className="w-80 space-y-3">
            <div className="flex justify-between py-2 text-gray-700">
              <span>Subtotal</span>
              <span className="font-medium">{formatCurrency(subTotal)}</span>
            </div>
            <div className="flex justify-between py-2 text-gray-700 border-b border-gray-300">
              <span>Tax ({taxPercentage}%)</span>
              <span className="font-medium">{formatCurrency(taxAmount)}</span>
            </div>
            <div className="flex justify-between py-3 text-xl font-bold text-gray-900 border-t-2 border-gray-900">
              <span>Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="mt-12 pt-6 border-t border-gray-300">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Notes</p>
            <p className="text-gray-600">{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template18;
