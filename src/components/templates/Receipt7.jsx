import React from 'react';
import { format } from 'date-fns';
import BaseTemplate2 from './BaseTemplate2';
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Receipt7 = ({ data, isPrint = false }) => {
  const { billTo = {}, invoice = {}, yourCompany = {}, cashier = '', items = [], taxPercentage = 0, notes = '', footer = '' } = data || {};

  const subTotal = calculateSubTotal(items);
  const taxAmount = calculateTaxAmount(subTotal, taxPercentage);
  const total = calculateGrandTotal(subTotal, taxAmount);

  return (
    <BaseTemplate2
      width="80mm"
      height="auto"
      className="p-3"
      data={data}
      isPrint={isPrint}
    >
      <div
        className="bg-white flex flex-col min-h-full border-2 border-gray-800 p-2"
        style={{
          fontSize: isPrint ? "8px" : "13px",
          fontFamily: "'Trebuchet MS', sans-serif",
          lineHeight: "1.3",
        }}
      >
        <div className="bg-gray-800 text-white text-center py-2 mb-2">
          <div className="font-bold text-lg">{yourCompany.name || "N/A"}</div>
          <div className="text-xs">{yourCompany.address || "N/A"}</div>
          {yourCompany.phone && <div className="text-xs">☎ {yourCompany.phone}</div>}
        </div>

        <div className="bg-gray-100 p-2 mb-2 text-xs">
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Receipt No:</span>
            <span>{invoice.number || "N/A"}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Date & Time:</span>
            <span>
              {invoice.date
                ? `${format(new Date(invoice.date), "MM/dd/yy")} ${format(new Date(), "HH:mm")}`
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Served by:</span>
            <span>{cashier || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Customer:</span>
            <span>{billTo?.name || "Guest"}</span>
          </div>
        </div>

        <div className="mb-2">
          <div className="bg-gray-800 text-white px-2 py-1 text-xs font-semibold mb-1">
            <div className="flex justify-between">
              <span>ITEM</span>
              <span>TOTAL</span>
            </div>
          </div>
          {items.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-1 mb-1 text-xs">
              <div className="flex justify-between font-medium">
                <span>{item.name || "N/A"}</span>
                <span className="font-bold">{formatCurrency((item.quantity || 0) * (item.amount || 0))}</span>
              </div>
              <div className="text-gray-600 ml-2 text-xs">
                Qty: {item.quantity || 0} × {formatCurrency(item.amount || 0)}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-gray-800 pt-2 mb-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Subtotal:</span>
            <span>{formatCurrency(subTotal)}</span>
          </div>
          {taxPercentage > 0 && (
            <div className="flex justify-between text-xs mb-1">
              <span>Tax ({taxPercentage}%):</span>
              <span>{formatCurrency(taxAmount)}</span>
            </div>
          )}
          <div className="bg-gray-800 text-white px-2 py-2 -mx-2 flex justify-between font-bold mt-2">
            <span>TOTAL:</span>
            <span className="text-lg">{formatCurrency(total)}</span>
          </div>
        </div>

        {notes && (
          <div className="bg-gray-100 p-2 mb-2 text-xs">
            <div className="font-semibold mb-1">Note:</div>
            <div>{notes}</div>
          </div>
        )}

        <div className="text-center text-xs mt-2 border-t border-gray-300 pt-2">
          <div className="font-semibold">{footer || "Thank You For Your Purchase!"}</div>
          <div className="mt-1 text-gray-600">Please visit us again</div>
        </div>
      </div>
    </BaseTemplate2>
  );
};

export default Receipt7;