import React from 'react';
import { format } from 'date-fns';
import BaseTemplate2 from './BaseTemplate2';
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Receipt9 = ({ data, isPrint = false }) => {
  const { billTo = {}, invoice = {}, yourCompany = {}, cashier = '', items = [], taxPercentage = 0, notes = '', footer = '' } = data || {};

  const subTotal = calculateSubTotal(items);
  const taxAmount = calculateTaxAmount(subTotal, taxPercentage);
  const total = calculateGrandTotal(subTotal, taxAmount);

  return (
    <BaseTemplate2
      width="80mm"
      height="auto"
      className="p-2"
      data={data}
      isPrint={isPrint}
    >
      <div
        className="bg-gradient-to-b from-gray-50 to-white flex flex-col min-h-full p-2 border border-gray-300 rounded"
        style={{
          fontSize: isPrint ? "8px" : "13px",
          fontFamily: "'Verdana', sans-serif",
          lineHeight: "1.3",
        }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-2 px-2 rounded mb-2">
          <div className="font-bold text-base">{yourCompany.name || "N/A"}</div>
          <div className="text-xs mt-1">{yourCompany.address || "N/A"}</div>
          {yourCompany.phone && <div className="text-xs">📞 {yourCompany.phone}</div>}
        </div>

        <div className="text-center mb-2">
          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded font-semibold text-xs">
            PAYMENT RECEIPT
          </div>
        </div>

        <div className="bg-gray-100 rounded p-2 mb-2 text-xs">
          <div className="grid grid-cols-2 gap-1">
            <div className="font-semibold">Receipt #:</div>
            <div className="text-right">{invoice.number || "N/A"}</div>
            <div className="font-semibold">Date:</div>
            <div className="text-right">
              {invoice.date ? format(new Date(invoice.date), "MM/dd/yyyy") : "N/A"}
            </div>
            <div className="font-semibold">Time:</div>
            <div className="text-right">{format(new Date(), "HH:mm")}</div>
            <div className="font-semibold">Cashier:</div>
            <div className="text-right">{cashier || "N/A"}</div>
            <div className="font-semibold">Customer:</div>
            <div className="text-right">{billTo?.name || "Guest"}</div>
          </div>
        </div>

        <div className="mb-2">
          <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold mb-1">
            <div className="flex justify-between">
              <span>ITEM DESCRIPTION</span>
              <span>PRICE</span>
            </div>
          </div>
          {items.map((item, index) => (
            <div key={index} className={`p-2 mb-1 rounded text-xs ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}>
              <div className="flex justify-between font-medium mb-1">
                <span className="flex-1">{item.name || "N/A"}</span>
                <span className="font-bold ml-2">{formatCurrency((item.quantity || 0) * (item.amount || 0))}</span>
              </div>
              <div className="text-gray-600 text-xs">
                Qty: {item.quantity || 0} × {formatCurrency(item.amount || 0)}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 rounded p-2 mb-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Subtotal:</span>
            <span className="font-semibold">{formatCurrency(subTotal)}</span>
          </div>
          {taxPercentage > 0 && (
            <div className="flex justify-between text-xs mb-2">
              <span>Tax ({taxPercentage}%):</span>
              <span className="font-semibold">{formatCurrency(taxAmount)}</span>
            </div>
          )}
          <div className="border-t-2 border-blue-300 pt-2 flex justify-between font-bold text-base">
            <span>TOTAL:</span>
            <span className="text-blue-600">{formatCurrency(total)}</span>
          </div>
        </div>

        {notes && (
          <div className="bg-yellow-50 border-l-2 border-yellow-400 p-2 mb-2 text-xs rounded">
            <div className="font-semibold text-yellow-800 mb-1">📝 Note:</div>
            <div className="text-gray-700">{notes}</div>
          </div>
        )}

        <div className="text-center text-xs mt-2 border-t border-gray-300 pt-2">
          <div className="font-semibold text-blue-800">{footer || "✨ Thank You! ✨"}</div>
          <div className="mt-1 text-gray-600">Your satisfaction is our priority</div>
        </div>
      </div>
    </BaseTemplate2>
  );
};

export default Receipt9;