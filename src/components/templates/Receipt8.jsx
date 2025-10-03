import React from 'react';
import { format } from 'date-fns';
import BaseTemplate2 from './BaseTemplate2';
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Receipt8 = ({ data, isPrint = false }) => {
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
        className="bg-white flex flex-col min-h-full"
        style={{
          fontSize: isPrint ? "8px" : "13px",
          fontFamily: "'Georgia', serif",
          lineHeight: "1.4",
        }}
      >
        <div className="text-center mb-2 pb-2 border-b-2 border-double border-gray-700">
          <div className="text-xl font-bold italic mb-1">{yourCompany.name || "N/A"}</div>
          <div className="text-xs">{yourCompany.address || "N/A"}</div>
          {yourCompany.phone && <div className="text-xs">Phone: {yourCompany.phone}</div>}
        </div>

        <div className="text-center mb-2">
          <div className="inline-block border border-gray-700 px-3 py-1">
            <span className="font-bold text-sm">RECEIPT</span>
          </div>
        </div>

        <div className="mb-2 text-xs space-y-1">
          <div className="grid grid-cols-2 gap-1">
            <div><span className="font-semibold">Receipt #:</span></div>
            <div className="text-right">{invoice.number || "N/A"}</div>
            <div><span className="font-semibold">Date:</span></div>
            <div className="text-right">
              {invoice.date ? format(new Date(invoice.date), "MMMM dd, yyyy") : "N/A"}
            </div>
            <div><span className="font-semibold">Time:</span></div>
            <div className="text-right">{format(new Date(), "hh:mm a")}</div>
            <div><span className="font-semibold">Cashier:</span></div>
            <div className="text-right">{cashier || "N/A"}</div>
          </div>
        </div>

        <div className="mb-2 pb-2 border-b border-gray-400 text-xs">
          <span className="font-semibold">Customer: </span>
          <span className="italic">{billTo?.name || "Valued Customer"}</span>
        </div>

        <div className="mb-2">
          <div className="flex justify-between font-semibold text-xs mb-1 pb-1 border-b border-gray-400">
            <span>Description</span>
            <span>Amount</span>
          </div>
          {items.map((item, index) => (
            <div key={index} className="mb-2 text-xs">
              <div className="flex justify-between">
                <span className="font-medium flex-1">{item.name || "N/A"}</span>
                <span className="font-semibold ml-2">{formatCurrency((item.quantity || 0) * (item.amount || 0))}</span>
              </div>
              <div className="text-gray-600 text-xs ml-2">
                {item.quantity || 0} unit(s) @ {formatCurrency(item.amount || 0)} each
              </div>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-double border-gray-700 pt-2 mb-2">
          <div className="flex justify-between text-xs mb-1">
            <span className="italic">Subtotal:</span>
            <span>{formatCurrency(subTotal)}</span>
          </div>
          {taxPercentage > 0 && (
            <div className="flex justify-between text-xs mb-1">
              <span className="italic">Tax ({taxPercentage}%):</span>
              <span>{formatCurrency(taxAmount)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-base mt-2 pt-2 border-t border-gray-400">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {notes && (
          <div className="mb-2 text-xs border-t border-gray-300 pt-2">
            <div className="font-semibold italic mb-1">Special Notes:</div>
            <div className="text-gray-700">{notes}</div>
          </div>
        )}

        <div className="text-center text-xs mt-2 border-t border-double border-gray-700 pt-2">
          <div className="font-semibold italic">{footer || "Thank you for your patronage!"}</div>
          <div className="mt-1 text-gray-600">We appreciate your business</div>
        </div>
      </div>
    </BaseTemplate2>
  );
};

export default Receipt8;