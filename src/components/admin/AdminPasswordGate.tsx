import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  onSuccess: () => void;
};

const AdminPasswordGate = ({ onSuccess }: Props) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await supabase.functions.invoke("verify-admin", {
        body: { passcode: password },
      });

      if (response.error || !response.data?.success) {
        setError("Invalid passcode");
      } else {
        // Store in session for this tab only
        sessionStorage.setItem("admin_verified", "true");
        onSuccess();
      }
    } catch (err) {
      setError("Error verifying passcode");
    }
    setLoading(false);
  };

  // Check if already verified in this session
  useState(() => {
    if (sessionStorage.getItem("admin_verified") === "true") {
      onSuccess();
    }
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <p className="text-foreground/60 mt-2">
            Enter the admin passcode to continue
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter passcode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-muted/30 border-border"
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !password}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Access Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPasswordGate;
