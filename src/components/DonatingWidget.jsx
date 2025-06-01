
import React, { useState } from 'react';
import { Gift, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DonatingWidget = ({
  upiId,
  name,
  amount,
  position = "bottom-right",
  primaryColor = "#8B5CF6",
  buttonText = "Donate",
  theme = "modern",
  icon = "gift",
  showPulse = true,
  showGradient = true,
  title = "Support Us",
  description = "Scan this QR code to make a donation"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  const IconComponent = icon === 'gift' ? Gift : Gift;

  // Generate UPI URL and QR code using a web service
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

  return (
    <>
      {/* Floating Button */}
      <div className={`fixed ${getPositionClasses()} z-50`}>
        <Button
          onClick={() => setIsOpen(true)}
          className={`
            rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300
            ${showPulse ? 'animate-pulse hover:animate-none' : ''}
            ${showGradient ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : ''}
          `}
          style={{
            backgroundColor: !showGradient ? primaryColor : undefined,
          }}
        >
          <IconComponent className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{description}</p>
              
              <div className="flex justify-center">
                <img
                  src={qrCodeUrl}
                  alt="QR Code for UPI Payment"
                  className="border rounded-lg"
                  width={200}
                  height={200}
                />
              </div>
              
              <div className="text-center space-y-2">
                <p className="font-semibold">₹{amount}</p>
                <p className="text-sm text-gray-600">to {name}</p>
                <p className="text-xs text-gray-500">{upiId}</p>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Open any UPI app and scan this QR code to donate
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default DonatingWidget;
