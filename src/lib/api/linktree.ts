import { supabase } from '@/integrations/supabase/client';

export interface LinktreeLinks {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;
  facebook?: string;
  booking?: string;
  products: string[];
  other: string[];
}

export interface LinktreeData {
  displayName: string;
  bio: string;
  profileImageUrl: string;
  links: LinktreeLinks;
  allLinks: Array<{ url: string; title: string }>;
}

export interface LinktreeResponse {
  success: boolean;
  error?: string;
  data?: LinktreeData;
}

export async function scrapeLinktree(url: string): Promise<LinktreeResponse> {
  const { data, error } = await supabase.functions.invoke('scrape-linktree', {
    body: { url },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return data;
}
