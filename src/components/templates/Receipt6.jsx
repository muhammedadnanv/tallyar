import React from 'react';
import { format } from 'date-fns';
import BaseTemplate2 from './BaseTemplate2';
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Receipt6 = ({ data, isPrint = false }) => {
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
          fontFamily: "'Consolas', 'Courier New', monospace",
          lineHeight: "1.3",
        }}
      >
        <div className="text-center mb-2">
          <div className="font-bold text-xl">★ {yourCompany.name || "N/A"} ★</div>
          <div className="text-xs mt-1">{yourCompany.address || "N/A"}</div>
          {yourCompany.phone && <div className="text-xs">Tel: {yourCompany.phone}</div>}
          <div className="mt-2 text-xs">━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        </div>

        <div className="mb-2">
          <div className="text-center font-bold mb-1">SALES RECEIPT</div>
          <div className="flex justify-between text-xs">
            <span>No: {invoice.number || "N/A"}</span>
            <span>{invoice.date ? format(new Date(invoice.date), "MM/dd/yyyy") : "N/A"}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Time: {format(new Date(), "HH:mm:ss")}</span>
            <span>Cashier: {cashier || "N/A"}</span>
          </div>
          <div className="text-xs mt-1">Customer: {billTo?.name || "Walk-in"}</div>
        </div>

        <div className="text-xs mb-2">━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

        <div className="mb-2">
          {items.map((item, index) => (
            <div key={index} className="mb-2 text-xs">
              <div className="font-medium">{item.name || "N/A"}</div>
              <div className="flex justify-between ml-2">
                <span>{item.quantity || 0} @ {formatCurrency(item.amount || 0)}</span>
                <span className="font-semibold">{formatCurrency((item.quantity || 0) * (item.amount || 0))}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs mb-2">━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

        <div className="text-xs">
          <div className="flex justify-between mb-1">
            <span>SUBTOTAL:</span>
            <span>{formatCurrency(subTotal)}</span>
          </div>
          {taxPercentage > 0 && (
            <div className="flex justify-between mb-1">
              <span>TAX ({taxPercentage}%):</span>
              <span>{formatCurrency(taxAmount)}</span>
            </div>
          )}
          <div className="text-xs my-1">- - - - - - - - - - - - - - - - - - - - - - - - - - - -</div>
          <div className="flex justify-between font-bold text-base">
            <span>TOTAL:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {notes && (
          <div className="mt-2 text-xs border-t border-dashed border-gray-400 pt-2">
            <div>{notes}</div>
          </div>
        )}

        <div className="text-center text-xs mt-3 border-t border-dashed border-gray-400 pt-2">
          <div className="font-semibold">{footer || "★ THANK YOU ★"}</div>
          <div className="mt-1">Please come again!</div>
        </div>
      </div>
    </BaseTemplate2>
  );
};

export default Receipt6;