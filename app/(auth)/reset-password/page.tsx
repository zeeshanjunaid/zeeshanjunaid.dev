"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/container";
import { BlurBG } from "@/components/blur-bg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";

const supabase = createClient();
export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    // Check if we have a valid session for password reset
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setIsValidSession(true);
      } else {
        // Check for hash parameters (from email link)
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (!error) {
            setIsValidSession(true);
          } else {
            toast({
              variant: "destructive",
              title: "Invalid reset link",
              description:
                "This password reset link is invalid or has expired.",
            });
            router.push("/sign-in");
          }
        } else {
          router.push("/sign-in");
        }
      }
    };

    checkSession();
  }, [router, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match.",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          title: "Password updated",
          description: "Your password has been successfully updated.",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isValidSession) {
    return (
      <Container className="px-4 lg:px-0 py-12">
        <div className="text-center space-y-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple mx-auto"></div>
          <p className="text-dark/70 dark:text-light/70">
            Verifying reset link...
          </p>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <Container className="px-4 lg:px-0">
        <div className="max-w-md mx-auto">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-dark/70 dark:text-light/70 hover:text-purple transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-[28px] md:text-[36px] font-bold font-ao text-dark dark:text-light mb-2">
              Reset Password
            </h1>
            <p className="text-dark/70 dark:text-light/70 font-light">
              Enter your new password below
            </p>
          </div>

          {/* Reset Password Form */}
          <div className="relative rounded-3xl overflow-hidden">
            <BlurBG className="rounded-3xl" />
            <div className="relative z-20 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-dark dark:text-light font-medium"
                  >
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark/50 dark:text-light/50 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your new password"
                      className="pl-10 pr-10"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark/50 dark:text-light/50 hover:text-dark dark:hover:text-light"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-dark dark:text-light font-medium"
                  >
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark/50 dark:text-light/50 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      className="pl-10"
                      required
                      minLength={6}
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
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
