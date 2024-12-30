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
      _articles_v: {
        Row: {
          autosave: boolean | null
          created_at: string
          id: number
          latest: boolean | null
          parent_id: number | null
          updated_at: string
          version__status:
            | Database["public"]["Enums"]["enum__articles_v_version_status"]
            | null
          version_author_id: number | null
          version_category: string | null
          version_content: Json | null
          version_cover_image_id: number | null
          version_created_at: string | null
          version_published_date: string | null
          version_slug: string | null
          version_title: string | null
          version_updated_at: string | null
        }
        Insert: {
          autosave?: boolean | null
          created_at?: string
          id?: number
          latest?: boolean | null
          parent_id?: number | null
          updated_at?: string
          version__status?:
            | Database["public"]["Enums"]["enum__articles_v_version_status"]
            | null
          version_author_id?: number | null
          version_category?: string | null
          version_content?: Json | null
          version_cover_image_id?: number | null
          version_created_at?: string | null
          version_published_date?: string | null
          version_slug?: string | null
          version_title?: string | null
          version_updated_at?: string | null
        }
        Update: {
          autosave?: boolean | null
          created_at?: string
          id?: number
          latest?: boolean | null
          parent_id?: number | null
          updated_at?: string
          version__status?:
            | Database["public"]["Enums"]["enum__articles_v_version_status"]
            | null
          version_author_id?: number | null
          version_category?: string | null
          version_content?: Json | null
          version_cover_image_id?: number | null
          version_created_at?: string | null
          version_published_date?: string | null
          version_slug?: string | null
          version_title?: string | null
          version_updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "_articles_v_parent_id_articles_id_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_articles_v_version_author_id_users_id_fk"
            columns: ["version_author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "_articles_v_version_cover_image_id_media_id_fk"
            columns: ["version_cover_image_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          _status: Database["public"]["Enums"]["enum_articles_status"] | null
          author_id: number | null
          category: string | null
          content: Json | null
          cover_image_id: number | null
          created_at: string
          id: number
          published_date: string | null
          slug: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          _status?: Database["public"]["Enums"]["enum_articles_status"] | null
          author_id?: number | null
          category?: string | null
          content?: Json | null
          cover_image_id?: number | null
          created_at?: string
          id?: number
          published_date?: string | null
          slug?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          _status?: Database["public"]["Enums"]["enum_articles_status"] | null
          author_id?: number | null
          category?: string | null
          content?: Json | null
          cover_image_id?: number | null
          created_at?: string
          id?: number
          published_date?: string | null
          slug?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_id_users_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_cover_image_id_media_id_fk"
            columns: ["cover_image_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          alt: string
          cloudflare_id: string | null
          created_at: string
          filename: string | null
          filesize: number | null
          focal_x: number | null
          focal_y: number | null
          height: number | null
          id: number
          mime_type: string | null
          thumbnail_u_r_l: string | null
          updated_at: string
          url: string | null
          width: number | null
        }
        Insert: {
          alt: string
          cloudflare_id?: string | null
          created_at?: string
          filename?: string | null
          filesize?: number | null
          focal_x?: number | null
          focal_y?: number | null
          height?: number | null
          id?: number
          mime_type?: string | null
          thumbnail_u_r_l?: string | null
          updated_at?: string
          url?: string | null
          width?: number | null
        }
        Update: {
          alt?: string
          cloudflare_id?: string | null
          created_at?: string
          filename?: string | null
          filesize?: number | null
          focal_x?: number | null
          focal_y?: number | null
          height?: number | null
          id?: number
          mime_type?: string | null
          thumbnail_u_r_l?: string | null
          updated_at?: string
          url?: string | null
          width?: number | null
        }
        Relationships: []
      }
      payload_locked_documents: {
        Row: {
          created_at: string
          global_slug: string | null
          id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          global_slug?: string | null
          id?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          global_slug?: string | null
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      payload_locked_documents_rels: {
        Row: {
          articles_id: number | null
          id: number
          media_id: number | null
          order: number | null
          parent_id: number
          path: string
          users_id: number | null
        }
        Insert: {
          articles_id?: number | null
          id?: number
          media_id?: number | null
          order?: number | null
          parent_id: number
          path: string
          users_id?: number | null
        }
        Update: {
          articles_id?: number | null
          id?: number
          media_id?: number | null
          order?: number | null
          parent_id?: number
          path?: string
          users_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "payload_locked_documents_rels_articles_fk"
            columns: ["articles_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_media_fk"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "payload_locked_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_locked_documents_rels_users_fk"
            columns: ["users_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payload_migrations: {
        Row: {
          batch: number | null
          created_at: string
          id: number
          name: string | null
          updated_at: string
        }
        Insert: {
          batch?: number | null
          created_at?: string
          id?: number
          name?: string | null
          updated_at?: string
        }
        Update: {
          batch?: number | null
          created_at?: string
          id?: number
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      payload_preferences: {
        Row: {
          created_at: string
          id: number
          key: string | null
          updated_at: string
          value: Json | null
        }
        Insert: {
          created_at?: string
          id?: number
          key?: string | null
          updated_at?: string
          value?: Json | null
        }
        Update: {
          created_at?: string
          id?: number
          key?: string | null
          updated_at?: string
          value?: Json | null
        }
        Relationships: []
      }
      payload_preferences_rels: {
        Row: {
          id: number
          order: number | null
          parent_id: number
          path: string
          users_id: number | null
        }
        Insert: {
          id?: number
          order?: number | null
          parent_id: number
          path: string
          users_id?: number | null
        }
        Update: {
          id?: number
          order?: number | null
          parent_id?: number
          path?: string
          users_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "payload_preferences_rels_parent_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "payload_preferences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payload_preferences_rels_users_fk"
            columns: ["users_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          clerk_id: string | null
          created_at: string
          email: string | null
          id: number
          role: Database["public"]["Enums"]["enum_users_role"] | null
          updated_at: string
          username: string | null
        }
        Insert: {
          clerk_id?: string | null
          created_at?: string
          email?: string | null
          id?: number
          role?: Database["public"]["Enums"]["enum_users_role"] | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          clerk_id?: string | null
          created_at?: string
          email?: string | null
          id?: number
          role?: Database["public"]["Enums"]["enum_users_role"] | null
          updated_at?: string
          username?: string | null
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
      enum__articles_v_version_status: "draft" | "published"
      enum_articles_status: "draft" | "published"
      enum_users_role: "admin" | "creator" | "user"
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
