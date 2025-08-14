import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

const InstallPrompt = () => {
  const { isInstallable, installApp } = usePWA();
  const [showPrompt, setShowPrompt] = React.useState(false);

  React.useEffect(() => {
    if (isInstallable) {
      // Show prompt after a delay
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable]);

  if (!showPrompt || !isInstallable) return null;

  const handleInstall = async () => {
    const installed = await installApp();
    if (installed) {
      setShowPrompt(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Download className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-foreground">
              Install Tallyar
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Add to your home screen for quick access and offline use
            </p>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                onClick={handleInstall}
                className="text-xs"
              >
                Install
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowPrompt(false)}
                className="text-xs"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;