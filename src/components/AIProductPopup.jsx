import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, MessageCircle, ExternalLink } from 'lucide-react';

const AIProductPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkAndShowPopup = () => {
      const today = new Date();
      const dayOfMonth = today.getDate();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      
      // Check if today is the first day of the month
      const isFirstDayOfMonth = dayOfMonth === 1;
      
      // Get last shown date from localStorage
      const lastShownKey = 'aiPopupLastShown';
      const lastShownData = localStorage.getItem(lastShownKey);
      
      let shouldShow = false;
      
      if (isFirstDayOfMonth) {
        if (!lastShownData) {
          // Never shown before
          shouldShow = true;
        } else {
          try {
            const { month, year } = JSON.parse(lastShownData);
            // Show if not shown this month yet
            if (month !== currentMonth || year !== currentYear) {
              shouldShow = true;
            }
          } catch (e) {
            // Invalid data, show popup
            shouldShow = true;
          }
        }
      }
      
      if (shouldShow) {
        // Show popup after 3 seconds delay
        const showTimer = setTimeout(() => {
          setIsVisible(true);
          // Store that we've shown it this month
          localStorage.setItem(lastShownKey, JSON.stringify({
            month: currentMonth,
            year: currentYear,
            date: today.toISOString()
          }));
        }, 3000);

        // Auto-dismiss after 20 seconds of being visible
        const dismissTimer = setTimeout(() => {
          setIsVisible(false);
        }, 23000); // 3s delay + 20s visible

        return () => {
          clearTimeout(showTimer);
          clearTimeout(dismissTimer);
        };
      }
    };

    checkAndShowPopup();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // User manually closed it, still counts as shown for this month
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/919656778508?text=Hi! I'm interested in building an AI SaaS product.`, '_blank');
  };

  const handleProductHunt = () => {
    window.open('https://www.producthunt.com/@muhammad_adnan45', '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="relative w-full max-w-md mx-4 bg-white shadow-2xl border-0 animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>
        
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
              Build Your Own AI SaaS Product
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Have an AI startup idea? I'll turn it into a fully functional product — fast. 
              From concept to launch, done for you.
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-600 font-medium">
              <MessageCircle className="w-4 h-4" />
              <span>+91 9656778508</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleWhatsApp}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Connect with Me
            </Button>
            
            <Button
              onClick={handleProductHunt}
              variant="outline"
              className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              See My Products
            </Button>
          </div>

          {/* Watermark */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              Powered by{" "}
              <a 
                href="https://www.linkedin.com/in/muhammedadnanvv/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Muhammed Adnan
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIProductPopup;