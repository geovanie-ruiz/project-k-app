export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cards: {
        Row: {
          colors: string[] | null
          cost: number | null
          created_at: string
          effect: string | null
          id: string
          might: number | null
          number: string | null
          rarity: string | null
          recycle: number | null
          set: string | null
          subtitle: string | null
          tags: string[] | null
          title: string | null
          type: Database["public"]["Enums"]["card_type"] | null
        }
        Insert: {
          colors?: string[] | null
          cost?: number | null
          created_at?: string
          effect?: string | null
          id?: string
          might?: number | null
          number?: string | null
          rarity?: string | null
          recycle?: number | null
          set?: string | null
          subtitle?: string | null
          tags?: string[] | null
          title?: string | null
          type?: Database["public"]["Enums"]["card_type"] | null
        }
        Update: {
          colors?: string[] | null
          cost?: number | null
          created_at?: string
          effect?: string | null
          id?: string
          might?: number | null
          number?: string | null
          rarity?: string | null
          recycle?: number | null
          set?: string | null
          subtitle?: string | null
          tags?: string[] | null
          title?: string | null
          type?: Database["public"]["Enums"]["card_type"] | null
        }
        Relationships: []
      }
      set: {
        Row: {
          id: string
          name: string
          release_date: string | null
        }
        Insert: {
          id?: string
          name: string
          release_date?: string | null
        }
        Update: {
          id?: string
          name?: string
          release_date?: string | null
        }
        Relationships: []
      }
      spoiler: {
        Row: {
          card: string | null
          card_type: Database["public"]["Enums"]["card_type"]
          description: string | null
          id: string
          image_url: string | null
          published_on: string
          source_text: string | null
          source_url: string | null
        }
        Insert: {
          card?: string | null
          card_type: Database["public"]["Enums"]["card_type"]
          description?: string | null
          id?: string
          image_url?: string | null
          published_on?: string
          source_text?: string | null
          source_url?: string | null
        }
        Update: {
          card?: string | null
          card_type?: Database["public"]["Enums"]["card_type"]
          description?: string | null
          id?: string
          image_url?: string | null
          published_on?: string
          source_text?: string | null
          source_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "spoiler_card_fkey"
            columns: ["card"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      card_type:
        | "unit"
        | "champion"
        | "legend"
        | "spell"
        | "battlefield"
        | "gear"
        | "rune"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
