
import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { calculateSubTotal, calculateTaxAmount, calculateGrandTotal } from '../../utils/invoiceCalculations';

const Receipt4 = ({ data }) => {
  const { billTo = {}, invoice = {}, yourCompany = {}, items = [], taxPercentage = 0, footer = '', cashier = 'Tallyar User' } = data || {};
  
  const subTotal = calculateSubTotal(items);
  const taxAmount = calculateTaxAmount(subTotal, taxPercentage);
  const grandTotal = calculateGrandTotal(subTotal, taxAmount);
  
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="p-4 font-['Courier_New',_monospace] bg-white max-w-sm mx-auto">
      <h2 className="text-center font-bold text-lg mb-2">{yourCompany.name || 'Your Company'}</h2>
      <p className="text-center text-sm">{yourCompany.address || 'Company Address'}</p>
      <p className="text-center text-sm">Phone: {yourCompany.phone || 'Phone Number'}</p>
      {yourCompany.gst && (
        <p className="text-center text-sm">GST No: {yourCompany.gst.toUpperCase()}</p>
      )}
      <hr className="my-4 border-black" />
      
      <div className="text-sm">
        <p>Invoice Number: {invoice.number || 'N/A'}</p>
        <p>Created By: {cashier}</p>
        <p>
          Date & Time: {invoice.date || new Date().toLocaleDateString()} {currentTime}
        </p>
      </div>
      
      <hr className="my-4 border-black" />
      
      <div className="text-sm">
        <h3 className="font-bold">Bill to:</h3>
        <p>{billTo.name || 'Customer Name'}</p>
        <span>Place of supply: Chhattisgarh-22</span>
      </div>
      
      <hr className="my-4 border-black" />
      
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Item</th>
            <th className="text-right">Qty</th>
            <th className="text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <tr className="align-bottom">
                <td>{item.name || 'Item'}</td>
                <td className="text-right">{item.quantity || 0}</td>
                <td className="text-right">{formatCurrency(item.amount || 0)}</td>
              </tr>
              <tr className="align-top">
                <td colSpan="2" className="text-left pb-2">
                  HSN Code: {item.description || 'N/A'}
                </td>
                <td className="text-right pb-2">Total: {formatCurrency((item.quantity || 0) * (item.amount || 0))}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      
      <hr className="my-4 border-black" />
      
      <div className="text-sm">
        <div className="flex justify-between">
          <span>Sub Total:</span>
          <span>{formatCurrency(subTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax ({taxPercentage}%):</span>
          <span>{formatCurrency(taxAmount)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>TOTAL:</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>
      
      <hr className="my-4 border-black" />
      
      <div className="text-sm">
        <h3 className="mb-2 font-bold">Tax Summary</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left font-normal">Type</th>
              <th className="text-right font-normal">Rate</th>
              <th className="text-right font-normal">Total Amt</th>
              <th className="text-right font-normal">Tax Amt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CGST</td>
              <td className="text-right">{(taxPercentage / 2).toFixed(2)}%</td>
              <td className="text-right">{formatCurrency(subTotal)}</td>
              <td className="text-right">{formatCurrency(taxAmount / 2)}</td>
            </tr>
            <tr>
              <td>SGST</td>
              <td className="text-right">{(taxPercentage / 2).toFixed(2)}%</td>
              <td className="text-right">{formatCurrency(subTotal)}</td>
              <td className="text-right">{formatCurrency(taxAmount / 2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <hr className="my-4 border-black" />
      <p className="text-center text-sm">{footer || 'Thank you for your business!'}</p>
    </div>
  );
};

export default Receipt4;
