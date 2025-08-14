import React from 'react';
import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/usePWA';
import { Share, Download } from 'lucide-react';

const MobileActions = ({ onPrint, onDownload, isLoading }) => {
  const { isInstalled } = usePWA();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tallyar Invoice',
          text: 'Check out this invoice created with Tallyar',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
      <div className="flex gap-2 bg-background/95 backdrop-blur-sm border rounded-lg p-2 shadow-lg safe-area-inset-bottom">
        {navigator.share && (
          <Button
            variant="outline"
            size="touch"
            onClick={handleShare}
            className="flex-1"
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        )}
        <Button
          variant="outline"
          size="touch"
          onClick={onPrint}
          disabled={isLoading}
          className="flex-1"
        >
          Print
        </Button>
        <Button
          size="touch"
          onClick={onDownload}
          disabled={isLoading}
          className="flex-1"
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default MobileActions;