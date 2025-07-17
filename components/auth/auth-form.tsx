'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { signIn, signUp, resetPassword } from '@/lib/db-helpers';
import { BlurBG } from '@/components/blur-bg';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface AuthFormProps {
  mode: 'signin' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (resetMode) {
        const { error } = await resetPassword(email);
        
        if (error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: error.message,
          });
        } else {
          toast({
            title: 'Reset link sent',
            description: 'Check your email for a password reset link.',
          });
          setResetMode(false);
        }
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Passwords do not match.',
          });
          return;
        }

        const { error } = await signUp(email, password);
        
        if (error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: error.message,
          });
        } else {
          toast({
            title: 'Account created',
            description: 'Please check your email to verify your account.',
          });
          router.push('/sign-in');
        }
      } else {
        const { error } = await signIn(email, password);
        
        if (error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: error.message,
          });
        } else {
          router.push('/dashboard');
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (resetMode) {
    return (
      <div className="relative rounded-3xl overflow-hidden">
        <BlurBG className="rounded-3xl" />
        <div className="relative z-20 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-dark dark:text-light font-medium">
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark/50 dark:text-light/50 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="purple"
              size="lg"
              className="w-full rounded-xl uppercase font-medium"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setResetMode(false)}
                className="text-purple hover:text-purple/80 text-sm font-medium"
              >
                Back to sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl overflow-hidden">
      <BlurBG className="rounded-3xl" />
      <div className="relative z-20 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-dark dark:text-light font-medium">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark/50 dark:text-light/50 w-4 h-4" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-dark dark:text-light font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark/50 dark:text-light/50 w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark/50 dark:text-light/50 hover:text-dark dark:hover:text-light"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-dark dark:text-light font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark/50 dark:text-light/50 w-4 h-4" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            variant="purple"
            size="lg"
            className="w-full rounded-xl uppercase font-medium"
          >
            {loading ? 'Loading...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
          </Button>

          {mode === 'signin' && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setResetMode(true)}
                className="text-purple hover:text-purple/80 text-sm font-medium"
              >
                Forgot your password?
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}