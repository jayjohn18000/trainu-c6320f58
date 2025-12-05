import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type DomainMapping = {
  domain: string;
  trainer_slug: string;
  is_primary: boolean;
};

export function useDomainMapping() {
  const [trainerSlug, setTrainerSlug] = useState<string | null>(null);
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkDomain() {
      const hostname = window.location.hostname;
      
      // Skip domain lookup for localhost and lovable.app domains
      if (
        hostname === "localhost" ||
        hostname.endsWith(".lovable.app") ||
        hostname.endsWith(".lovableproject.com")
      ) {
        setLoading(false);
        return;
      }

      try {
        // Check if this hostname maps to a trainer
        const { data, error } = await supabase
          .from("trainer_domains")
          .select("domain, trainer_slug, is_primary")
          .or(`domain.eq.${hostname},domain.eq.www.${hostname}`)
          .limit(1)
          .maybeSingle();

        if (data && !error) {
          setTrainerSlug((data as DomainMapping).trainer_slug);
          setIsCustomDomain(true);
        }
      } catch (err) {
        console.error("Error checking domain mapping:", err);
      } finally {
        setLoading(false);
      }
    }

    checkDomain();
  }, []);

  return { trainerSlug, isCustomDomain, loading };
}
