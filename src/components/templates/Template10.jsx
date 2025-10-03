import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';

const Template10 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 h-full">
        <div className="bg-white rounded-lg shadow-lg p-8 h-full">
          <div className="border-b-4 border-indigo-600 pb-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-indigo-600">{yourCompany.name}</h1>
                <p className="text-gray-600 mt-2">{yourCompany.address}</p>
                <p className="text-gray-600">{yourCompany.phone}</p>
              </div>
              <QRCodeComponent invoiceData={data} templateNumber={10} size={80} />
            </div>
          </div>

          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">INVOICE</h2>
              <div className="bg-indigo-50 p-4 rounded">
                <p className="text-sm"><span className="font-semibold">Invoice #:</span> {invoice.number}</p>
                <p className="text-sm"><span className="font-semibold">Date:</span> {invoice.date}</p>
                <p className="text-sm"><span className="font-semibold">Due Date:</span> {invoice.paymentDate}</p>
              </div>
            </div>
            <div className="text-right">
              <h3 className="font-semibold text-indigo-600 mb-2">Bill To:</h3>
              <p className="font-bold">{billTo.name}</p>
              <p className="text-sm text-gray-600">{billTo.address}</p>
              <p className="text-sm text-gray-600">{billTo.phone}</p>
            </div>
          </div>

          <table className="w-full mb-6">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Rate</th>
                <th className="p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-right">{formatCurrency(item.amount)}</td>
                  <td className="p-3 text-right font-semibold">{formatCurrency(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-6">
            <div className="w-64">
              <div className="flex justify-between py-2">
                <span>Subtotal:</span>
                <span>{formatCurrency(subTotal)}</span>
              </div>
              {taxPercentage > 0 && (
                <div className="flex justify-between py-2">
                  <span>Tax ({taxPercentage}%):</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
              )}
              <div className="flex justify-between py-3 border-t-2 border-indigo-600 font-bold text-lg">
                <span>Total:</span>
                <span className="text-indigo-600">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>

          {notes && (
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Notes:</h3>
              <p className="text-sm text-gray-700">{notes}</p>
            </div>
          )}
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template10;