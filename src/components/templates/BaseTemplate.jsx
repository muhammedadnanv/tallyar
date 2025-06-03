
import React from 'react';

const BaseTemplate = ({ data, children }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg mx-auto print:shadow-none print:rounded-none"
      style={{ 
        width: "794px", 
        height: "1123px",
        // A4 dimensions in pixels at 96 DPI
        minHeight: "1123px"
      }}
    >
      <style jsx>{`
        @media print {
          @page {
            size: A4;
            margin: 0.5in;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
      {children}
    </div>
  );
};

export default BaseTemplate;
