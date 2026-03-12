export interface Profile {
  id: string;
  name: string;
  title?: string;
  email?: string;
  bio?: string;
  avatar?: string | File;
  cv?: string | File;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type UpdateProfileInput = Partial<Profile>;
