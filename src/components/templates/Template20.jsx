import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';
import QRCodeComponent from '../QRCodeComponent';
import Watermark from '../Watermark';

const Template20 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="relative bg-gray-50 p-8 max-w-4xl mx-auto">
        <Watermark text="TALLYAR" opacity={0.05} />
        
        {/* Diagonal Split Header */}
        <div className="relative mb-8 overflow-hidden rounded-2xl shadow-2xl" style={{ height: '200px' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 transform -skew-y-2"></div>
          <div className="absolute inset-0 flex items-center justify-between px-10">
            <div className="text-white z-10">
              <h2 className="text-5xl font-bold mb-2">INVOICE</h2>
              <p className="text-emerald-100 text-lg">#{invoice.number}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-xl z-10">
              <QRCodeComponent invoiceData={data} templateNumber={20} size={90} />
            </div>
          </div>
        </div>

        {/* Company and Invoice Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">{yourCompany.name}</h1>
              <div className="text-gray-600 space-y-1">
                <p>{yourCompany.address}</p>
                <p>{yourCompany.phone}</p>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div>
                <span className="text-sm text-gray-500">Invoice Date: </span>
                <span className="font-semibold text-gray-800">{invoice.date}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Due Date: </span>
                <span className="font-semibold text-gray-800">{invoice.paymentDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Client Information with Accent Border */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-emerald-500">
            <h3 className="text-xs uppercase tracking-wider text-emerald-600 font-bold mb-4">Billing Address</h3>
            <p className="font-bold text-gray-800 text-lg mb-2">{billTo.name}</p>
            <div className="text-gray-600 space-y-1">
              <p>{billTo.address}</p>
              <p>{billTo.phone}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-500">
            <h3 className="text-xs uppercase tracking-wider text-teal-600 font-bold mb-4">Shipping Address</h3>
            <p className="font-bold text-gray-800 text-lg mb-2">{shipTo.name}</p>
            <div className="text-gray-600 space-y-1">
              <p>{shipTo.address}</p>
              <p>{shipTo.phone}</p>
            </div>
          </div>
        </div>

        {/* Items Table with Striped Rows */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <th className="text-left p-4 font-bold">Item Description</th>
                <th className="text-center p-4 font-bold">Quantity</th>
                <th className="text-right p-4 font-bold">Unit Price</th>
                <th className="text-right p-4 font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-100`}>
                  <td className="p-4 text-gray-700 font-medium">{item.description}</td>
                  <td className="text-center p-4 text-gray-700">{item.quantity}</td>
                  <td className="text-right p-4 text-gray-700">{formatCurrency(item.amount)}</td>
                  <td className="text-right p-4 font-bold text-gray-900">{formatCurrency(item.quantity * item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary with Gradient Accent */}
        <div className="flex justify-end mb-8">
          <div className="w-96 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">{formatCurrency(subTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700 pb-4 border-b-2 border-gray-200">
                <span className="font-medium">Tax ({taxPercentage}%)</span>
                <span className="font-semibold">{formatCurrency(taxAmount)}</span>
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-lg -m-6 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total Amount</span>
                  <span className="text-2xl font-bold">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        {notes && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-emerald-700 mb-3 uppercase text-sm tracking-wide">Payment Notes</h3>
            <p className="text-gray-600 leading-relaxed">{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template20;
