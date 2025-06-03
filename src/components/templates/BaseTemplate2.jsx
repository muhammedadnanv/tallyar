
import React from 'react';

const BaseTemplate2 = ({ children, width = "80mm", height = "auto", className = "", isPrint = false }) => {
  const printStyle = isPrint
    ? { 
        width: "80mm", 
        height: "auto",
        minHeight: "200mm",
        maxWidth: "80mm"
      }
    : { 
        width: "300px", 
        height: "auto", 
        minHeight: "570px",
        maxWidth: "300px"
      };
  
  return (
    <>
      <style jsx>{`
        @media print {
          @page {
            size: 80mm auto;
            margin: 2mm;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            margin: 0;
            padding: 0;
            font-size: 8pt !important;
            line-height: 1.2 !important;
          }
          .receipt-container {
            width: 76mm !important;
            max-width: 76mm !important;
            margin: 0 auto;
            padding: 2mm;
          }
        }
      `}</style>
      <div
        className={`bg-white rounded-lg shadow-lg mx-auto print:shadow-none print:rounded-none receipt-container ${className}`}
        style={printStyle}
      >
        {children}
      </div>
    </>
  );
};

export default BaseTemplate2;
