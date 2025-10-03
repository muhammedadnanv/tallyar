import React from 'react';
import { format } from 'date-fns';
import BaseTemplate2 from './BaseTemplate2';
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Receipt5 = ({ data, isPrint = false }) => {
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
          fontSize: isPrint ? "9px" : "14px",
          fontFamily: "'Arial', sans-serif",
          lineHeight: "1.4",
        }}
      >
        <div className="border-b-2 border-dashed border-gray-400 pb-2 mb-2">
          <div className="text-center font-bold text-lg mb-1">{yourCompany.name || "N/A"}</div>
          <div className="text-center text-xs mb-1">{yourCompany.address || "N/A"}</div>
          {yourCompany.phone && <div className="text-center text-xs">{yourCompany.phone}</div>}
        </div>

        <div className="mb-2 text-xs">
          <div className="flex justify-between">
            <span className="font-semibold">Receipt #:</span>
            <span>{invoice.number || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Date:</span>
            <span>
              {invoice.date
                ? `${format(new Date(invoice.date), "MM/dd/yyyy")} ${format(new Date(), "HH:mm")}`
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Cashier:</span>
            <span>{cashier || "N/A"}</span>
          </div>
        </div>

        <div className="border-t border-b border-gray-300 py-2 mb-2">
          <div className="font-semibold mb-1 text-xs">Customer: {billTo?.name || "N/A"}</div>
        </div>

        <div className="mb-2">
          <div className="flex justify-between font-semibold text-xs mb-1 border-b border-gray-300 pb-1">
            <span>Item</span>
            <span>Amount</span>
          </div>
          {items.map((item, index) => (
            <div key={index} className="mb-1 text-xs">
              <div className="flex justify-between">
                <span className="font-medium">{item.name || "N/A"}</span>
                <span className="font-semibold">{formatCurrency((item.quantity || 0) * (item.amount || 0))}</span>
              </div>
              <div className="text-gray-600 ml-2">
                {item.quantity || 0} × {formatCurrency(item.amount || 0)}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-gray-400 pt-2 mb-2">
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
          <div className="flex justify-between font-bold text-base mt-2">
            <span>TOTAL:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {notes && (
          <div className="border-t border-gray-300 pt-2 mb-2 text-xs">
            <div className="font-semibold mb-1">Notes:</div>
            <div>{notes}</div>
          </div>
        )}

        <div className="text-center text-xs mt-2 border-t border-dashed border-gray-400 pt-2">
          {footer || "Thank you for your business!"}
        </div>
      </div>
    </BaseTemplate2>
  );
};

export default Receipt5;