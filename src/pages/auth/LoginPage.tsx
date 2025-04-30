import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { SeoHead } from '@/lib/SeoHead';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError } = useAuthStore();

  // Get the redirect path from location state or default to dashboard
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/app/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await login(email, password);
    navigate(from, { replace: true });
  };

  return (
    <>
      <SeoHead
        title="Login"
        description="Sign in to your Form Builder account to create and manage your forms"
        keywords="login, sign in, form builder, authentication"
        ogType="website"
      />
      <div className="flex items-center justify-center h-screen w-full bg-gray-100" data-testid="login-container">
        <Card className="w-[350px]" data-testid="login-card">
          <CardHeader className="text-center" data-testid="login-header">
            <CardTitle className="text-3xl" data-testid="login-title">Login</CardTitle>
            <CardDescription data-testid="login-subtitle">Sign in to your account</CardDescription>
            <CardDescription data-testid="login-subtitle">'user@example.com', 'User1234'</CardDescription>
          </CardHeader>

          <CardContent data-testid="login-form">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5" data-testid="login-email-field">
                  <Label htmlFor="email" data-testid="login-email-label">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    data-testid="login-email-input"
                  />
                </div>

                <div className="grid w-full items-center gap-1.5" data-testid="login-password-field">
                  <Label htmlFor="password" data-testid="login-password-label">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    data-testid="login-password-input"
                  />
                </div>

                {error && (
                  <div className="text-sm text-destructive" data-testid="login-error">
                    {error}
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                variant="outline" 
                className="w-full" 
                data-testid="login-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 