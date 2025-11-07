import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, Scan, Plus, Minus, Trash2, ShoppingCart, Receipt as ReceiptIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const POSQuickSale = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndFetchProducts();
    
    // Focus search input on mount
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }

    // Keyboard shortcuts
    const handleKeyPress = (e) => {
      // F2 - Focus search
      if (e.key === 'F2') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // F9 - Complete sale
      if (e.key === 'F9' && cart.length > 0) {
        e.preventDefault();
        handleCompleteSale();
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

  const checkAuthAndFetchProducts = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error('Please login to access POS');
      navigate('/auth');
      return;
    }
    fetchProducts();
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Clear search and refocus
    setSearchTerm('');
    searchInputRef.current?.focus();
    toast.success(`Added ${product.name} to cart`);
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) return null;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.success('Item removed from cart');
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = cart.reduce((sum, item) => {
      const itemTotal = item.price * item.quantity;
      const itemTax = itemTotal * (item.tax_rate || 0) / 100;
      return sum + itemTax;
    }, 0);
    return { subtotal, tax, total: subtotal + tax };
  };

  const handleCompleteSale = async () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    setProcessing(true);
    try {
      const { subtotal, tax, total } = calculateTotal();
      
      const receiptData = {
        invoice_number: `RCP-${Date.now()}`,
        invoice_date: new Date().toISOString().split('T')[0],
        items: cart.map(item => ({
          name: item.name,
          description: item.description || '',
          quantity: item.quantity,
          amount: item.price,
          total: item.price * item.quantity
        })),
        sub_total: subtotal,
        tax_amount: tax,
        grand_total: total,
        is_receipt: true,
        template_number: 1,
        notes: 'Quick POS Sale'
      };

      // Generate receipt
      localStorage.setItem('receiptData', JSON.stringify(receiptData));
      navigate('/receipt', { 
        state: { 
          formData: receiptData,
          selectedTemplate: 1,
          fromPOS: true
        } 
      });
      
      toast.success('Sale completed! Generating receipt...');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setProcessing(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.barcode && product.barcode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const { subtotal, tax, total } = calculateTotal();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 safe-area-inset">
      <div className="container mx-auto px-4 py-4 sm:py-6 safe-area-inset-top safe-area-inset-bottom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="mb-2"
              size="touch"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Quick POS Sale</h1>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline">F2: Search</Badge>
              <Badge variant="outline">F9: Complete</Badge>
              <Badge variant="outline">ESC: Clear</Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Scan className="h-5 w-5 mr-2" />
                  Product Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  ref={searchInputRef}
                  placeholder="Search by name, SKU, or barcode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
                  {filteredProducts.length === 0 ? (
                    <p className="text-muted-foreground col-span-2 text-center py-8">
                      {searchTerm ? 'No products found' : 'No products available. Add products first.'}
                    </p>
                  ) : (
                    filteredProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="cursor-pointer hover:bg-accent transition-colors"
                        onClick={() => addToCart(product)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-semibold">{product.name}</p>
                              {product.sku && (
                                <p className="text-xs text-muted-foreground font-mono">{product.sku}</p>
                              )}
                              <p className="text-lg font-bold text-primary mt-1">
                                ${product.price.toFixed(2)}
                              </p>
                            </div>
                            <Badge variant={product.stock_quantity < 10 ? 'destructive' : 'secondary'}>
                              {product.stock_quantity} {product.unit}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cart Section */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart
                  </span>
                  <Badge>{cart.length} items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-3 max-h-[40vh] overflow-y-auto mb-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleCompleteSale}
                        disabled={processing}
                      >
                        {processing ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <ReceiptIcon className="h-4 w-4 mr-2" />
                        )}
                        Complete Sale (F9)
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          if (confirm('Clear entire cart?')) {
                            setCart([]);
                          }
                        }}
                      >
                        Clear Cart (ESC)
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSQuickSale;
