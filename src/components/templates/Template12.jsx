import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';

const Template12 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 h-full">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">{yourCompany.name}</h1>
              <p className="text-purple-100">{yourCompany.address}</p>
              <p className="text-purple-100">{yourCompany.phone}</p>
            </div>
            <div className="bg-white p-2 rounded">
              <QRCodeComponent invoiceData={data} templateNumber={12} size={80} />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-6">
          <div className="flex justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-4">INVOICE</h2>
              <div className="space-y-1">
                <p><span className="font-semibold">Invoice #:</span> {invoice.number}</p>
                <p><span className="font-semibold">Issue Date:</span> {invoice.date}</p>
                <p><span className="font-semibold">Due Date:</span> {invoice.paymentDate}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white p-4 rounded-lg shadow mb-4">
                <h3 className="font-semibold text-purple-600 mb-2">Bill To:</h3>
                <p className="font-bold">{billTo.name}</p>
                <p className="text-sm">{billTo.address}</p>
                <p className="text-sm">{billTo.phone}</p>
              </div>
              {shipTo.name && (
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-purple-600 mb-2">Ship To:</h3>
                  <p className="font-bold">{shipTo.name}</p>
                  <p className="text-sm">{shipTo.address}</p>
                  <p className="text-sm">{shipTo.phone}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <th className="p-3 text-left">Item Details</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-purple-50' : 'bg-white'}`}>
                    <td className="p-3">
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-right">{formatCurrency(item.amount)}</td>
                    <td className="p-3 text-right font-semibold">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-6">
            <div className="w-80 bg-white rounded-lg shadow p-4">
              <div className="flex justify-between py-2">
                <span>Subtotal:</span>
                <span>{formatCurrency(subTotal)}</span>
              </div>
              {taxPercentage > 0 && (
                <div className="flex justify-between py-2 text-gray-600">
                  <span>Tax ({taxPercentage}%):</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
              )}
              <div className="flex justify-between py-3 border-t-2 border-purple-200 mt-2">
                <span className="font-bold text-lg">Total Amount:</span>
                <span className="font-bold text-2xl text-purple-600">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>

          {notes && (
            <div className="bg-white rounded-lg shadow p-4 mt-6">
              <h3 className="font-semibold text-purple-600 mb-2">Additional Notes:</h3>
              <p className="text-gray-700">{notes}</p>
            </div>
          )}
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template12;