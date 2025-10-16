import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Logged in successfully',
        });
        navigate('/');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Account created successfully. You can now log in.',
        });
        setIsLogin(true);
      }
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 safe-area-inset">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Create a new account to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-base h-12 touch-manipulation"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-base h-12 touch-manipulation"
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" size="touch" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : isLogin ? (
                'Login'
              ) : (
                'Sign Up'
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              size="touch"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;