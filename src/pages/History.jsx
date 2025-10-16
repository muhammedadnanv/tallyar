import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, ArrowLeft, Trash2, Edit, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const History = () => {
  const [invoices, setInvoices] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: invoiceData, error: invoiceError } = await supabase
        .from('invoices')
        .select('*')
        .eq('is_receipt', false)
        .order('created_at', { ascending: false });

      const { data: receiptData, error: receiptError } = await supabase
        .from('invoices')
        .select('*')
        .eq('is_receipt', true)
        .order('created_at', { ascending: false });

      if (invoiceError) throw invoiceError;
      if (receiptError) throw receiptError;

      setInvoices(invoiceData || []);
      setReceipts(receiptData || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from('invoices').delete().eq('id', deleteId);
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Deleted successfully',
      });
      
      fetchData();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleEdit = (item) => {
    const path = item.is_receipt ? '/receipt' : '/download';
    navigate(path, {
      state: {
        formData: {
          ...item,
          items: item.items || [],
        },
        selectedTemplate: item.template_number,
        editId: item.id,
      },
    });
  };

  const handleView = (item) => {
    const path = item.is_receipt ? '/receipt' : '/download';
    navigate(path, {
      state: {
        formData: {
          ...item,
          items: item.items || [],
        },
        selectedTemplate: item.template_number,
      },
    });
  };

  const renderList = (items, type) => (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-center text-muted-foreground py-8 text-sm sm:text-base">
          No {type} found. Create your first one!
        </p>
      ) : (
        items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base sm:text-lg truncate">{item.invoice_number}</CardTitle>
                  <CardDescription className="text-sm">
                    {new Date(item.invoice_date).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 touch-manipulation"
                    onClick={() => handleView(item)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 touch-manipulation"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 touch-manipulation"
                    onClick={() => setDeleteId(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {item.company_name && <p className="truncate"><strong>Company:</strong> {item.company_name}</p>}
                {item.bill_to_name && <p className="truncate"><strong>Bill To:</strong> {item.bill_to_name}</p>}
                <p><strong>Total:</strong> ${item.grand_total}</p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 safe-area-inset safe-area-inset-top safe-area-inset-bottom">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">History</h1>
        <Button variant="ghost" onClick={() => navigate('/')} size="touch">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="invoices" className="text-sm sm:text-base">
            Invoices ({invoices.length})
          </TabsTrigger>
          <TabsTrigger value="receipts" className="text-sm sm:text-base">
            Receipts ({receipts.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="invoices" className="mt-6">
          {renderList(invoices, 'invoices')}
        </TabsContent>
        <TabsContent value="receipts" className="mt-6">
          {renderList(receipts, 'receipts')}
        </TabsContent>
      </Tabs>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default History;