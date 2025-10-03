import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';

const Template13 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-gray-100 p-8 h-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full">
          <div className="bg-gradient-to-br from-green-500 to-teal-600 p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <span className="text-sm font-semibold">INVOICE</span>
                </div>
                <h1 className="text-3xl font-bold mb-1">{yourCompany.name}</h1>
                <p className="text-green-100 text-sm">{yourCompany.address}</p>
                <p className="text-green-100 text-sm">{yourCompany.phone}</p>
              </div>
              <div className="bg-white p-2 rounded-lg">
                <QRCodeComponent invoiceData={data} templateNumber={13} size={70} />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs text-green-100">Invoice Number</p>
                <p className="font-bold text-lg">{invoice.number}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs text-green-100">Invoice Date</p>
                <p className="font-semibold">{invoice.date}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs text-green-100">Due Date</p>
                <p className="font-semibold">{invoice.paymentDate}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-green-600 font-bold mb-3 text-sm uppercase tracking-wide">Billed To</h3>
                <p className="font-bold text-lg mb-1">{billTo.name}</p>
                <p className="text-gray-600 text-sm">{billTo.address}</p>
                <p className="text-gray-600 text-sm">{billTo.phone}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-green-600 font-bold mb-3 text-sm uppercase tracking-wide">Ship To</h3>
                <p className="font-bold text-lg mb-1">{shipTo.name || 'Same as billing'}</p>
                <p className="text-gray-600 text-sm">{shipTo.address}</p>
                <p className="text-gray-600 text-sm">{shipTo.phone}</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">Description</th>
                    <th className="p-4 text-center text-sm font-semibold text-gray-700">Quantity</th>
                    <th className="p-4 text-right text-sm font-semibold text-gray-700">Rate</th>
                    <th className="p-4 text-right text-sm font-semibold text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </td>
                      <td className="p-4 text-center text-gray-700">{item.quantity}</td>
                      <td className="p-4 text-right text-gray-700">{formatCurrency(item.amount)}</td>
                      <td className="p-4 text-right font-semibold text-gray-900">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-8">
              <div className="w-96">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between py-2 text-gray-700">
                    <span>Subtotal:</span>
                    <span className="font-medium">{formatCurrency(subTotal)}</span>
                  </div>
                  {taxPercentage > 0 && (
                    <div className="flex justify-between py-2 text-gray-600">
                      <span>Tax ({taxPercentage}%):</span>
                      <span className="font-medium">{formatCurrency(taxAmount)}</span>
                    </div>
                  )}
                  <div className="border-t-2 border-green-500 mt-3 pt-3 flex justify-between">
                    <span className="font-bold text-lg text-gray-900">Total:</span>
                    <span className="font-bold text-2xl text-green-600">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            {notes && (
              <div className="mt-8 bg-green-50 border-l-4 border-green-500 rounded-r-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Notes:</h3>
                <p className="text-gray-700 text-sm">{notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template13;