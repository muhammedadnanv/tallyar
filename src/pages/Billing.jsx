
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard } from 'lucide-react';

const Billing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 safe-area-inset">
      <div className="container mx-auto px-4 py-4 sm:py-8 safe-area-inset-top safe-area-inset-bottom">
        <div className="mb-6 sm:mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="mb-4 w-full sm:w-auto"
            size="touch"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="text-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
              Billing
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Manage your billing and subscription
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-base sm:text-lg">
                <CreditCard className="h-5 w-5 mr-2" />
                Billing Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Billing functionality coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Billing;
