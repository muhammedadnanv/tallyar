import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Receipt, Download, Printer, Zap, Shield, Star, ArrowRight, Sparkles, Users, Globe, TrendingUp } from 'lucide-react';
import DonatingWidget from '../components/DonatingWidget';
import AIProductPopup from '../components/AIProductPopup';

const Index = () => {
  const navigate = useNavigate();

  const features = [{
    icon: FileText,
    title: "AI-Powered Invoices",
    description: "Create stunning, professional invoices with smart templates that adapt to your business needs.",
    gradient: "from-blue-500 to-purple-600"
  }, {
    icon: Receipt,
    title: "Instant Receipts",
    description: "Generate beautiful digital receipts in seconds with automatic calculations and tax handling.",
    gradient: "from-purple-500 to-pink-600"
  }, {
    icon: Download,
    title: "Export Anywhere",
    description: "Download high-quality PDFs, share via email, or integrate with your favorite business tools.",
    gradient: "from-pink-500 to-red-600"
  }, {
    icon: Printer,
    title: "Print Perfect",
    description: "Every document is optimized for printing with pixel-perfect layouts and professional formatting.",
    gradient: "from-red-500 to-orange-600"
  }, {
    icon: Zap,
    title: "Lightning Speed",
    description: "Create invoices 10x faster than traditional methods with our streamlined, intuitive interface.",
    gradient: "from-orange-500 to-yellow-600"
  }, {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your data is encrypted and secure. No server storage means your information stays private.",
    gradient: "from-green-500 to-blue-600"
  }];
  const testimonials = [{
    name: "Sarah Johnson",
    role: "Digital Marketing Agency Owner",
    content: "Tallyar transformed how we handle billing. Our clients love the professional invoices, and we save 5+ hours weekly!",
    rating: 5,
    avatar: "SJ",
    company: "CreativeFlow Agency"
  }, {
    name: "Mike Chen",
    role: "Freelance Designer",
    content: "The templates are gorgeous and the speed is unmatched. I've never had invoicing feel this effortless before.",
    rating: 5,
    avatar: "MC",
    company: "Independent Creator"
  }, {
    name: "Lisa Rodriguez",
    role: "E-commerce Consultant",
    content: "Professional receipts that actually impress clients? Yes please! Tallyar is a game-changer for my business.",
    rating: 5,
    avatar: "LR",
    company: "EcomGrowth Consulting"
  }];
  const stats = [{
    number: "50K+",
    label: "Happy Users",
    icon: Users
  }, {
    number: "1M+",
    label: "Invoices Created",
    icon: FileText
  }, {
    number: "150+",
    label: "Countries",
    icon: Globe
  }, {
    number: "99.9%",
    label: "Uptime",
    icon: TrendingUp
  }];
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section with Enhanced Branding */}
      <div className="container mx-auto px-4 py-16">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tallyar
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live & Ready
            </Badge>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-6 px-6 py-3 text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 border-0">
            <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
            The Future of Invoicing is Here
          </Badge>
          
          <h1 className="text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tallyar
            </span>
            <br />
            <span className="text-gray-900 text-5xl">Makes Invoicing</span>
            <br />
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent text-5xl">
              Effortless
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
            Join thousands of entrepreneurs who've revolutionized their billing process. Create 
            <span className="font-semibold text-blue-600"> stunning invoices</span> and 
            <span className="font-semibold text-purple-600"> professional receipts</span> in seconds, 
            not hours. Your business deserves better than boring paperwork.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button onClick={() => navigate('/create-invoice')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" size="lg">
              Start Creating <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center gap-8 text-sm text-gray-500 mb-16">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="font-medium">100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">Instant Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Export Ready</span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>)}
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-purple-200 text-purple-600">
              Why Choose Tallyar?
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Win</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed by entrepreneurs, for entrepreneurs. No fluff, just results.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {features.map((feature, index) => <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:-translate-y-2">
                <CardHeader>
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Enhanced Testimonials */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-green-200 text-green-600">
              Success Stories
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Loved by 
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"> Thousands</span>
            </h2>
            <p className="text-xl text-gray-600">
              Real entrepreneurs. Real results. Real impact.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <Card key={index} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed text-lg">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-blue-600 font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10"></div>
          <div className="relative text-center bg-white/80 backdrop-blur-sm rounded-3xl p-16 shadow-2xl border border-white/20">
            <Badge variant="outline" className="mb-6 px-6 py-3 border-blue-200 text-blue-600 bg-blue-50">
              <Sparkles className="w-4 h-4 mr-2" />
              Ready to Transform Your Business?
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Join the Invoicing 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Revolution</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop wrestling with complicated software. Start creating beautiful invoices that actually get paid faster.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={() => navigate('/create-invoice')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" size="lg">
                Start Today <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              No credit card required • Forever plan • Setup in 30 seconds
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer with powered by text */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            Powered by <a href="https://www.linkedin.com/in/muhammedadnanvv/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">Muhammed Adnan</a>
          </p>
        </div>
      </footer>
      
      <DonatingWidget upiId="adnanmuhammad4393@okicici" name="Muhammed Adnan" amount={199} position="bottom-right" primaryColor="#8B5CF6" buttonText="Support Us" theme="modern" icon="gift" showPulse={true} showGradient={true} title="Love Tallyar?" description="Help us keep building amazing tools" />
      <AIProductPopup />
    </div>;
};

export default Index;
