import { TrainerProgram } from "./TrainerProgram";

export type TrainerProfile = {
  slug: string;
  fullName: string;
  brandName: string;
  niche: string;
  location: string;

  heroHeadline: string;
  heroSubheadline: string;

  primaryCTA: string;
  primaryCTALink: string;

  aboutMe: string;

  heroImageUrl: string;
  galleryImageUrls: string[];

  social: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    website?: string;
  };

  programs: TrainerProgram[];

  testimonialQuote?: string;
  testimonialName?: string;
  testimonialRole?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;

  contactEmail: string;
  contactPhone?: string;

  themeOverride?: {
    primary?: string;
    background?: string;
    text?: string;
    accent?: string;
  };
};
