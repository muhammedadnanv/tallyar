import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';

const Template14 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 h-full">
        <div className="border-l-8 border-orange-500 pl-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm text-orange-600 font-semibold mb-2">INVOICE FROM</h2>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{yourCompany.name}</h1>
              <p className="text-gray-600">{yourCompany.address}</p>
              <p className="text-gray-600">{yourCompany.phone}</p>
            </div>
            <div className="text-right">
              <QRCodeComponent invoiceData={data} templateNumber={14} size={80} />
              <div className="mt-4 text-5xl font-bold text-orange-500">{invoice.number}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-xs text-orange-600 font-semibold mb-1">INVOICE DATE</p>
            <p className="font-bold text-gray-900">{invoice.date}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-xs text-orange-600 font-semibold mb-1">DUE DATE</p>
            <p className="font-bold text-gray-900">{invoice.paymentDate}</p>
          </div>
          <div className="bg-orange-500 rounded-lg p-4 text-white">
            <p className="text-xs font-semibold mb-1">AMOUNT DUE</p>
            <p className="font-bold text-xl">{formatCurrency(grandTotal)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xs text-orange-600 font-semibold mb-3 uppercase">Invoice To</h3>
            <div className="border-l-4 border-gray-300 pl-4">
              <p className="font-bold text-lg text-gray-900">{billTo.name}</p>
              <p className="text-gray-600">{billTo.address}</p>
              <p className="text-gray-600">{billTo.phone}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xs text-orange-600 font-semibold mb-3 uppercase">Ship To</h3>
            <div className="border-l-4 border-gray-300 pl-4">
              <p className="font-bold text-lg text-gray-900">{shipTo.name || 'Same as billing'}</p>
              <p className="text-gray-600">{shipTo.address}</p>
              <p className="text-gray-600">{shipTo.phone}</p>
            </div>
          </div>
        </div>

        <table className="w-full mb-6">
          <thead>
            <tr className="border-b-2 border-orange-500">
              <th className="p-3 text-left text-sm font-semibold text-gray-700 uppercase">Item</th>
              <th className="p-3 text-center text-sm font-semibold text-gray-700 uppercase">Qty</th>
              <th className="p-3 text-right text-sm font-semibold text-gray-700 uppercase">Rate</th>
              <th className="p-3 text-right text-sm font-semibold text-gray-700 uppercase">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-orange-50 transition-colors">
                <td className="p-3">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </td>
                <td className="p-3 text-center text-gray-700">{item.quantity}</td>
                <td className="p-3 text-right text-gray-700">{formatCurrency(item.amount)}</td>
                <td className="p-3 text-right font-semibold text-gray-900">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-80">
            <div className="flex justify-between py-3 border-b border-gray-300">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-medium text-gray-900">{formatCurrency(subTotal)}</span>
            </div>
            {taxPercentage > 0 && (
              <div className="flex justify-between py-3 border-b border-gray-300">
                <span className="text-gray-700">Tax ({taxPercentage}%):</span>
                <span className="font-medium text-gray-900">{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between py-4 bg-orange-500 text-white px-4 -mx-4 mt-2 rounded-lg">
              <span className="font-bold text-lg uppercase">Total:</span>
              <span className="font-bold text-2xl">{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>

        {notes && (
          <div className="mt-8 border-t-2 border-gray-200 pt-6">
            <h3 className="text-xs text-orange-600 font-semibold mb-3 uppercase">Terms & Notes</h3>
            <p className="text-gray-700">{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template14;