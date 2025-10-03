import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';

const Template15 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 h-full">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden h-full">
          <div className="relative bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 p-8 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-cyan-200 text-sm font-medium mb-2">INVOICE</div>
                  <h1 className="text-4xl font-bold mb-2">{yourCompany.name}</h1>
                  <p className="text-blue-100 text-sm">{yourCompany.address}</p>
                  <p className="text-blue-100 text-sm">{yourCompany.phone}</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-lg">
                  <QRCodeComponent invoiceData={data} templateNumber={15} size={70} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 border border-white/30">
                  <p className="text-xs text-cyan-100 mb-1">Invoice No.</p>
                  <p className="font-bold text-lg">{invoice.number}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 border border-white/30">
                  <p className="text-xs text-cyan-100 mb-1">Issue Date</p>
                  <p className="font-semibold">{invoice.date}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 border border-white/30">
                  <p className="text-xs text-cyan-100 mb-1">Due Date</p>
                  <p className="font-semibold">{invoice.paymentDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="border-2 border-blue-100 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center mb-3">
                  <div className="w-1 h-6 bg-blue-600 mr-3 rounded-full"></div>
                  <h3 className="text-blue-600 font-bold text-sm uppercase">Bill To</h3>
                </div>
                <p className="font-bold text-lg text-gray-900 mb-1">{billTo.name}</p>
                <p className="text-gray-600 text-sm">{billTo.address}</p>
                <p className="text-gray-600 text-sm">{billTo.phone}</p>
              </div>
              <div className="border-2 border-blue-100 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center mb-3">
                  <div className="w-1 h-6 bg-cyan-600 mr-3 rounded-full"></div>
                  <h3 className="text-cyan-600 font-bold text-sm uppercase">Ship To</h3>
                </div>
                <p className="font-bold text-lg text-gray-900 mb-1">{shipTo.name || 'Same as billing'}</p>
                <p className="text-gray-600 text-sm">{shipTo.address}</p>
                <p className="text-gray-600 text-sm">{shipTo.phone}</p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-cyan-50">
                    <th className="p-4 text-left text-sm font-bold text-gray-700">Description</th>
                    <th className="p-4 text-center text-sm font-bold text-gray-700">Qty</th>
                    <th className="p-4 text-right text-sm font-bold text-gray-700">Rate</th>
                    <th className="p-4 text-right text-sm font-bold text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <tr key={index} className="hover:bg-blue-50/50 transition-colors">
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

            <div className="flex justify-end">
              <div className="w-96 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-blue-200">
                <div className="flex justify-between py-2 text-gray-700">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-semibold">{formatCurrency(subTotal)}</span>
                </div>
                {taxPercentage > 0 && (
                  <div className="flex justify-between py-2 text-gray-600">
                    <span className="font-medium">Tax ({taxPercentage}%):</span>
                    <span className="font-semibold">{formatCurrency(taxAmount)}</span>
                  </div>
                )}
                <div className="border-t-2 border-blue-300 mt-3 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-900">Total Amount:</span>
                    <span className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {notes && (
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-5 border-l-4 border-blue-600">
                <h3 className="font-bold text-blue-900 mb-2 text-sm uppercase">Additional Notes</h3>
                <p className="text-gray-700">{notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template15;