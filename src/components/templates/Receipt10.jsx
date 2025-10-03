import React from 'react';
import { format } from 'date-fns';
import BaseTemplate2 from './BaseTemplate2';
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Receipt10 = ({ data, isPrint = false }) => {
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
        className="bg-white flex flex-col min-h-full"
        style={{
          fontSize: isPrint ? "8px" : "14px",
          fontFamily: "'Roboto', 'Arial', sans-serif",
          lineHeight: "1.4",
        }}
      >
        <div className="text-center mb-3 pb-2 border-b-4 border-double border-purple-600">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {yourCompany.name || "N/A"}
          </div>
          <div className="text-xs text-gray-600">{yourCompany.address || "N/A"}</div>
          {yourCompany.phone && (
            <div className="text-xs text-gray-600">Tel: {yourCompany.phone}</div>
          )}
        </div>

        <div className="text-center mb-3">
          <div className="inline-block">
            <div className="bg-purple-600 text-white px-4 py-1 font-bold text-sm">
              RECEIPT
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="bg-purple-50 rounded p-2 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="font-semibold text-purple-700">Receipt No:</span>
              <span className="font-bold">{invoice.number || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-purple-700">Date:</span>
              <span>
                {invoice.date
                  ? format(new Date(invoice.date), "dd/MM/yyyy")
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-purple-700">Time:</span>
              <span>{format(new Date(), "HH:mm:ss")}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-purple-700">Cashier:</span>
              <span>{cashier || "N/A"}</span>
            </div>
            <div className="flex justify-between border-t border-purple-200 pt-1 mt-1">
              <span className="font-semibold text-purple-700">Customer:</span>
              <span className="font-medium">{billTo?.name || "Cash Customer"}</span>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="bg-purple-600 text-white px-2 py-1 text-xs font-bold mb-2 flex justify-between">
            <span>ITEMS</span>
            <span>AMOUNT</span>
          </div>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="text-xs border-b border-gray-200 pb-2">
                <div className="flex justify-between font-medium mb-1">
                  <span className="flex-1 font-semibold">{item.name || "N/A"}</span>
                  <span className="ml-2 font-bold text-purple-600">
                    {formatCurrency((item.quantity || 0) * (item.amount || 0))}
                  </span>
                </div>
                <div className="text-gray-600 ml-2">
                  {item.quantity || 0} pc × {formatCurrency(item.amount || 0)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between py-1">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-semibold">{formatCurrency(subTotal)}</span>
            </div>
            {taxPercentage > 0 && (
              <div className="flex justify-between py-1">
                <span className="text-gray-700">Tax ({taxPercentage}%):</span>
                <span className="font-semibold">{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="border-t-2 border-purple-600 pt-2 mt-2">
              <div className="bg-purple-600 text-white px-3 py-2 -mx-3 flex justify-between font-bold text-lg">
                <span>TOTAL:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {notes && (
          <div className="mb-3 bg-gray-50 rounded p-2 border-l-4 border-purple-400">
            <div className="font-semibold text-xs mb-1 text-purple-700">Notes:</div>
            <div className="text-xs text-gray-700">{notes}</div>
          </div>
        )}

        <div className="text-center text-xs mt-3 border-t-2 border-dashed border-gray-400 pt-2">
          <div className="font-bold text-purple-600 mb-1">
            {footer || "♥ THANK YOU FOR YOUR PURCHASE ♥"}
          </div>
          <div className="text-gray-600">Visit us again soon!</div>
        </div>
      </div>
    </BaseTemplate2>
  );
};

export default Receipt10;