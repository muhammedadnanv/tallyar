import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Receipt, Download, Printer, Zap, Shield, Star, ArrowRight } from 'lucide-react';
import DonatingWidget from '../components/DonatingWidget';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: "Professional Invoices",
      description: "Create stunning, professional invoices with multiple templates to choose from."
    },
    {
      icon: Receipt,
      title: "Digital Receipts",
      description: "Generate instant receipts for all your transactions with detailed itemization."
    },
    {
      icon: Download,
      title: "PDF Export",
      description: "Download your invoices and receipts as high-quality PDF files instantly."
    },
    {
      icon: Printer,
      title: "Print Ready",
      description: "All documents are optimized for printing with professional layouts."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Create and generate documents in seconds with our streamlined interface."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is processed securely with no server storage required."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "Tallyar has made invoicing so much easier for my business. The templates are beautiful and professional.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Freelancer",
      content: "I love how quickly I can generate receipts for my clients. It's saved me hours every week.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Consultant",
      content: "The PDF export feature is fantastic. My clients always comment on how professional my invoices look.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            ✨ Professional Invoice & Receipt Generator
          </Badge>
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Tallyar</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Create professional invoices and receipts in seconds. Design, customize, and download beautiful documents for your business with our powerful yet simple platform.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              onClick={() => navigate('/create-invoice')} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              size="lg"
            >
              Create Invoice <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={() => navigate('/create-invoice')} 
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
              size="lg"
            >
              Generate Receipt
            </Button>
          </div>
          <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Instant Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>PDF Ready</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Professional Documents
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make invoice and receipt generation effortless and professional.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Thousands of Users
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about Tallyar
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Create Professional Documents?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses who trust Tallyar for their invoice and receipt needs.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => navigate('/create-invoice')} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              size="lg"
            >
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg"
              size="lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Keep the existing DonatingWidget */}
      <DonatingWidget
        upiId="adnanmuhammad4393@okicici"
        name="Muhammed Adnan"
        amount={199}
        position="bottom-right"
        primaryColor="#8B5CF6"
        buttonText="Donate"
        theme="modern"
        icon="gift"
        showPulse={true}
        showGradient={true}
        title="Support Us"
        description="Scan this QR code to make a donation"
      />
    </div>
  );
};

export default Index;
