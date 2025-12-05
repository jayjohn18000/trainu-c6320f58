import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TrainerProfile } from "@/types/TrainerProfile";

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

        // Get public URL for the trainer JSON file
        const { data: urlData } = supabase.storage
          .from("trainer-json")
          .getPublicUrl(`${slug}.json`);

        // Fetch the JSON file
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
