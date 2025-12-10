export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      trainer_domains: {
        Row: {
          created_at: string | null
          domain: string
          id: string
          is_primary: boolean | null
          trainer_slug: string
        }
        Insert: {
          created_at?: string | null
          domain: string
          id?: string
          is_primary?: boolean | null
          trainer_slug: string
        }
        Update: {
          created_at?: string | null
          domain?: string
          id?: string
          is_primary?: boolean | null
          trainer_slug?: string
        }
        Relationships: []
      }
      trainer_submissions: {
        Row: {
          after_photo_url: string | null
          ai_bio: string | null
          ai_enhanced: boolean | null
          ai_headline: string | null
          ai_subheadline: string | null
          background_style: string | null
          before_photo_url: string | null
          bio: string
          booking_link: string | null
          business_name: string
          client_count: string | null
          coaching_style: string | null
          created_at: string
          custom_hero_title: string | null
          email: string
          facebook_url: string | null
          full_name: string
          gallery_photo_urls: Json | null
          id: string
          instagram_url: string | null
          location: string
          phone: string
          primary_color: string | null
          profile_photo_url: string | null
          programs: Json | null
          rating: string | null
          specialty: string
          status: string | null
          testimonial_name: string | null
          testimonial_quote: string | null
          tiktok_url: string | null
          wants_ai_assistant: boolean | null
          wants_client_app: boolean | null
          wants_courses: boolean | null
          wants_custom_domain: boolean | null
          wants_done_for_you: boolean | null
          wants_sms_automations: boolean | null
          wants_social_media_management: boolean | null
          wants_website_enhancements: boolean | null
          x_url: string | null
          years_experience: string | null
          youtube_url: string | null
        }
        Insert: {
          after_photo_url?: string | null
          ai_bio?: string | null
          ai_enhanced?: boolean | null
          ai_headline?: string | null
          ai_subheadline?: string | null
          background_style?: string | null
          before_photo_url?: string | null
          bio: string
          booking_link?: string | null
          business_name: string
          client_count?: string | null
          coaching_style?: string | null
          created_at?: string
          custom_hero_title?: string | null
          email: string
          facebook_url?: string | null
          full_name: string
          gallery_photo_urls?: Json | null
          id?: string
          instagram_url?: string | null
          location: string
          phone: string
          primary_color?: string | null
          profile_photo_url?: string | null
          programs?: Json | null
          rating?: string | null
          specialty: string
          status?: string | null
          testimonial_name?: string | null
          testimonial_quote?: string | null
          tiktok_url?: string | null
          wants_ai_assistant?: boolean | null
          wants_client_app?: boolean | null
          wants_courses?: boolean | null
          wants_custom_domain?: boolean | null
          wants_done_for_you?: boolean | null
          wants_sms_automations?: boolean | null
          wants_social_media_management?: boolean | null
          wants_website_enhancements?: boolean | null
          x_url?: string | null
          years_experience?: string | null
          youtube_url?: string | null
        }
        Update: {
          after_photo_url?: string | null
          ai_bio?: string | null
          ai_enhanced?: boolean | null
          ai_headline?: string | null
          ai_subheadline?: string | null
          background_style?: string | null
          before_photo_url?: string | null
          bio?: string
          booking_link?: string | null
          business_name?: string
          client_count?: string | null
          coaching_style?: string | null
          created_at?: string
          custom_hero_title?: string | null
          email?: string
          facebook_url?: string | null
          full_name?: string
          gallery_photo_urls?: Json | null
          id?: string
          instagram_url?: string | null
          location?: string
          phone?: string
          primary_color?: string | null
          profile_photo_url?: string | null
          programs?: Json | null
          rating?: string | null
          specialty?: string
          status?: string | null
          testimonial_name?: string | null
          testimonial_quote?: string | null
          tiktok_url?: string | null
          wants_ai_assistant?: boolean | null
          wants_client_app?: boolean | null
          wants_courses?: boolean | null
          wants_custom_domain?: boolean | null
          wants_done_for_you?: boolean | null
          wants_sms_automations?: boolean | null
          wants_social_media_management?: boolean | null
          wants_website_enhancements?: boolean | null
          x_url?: string | null
          years_experience?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
