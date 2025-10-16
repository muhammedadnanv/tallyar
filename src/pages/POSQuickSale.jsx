import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Barcode, Plus, Minus, Trash2, ShoppingCart, Zap, Receipt as ReceiptIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { formatCurrency } from '@/utils/formatCurrency';

const POSQuickSale = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [barcode, setBarcode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [taxPercentage, setTaxPercentage] = useState(0);
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (user) {
      loadProducts();
    }
  }, [user]);

  // Auto-focus barcode input on mount
  useEffect(() => {
    barcodeRef.current?.focus();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // F2 - Focus barcode
      if (e.key === 'F2') {
        e.preventDefault();
        barcodeRef.current?.focus();
      }
      // F9 - Generate receipt
      if (e.key === 'F9' && cart.length > 0) {
        e.preventDefault();
        handleGenerateReceipt();
      }
      // ESC - Clear cart
      if (e.key === 'Escape' && cart.length > 0) {
        e.preventDefault();
        if (confirm('Clear entire cart?')) {
          setCart([]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [cart]);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    }
  };

  const handleBarcodeScanned = async (scannedBarcode) => {
    if (!scannedBarcode.trim()) return;

    const product = products.find(p => p.barcode === scannedBarcode || p.sku === scannedBarcode);
    
    if (product) {
      addToCart(product);
      setBarcode('');
      barcodeRef.current?.focus();
    } else {
      toast.error('Product not found');
      setBarcode('');
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        description: product.description || '',
        quantity: 1,
        amount: parseFloat(product.price),
        total: parseFloat(product.price)
      }]);
    }
    toast.success('Added to cart');
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return {
          ...item,
          quantity: newQuantity,
          total: newQuantity * item.amount
        };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const calculateTotals = () => {
    const subTotal = cart.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
    const taxAmount = (subTotal * taxPercentage) / 100;
    const grandTotal = subTotal + taxAmount;
    
    return {
      subTotal: subTotal.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      grandTotal: grandTotal.toFixed(2)
    };
  };

  const handleGenerateReceipt = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    const totals = calculateTotals();
    const receiptData = {
      invoice: {
        number: `REC-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString()
      },
      items: cart,
      taxPercentage,
      ...totals,
      cashier: user?.email || 'Cashier',
      yourCompany: { name: 'Your Store', address: '', phone: '' },
      billTo: { name: 'Walk-in Customer', address: '', phone: '' }
    };

    localStorage.setItem('receiptData', JSON.stringify(receiptData));
    navigate('/receipt', { state: { formData: receiptData, selectedTemplate: 1 } });
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.barcode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 safe-area-inset">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4 safe-area-inset-top safe-area-inset-bottom">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              POS Mode
            </Badge>
            <Badge variant="outline" className="text-xs hidden sm:inline-flex">
              F2: Scan | F9: Receipt | ESC: Clear
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Left: Product Search & List */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {/* Barcode Scanner */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center">
                  <Barcode className="h-5 w-5 mr-2" />
                  Barcode Scanner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    ref={barcodeRef}
                    type="text"
                    placeholder="Scan or type barcode..."
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleBarcodeScanned(barcode);
                      }
                    }}
                    className="text-base touch-manipulation h-12"
                  />
                  <Button 
                    onClick={() => handleBarcodeScanned(barcode)}
                    className="h-12 px-4"
                  >
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product Search */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Quick Add Products</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-3 text-base touch-manipulation h-12"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                  {filteredProducts.slice(0, 20).map(product => (
                    <Card 
                      key={product.id}
                      className="cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={() => addToCart(product)}
                    >
                      <CardContent className="p-3">
                        <div className="font-medium text-sm truncate">{product.name}</div>
                        <div className="text-xs text-gray-500 truncate">
                          {product.barcode || product.sku}
                        </div>
                        <div className="text-lg font-bold text-blue-600 mt-1">
                          {formatCurrency(product.price)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Cart */}
          <div className="space-y-3 sm:space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center justify-between">
                  <span className="flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart ({cart.length})
                  </span>
                  {cart.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCart([])}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-2 p-2 bg-white rounded border">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{item.name}</div>
                        <div className="text-xs text-gray-500">
                          {formatCurrency(item.amount)} × {item.quantity}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="h-8 w-8 p-0 text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {cart.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Cart is empty</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Totals */}
            <Card>
              <CardContent className="pt-4 space-y-3">
                <div>
                  <label className="text-xs font-medium mb-1 block">Tax %</label>
                  <Input
                    type="number"
                    value={taxPercentage}
                    onChange={(e) => setTaxPercentage(parseFloat(e.target.value) || 0)}
                    className="text-base h-10"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span className="font-medium">{formatCurrency(totals.subTotal)}</span>
                  </div>
                  {parseFloat(totals.taxAmount) > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Tax ({taxPercentage}%):</span>
                      <span className="font-medium">{formatCurrency(totals.taxAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-blue-600">{formatCurrency(totals.grandTotal)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleGenerateReceipt}
                  disabled={cart.length === 0}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 text-base"
                >
                  <ReceiptIcon className="h-5 w-5 mr-2" />
                  Generate Receipt (F9)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSQuickSale;
