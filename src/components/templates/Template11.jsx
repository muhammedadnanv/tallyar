import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';

const Template11 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 h-full">
        <div className="border-4 border-double border-gray-800 p-6 h-full">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-2">INVOICE</h1>
            <div className="w-24 h-1 bg-gray-800 mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-700">{yourCompany.name}</h2>
            <p className="text-gray-600">{yourCompany.address} | {yourCompany.phone}</p>
          </div>

          <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="font-bold text-gray-700 mb-2">INVOICE TO:</h3>
                <div className="border-l-4 border-gray-800 pl-4">
                  <p className="font-bold text-lg">{billTo.name}</p>
                  <p className="text-gray-600">{billTo.address}</p>
                  <p className="text-gray-600">{billTo.phone}</p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-700 mb-2">SHIP TO:</h3>
                <div className="border-l-4 border-gray-400 pl-4">
                  <p className="font-bold">{shipTo.name}</p>
                  <p className="text-gray-600">{shipTo.address}</p>
                  <p className="text-gray-600">{shipTo.phone}</p>
                </div>
              </div>
            </div>
            <div className="ml-8">
              <div className="text-right mb-4">
                <p className="text-sm text-gray-600">Invoice Number</p>
                <p className="font-bold text-xl">{invoice.number}</p>
              </div>
              <div className="text-right mb-4">
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold">{invoice.date}</p>
              </div>
              <div className="text-right mb-4">
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="font-semibold">{invoice.paymentDate}</p>
              </div>
              <QRCodeComponent invoiceData={data} templateNumber={11} size={80} />
            </div>
          </div>

          <table className="w-full mb-6 border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 text-left border">Item Description</th>
                <th className="p-3 text-center border">Quantity</th>
                <th className="p-3 text-right border">Unit Price</th>
                <th className="p-3 text-right border">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-3 border">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </td>
                  <td className="p-3 text-center border">{item.quantity}</td>
                  <td className="p-3 text-right border">{formatCurrency(item.amount)}</td>
                  <td className="p-3 text-right border font-semibold">{formatCurrency(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-80 border-2 border-gray-800 p-4">
              <div className="flex justify-between py-2 border-b">
                <span className="font-semibold">Subtotal:</span>
                <span>{formatCurrency(subTotal)}</span>
              </div>
              {taxPercentage > 0 && (
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold">Tax ({taxPercentage}%):</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
              )}
              <div className="flex justify-between py-3 bg-gray-800 text-white px-4 -mx-4 -mb-4 mt-2">
                <span className="font-bold text-lg">TOTAL DUE:</span>
                <span className="font-bold text-xl">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>

          {notes && (
            <div className="mt-6 border-t-2 border-gray-300 pt-4">
              <h3 className="font-bold text-gray-700 mb-2">Terms & Conditions:</h3>
              <p className="text-sm text-gray-600">{notes}</p>
            </div>
          )}
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template11;