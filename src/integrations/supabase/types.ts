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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      connected_systems_quotes: {
        Row: {
          company: string | null
          contact_email: string
          contact_name: string
          created_at: string | null
          features: string | null
          id: string
          platforms: Json | null
        }
        Insert: {
          company?: string | null
          contact_email: string
          contact_name: string
          created_at?: string | null
          features?: string | null
          id?: string
          platforms?: Json | null
        }
        Update: {
          company?: string | null
          contact_email?: string
          contact_name?: string
          created_at?: string | null
          features?: string | null
          id?: string
          platforms?: Json | null
        }
        Relationships: []
      }
      contact_forms: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          project_type: string | null
          subject: string
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          project_type?: string | null
          subject: string
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          project_type?: string | null
          subject?: string
        }
        Relationships: []
      }
      discount_campaigns: {
        Row: {
          created_at: string | null
          description: string | null
          discount_amount: number | null
          discount_badge: string
          discount_percentage: number | null
          discount_text: string
          end_date: string | null
          id: string
          is_active: boolean | null
          name: string
          start_date: string | null
          target_regions: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_badge: string
          discount_percentage?: number | null
          discount_text: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          start_date?: string | null
          target_regions?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_badge?: string
          discount_percentage?: number | null
          discount_text?: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          start_date?: string | null
          target_regions?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      foods: {
        Row: {
          brand: string | null
          calories_per_serving: number
          carbs_g: number | null
          created_at: string | null
          created_by: string | null
          fat_g: number | null
          fiber_g: number | null
          id: string
          is_verified: boolean | null
          name: string
          protein_g: number | null
          serving_size: string
          sodium_mg: number | null
          sugar_g: number | null
          updated_at: string | null
        }
        Insert: {
          brand?: string | null
          calories_per_serving: number
          carbs_g?: number | null
          created_at?: string | null
          created_by?: string | null
          fat_g?: number | null
          fiber_g?: number | null
          id?: string
          is_verified?: boolean | null
          name: string
          protein_g?: number | null
          serving_size: string
          sodium_mg?: number | null
          sugar_g?: number | null
          updated_at?: string | null
        }
        Update: {
          brand?: string | null
          calories_per_serving?: number
          carbs_g?: number | null
          created_at?: string | null
          created_by?: string | null
          fat_g?: number | null
          fiber_g?: number | null
          id?: string
          is_verified?: boolean | null
          name?: string
          protein_g?: number | null
          serving_size?: string
          sodium_mg?: number | null
          sugar_g?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      meal_items: {
        Row: {
          created_at: string | null
          food_id: string
          id: string
          meal_id: string
          servings: number
        }
        Insert: {
          created_at?: string | null
          food_id: string
          id?: string
          meal_id: string
          servings?: number
        }
        Update: {
          created_at?: string | null
          food_id?: string
          id?: string
          meal_id?: string
          servings?: number
        }
        Relationships: [
          {
            foreignKeyName: "meal_items_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "foods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_items_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
        ]
      }
      meals: {
        Row: {
          created_at: string | null
          id: string
          meal_date: string
          meal_type: Database["public"]["Enums"]["meal_type"]
          notes: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          meal_date?: string
          meal_type: Database["public"]["Enums"]["meal_type"]
          notes?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          meal_date?: string
          meal_type?: Database["public"]["Enums"]["meal_type"]
          notes?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string | null
          email: string
          id: string
          source: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          source?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      nutrition_goals: {
        Row: {
          created_at: string | null
          daily_calories: number
          daily_carbs_g: number | null
          daily_fat_g: number | null
          daily_fiber_g: number | null
          daily_protein_g: number | null
          daily_sodium_mg: number | null
          daily_sugar_g: number | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          daily_calories?: number
          daily_carbs_g?: number | null
          daily_fat_g?: number | null
          daily_fiber_g?: number | null
          daily_protein_g?: number | null
          daily_sodium_mg?: number | null
          daily_sugar_g?: number | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          daily_calories?: number
          daily_carbs_g?: number | null
          daily_fat_g?: number | null
          daily_fiber_g?: number | null
          daily_protein_g?: number | null
          daily_sodium_mg?: number | null
          daily_sugar_g?: number | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      onboarding_forms: {
        Row: {
          budget: string | null
          business_description: string | null
          business_name: string
          contact_email: string | null
          contact_name: string | null
          created_at: string | null
          features: Json | null
          has_existing_website: string | null
          id: string
          pages: Json | null
          project_types: Json | null
          style_theme: string | null
          timeline: string | null
          website_goals: string | null
        }
        Insert: {
          budget?: string | null
          business_description?: string | null
          business_name: string
          contact_email?: string | null
          contact_name?: string | null
          created_at?: string | null
          features?: Json | null
          has_existing_website?: string | null
          id?: string
          pages?: Json | null
          project_types?: Json | null
          style_theme?: string | null
          timeline?: string | null
          website_goals?: string | null
        }
        Update: {
          budget?: string | null
          business_description?: string | null
          business_name?: string
          contact_email?: string | null
          contact_name?: string | null
          created_at?: string | null
          features?: Json | null
          has_existing_website?: string | null
          id?: string
          pages?: Json | null
          project_types?: Json | null
          style_theme?: string | null
          timeline?: string | null
          website_goals?: string | null
        }
        Relationships: []
      }
      plan_discount_campaigns: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          id: string
          plan_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          plan_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          plan_id?: string | null
        }
        Relationships: []
      }
      plan_features: {
        Row: {
          created_at: string | null
          display_order: number | null
          feature_text: string
          id: string
          is_highlight: boolean | null
          plan_id: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          feature_text: string
          id?: string
          is_highlight?: boolean | null
          plan_id?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          feature_text?: string
          id?: string
          is_highlight?: boolean | null
          plan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plan_features_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "pricing_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_onboarding_forms: {
        Row: {
          additional_budget_amount: string | null
          additional_budget_available: boolean | null
          admin_notes: string | null
          company_name: string | null
          contact_email: string
          contact_name: string
          contact_phone: string | null
          created_at: string | null
          existing_website_url: string | null
          has_existing_branding: boolean | null
          id: string
          plan_price: string
          plan_type: string
          preferred_timeline: string | null
          project_description: string
          project_title: string
          specific_date: string | null
          specific_requirements: Json | null
          status: string | null
          target_audience: string | null
          updated_at: string | null
        }
        Insert: {
          additional_budget_amount?: string | null
          additional_budget_available?: boolean | null
          admin_notes?: string | null
          company_name?: string | null
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          created_at?: string | null
          existing_website_url?: string | null
          has_existing_branding?: boolean | null
          id?: string
          plan_price: string
          plan_type: string
          preferred_timeline?: string | null
          project_description: string
          project_title: string
          specific_date?: string | null
          specific_requirements?: Json | null
          status?: string | null
          target_audience?: string | null
          updated_at?: string | null
        }
        Update: {
          additional_budget_amount?: string | null
          additional_budget_available?: boolean | null
          admin_notes?: string | null
          company_name?: string | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          created_at?: string | null
          existing_website_url?: string | null
          has_existing_branding?: boolean | null
          id?: string
          plan_price?: string
          plan_type?: string
          preferred_timeline?: string | null
          project_description?: string
          project_title?: string
          specific_date?: string | null
          specific_requirements?: Json | null
          status?: string | null
          target_audience?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      plan_regional_discount_campaigns: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          id: string
          plan_id: string | null
          region_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          plan_id?: string | null
          region_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          id?: string
          plan_id?: string | null
          region_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plan_regional_discount_campaigns_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "discount_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plan_regional_discount_campaigns_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "pricing_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plan_regional_discount_campaigns_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "pricing_regions"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_regional_pricing: {
        Row: {
          created_at: string | null
          discount_badge: string | null
          discount_text: string | null
          discounted_price: number | null
          id: string
          is_active: boolean | null
          original_price: number
          plan_id: string | null
          region_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          discount_badge?: string | null
          discount_text?: string | null
          discounted_price?: number | null
          id?: string
          is_active?: boolean | null
          original_price: number
          plan_id?: string | null
          region_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          discount_badge?: string | null
          discount_text?: string | null
          discounted_price?: number | null
          id?: string
          is_active?: boolean | null
          original_price?: number
          plan_id?: string | null
          region_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plan_regional_pricing_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "pricing_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plan_regional_pricing_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "pricing_regions"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_categories: {
        Row: {
          category_key: string
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category_key: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category_key?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          category_id: string | null
          created_at: string | null
          delivery_time: string
          description: string | null
          display_order: number | null
          icon_name: string | null
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          name: string
          plan_key: string
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          delivery_time: string
          description?: string | null
          display_order?: number | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name: string
          plan_key: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          delivery_time?: string
          description?: string | null
          display_order?: number | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name?: string
          plan_key?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pricing_plans_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "pricing_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_regions: {
        Row: {
          created_at: string | null
          currency_code: string
          currency_symbol: string
          display_order: number | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          region_code: string
          region_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency_code: string
          currency_symbol: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          region_code: string
          region_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency_code?: string
          currency_symbol?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          region_code?: string
          region_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      project_info_forms: {
        Row: {
          budget: string | null
          contact_email: string | null
          contact_name: string | null
          created_at: string | null
          delivery_time: string | null
          description: string | null
          features: Json | null
          id: string
          industry: string | null
          pages: Json | null
          start_date: string | null
          title: string
          type: string | null
        }
        Insert: {
          budget?: string | null
          contact_email?: string | null
          contact_name?: string | null
          created_at?: string | null
          delivery_time?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          industry?: string | null
          pages?: Json | null
          start_date?: string | null
          title: string
          type?: string | null
        }
        Update: {
          budget?: string | null
          contact_email?: string | null
          contact_name?: string | null
          created_at?: string | null
          delivery_time?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          industry?: string | null
          pages?: Json | null
          start_date?: string | null
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      testimonial_forms: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          plan: string | null
          rating: number | null
          role: string | null
          testimonial: string
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          plan?: string | null
          rating?: number | null
          role?: string | null
          testimonial: string
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          plan?: string | null
          rating?: number | null
          role?: string | null
          testimonial?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          activity_level: string | null
          age: number | null
          created_at: string | null
          email: string
          full_name: string
          height_cm: number | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
          user_id: string
          weight_kg: number | null
        }
        Insert: {
          activity_level?: string | null
          age?: number | null
          created_at?: string | null
          email: string
          full_name: string
          height_cm?: number | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          user_id: string
          weight_kg?: number | null
        }
        Update: {
          activity_level?: string | null
          age?: number | null
          created_at?: string | null
          email?: string
          full_name?: string
          height_cm?: number | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          user_id?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          created_at: string | null
          id: string
          stat_date: string
          total_calories: number | null
          total_carbs_g: number | null
          total_fat_g: number | null
          total_fiber_g: number | null
          total_protein_g: number | null
          total_sodium_mg: number | null
          total_sugar_g: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          stat_date?: string
          total_calories?: number | null
          total_carbs_g?: number | null
          total_fat_g?: number | null
          total_fiber_g?: number | null
          total_protein_g?: number | null
          total_sodium_mg?: number | null
          total_sugar_g?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          stat_date?: string
          total_calories?: number | null
          total_carbs_g?: number | null
          total_fat_g?: number | null
          total_fiber_g?: number | null
          total_protein_g?: number | null
          total_sodium_mg?: number | null
          total_sugar_g?: number | null
          updated_at?: string | null
          user_id?: string
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
      meal_type: "breakfast" | "lunch" | "dinner" | "snack"
      user_role: "user" | "nutritionist" | "admin"
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
    Enums: {
      meal_type: ["breakfast", "lunch", "dinner", "snack"],
      user_role: ["user", "nutritionist", "admin"],
    },
  },
} as const
