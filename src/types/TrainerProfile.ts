export type TrainerProgram = {
  id: string;
  title: string;
  price: string;
  priceLabel?: string;
  priceDisplay?: string;
  billingPeriod?: string;
  frequency?: string;
  description: string;
  bullets?: string[];
  ctaLabel?: string;
  isPrimary: boolean;
};

export type TrainerTestimonial = {
  id: string;
  quote: string;
  name: string;
  subtitle?: string;
};

export type TrainerResult = {
  id: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  label: string;
};

export type TrainerStats = {
  clientCount?: string;      // e.g., "200+", "500+", "50+"
  rating?: string;           // e.g., "5.0", "4.9"
  yearsExperience?: string;  // e.g., "5+", "10+"
};

export type TrainerProfile = {
  slug: string;
  status: "pending" | "approved" | "generated" | "archived";

  trainer: {
    fullName: string;
    businessName: string;
    location: string;
    specialty: string;
    bio: string;
    profilePhotoUrl: string;
    galleryImageUrls?: string[];
  };

  branding: {
    primaryColor?: string;
    backgroundStyle?: string;
    secondaryColor?: string;
    accentColor?: string;
    backgroundGradient?: string;
    theme: "dark" | "light";
  };

  hero: {
    headline: string;
    subheadline: string;
    systemVibe?: string;
    ctaPrimaryLabel?: string;
    ctaPrimaryLink?: string;
    ctaSecondaryLabel?: string;
    ctaSecondaryLink?: string;
    backgroundImageUrl: string;
  };

  social: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    bookingLink?: string;
    website?: string;
  };

  programs: TrainerProgram[];

  results: {
    beforeAfter: TrainerResult[];
  };

  testimonials: TrainerTestimonial[];

  // NEW: Dynamic stats for trust indicators
  stats?: TrainerStats;

  preferences: {
    coachingStyle?: string;
    wantsCustomDomain: boolean;
    wantsSmsAutomations: boolean;
    wantsAiAssistant: boolean;
    wantsCourses: boolean;
    wantsClientApp: boolean;
  };

  contact: {
    email: string;
    phone?: string;
  };

  meta: {
    createdAt: string;
    updatedAt: string;
    sourceSubmissionId?: string;
    notes?: string;
    aiEnhanced?: boolean;
  };
};
