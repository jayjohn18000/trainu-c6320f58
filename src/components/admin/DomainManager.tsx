import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Plus, Trash2, Loader2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Domain = {
  id: string;
  domain: string;
  trainer_slug: string;
  is_primary: boolean;
  created_at: string;
};

type DomainManagerProps = {
  trainerSlug: string;
};

const DomainManager = ({ trainerSlug }: DomainManagerProps) => {
  const { toast } = useToast();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [newDomain, setNewDomain] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchDomains();
  }, [trainerSlug]);

  const fetchDomains = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("trainer_domains")
      .select("*")
      .eq("trainer_slug", trainerSlug)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching domains:", error);
    } else {
      setDomains((data as Domain[]) || []);
    }
    setLoading(false);
  };

  const addDomain = async () => {
    if (!newDomain.trim()) return;

    // Clean the domain input
    const cleanDomain = newDomain
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/.*$/, "")
      .trim();

    setAdding(true);
    const { error } = await supabase.from("trainer_domains").insert({
      domain: cleanDomain,
      trainer_slug: trainerSlug,
      is_primary: domains.length === 0,
    });

    if (error) {
      if (error.code === "23505") {
        toast({ title: "This domain is already in use", variant: "destructive" });
      } else {
        toast({ title: "Error adding domain", variant: "destructive" });
      }
    } else {
      toast({ title: "Domain added successfully" });
      setNewDomain("");
      fetchDomains();
    }
    setAdding(false);
  };

  const removeDomain = async (id: string) => {
    const { error } = await supabase.from("trainer_domains").delete().eq("id", id);

    if (error) {
      toast({ title: "Error removing domain", variant: "destructive" });
    } else {
      toast({ title: "Domain removed" });
      fetchDomains();
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Custom Domains
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* DNS Instructions */}
        <div className="p-4 rounded-lg bg-muted/30 border border-border">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-foreground/70">
              <p className="font-medium text-foreground mb-1">DNS Setup Instructions:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Add the domain to Lovable project settings first</li>
                <li>Create an A record pointing to <code className="bg-muted px-1 rounded">185.158.133.1</code></li>
                <li>Add both root domain and www subdomain</li>
                <li>Then add the domain below to map it to this trainer</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Add Domain Form */}
        <div className="flex gap-2">
          <Input
            placeholder="example.com"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addDomain()}
            className="bg-muted/30 border-border"
          />
          <Button onClick={addDomain} disabled={adding || !newDomain.trim()}>
            {adding ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Domain List */}
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : domains.length === 0 ? (
          <p className="text-foreground/60 text-sm text-center py-4">
            No custom domains configured
          </p>
        ) : (
          <div className="space-y-2">
            {domains.map((domain) => (
              <div
                key={domain.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border"
              >
                <div className="flex items-center gap-2">
                  <span className="text-foreground">{domain.domain}</span>
                  {domain.is_primary && (
                    <Badge variant="outline" className="text-xs bg-primary/20 text-primary border-primary/30">
                      Primary
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDomain(domain.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DomainManager;
