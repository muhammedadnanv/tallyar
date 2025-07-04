
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

const QRCodeComponent = ({ invoiceData, templateNumber, size = 100 }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        if (!invoiceData || !templateNumber) {
          console.log('Missing invoiceData or templateNumber');
          return;
        }

        // Create a unique URL for this invoice
        const invoiceId = `${invoiceData.invoice?.number || 'INV'}-${Date.now()}`;
        const downloadUrl = `${window.location.origin}/download-invoice/${invoiceId}`;
        
        // Store invoice data temporarily (in real app, this would be in a database)
        const invoiceKey = `invoice-${invoiceId}`;
        localStorage.setItem(invoiceKey, JSON.stringify({
          data: invoiceData,
          templateNumber: templateNumber,
          timestamp: Date.now()
        }));

        // Generate QR code
        const qrCodeDataUrl = await QRCode.toDataURL(downloadUrl, {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        
        setQrCodeUrl(qrCodeDataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [invoiceData, templateNumber, size]);

  if (!qrCodeUrl) {
    return (
      <div 
        className="bg-gray-200 rounded flex items-center justify-center text-xs"
        style={{ width: size, height: size }}
      >
        QR Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <img 
        src={qrCodeUrl} 
        alt="Invoice QR Code" 
        className="rounded"
        style={{ width: size, height: size }}
      />
      <p className="text-xs text-gray-600 mt-1 text-center">Scan to download</p>
    </div>
  );
};

export default QRCodeComponent;
