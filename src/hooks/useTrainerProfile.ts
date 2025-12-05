import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TrainerProfile } from "@/types/TrainerProfile";

// Static trainer registry - trainers with JSON files in codebase
// Dynamic imports return the JSON module directly
const staticTrainers: Record<string, () => Promise<TrainerProfile>> = {
  "coach-demo": () => import("@/data/trainers/coach-demo.json").then(m => m.default as TrainerProfile),
};

export function useTrainerProfile(slug: string | undefined) {
  const [trainer, setTrainer] = useState<TrainerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError("No trainer slug provided");
      return;
    }

    async function fetchTrainer() {
      try {
        setLoading(true);
        setError(null);

        // Check if trainer exists in static registry first
        if (staticTrainers[slug]) {
          const trainerData = await staticTrainers[slug]();
          setTrainer(trainerData);
          return;
        }

        // Fall back to Supabase storage
        const { data: urlData } = supabase.storage
          .from("trainer-json")
          .getPublicUrl(`${slug}.json`);

        const response = await fetch(urlData.publicUrl);
        
        if (!response.ok) {
          throw new Error("Trainer not found");
        }

        const trainerData: TrainerProfile = await response.json();
        setTrainer(trainerData);
      } catch (err) {
        console.error("Error fetching trainer:", err);
        setError(err instanceof Error ? err.message : "Failed to load trainer");
      } finally {
        setLoading(false);
      }
    }

    fetchTrainer();
  }, [slug]);

  return { trainer, loading, error };
}
